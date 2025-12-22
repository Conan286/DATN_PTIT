import React from 'react';
import { Result, Button, Card, Typography, Divider } from 'antd';
import { CheckCircleFilled, HistoryOutlined, HomeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Title, Text } = Typography;

const PaymentOrderSuccess = () => {
    const history = useHistory();

    return (
        <div style={{ 
            padding: '50px 20px', 
            background: '#f0f2f5', 
            minHeight: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Card style={{ maxWidth: 600, width: '100%', borderRadius: 15, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Result
                    status="success"
                    icon={<CheckCircleFilled style={{ color: '#52c41a' }} />}
                    title={<Title level={2}>Thanh Toán Thành Công!</Title>}
                    subTitle="Giao dịch của bạn đã được xử lý hoàn tất. Cảm ơn bạn đã tin dùng dịch vụ của chúng tôi."
                    extra={[
                        <Button 
                            type="primary" 
                            key="history" 
                            size="large"
                            icon={<HistoryOutlined />}
                            onClick={() => history.push('/order-history')}
                            style={{ borderRadius: 8, height: 'auto', padding: '10px 20px' }}
                        >
                            Lịch sử đặt dịch vụ
                        </Button>,
                        <Button 
                            key="home" 
                            size="large"
                            icon={<HomeOutlined />}
                            onClick={() => history.push('/')}
                            style={{ borderRadius: 8, height: 'auto', padding: '10px 20px' }}
                        >
                            Về trang chủ
                        </Button>,
                    ]}
                >
                    <div className="content">
                        <Divider orientation="left">Thông tin thêm</Divider>
                        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                            <li style={{ marginBottom: 10 }}>
                                <Text strong>Trạng thái:</Text> <Text type="success">Đã hoàn thành</Text>
                            </li>
                            <li style={{ marginBottom: 10 }}>
                                <Text strong>Phương thức:</Text> <Text>Ví điện tử VNPAY</Text>
                            </li>
                            <li>
                                <Text type="secondary">
                                    Mọi thắc mắc vui lòng liên hệ hotline: 1900 6868
                                </Text>
                            </li>
                        </ul>
                    </div>
                </Result>
            </Card>
        </div>
    );
};

export default PaymentOrderSuccess;