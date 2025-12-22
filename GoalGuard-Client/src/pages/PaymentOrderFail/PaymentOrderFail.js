import React from "react";
import { Result, Button, Card, Typography, Space, Divider } from "antd";
import { 
    CloseCircleFilled, 
    HistoryOutlined, 
    HomeOutlined, 
    ReloadOutlined,
    CustomerServiceOutlined 
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Text, Paragraph } = Typography;

const PaymentOrderFail = () => {
    const history = useHistory();

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            padding: "20px"
        }}>
            <Card 
                style={{ 
                    maxWidth: 550, 
                    width: "100%", 
                    borderRadius: 16,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    border: "none"
                }}
            >
                <Result
                    status="error"
                    title={<span style={{ fontWeight: 700, fontSize: '24px' }}>Thanh toán thất bại</span>}
                    subTitle={
                        <div style={{ marginBottom: '10px' }}>
                            <Paragraph>
                                Rất tiếc, giao dịch qua <Text strong color="red">VNPay</Text> của bạn đã không thành công.
                            </Paragraph>
                            {/* <Text type="secondary">
                                Mã lỗi: <Text code>VNP-01</Text> (Người dùng hủy giao dịch hoặc lỗi hệ thống)
                            </Text> */}
                        </div>
                    }
                    extra={[
                        <Space direction="vertical" size="middle" style={{ width: '100%' }} key="actions">
                            <Button
                                type="primary"
                                danger
                                size="large"
                                block
                                icon={<ReloadOutlined />}
                                onClick={() => history.push("/order-history")} // Giả sử quay lại trang thanh toán
                                style={{ borderRadius: 8, height: 45 }}
                            >
                                Thử thanh toán lại
                            </Button>
                            
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Button
                                    icon={<HistoryOutlined />}
                                    onClick={() => history.push("/order-history")}
                                    style={{ flex: 1, borderRadius: 8 }}
                                >
                                    Lịch sử đơn hàng
                                </Button>
                                <Button
                                    icon={<HomeOutlined />}
                                    onClick={() => history.push("/")}
                                    style={{ flex: 1, borderRadius: 8 }}
                                >
                                    Trang chủ
                                </Button>
                            </div>
                        </Space>
                    ]}
                >
                    <Divider plain style={{ margin: '15px 0' }}>Bạn cần hỗ trợ?</Divider>
                    
                    <div style={{ textAlign: 'center' }}>
                        <Space size="large">
                            <Text type="secondary" style={{ fontSize: '14px' }}>
                                <CustomerServiceOutlined /> Hotline: <b>1900 6868</b>
                            </Text>
                           
                        </Space>
                    </div>
                </Result>
            </Card>
        </div>
    );
};

export default PaymentOrderFail;