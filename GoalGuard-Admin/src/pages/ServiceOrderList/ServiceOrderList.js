import {
  EditOutlined,
  HomeOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  Tag,
  notification,
  Form
} from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import serviceOrderApi from "../../apis/serviceOrderApi";

const { Option } = Select;

const ServiceOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form] = Form.useForm();

const fetchOrders = async () => {
  setLoading(true); // Bật loading khi bắt đầu gọi
  try {
    const local = localStorage.getItem("user");
    const user = JSON.parse(local);

    const res = await serviceOrderApi.getOrdersByOwner(user.id);

    console.log("RAW API RESPONSE:", res);

    // Kiểm tra nếu res chính là mảng (do axios interceptor) 
    // hoặc res.data là mảng (do axios mặc định)
    const dataArray = Array.isArray(res) ? res : (res?.data || []);
    
    setOrders(dataArray);
  } catch (err) {
    console.error("Fetch error:", err);
    notification.error({ message: "Không thể tải danh sách đơn hàng" });
  } finally {
    setLoading(false); // QUAN TRỌNG: Tắt loading bất kể thành công hay thất bại
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleEdit = async (record) => {
    setCurrentId(record.id);
    form.setFieldsValue({ status: record.status });
    setOpenModalUpdate(true);
  };

  const handleUpdateStatus = async (values) => {
    try {
      await serviceOrderApi.updateStatus(currentId, values.status);
      notification.success({
        message: "Cập nhật thành công",
      });
      setOpenModalUpdate(false);
      fetchOrders();
    } catch (err) {
      notification.error({
        message: "Cập nhật thất bại",
      });
    }
  };

  const columns = [
    {
      title: "ID",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên người đặt",
      dataIndex: "user_name",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
    },
    {
      title: "Dịch vụ",
      dataIndex: "product_name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      render: (v) =>
        v?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: "Thanh toán",
      dataIndex: "payment_method",
    },
    {
      title: "Ngày đặt",
      dataIndex: "created_at",
      render: (v) => moment(v).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (s) =>
        s === "final" ? (
          <Tag color="green">Đã thanh toán</Tag>
        ) : s === "rejected" ? (
          <Tag color="red">Đã hủy</Tag>
        ) : (
          <Tag color="blue">Đang chờ</Tag>
        ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          Cập nhật
        </Button>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <ShoppingCartOutlined />
          <span>Quản lý dịch vụ</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={orders}
        pagination={{ position: ["bottomCenter"] }}
      />

      <Modal
        title="Cập nhật trạng thái"
        open={openModalUpdate}
        onOk={() => {
          form.validateFields().then(handleUpdateStatus);
        }}
        onCancel={() => setOpenModalUpdate(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="pending">Đang chờ</Option>
              <Option value="final">Đã thanh toán</Option>
              <Option value="rejected">Đã hủy</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  );
};

export default ServiceOrderList;
