import {
    Breadcrumb,
    Card,
    Spin,
    Table,
    Tag,
    notification
} from "antd";
import { Button } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import orderApi from "../../apis/orderApi";
import "./OrderHistory.css";
import servicePaymentApi from "../../apis/servicePaymentApi";
import axiosClient from "../../apis/axiosClient";
import html2pdf from 'html2pdf.js';

const OrderHistory = () => {
    
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);
    const handlePayment = async (order) => {
    console.log("orderId =", order.id);
    console.log("amount =", order.total_price);

    try {
        const res = await axiosClient.post(
            "/service-payment/create-payment",
            {
                orderId: order.id,
                amount: order.total_price
            }
        );

        window.location.href = res.paymentUrl;

    } catch (err) {
        console.error("PAY ERROR", err);
    }
};



    const columns = [
        {
            title: "Mã đơn",
            dataIndex: "id",
            key: "id",
        },
        {
    title: "Sân",
    dataIndex: "court_name",
    key: "court_name",
    render: (v) => v || "—",
},
        {
            title: "Dịch vụ",
            dataIndex: "product_name",
            key: "product_name",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Tổng tiền",
            dataIndex: "total_price",
            key: "total_price",
            render: (v) =>
                Number(v)?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }),
        },
         {
            title: "Ngày đặt",
            dataIndex: "created_at",
            key: "created_at",
            render: (v) => moment(v).format("DD/MM/YYYY HH:mm"),
        },
       {
        title: "Trạng Thái",
        dataIndex: "status", // Đổi từ payment_method sang status
        key: "status",
        render: (status) => {
            let color = "orange";
            let text = "Đang chờ";

            // Logic phân loại màu sắc dựa trên giá trị status trong DB
            if (status === "final") {
                color = "green";
                text = "Đã thanh toán";
            } else if (status === "rejected") {
                color = "red";
                text = "Đã hủy";
            } else if (status === "pending") {
                color = "blue";
                text = "Chờ xác nhận";
            }

            return <Tag color={color}>{text.toUpperCase()}</Tag>;
        },
    },
    //cot thanh toan
        {
    title: "Thanh toán",
    key: "payment",
    render: (_, record) => (
        record.status === "pending" ? (
            <Button
                type="primary"
                onClick={() => handlePayment(record)}
            >
                Thanh toán
            </Button>
        ) : null
    ),
},

//in ve
 {
            title: 'In vé đặt sân',
            dataIndex: 'order',
            key: 'order',
            render: (text, record) => (
                record.status === 'final' ? (
                    <Button
                        type="primary"
                        onClick={() => handlePrintInvoiceService(record)}
                    >
                        Xuất vé
                    </Button>
                ) : null
            ),
        },       
    ];

    const handlePrintInvoiceService = (order) => {
    const orderDate = moment(order.created_at).format('DD/MM/YYYY HH:mm');
    const printDate = moment().format('DD/MM/YYYY HH:mm');

    const totalAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(order.total_price);

    // Nội dung QR
    const qrData = `
        Ma don: SERVICE-${order.id}
        Dich vu: ${order.product_name}
        So luong: ${order.quantity}
        Tong tien: ${order.total_price}
    `;

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

    const htmlContent = `
    <html>
        <head>
            <title>Vé dịch vụ</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #f3f4f6;
                    padding: 20px;
                }
                .invoice-card {
                    width: 450px;
                    margin: auto;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    border: 1px solid #e5e7eb;
                }
                .ticket-edge {
                    border-top: 2px dashed #e5e7eb;
                    margin: 24px 0;
                }
            </style>
        </head>

        <body>
            <div class="invoice-card">
                <div class="bg-blue-600 p-6 text-white text-center">
                    <div class="text-2xl font-bold">Hệ thống đặt sân</div>
                    <p class="text-sm mt-1 uppercase tracking-widest">Vé Dịch Vụ</p>
                    <p class="text-xs mt-1">Mã đơn: #PTIT_SERVICE-${order.id}</p>
                </div>

                <div class="p-6">
                    <div class="mb-4">
                        <p class="text-gray-400 text-xs uppercase">Dịch vụ</p>
                        <p class="text-lg font-bold text-gray-800">${order.product_name}</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border">
                        <div>
                            <p class="text-gray-400 text-xs uppercase">Số lượng</p>
                            <p class="font-semibold text-gray-700">${order.quantity}</p>
                        </div>
                        <div>
                            <p class="text-gray-400 text-xs uppercase">Sân</p>
                            <p class="font-semibold text-gray-700">${order.court_name || '—'}</p>
                        </div>
                    </div>

                    <div class="ticket-edge"></div>

                    <div class="flex flex-col items-center">
                        <img src="${qrCodeUrl}" alt="QR Code" width="120" />
                        <p class="text-xs text-gray-400 mt-2">Quét mã để xác minh đơn dịch vụ</p>
                    </div>

                    <div class="mt-6 pt-4 border-t">
                        <div class="flex justify-between text-lg font-bold">
                            <span>Tổng tiền:</span>
                            <span class="text-blue-600">${totalAmount}</span>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 text-center p-3 text-xs text-gray-400">
                    <p>Thời gian đặt: ${orderDate}</p>
                    <p>In lúc: ${printDate}</p>
                </div>
            </div>
        </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
};


    const handleList = async () => {
        try {
            setLoading(true);
        const user = JSON.parse(localStorage.getItem("user")); // lấy user đã login
        const userId = user?.id;
        if (!userId) return console.log("Chưa có userId");

        const res = await orderApi.getMyOrders(userId);
           
            setOrderList(res|| []);
        } catch (error) {
            console.log("Failed to fetch order history:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleList();
        window.scrollTo(0, 0);
    }, []);

    return (
        <Spin spinning={loading}>
            <Card className="container_details">
                <div style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/home">
                            Trang chủ
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Lịch sử đặt dịch vụ
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <hr />

                <Card>
                    <Table
                        columns={columns}
                        dataSource={orderList}
                        rowKey="id"
                        pagination={{ position: ["bottomCenter"] }}
                    />
                </Card>
            </Card>
        </Spin>
    );
};

export default OrderHistory;
