import {
    Breadcrumb,
    Card,
    Spin,
    Table,
    Tag
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import orderApi from "../../apis/orderApi";
import "./OrderHistory.css";

const OrderHistory = () => {
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);

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
            title: "Thanh toán",
            dataIndex: "payment_method",
            key: "payment_method",
            render: (v) => <Tag color="blue">{v}</Tag>,
        },
        {
            title: "Ngày đặt",
            dataIndex: "created_at",
            key: "created_at",
            render: (v) => moment(v).format("DD/MM/YYYY HH:mm"),
        },
    ];

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
