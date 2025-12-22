import {
    Breadcrumb, Button, Card, Divider,
    Modal,
    Spin, Table, Tag,
    notification
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosClient from "../../../apis/axiosClient";
import bookingApi from "../../../apis/bookingApi";
import html2pdf from 'html2pdf.js';

import "./cartHistory.css";

const CartHistory = () => {
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);
    let { id } = useParams();
    const history = useHistory();


    const handleCancelOrder = (order) => {
        console.log(order);
        Modal.confirm({
            title: 'Xác nhận hủy sân bóng',
            content: 'Bạn có chắc muốn hủy sân bóng này?',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            onOk() {
                handleUpdateOrder(order.id);
            },
        });
    };


    const handleUpdateOrder = async (id) => {
        setLoading(true);
        try {
            const categoryList = {
                "description": "Khách hàng hủy sân bóng!",
                "status": "rejected"
            }
            await axiosClient.put("/order/" + id, categoryList).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Cập nhật thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Cập nhật thành công',
                    });
                }
            })

            handleList();
            setLoading(false);

        } catch (error) {
            throw error;
        }
    }

    //in hoa don
    const handlePrintInvoice = (order) => {
    const formattedDate = moment(order.booking_date).format('DD/MM/YYYY');
    const printDate = moment().format('DD/MM/YYYY HH:mm');
    const totalAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total_amount);

    // Nội dung quét mã QR (Bạn có thể tùy chỉnh text này)
    const qrData = `Ma don: PTIT-${order.id} | San: ${order.name} | Ngay: ${formattedDate} | Gio: ${order.start_time}-${order.end_time}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

    const htmlContent = `
        <html>
            <head>
                <title>Vé đặt sân</title>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                    body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; padding: 20px; }
                    .invoice-card { 
                        width: 450px; margin: 0 auto; background: white; 
                        border-radius: 24px; overflow: hidden;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                        border: 1px solid #e5e7eb;
                    }
                    .ticket-edge {
                        border-top: 2px dashed #e5e7eb;
                        position: relative;
                    }
                    .ticket-edge::before, .ticket-edge::after {
                        content: ''; position: absolute; top: -11px;
                        width: 22px; height: 22px; background: #f3f4f6; border-radius: 50%;
                    }
                    .ticket-edge::before { left: -12px; border-right: 1px solid #e5e7eb; }
                    .ticket-edge::after { right: -12px; border-left: 1px solid #e5e7eb; }
                </style>
            </head>
            <body>
                <div class="invoice-card">
                    <div class="bg-green-600 p-6 text-white text-center">
                        <div class="text-3xl mb-1">Hệ thống đặt sân thể thao</div>
                        <h1 class="text-xl font-bold uppercase tracking-widest">Vé Đặt Sân</h1>
                        <p class="text-green-100 text-xs mt-1">Mã hóa đơn: #PTIT-${order.id}</p>
                    </div>

                    <div class="p-8">
                        <div class="flex justify-between mb-6">
                            <div>
                                <p class="text-gray-400 text-[10px] uppercase font-bold tracking-tight">Tên sân</p>
                                <p class="text-base font-bold text-gray-800">${order.name}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-gray-400 text-[10px] uppercase font-bold tracking-tight">Ngày tham gia</p>
                                <p class="text-base font-bold text-gray-800">${formattedDate}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                            <div>
                                <p class="text-gray-400 text-[10px] font-bold uppercase">Bắt đầu</p>
                                <p class="text-gray-700 font-semibold text-sm">🕒 ${order.start_time}</p>
                            </div>
                            <div>
                                <p class="text-gray-400 text-[10px] font-bold uppercase">Kết thúc</p>
                                <p class="text-gray-700 font-semibold text-sm">🕒 ${order.end_time}</p>
                            </div>
                        </div>

                        <div class="ticket-edge my-6"></div>

                        <div class="flex flex-col items-center justify-center space-y-4">
                            <div class="p-2 border-2 border-dashed border-gray-200 rounded-lg">
                                <img src="${qrCodeUrl}" alt="QR Code" width="120" height="120" />
                            </div>
                            <p class="text-[10px] text-gray-400 uppercase font-semibold">Quét để kiểm tra thông tin</p>
                        </div>

                        <div class="mt-8 pt-4 border-t border-gray-100">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-800 font-bold">Tổng cộng:</span>
                                <span class="text-xl font-black text-green-600">${totalAmount}</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-4 text-center border-t border-gray-100">
                        <p class="text-gray-400 text-[10px] italic">Vui lòng mang theo vé này khi đến sân</p>
                        <p class="text-gray-400 text-[9px] mt-1 italic">In lúc: ${printDate}</p>
                    </div>
                </div>
            </body>
        </html>
    `;

    const opt = {
        margin: 0,
        filename: `Ve_SanBong_PTIT_${order.id}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true }, // useCORS để load được ảnh từ API QR
        jsPDF: { unit: 'mm', format: [140, 210], orientation: 'portrait' } // Format khổ nhỏ cho giống vé
    };

    html2pdf().set(opt).from(htmlContent).save();
};

    //ham thanh toan 
const handlePayBooking = async (order) => {
    console.log("===== CLICK THANH TOAN =====");
    console.log("order =", order);
    console.log("bookingId =", order.id);
    console.log("amount =", order.total_amount);

    try {
        const res = await axiosClient.post("/vnpay/create-payment", {
            bookingId: order.id,
            amount: order.total_amount
        });

        console.log("RESPONSE FROM BACKEND =", res);
        
        window.location.href = res.paymentUrl;
    } catch (err) {
        console.error("PAY ERROR =", err);
        notification.error({
            message: "Thanh toán thất bại",
        });
    }
};

      


    const columns = [
        {
            title: "Tên sân",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ngày đặt",
            dataIndex: "booking_date",
            key: "booking_date",
            render: (createdAt) => (
                <span>{moment(createdAt).format("DD/MM/YYYY HH:mm")}</span>
            ),
        },
        {
            title: "Giờ bắt đầu",
            dataIndex: "start_time",
            key: "start_time",
        },
        {
            title: "Giờ kết thúc",
            dataIndex: "end_time",
            key: "end_time",
        },
        {
            title: "Tổng tiền",
            dataIndex: "total_amount",
            key: "total_amount",
            render: (products) => (
                <div>
                    {Number(products)?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                    })}
                </div>
            ),
        },
       
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (slugs) => (
                <span >
                    {slugs === "rejected" ? <Tag style={{ width: 170, textAlign: "center" }} color="red">Đã hủy</Tag> : slugs === "approved" ? <Tag style={{ width: 170, textAlign: "center" }} color="geekblue" key={slugs}>
                       Đang xem xét
                    </Tag> : slugs === "final" ? <Tag color="green" style={{ width: 170, textAlign: "center" }}>Đã xác nhận - Đã thanh toán</Tag> : <Tag color="blue" style={{ width: 170, textAlign: "center" }}>Đợi xác nhận</Tag>}
                </span>
            ),
        },
        //cot thanh toan
        {
    title: "Thanh toán",
    key: "payment",
    render: (_, record) => (
        record.status === "pending" ? (
            <Button
                type="primary"
                onClick={() => handlePayBooking(record)}
            >
                Thanh toán
            </Button>
        ) : null
    ),
},

        {
            title: 'In vé đặt sân',
            dataIndex: 'order',
            key: 'order',
            render: (text, record) => (
                record.status === 'final' ? (
                    <Button
                        type="primary"
                        onClick={() => handlePrintInvoice(record)}
                    >
                        Xuất vé
                    </Button>
                ) : null
            ),
        },
        // {
        //     title: 'Hủy sân bóng',
        //     dataIndex: 'order',
        //     key: 'order',
        //     render: (text, record) => (
        //         <Button
        //             type="danger"
        //             onClick={() => handleCancelOrder(record)}
        //             disabled={record.status !== 'pending'}
        //         >
        //             Hủy sân bóng
        //         </Button>
        //     ),
        // },
    ];

    const handleList = () => {
        (async () => {
            try {
                const local = localStorage.getItem("user");
                const user = JSON.parse(local);
                await bookingApi.getBookingHistory(user.id).then((item) => {
                    console.log(item);
                    setOrderList(item);
                });
                setLoading(false);
            } catch (error) {
                console.log("Failed to fetch event detail:" + error);
            }
        })();
    }

    useEffect(() => {
        handleList();
        window.scrollTo(0, 0);
    }, []);

    // Thêm vào component của bạn
    const handleProductClick = (id) => {
        history.push("/product-detail/" + id);
    };

    return (
        <div>
            <Spin spinning={false}>
                <Card className="container_details">
                    <div className="product_detail">
                        <div style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
                            <Breadcrumb>
                                <Breadcrumb.Item href="http://localhost:3500/home">
                                    <span>Trang chủ</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="">
                                    <span>Quản lý đơn đặt sân </span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <hr></hr>
                        <div className="container" style={{ marginBottom: 30 }}>

                            <br></br>
                            <Card>
                                <Table
                                    columns={columns}
                                    dataSource={orderList}
                                    rowKey="_id"
                                    pagination={{ position: ["bottomCenter"] }}
                                />
                            </Card>
                        </div>
                    </div>
                </Card>
            </Spin>
        </div>
    );
};

export default CartHistory;
