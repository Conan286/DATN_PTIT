import { DeleteOutlined, HomeOutlined, ShoppingOutlined, ArrowUpOutlined, ArrowDownOutlined, SearchOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { BackTop, Breadcrumb, Button, Col, Input, Row, Space, Spin, Table, Popconfirm, notification } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import reviewManagementApi from "../../../apis/reviewManagementApi";

const ReviewManagement = () => {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await reviewManagementApi.getAllReviews();
            setReviews(res);
            setFilteredReviews(res);
        } catch (error) {
            console.error(error);
            notification.error({ message: "Lỗi", description: "Lấy danh sách đánh giá thất bại!" });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReview = async (id) => {
        setLoading(true);
        try {
            await reviewManagementApi.deleteReview(id);
            notification.success({ message: "Xóa thành công" });
            fetchReviews();
        } catch (error) {
            console.error(error);
            notification.error({ message: "Xóa thất bại" });
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);

        const filtered = reviews.filter(item =>
            (item.id_reviews && item.id_reviews.toString().includes(value)) ||
            (item.user_name && item.user_name.toLowerCase().includes(value)) ||
            (item.id_courts && item.id_courts.toString().includes(value)) ||
            (item.review_text && item.review_text.toLowerCase().includes(value))
        );

        setFilteredReviews(filtered);
    };

    const sortByDate = (asc = true) => {
        const sorted = [...filteredReviews].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return asc ? dateA - dateB : dateB - dateA;
        });
        setFilteredReviews(sorted);
    };

    const columns = [
        { title: 'ID', dataIndex: 'id_reviews', key: 'id_reviews' },
        { title: 'Người đánh giá', dataIndex: 'user_name', key: 'user_name' },
        { title: 'Sân', dataIndex: 'court_name', key: 'court_name', render: (text, record) => record.court_name || `Court ${record.id_courts}` },
        { title: 'Điểm đánh giá', dataIndex: 'rating', key: 'rating' },
        { title: 'Nội dung', dataIndex: 'review_text', key: 'review_text' },
        { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at', render: text => moment(text).format('YYYY-MM-DD HH:mm') },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => handleDeleteReview(record.id_reviews)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger icon={<DeleteOutlined />}>Xóa</Button>
                </Popconfirm>
            ),
        },
    ];

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div>
            <Spin spinning={loading}>
                <div className='container'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href=""><HomeOutlined /></Breadcrumb.Item>
                            <Breadcrumb.Item href=""><ShoppingOutlined /><span>Quản lý đánh giá</span></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    {/* Thanh tìm kiếm + sắp xếp */}
                    <div style={{ marginTop: 20, marginBottom: 20 }}>
                        <PageHeader subTitle="">
                            <Row align="middle" gutter={16}>
                                <Col xs={24} sm={12} md={12}>
                                    <Input
                                        placeholder="Tìm kiếm theo ID, người đánh giá, sân, nội dung"
                                        allowClear
                                        value={searchText}
                                        onChange={handleFilter}
                                        prefix={<SearchOutlined />}
                                    />
                                </Col>
                                <Col xs={24} sm={12} md={12}>
                                    <Space>
                                        <Button icon={<ArrowUpOutlined />} onClick={() => sortByDate(true)}>Cũ nhất</Button>
                                        <Button icon={<ArrowDownOutlined />} onClick={() => sortByDate(false)}>Mới nhất</Button>
                                    </Space>
                                </Col>
                            </Row>
                        </PageHeader>
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <Table
                            scroll={{ x: true }}
                            columns={columns}
                            pagination={{ position: ['bottomCenter'] }}
                            dataSource={filteredReviews}
                            rowKey="id_reviews"
                        />
                    </div>
                </div>
                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div>
    );
};

export default ReviewManagement;
