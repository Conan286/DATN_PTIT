import {
    Breadcrumb, Button, Card, Carousel, Col, Form,
    Modal, Row,
    Spin,
    notification, TimePicker, DatePicker, Select, Calendar
} from "antd";
import { Rate, Input } from "antd";
import reviewApi from "../../../apis/reviewApi";
import Paragraph from "antd/lib/typography/Paragraph";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import courtsManagementApi from "../../../apis/courtsManagementApi";
import triangleTopRight from "../../../assets/icon/Triangle-Top-Right.svg";
import { numberWithCommas } from "../../../utils/common";
import bookingApi from "../../../apis/bookingApi";
import productAPI from "../../../apis/productApi";
import productTypeAPI from "../../../apis/productTypeApi";
import orderAPI from "../../../apis/orderApi";

import dayjs from 'dayjs';
import moment from "moment";
import userApi from "../../../apis/userApi";
const { Option } = Select;
const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState([]);
    const [recommend, setRecommend] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    let { id } = useParams();
    const history = useHistory();
    const handleReadMore = (id) => {
        console.log(id);
        history.push("/product-detail/" + id);
        window.location.reload();
    };
    const [reviews, setProductReview] = useState([]);
    const [reviewsCount, setProductReviewCount] = useState([]);
    const [avgRating, setAvgRating] = useState(null);
    const [bookingCourt, setBookingCourt] = useState([]);
    const [userData, setUserData] = useState([]);
    const [qr, setQR] = useState();
    // ===================== REVIEW STATE =====================
const [reviewList, setReviewList] = useState([]);
const [newRating, setNewRating] = useState(0);
const [newComment, setNewComment] = useState("");





//dich vu
const [serviceList, setServiceList] = useState([]);
const [openServiceModal, setOpenServiceModal] = useState(false);
const [serviceQuantity, setServiceQuantity] = useState(1);
const [selectedService, setSelectedService] = useState(null);




useEffect(() => {
  if (!id) return; // đảm bảo id đã có
//   const loadReviews = async () => {
//     try {
//       const res = await reviewApi.getReviewsByCourt(Number(id));
//       console.log("API response:", res);
//       setReviewList(res.data); // res.data là mảng review
//     } catch (err) {
//       console.log("Load review error:", err);
//     }
    
//   };
  const loadReviews = async () => {
  try {
    const res = await reviewApi.getReviewsByCourt(Number(id));
    console.log("API response:", res); // thấy Array(2)

    // In từng bình luận chi tiết
    res.forEach((rv, index) => {
      console.log(`Review ${index + 1}:`, rv);
      console.log("Tên người đánh giá:", rv.user_name);
      console.log("Nội dung:", rv.review_text);
      console.log("Rating:", rv.rating);
      console.log("Ngày:", rv.created_at);
    });

    setReviewList(res || []); // lưu luôn mảng để render
  } catch (err) {
    console.log("Load review error:", err);
  }
};


  loadReviews();
  
}, [id]); // chạy khi id thay đổi


// Gửi review
const handleSubmitReview = async () => {
    if (!userData?.id) {
        return notification.error({
            message: "Thông báo",
            description: "Vui lòng đăng nhập để đánh giá!",
        });
    }

    if (newRating === 0) {
        return notification.error({
            message: "Thông báo",
            description: "Vui lòng chọn số sao!",
        });
    }

    try {
        const body = {
            rating: newRating,
            review_text: newComment,
            id_customer: userData.id,
            id_courts: Number(id)
        };


        
        const res = await reviewApi.addReview(body);

        notification.success({
            message: "Đã gửi đánh giá",
            description: "Cảm ơn bạn đã chia sẻ!"
        });

        setNewRating(0);
        setNewComment("");
        
    } catch (err) {
        console.log(err);
        notification.error({
            message: "Lỗi",
            description: "Không thể gửi đánh giá!"
        });
    }
};


const handleOrderService = async (service) => {
    const user = localStorage.getItem("user");
    if (!user) {
        notification.error({
            message: "Thông báo",
            description: "Vui lòng đăng nhập để đặt dịch vụ!",
        });
        return history.push("/login");
    }

    try {
        const totalPrice = service.price * serviceQuantity;
        const user = JSON.parse(localStorage.getItem("user"));
        const courtId = Number(id);
        await orderAPI.placeOrder({
            userId: user.id, 
            courtId: Number(courtId),
            productId: service.id,
            quantity: serviceQuantity,
            totalPrice,
            paymentMethod: "Thanh toán trực tiếp",
        });

        notification.success({
            message: "Thành công",
            description: "Đặt dịch vụ thành công!",
        });

        setOpenServiceModal(false);
        setSelectedService(null);
        setServiceQuantity(1);
    } catch (err) {
        console.log(err);
        notification.error({
            message: "Lỗi",
            description: "Không thể đặt dịch vụ!",
        });
    }
};



    const handleCategoryList = async () => {
        try {
            await bookingApi.getBookingByCourt(id).then(item => {
                console.log(item);
                setBookingCourt(item);
            })

            await courtsManagementApi.getCourtById(id).then((item) => {
                setProductDetail(item);
                setProductReview(item.reviews);
                setProductReviewCount(item.reviewStats);
                setAvgRating(item.avgRating);
                console.log(((reviewsCount[4] || 0) / reviews.length) * 100);
            });
            await courtsManagementApi.getAllCourts().then((item) => {
                setRecommend(item);
            });
            setLoading(false);

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        };
    }

    useEffect(() => {
        (async () => {
            try {

                await bookingApi.getBookingByCourt(id).then(async item => {
                    console.log(item);
                    setBookingCourt(item);


                });

                // Lấy thông tin user và role từ localStorage
                const user = localStorage.getItem('user');
                const parsedUser = user ? JSON.parse(user) : null;
                setUserData(parsedUser);

                await courtsManagementApi.getCourtById(id).then(async item => {
                    const res = await userApi.getProfileByID(item.id_users); // Sử dụng await ở đây
                    console.log(res);
                    setQR(res?.image_qr);
                    setProductDetail(item);
                    setProductReview(item.reviews);
                    setProductReviewCount(item.reviewStats);
                    setAvgRating(item.avgRating);
                    const safePercentage = reviews.length > 0 ? ((reviewsCount[4] || 0) / reviews.length) * 100 : 0;
                    console.log(safePercentage);

                    //dich vu
                     
                    // 👇 LẤY DỊCH VỤ CỦA CHỦ SÂN
                    const services = await productAPI.getProductByUserId(item.id_users);
                    setServiceList(services || []);

                });
                await courtsManagementApi.getAllCourts().then((item) => {
                    setRecommend(item);
                    
                });

                setLoading(false);
            } catch (error) {
                console.log("Failed to fetch event detail:" + error);
            }
        })();
        window.scrollTo(0, 0);
    }, []);

    const handleCancel = (type) => {
        if (type === "create") {
            setOpenModalCreate(false);
        } else {
        }
        console.log('Clicked cancel button');
    };


    const handleOkUser = async (values) => {
        const user = localStorage.getItem('user');
        if (!user) {
            return history.push("/login")
        }
        setLoading(true);
        try {
            const bookingDateTime = dayjs(values.booking_date);

// Ghép ngày + giờ
const startTime = bookingDateTime
    .hour(dayjs(values.start_time).hour())
    .minute(dayjs(values.start_time).minute());

const endTime = bookingDateTime
    .hour(dayjs(values.end_time).hour())
    .minute(dayjs(values.end_time).minute());

const basePrice = productDetail.price;
const peakMultiplier = 1.25;

// Mốc giờ cao điểm: 16:00
const peakStart = startTime.clone().hour(16).minute(0);

const totalMinutes = endTime.diff(startTime, 'minute');

let normalMinutes = 0;
let peakMinutes = 0;

if (endTime.valueOf() <= peakStart.valueOf()) {
    // Toàn bộ trước 16h
    normalMinutes = totalMinutes;
} 
else if (startTime.valueOf() >= peakStart.valueOf()) {
    // Toàn bộ sau 16h
    peakMinutes = totalMinutes;
} 
else {
    // Cắt tại 16h (ví dụ 15h–17h)
    normalMinutes = peakStart.diff(startTime, 'minute');
    peakMinutes = endTime.diff(peakStart, 'minute');
}

const normalAmount = (normalMinutes / 60) * basePrice;
const peakAmount = (peakMinutes / 60) * basePrice * peakMultiplier;

const totalAmount = normalAmount + peakAmount;

            const categoryList = {
                "booking_date": bookingDateTime.format('YYYY-MM-DD'), // Lấy ngày tháng năm
                "payment_method": values.payment_method,
                "start_time": startTime.format('HH:mm'), // Lấy giờ và phút
                "end_time": endTime.format('HH:mm'),
                "user_id": userData.id,
                "court_id": Number(id),
                "total_amount": totalAmount
            };
            setLoading(false);

            return bookingApi.bookCourt(categoryList).then(response => {
                if (response.message === "Booking time conflicts with existing booking") {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Đặt sân không được trùng',
                    });
                    return;
                }
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Đặt sân thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Đặt sân thành công',
                    });
                    setOpenModalCreate(false);

                    handleCategoryList();
                }

            })

        } catch (error) {
            throw error;
        }
    }

    const [openModalCreate, setOpenModalCreate] = useState(false);

    const showModal = () => {
        setOpenModalCreate(true);
    };

    const isButtonDisabled = productDetail.status !== 'active' ? true : false;
    const buttonText = isButtonDisabled ? 'Sân đang đóng' : 'Đặt sân nhanh';

    function disabledDate(current) {
        // Vô hiệu hóa tất cả các ngày quá khứ
        return current && current < moment().startOf('day');
    }

    return (
        <div>
            <Spin spinning={false}>
                <Card className="container_details">
                    <div className="product_detail">
                        <div style={{ marginLeft: 5, marginBottom: 10 }}>
                            <Breadcrumb>
                                <Breadcrumb.Item href="http://localhost:3500/home">
                                    {/* <HomeOutlined /> */}
                                    <span>Trang chủ</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="http://localhost:3500/product-list/643cd88879b4192efedda4e6">
                                    {/* <AuditOutlined /> */}
                                    <span>sân thể thao</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="">
                                    <span>{productDetail.name}</span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <hr></hr>
                        <Row gutter={12} style={{ marginTop: 20, marginBottom: 20 }}>
                            <Col span={13}>
                                {productDetail?.slide?.length > 0 ? (
                                    <Carousel autoplay className="carousel-image">
                                        {productDetail.slide.map((item) => (
                                            <div className="img" key={item}>
                                                <img
                                                    style={{ width: '100%', objectFit: 'contain', height: '500px' }}
                                                    src={item}
                                                    alt=""
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                ) : (
                                    <Card className="card_image" bordered={false}>
                                        <img src={productDetail.image} />
                                        <div className="promotion"></div>
                                    </Card>
                                )}
                            </Col>
                            <Col span={11}>
                                <div className="price" style={{ paddingBottom: 10 }}>
                                    <h1 className="product_name">{productDetail.name}</h1>
                                </div>
                                <Card
                                    className="card_total"
                                    bordered={false}
                                    style={{ width: "90%" }}
                                >
                                    
                                    <div className="price_product" >
                                        {Number(productDetail?.price)?.toLocaleString("vi", {
                                            style: "currency",
                                            currency: "VND",
                                        })}đ/giờ
                                    </div>
                                         <hr />
                        <div className="describe">
                            <div className="title_total" style={{ fontSize: 20, marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>
                                Giới thiệu: "{productDetail.name}"
                            </div>
                            <div
                                className="describe_detail_description"
                                dangerouslySetInnerHTML={{ __html: productDetail.description }}
                            ></div>
                           
                        </div>
                        <div className="describe">
                        {/*  ĐÁNH GIÁ SÂN */}
                        <div
                            className="court-rating"
                            style={{
                                marginTop: 16,
                                paddingTop: 12,
                                borderTop: "1px solid #eee",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            {productDetail.review_count > 0 ? (
                                <>
                                    <Rate
                                        allowHalf
                                        disabled
                                        value={productDetail.avg_rating}
                                        style={{ fontSize: 18 }}
                                    />
                                    <span style={{ fontSize: 14, color: "#555" }}>
                                        {productDetail.avg_rating}/5
                                    </span>
                                    <span style={{ fontSize: 13, color: "#999" }}>
                                        ({productDetail.review_count} đánh giá)
                                    </span>
                                </>
                            ) : (
                                <span style={{ fontSize: 14, color: "#999", fontStyle: "italic" }}>
                                    Chưa có đánh giá
                                </span>
                            )}
                        </div>
                    </div>


                                   



                     <div className="box_cart_1" style={{ display: "flex", gap: 12 }}>
                        <Button
                            type="primary"
                            size="large"
                            onClick={showModal}
                            disabled={isButtonDisabled}
                        >
                            {buttonText}
                        </Button>

                        <Button
                            type="default"
                            size="large"
                            onClick={() => setOpenServiceModal(true)}
                        >
                            Đặt dịch vụ
                        </Button>
                    </div>

                                </Card>
                            </Col>
                        </Row>
                        <hr />
                        <div className="title_total" style={{ fontSize: 20, marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>
                            Lịch sân đã đặt:
                        </div>                        <Calendar
                            dateCellRender={(date) => {
                                const dateEvents = bookingCourt.filter((booking) => moment(booking.booking_date).isSame(date, 'day'));
                                return (
                                    <div>
                                        {dateEvents.map((booking, index) => (
                                            <div key={index}>
                                                <p>Lịch số: {index + 1}</p>
                                                <p>Giờ bắt đầu: {moment(booking.start_time, 'HH:mm').format('HH:mm')}</p>
                                                <p>Giờ kết thúc: {moment(booking.end_time, 'HH:mm').format('HH:mm')}</p>
                                            </div>
                                        ))}
                                    </div>
                                );
                            }}
                        />





                   
                        <hr />
                       

                        {/* REVIEW SECTION */}
                                <div style={{ marginTop: 20 }}>
                                <h2>Đánh giá & Nhận xét</h2>
                                <Card style={{ marginTop: 15, marginBottom: 25 }}>
                                    <Rate value={newRating} onChange={setNewRating} />
                                    <Input.TextArea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    rows={3}
                                    placeholder="Nhập cảm nhận của bạn..."
                                    />
                                    <Button type="primary" style={{ marginTop: 10 }} onClick={handleSubmitReview}>
                                    Gửi đánh giá
                                    </Button>
                                </Card>


{(reviewList || []).length === 0 ? (
  <p>Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
) : (
  (reviewList || []).map((rv) => (
    <Card key={rv.id_reviews} style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{rv.user_name}</strong>
        <Rate disabled value={rv.rating} />
      </div>
      <p>{rv.review_text}</p>
      <small style={{ color: "#888" }}>
        {rv.created_at ? moment(rv.created_at).format("DD/MM/YYYY HH:mm") : 'Chưa có ngày'}
      </small>
    </Card>
  ))
)}


 <div className="price" style={{ marginTop: 20, fontSize: 20 }}>
                            <h1 className="product_name" style={{ fontWeight: 'bold' }}>Sân bạn có thể quan tâm</h1>
                        </div>
                            
                         
                        </div>
     



                        <Row
                            style={{ marginTop: 40 }}
                            className="row-product"
                        >
                            {recommend?.map((item) => (
                                <Col
                                    xl={{ span: 6 }}
                                    lg={{ span: 6 }}
                                    md={{ span: 12 }}
                                    sm={{ span: 12 }}
                                    xs={{ span: 24 }}
                                    onClick={() => handleReadMore(item.id)}
                                    key={item.id}
                                >
                                    <div className="show-product" style={{ marginRight: 15 }}>
                                        {item.image ? (
                                            <img className="image-product" src={item.image} />
                                        ) : (
                                            <img
                                                className="image-product"
                                                src={require("../../../assets/image/NoImageAvailable.jpg")}
                                            />
                                        )}
                                        <div className='wrapper-products'>
                                            <Paragraph
                                                className='title-product'
                                                ellipsis={{ rows: 2 }}
                                            >
                                                {item.name}
                                            </Paragraph>
                                             <div className="truncate" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                                    {item.avg_rating > 0 ? (
                                                                      <>
                                                                        <Rate
                                                                          allowHalf
                                                                          disabled
                                                                          value={item.avg_rating}
                                                                          style={{ fontSize: 14 }}
                                                                        />
                                                                        <span style={{ fontSize: 12, color: "#666" }}>
                                                                          {item.avg_rating}/5 (   {item.review_count} đánh giá)
                                                                        </span>
                                                                      </>
                                                                    ) : (
                                                                      <span style={{ fontSize: 12, color: "#999", fontStyle: "italic" }}>
                                                                        Chưa có đánh giá
                                                                      </span>
                                                                    )}
                                                                  </div>
                                            <div>Khu vực: {item.area}</div>
                                            <div>Loại sân: {item.field_type}</div>

                                            <div className="price-amount">
                                                <Paragraph className='price-product'>
                                                    {numberWithCommas(item.price)}đ/giờ
                                                </Paragraph>
                                            </div>
                                        </div>


                                    </div>
                                    <Paragraph
                                        className="badge"
                                        style={{ position: "absolute", top: 10, left: 9 }}
                                    >
                                        
                                        <span>Gợi ý</span>
                                        <img src={triangleTopRight} />
                                    </Paragraph>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    <Modal
                        title="Tạo đơn đặt sân mới"
                        visible={openModalCreate}
                        style={{ top: 100 }}
                        onOk={() => {
                            form
                                .validateFields()
                                .then((values) => {
                                    form.resetFields();
                                    handleOkUser(values);
                                })
                                .catch((info) => {
                                    console.log('Validate Failed:', info);
                                });
                        }}
                        onCancel={() => handleCancel("create")}
                        okText="Hoàn thành"
                        cancelText="Hủy"
                        width={600}
                    >
                        <Form
                            form={form}
                            name="courtBookingCreate"
                            layout="vertical"
                            initialValues={{
                                payment_method: 'Thanh toán trực tiếp',
                            }}
                            scrollToFirstError
                        >
                            <Spin spinning={loading}>

                                <Form.Item
                                    name="booking_date"
                                    label="Ngày đặt sân"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn ngày đặt sân!',
                                        },
                                    ]}
                                    style={{ marginBottom: 10 }}
                                >
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        disabledDate={disabledDate}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="start_time"
                                    label="Giờ bắt đầu"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn giờ bắt đầu!',
                                        },
                                    ]}
                                    style={{ marginBottom: 10 }}
                                >
                                    <TimePicker
                                        style={{ width: '100%' }}
                                        format="HH:mm"
                                        disabledHours={() => {
                                            // Giới hạn giờ từ 7h đến 22h
                                            const disabledHours = [];
                                            for (let i = 0; i < 7; i++) {
                                                disabledHours.push(i);
                                            }
                                            for (let i = 23; i < 24; i++) {
                                                disabledHours.push(i);
                                            }
                                            return disabledHours;
                                        }}
                                        disabledMinutes={(selectedHour) => {
                                            // Lấy thời gian hiện tại
                                            const currentTime = new Date();
                                            const currentHour = currentTime.getHours();
                                            const currentMinute = currentTime.getMinutes();

                                            // Nếu giờ được chọn là giờ hiện tại, chỉ chặn các phút nhỏ hơn phút hiện tại
                                            if (selectedHour === currentHour) {
                                                const disabledMinutes = [];
                                                for (let i = 0; i < currentMinute; i++) {
                                                    disabledMinutes.push(i);
                                                }
                                                return disabledMinutes;
                                            }

                                            // Nếu giờ được chọn lớn hơn giờ hiện tại, không chặn bất kỳ phút nào
                                            return [];
                                        }}
                                        minuteStep={30} // Bước nhảy của phút
                                    />

                                </Form.Item>

                                <Form.Item
                                    name="end_time"
                                    label="Giờ kết thúc"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn giờ kết thúc!',
                                        },
                                    ]}
                                    style={{ marginBottom: 10 }}
                                >


                                    <TimePicker
    style={{ width: '100%' }}
    format="HH:mm"
    minuteStep={30}
    onChange={(time) => {
        if (time && time.hour() >= 16) {
            notification.warning({
                message: "Giờ cao điểm",
                description: "Khung giờ từ 16h trở đi sẽ phụ thu thêm 25% giá thuê sân.",
            });
        }
    }}
    disabledHours={() => {
        const disabledHours = [];
        for (let i = 0; i < 7; i++) disabledHours.push(i);
        for (let i = 23; i < 24; i++) disabledHours.push(i);
        return disabledHours;
    }}
    disabledMinutes={(selectedHour) => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();

        if (selectedHour === currentHour) {
            const disabledMinutes = [];
            for (let i = 0; i < currentMinute; i++) {
                disabledMinutes.push(i);
            }
            return disabledMinutes;
        }
        return [];
    }}
/>
                                   
                                </Form.Item>

                                <Form.Item
                                    name="payment_method"
                                    label="Phương thức thanh toán"
                                    style={{ marginBottom: 10 }}
                                >
                                    <Select style={{ width: '100%' }}>
                                        <Select.Option value="Thanh toán trực tiếp">Thanh toán VNPAY</Select.Option>
                                        <Select.Option value="Chuyển khoản">Chuyển khoản</Select.Option>
                                    </Select>
                                </Form.Item>

                                {/* <Form.Item
                                    name="image_qr"
                                    label="Ảnh QR thanh toán"
                                    style={{ marginBottom: 10 }}
                                >
                                    {qr ? (
                                        <img src={qr} alt="QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
                                    ) : (
                                        <span>Ảnh QR không có sẵn</span>
                                    )}
                                </Form.Item> */}


                            </Spin>
                        </Form>
                    </Modal>




                    <Modal
    title="Đặt dịch vụ tại sân"
    visible={openServiceModal}
    onCancel={() => {
        setOpenServiceModal(false);
        setSelectedService(null);
        setServiceQuantity(1);
    }}
    footer={null}
    width={700}
>
    {serviceList.length === 0 ? (
        <p>Chủ sân chưa thêm dịch vụ.</p>
    ) : (
        serviceList.map((service) => (
            <Card key={service.id} style={{ marginBottom: 12 }}>
                <Row gutter={12} align="middle">
                    <Col span={6}>
                        <img
                            src={service.image}
                            alt=""
                            style={{ width: "100%", borderRadius: 8 }}
                        />
                    </Col>

                    <Col span={12}>
                        <h3>{service.name}</h3>
                        <p>Loại: {service.product_type_name}</p>
                        <p>
                            Giá:{" "}
                            <strong>
                                {Number(service.price).toLocaleString("vi-VN")}đ
                            </strong>
                        </p>
                    </Col>

                    <Col span={6}>
                        <Input
                            type="number"
                            min={1}
                            value={
                                selectedService?.id === service.id
                                    ? serviceQuantity
                                    : 1
                            }
                            onChange={(e) => {
                                setSelectedService(service);
                                setServiceQuantity(Number(e.target.value));
                            }}
                        />
                        <Button
                            type="primary"
                            block
                            style={{ marginTop: 8 }}
                            onClick={() => handleOrderService(service)}
                        >
                            Đặt
                        </Button>
                    </Col>
                </Row>
            </Card>
        ))
    )}
</Modal>

                </Card>
            </Spin>
        </div>
    );
};

export default ProductDetail;
