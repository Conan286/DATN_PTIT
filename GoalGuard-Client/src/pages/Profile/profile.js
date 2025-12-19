import {
    FormOutlined,
    HomeOutlined
} from '@ant-design/icons';
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    Row,
    Spin,
    notification
} from 'antd';
import React, { useEffect, useState } from 'react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { Select } from "antd";

import uploadFileApi from '../../apis/uploadFileApi';
import userApi from "../../apis/userApi";

import "./profile.css";

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [isVisibleModal, setVisibleModal] = useState(false);
    const [file, setUploadFile] = useState(null);

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: '03b81b9c18944e6495d890b189357388',
        lat: '16.060094749570567',
        lon: '108.2097695823264',
        lang: 'en',
        unit: 'metric',
    });

    const loadProfile = async () => {
        try {
            const response = await userApi.getProfile();
            setUserData(response.user);
        } catch (error) {
            console.log("Failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
        window.scrollTo(0, 0);
    }, []);

    const handleFormSubmit = async (values) => {
        try {
            const payload = {
                ...values,
                image: file
            };

            const res = await userApi.updateProfile(payload, userData.id);

            if (!res) {
                notification.error({
                    message: "Thông báo",
                    description: "Cập nhật tài khoản thất bại",
                });
            } else {
                notification.success({
                    message: "Thông báo",
                    description: "Cập nhật tài khoản thành công",
                });

                setVisibleModal(false);
                setUploadFile(null);
                loadProfile();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChangeImage = async (e) => {
        setLoading(true);
        const uploaded = await uploadFileApi.uploadFile(e);
        if (uploaded) setUploadFile(uploaded);
        setLoading(false);
    };


    return (
        <div className="profile-container">

            <Spin spinning={loading}>

                {/* Breadcrumb */}
                <div className="profile-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <FormOutlined />
                            <span>Trang cá nhân</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Row justify="center" gutter={40} style={{ marginTop: 30 }}>

                    {/* Profile Card */}
                    <Col span={10}>
                        <Card
                            className="profile-card-ui"
                            hoverable
                        >
                            <div className="profile-header">
                                <img
                                    src={userData?.image}
                                    className="profile-avatar"
                                    alt="avatar"
                                />
                                <h2 className="profile-name">Hello {userData?.username}</h2>
                                <p className="profile-email">Email: {userData?.email}</p>
                                 <p className="profile-phone">SĐT: {userData?.phone}</p>
                                <p className="profile-age">Tuổi: {userData?.age}</p>
                                <p className="profile-gender">
                                    Giới tính: {
                                        userData?.gender === "male" ? "Nam" :
                                        userData?.gender === "female" ? "Nữ" :
                                        "Chưa có thông tin"
                                    }
                                    </p>


                                <Divider />

                                <Button
                                    className="btn-update"
                                    onClick={() => setVisibleModal(true)}
                                >
                                    Cập nhật hồ sơ
                                </Button>
                            </div>
                        </Card>
                    </Col>

                    {/* Weather Card */}
                    

                    {/* Weather + Chat Column */}
<Col span={8}>


    {/* CHAT ASSISTANT */}
    <Card
        className="chat-box-card"
        title="Trợ lý đặt sân (Chatbot)"
        bordered={false}
    >
        <div className="chat-box-messages" id="chatBox">
            {/* Tin nhắn mẫu */}
            <div className="chat-msg bot">
                Xin chào! Bạn muốn đặt sân nào hôm nay? 😊
            </div>
        </div>

        <div className="chat-box-input">
            <input
                id="chatInput"
                type="text"
                placeholder="Nhập câu hỏi..."
                className="chat-input-field"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        const text = e.target.value.trim();
                        if (!text) return;

                        const box = document.getElementById("chatBox");

                        // User bubble
                        const div = document.createElement("div");
                        div.className = "chat-msg user";
                        div.innerText = text;
                        box.appendChild(div);

                        e.target.value = "";

                        box.scrollTop = box.scrollHeight;

                        // Bot trả lời mẫu
                        setTimeout(() => {
                            const bot = document.createElement("div");
                            bot.className = "chat-msg bot";
                            bot.innerText = "Chatbot đang xử lý yêu cầu...";
                            box.appendChild(bot);
                            box.scrollTop = box.scrollHeight;
                        }, 500);
                    }
                }}
            />
        </div>
    </Card>

</Col>


                </Row>

                {/* Modal Update Profile */}
                <Modal
                    title="Cập nhật hồ sơ"
                    open={isVisibleModal}
                    onCancel={() => setVisibleModal(false)}
                    className="profile-modal"
                    footer={null}
                >
                    <Form
                        initialValues={{
                            username: userData?.username,
                            email: userData?.email,
                            phone: userData?.phone,
                            age: userData?.age,
                            gender: userData?.gender
                        }}
                        onFinish={handleFormSubmit}
                    >
                        <Spin spinning={loading}>
                            <Form.Item
                                label="Tên"
                                name="username"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true },
                                    { type: "email", message: "Email không hợp lệ!" },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                    { required: true },
                                    { pattern: /^[0-9]{10}$/ },
                                ]}
                            >
                                <Input />
                            </Form.Item>

<Form.Item
    label="Tuổi"
    name="age"
    rules={[
        { required: true, message: "Vui lòng nhập tuổi" },
        {
            pattern: /^[1-9][0-9]?$/,
            message: "Tuổi phải là số dương (1 - 99)",
        },
    ]}
>
    <Input type="number" min={1} max={99} />
</Form.Item>


<Form.Item
    label="Giới tính"
    name="gender"
    rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
>
    <Select placeholder="Chọn giới tính">
        <Select.Option value="male">Nam</Select.Option>
        <Select.Option value="female">Nữ</Select.Option>
        <Select.Option value="other">Khác</Select.Option>
    </Select>
</Form.Item>



                            <Form.Item label="Ảnh đại diện" name="image">
                                <input type="file" accept="image/*" onChange={handleChangeImage} />
                            </Form.Item>

                            <Button className="btn-save" htmlType="submit">
                                Lưu thay đổi
                            </Button>
                        </Spin>
                    </Form>
                </Modal>

            </Spin>

        </div>
    );
};

export default Profile;
