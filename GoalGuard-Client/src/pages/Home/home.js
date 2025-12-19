import QueueAnim from 'rc-queue-anim';
import { OverPack } from 'rc-scroll-anim';
import Texty from 'rc-texty';
import TweenOne from 'rc-tween-one';
import React, { useEffect, useState } from "react";
import courtsManagementApi from "../../apis/courtsManagementApi";
import areaManagementApi from "../../apis/areaManagementApi";

import triangleTopRight from "../../assets/icon/Triangle-Top-Right.svg";
import service10 from "../../assets/image/service/service10.png";
import service6 from "../../assets/image/service/service6.png";
import service7 from "../../assets/image/service/service7.png";
import service8 from "../../assets/image/service/service8.png";
import service9 from "../../assets/image/service/service9.png";
import "../Home/home.css";

import { RightOutlined } from '@ant-design/icons';
import { BackTop, Card, Carousel, Col, Row, Spin } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { useHistory } from 'react-router-dom';
import { numberWithCommas } from "../../utils/common";


const Home = () => {

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);


    const history = useHistory();


    const handleReadMore = (id) => {
        console.log(id);
        history.push("product-detail/" + id)
    }

    const handleCategoryDetails = (id) => {
        console.log(id);
        history.push("product-list/" + id)
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await courtsManagementApi.getAllCourts({ page: 1, limit: 10 });
                // Lọc dữ liệu có approval_status khác "pending"
                const filteredResponse = response.filter(item => item.approval_status !== "pending");
                setProductList(filteredResponse);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }

            try {
                const response = await areaManagementApi.getAllAreas();
                console.log(response);
                setCategories(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])


    return (
        <Spin spinning={false}>

            <div style={{ background: "#FFFFFF", overflowX: "hidden", overflowY: "hidden", paddingTop: 15, }} className="home">
                <div style={{ background: "#FFFFFF" }} className="container-home container banner-promotion">
                    <Row justify="center" align="top" key="1" style={{ display: 'flex' }}>
                        <Col span={4} style={{ height: '100%' }}>
                            <ul className="menu-tree" style={{ height: '100%' }}>
                                {categories.map((category) => (
                                    <li key={category.id} onClick={() => handleCategoryDetails(category.id)} style={{ height: '100%' }}>
                                        <div className="menu-category" style={{ height: '100%' }}>
                                            {category.name}
                                            <RightOutlined />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col span={15} style={{ height: '100%' }}>
                            <Carousel autoplay className="carousel-image" style={{ height: '100%' }}>
                               
                               
                                <div className="img">
                                    <img style={{ width: '100%', height: 300, objectFit: 'cover' }} src="https://cdn2.fptshop.com.vn/unsafe/800x0/kich_thuoc_san_Pickleball_03_451a7d63d8.jpg" alt="" />
                                </div>
                                <div className="img">
                                    <img style={{ width: '100%', height: 300, objectFit: 'cover' }} src="https://nvbplay.vn/wp-content/uploads/2025/03/Kham-Pha-San-Pickleball-Can-Tho-Diem-Choi-Hot-Cho-Gioi-Tre-2.jpg" alt="" />
                                </div>
                                 <div className="img">
                                    <img style={{ width: '100%', height: 300, objectFit: 'cover' }} src="https://bizweb.dktcdn.net/100/017/070/files/kich-thuoc-san-bong-da-1-jpeg.jpg?v=1671246300021" alt="" />
                                </div>
                                 <div className="img">
                                    <img style={{ width: '100%', height: 300, objectFit: 'cover' }} src="https://bizweb.dktcdn.net/100/482/641/files/san-pickleball-trong-nha-vs-ngoai-troi.jpg?v=1726026767568" alt="" />
                                </div>
                            </Carousel>
                            <div className="product-promotion" style={{ height: '100%' }}>
                                <div class="product-card">
                                    <div class="product-image">
                                        <img src="https://media.istockphoto.com/id/1416145560/vi/vec-to/v%C3%B2ng-tr%C3%B2n-m%C3%A0u-xanh-l%C3%A1-c%C3%A2y-v%E1%BB%9Bi-d%E1%BA%A5u-t%C3%ADch-m%C3%A0u-xanh-l%C3%A1-c%C3%A2y-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-nh%C3%A3n-d%C3%A1n-ok-ph%E1%BA%B3ng-bi%E1%BB%83u.jpg?s=170667a&w=0&k=20&c=B56rAk2Hbi0qYCi-dMbn6TemvFLKaKl7WWNzXM6WzRU=" alt="Sản phẩm 1" />
                                    </div>
                                    <div class="product-name">Mặt sân cao cấp</div>
                                </div>
                                <div class="product-card">
                                    <div class="product-image">
                                        <img src="https://media.istockphoto.com/id/1416145560/vi/vec-to/v%C3%B2ng-tr%C3%B2n-m%C3%A0u-xanh-l%C3%A1-c%C3%A2y-v%E1%BB%9Bi-d%E1%BA%A5u-t%C3%ADch-m%C3%A0u-xanh-l%C3%A1-c%C3%A2y-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-nh%C3%A3n-d%C3%A1n-ok-ph%E1%BA%B3ng-bi%E1%BB%83u.jpg?s=170667a&w=0&k=20&c=B56rAk2Hbi0qYCi-dMbn6TemvFLKaKl7WWNzXM6WzRU=" alt="Sản phẩm 2" />
                                    </div>
                                    <div class="product-name">Hệ thống chiếu sáng tốt</div>
                                </div>
                                <div class="product-card">
                                    <div class="product-image">
                                        <img src="https://media.istockphoto.com/id/1416145560/vi/vec-to/v%C3%B2ng-tr%C3%B2n-m%C3%A0u-xanh-l%C3%A1-c%C3%A2y-v%E1%BB%9Bi-d%E1%BA%A5u-t%C3%ADch-m%C3%A0u-xanh-l%C3%A1-c%C3%A2y-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-nh%C3%A3n-d%C3%A1n-ok-ph%E1%BA%B3ng-bi%E1%BB%83u.jpg?s=170667a&w=0&k=20&c=B56rAk2Hbi0qYCi-dMbn6TemvFLKaKl7WWNzXM6WzRU=" alt="Sản phẩm 3" />
                                    </div>
                                    <div class="product-name">Đa dạng lịch sân</div>
                                </div>
                            </div>
                        </Col>
                        <Col span={5} style={{ height: '100%' }}>
                            <div class="right-banner image-promotion" style={{ height: '100%' }}>
                                <a href="#" class="right-banner__item">
                                    <img src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/182858/Originals/san-bong-gan-day-1.jpeg " loading="lazy" class="right-banner__img" style={{width: '100%'}} />
                                </a>
                                <a href="#" class="right-banner__item">
                                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20210912/pngtree-fresh-outdoor-sports-fitness-badminton-photography-map-image_867180.jpg" loading="lazy" class="right-banner__img" style={{width: '100%'}} />
                                </a>
                                <a href="#" class="right-banner__item">
                                    <img src="https://media.istockphoto.com/id/1461641993/vi/anh/v%E1%BB%A3t-v%C3%A0-b%C3%B3ng-%C4%91%E1%BB%83-ch%C6%A1i-b%C3%B3ng-d%C6%B0a-chua-t%E1%BA%A1i-l%C6%B0%E1%BB%9Bi-th%E1%BB%83-thao-tr%C3%AAn-s%C3%A2n-d%E1%BB%B1ng-h%C3%ACnh-3d.jpg?s=612x612&w=0&k=20&c=rwfVr1eNJDZXrbccXrYUnsyEdcn2KOP_0p83yqnp5rI= " loading="lazy" class="right-banner__img" style={{width: '100%'}}/>
                                </a>
                                <a href="#" class="right-banner__item">
                                    <img src="https://i.ytimg.com/vi/kqLRRNOpe8U/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGDUgZShaMA8=&rs=AOn4CLDc6R6Mh24hkk0P-e_VYOv7QJV68A" loading="lazy" class="right-banner__img" style={{width: '100%'}}/>
                                </a>
                            </div>
                        </Col>
                    </Row>

                </div >

                <div className="container-home container" style={{ marginTop: 40 }}>
                    {/* <img src="https://img.thegioithethao.vn/media/banner/banner-ban-muon-biet.png" className="promotion1"></img> */}
                </div>

                <div className="image-one">
                    <div className="texty-demo">
                        <Texty>Sân Mới</Texty>
                    </div>
                    <div className="texty-title">
                        <p>Trải Nghiệm <strong style={{ color: "#3b1d82" }}>Ngay</strong></p>
                    </div>

                    <div className="list-products container" key="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gridGap: '25px' }}>
                        {productList.slice(0, 20).map((item) => (
                            <div
                                className='col-product'
                                onClick={() => handleReadMore(item.id)}
                                key={item.id}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="show-product">
                                    {item.image ? (
                                        <img
                                            className='image-product'
                                            src={item.image}
                                            alt={item.name}
                                        />
                                    ) : (
                                        <img
                                            className='image-product'
                                            src={require('../../assets/image/NoImageAvailable.jpg')}
                                            alt="No Image Available"
                                        />
                                    )}
                                    <div className='wrapper-products'>
                                        <Paragraph
                                            className='title-product overflow-ellipsis overflow-hidden whitespace-nowrap'
                                        >
                                            {item.name}
                                        </Paragraph>

                                        <div className="truncate">Khu vực: {item.area}</div>
                                        <div className="truncate">Loại sân: {item.field_type}</div>

                                        <div className="price-amount">
                                            <Paragraph className='price-product'>
                                                {numberWithCommas(Number(item.price))}đ/giờ
                                            </Paragraph>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>


                <div className="heading_slogan">
                    <div>Tại sao</div>
                    <div>bạn nên chọn chúng tôi</div>
                </div>
                <div className="card_wrap container-home container flex justify-center">
                    <div>
                        <Card bordered={false} className="card_suggest card_why card_slogan flex flex-col items-center">
                            <img src={service6} alt="Sân bóng tiện ích" className="mx-auto"></img>
                            <p className="card-text mt-3 fw-bold text-center">Tiện ích đầy đủ <br /> và hiện đại</p>
                        </Card>
                    </div>
                    <div>
                        <Card bordered={false} className="card_suggest card_why card_slogan flex flex-col items-center">
                            <img src={service7} alt="Chất lượng sân bóng" className="mx-auto"></img>
                            <p className="card-text mt-3 fw-bold text-center">Chất lượng sân bóng <br /> tốt nhất</p>
                        </Card>
                    </div>
                    <div>
                        <Card bordered={false} className="card_suggest card_why card_slogan flex flex-col items-center">
                            <img src={service8} alt="Dịch vụ chuyên nghiệp" className="mx-auto"></img>
                            <p className="card-text mt-3 fw-bold text-center">Dịch vụ chuyên nghiệp <br /> và thân thiện</p>
                        </Card>
                    </div>
                    <div>
                        <Card bordered={false} className="card_suggest card_why card_slogan flex flex-col items-center">
                            <img src={service9} alt="Đặt lịch linh hoạt" className="mx-auto"></img>
                            <p className="card-text mt-3 fw-bold text-center">Đặt lịch linh hoạt <br /> và nhanh chóng</p>
                        </Card>
                    </div>
                    <div>
                        <Card bordered={false} className="card_suggest card_why card_slogan flex flex-col items-center">
                            <img src={service10} alt="Hỗ trợ 24/7" className="mx-auto"></img>
                            <p className="card-text mt-3 fw-bold text-center">Hỗ trợ 24/7 <br /> đảm bảo trải nghiệm <br /> tốt nhất</p>
                        </Card>
                    </div>
                </div>

                <div className="image-footer">
                    <OverPack style={{ overflow: 'hidden', height: 800, marginTop: 20 }} >
                        <TweenOne key="0" animation={{ opacity: 1 }}
                            className="code-box-shape"
                            style={{ opacity: 0 }}
                        />
                        <QueueAnim key="queue"
                            animConfig={[
                                { opacity: [1, 0], translateY: [0, 50] },
                                { opacity: [1, 0], translateY: [0, -50] }
                            ]}
                        >
                            <div className="texty-demo-footer">
                                <Texty>NHANH LÊN! </Texty>
                            </div>
                            <div className="texty-title-footer">
                                <p>Tham Dự Buổi <strong>Ra Mắt Sân Bóng Mới</strong></p>
                            </div>
                            <Row justify="center" style={{ marginBottom: 40, fill: "#FFFFFF" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="71px" height="11px"> <path fill-rule="evenodd" d="M59.669,10.710 L49.164,3.306 L39.428,10.681 L29.714,3.322 L20.006,10.682 L10.295,3.322 L1.185,10.228 L-0.010,8.578 L10.295,0.765 L20.006,8.125 L29.714,0.765 L39.428,8.125 L49.122,0.781 L59.680,8.223 L69.858,1.192 L70.982,2.895 L59.669,10.710 Z"></path></svg>
                            </Row>
                            <Row justify="center">
                                <a href="#" class="footer-button" role="button">
                                    <span>ĐĂNG KÝ NGAY</span>
                                </a>
                            </Row>
                        </QueueAnim>
                    </OverPack>
                </div>
            </div>

            <BackTop style={{ textAlign: 'right' }} />
        </Spin >
    );
};

export default Home;
