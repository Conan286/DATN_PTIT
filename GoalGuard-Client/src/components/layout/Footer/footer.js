import React from 'react';
import { Layout } from 'antd';
import { Col, Row, Divider } from "antd";
import { SocialIcon } from 'react-social-icons';
import "./footer.css";

const { Footer } = Layout;

function _Footer() {
    return (

        <Footer style={{ backgroundColor: "#1e0a3c", padding: 30, paddingTop: 80 }}>
            <Row className="footer-desktop">
                <Col span={3} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Tổng đài hỗ trợ</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Liên hệ mua hàng </p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Liên hệ khiếu nại </p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Liên hệ bảo hành </p>
                </Col>
                <Col span={4} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Thông tin và chính sách</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Mua hàng và thanh toán Online</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Mua hàng trả góp Online</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Tra thông tin bảo hành</p>
                </Col>
                <Col span={4} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Dịch vụ và thông tin khác</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Ưu đãi thanh toán</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Quy chế hoạt động</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Chính sách Bảo hành</p>
                   
                </Col>
                <Col span={5} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Địa chỉ</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Trụ sở : 10 Nguyễn Trãi, Hà Đông, Hà Nội</p>

                </Col>
                <Col span={3}>
                    <strong style={{ color: "#FFFFFF", fontSize: 20, marginBottom: 40, cursor: "pointer" }}>Kết nối với chúng tôi</strong>
                    <Row style={{ marginTop: 15 }}>
                        <Col span={6}>
                            <SocialIcon url="https://www.youtube.com/" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                        <Col span={6}>
                            <SocialIcon url="https://www.facebook.com/" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                        <Col span={6}>
                            <SocialIcon url="https://www.instagram.com/" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                      
                    </Row>

                </Col>
            </Row>
            <div style={{ textAlign: 'center' }}>
                <Divider style={{ padding: 0 }} />
                <p style={{ color: "#FFFFFF", fontSize: 13 }}>Copyright@ 2025 PTIT</p>
                <p style={{ color: "#FFFFFF", fontSize: 13 }}>Điện thoại: (024) 33528122</p>
            </div>
        </Footer>
    );
}

export default _Footer;