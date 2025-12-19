import {
  Breadcrumb, Button, Card, Col, Form,
  Row, Spin, Select
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React, { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { numberWithCommas } from "../../../utils/common";
import "./productList.css";
import areaManagementApi from "../../../apis/areaManagementApi";
import courtsManagementApi from "../../../apis/courtsManagementApi";
import { Rate, Typography } from "antd";
const { Option } = Select;

const ProductList = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState("");  
  const [fieldTypes, setFieldTypes] = useState([]);         // 🟩 DANH SÁCH LOẠI SÂN
  const [selectedType, setSelectedType] = useState("");     // 🟩 LOẠI SÂN ĐÃ CHỌN

  let { id } = useParams();
  const history = useHistory();
  const match = useRouteMatch();

  const handleReadMore = (id) => {
    history.push("/product-detail/" + id);
    window.location.reload();
  };

  const handleCategoryDetails = (id) => {
    const newPath = match.url.replace(/\/[^/]+$/, `/${id}`);
    history.push(newPath);
    window.location.reload();
  };

  const handleSearchClick = async () => {
    try {
      const response = await courtsManagementApi.getAllCourts();
      const approvedProducts = response.filter(
        (product) => product.approval_status === "approved"
      );
      setProductDetail(approvedProducts);
    } catch (error) {
      console.error("Error fetching courts data: ", error);
    }
  };

  // 🟩 Lấy danh sách loại sân (tự động theo DB)
  const loadFieldTypes = async () => {
    try {
      const courts = await courtsManagementApi.getAllCourts();
      const uniqueTypes = [];

      courts.forEach((c) => {
        if (c.field_type && !uniqueTypes.includes(c.field_type)) {
          uniqueTypes.push(c.field_type);
        }
      });

      setFieldTypes(uniqueTypes);
    } catch (error) {
      console.log("Failed to load field types:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const areaResponse = await areaManagementApi.getAllAreas();
        setCategories(areaResponse);

        const courtResponse = await courtsManagementApi.getCourtByCategory(id);
        const filteredResponse = courtResponse.filter(
          (item) => item.approval_status !== "pending"
        );
        setProductDetail(filteredResponse);

        await loadFieldTypes(); // 🟩 load loại sân
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch data:", error);
      }
    })();

    window.scrollTo(0, 0);
  }, []);

  // 🟩 Lọc dữ liệu theo search + loại sân
  const filteredProducts = productDetail.filter((item) => {
    const matchKeyword = item.name
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());

    const matchType =
      selectedType === "" || item.field_type === selectedType;

    return matchKeyword && matchType;
  });

  return (
    <div>
      <Spin spinning={false}>
        <Card className="container_details">
          <div className="product_detail">
            <div style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
              <Breadcrumb>
                <Breadcrumb.Item href="http://localhost:3500/home">
                  <span>Trang chủ</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span>Sản phẩm </span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <hr />

            <div className="container box">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryDetails(category.id)}
                  className="menu-item-1"
                >
                  <div className="menu-category-1">{category.name}</div>
                </div>
              ))}
            </div>

            <div className="list-products container" style={{ marginTop: 0, marginBottom: 50 }}>
              <Row>
                <Col span={12}>
                  <h3 style={{ paddingTop: "30px" }}>Danh sách sân bóng</h3>
                </Col>

                <Col span={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 10,
                      alignItems: "center"
                    }}
                  >
                    {/* ô tìm kiếm */}
                    <input
                      type="text"
                      placeholder="Tìm tên sân..."
                      className="ant-input"
                      style={{ width: 250 }}
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />

                    {/* dropdown lọc theo loại sân */}
                    <Select
                      placeholder="Loại sân"
                      style={{ width: 160 }}
                      value={selectedType}
                      allowClear
                      onChange={(v) => setSelectedType(v || "")}
                    >
                      {fieldTypes.map((type) => (
                        <Option key={type} value={type}>
                          {type}
                        </Option>
                      ))}
                    </Select>

                    <Button type="primary" onClick={handleSearchClick}>
                      Tất cả sân bóng
                    </Button>
                  </div>
                </Col>
              </Row>

              {/* danh sách sân */}
              <div
                style={{
                  marginTop: 10,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gridGap: "25px",
                }}
              >
                {filteredProducts.slice(0, 40).map((item) => (
                  <div
                    className="col-product"
                    onClick={() => handleReadMore(item.id)}
                    key={item.id}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="show-product">
                      {item.image ? (
                        <img className="image-product" src={item.image} alt={item.name} />
                      ) : (
                        <img
                          className="image-product"
                          src={require("../../../assets/image/NoImageAvailable.jpg")}
                          alt="No Image Available"
                        />
                      )}

                      <div className="wrapper-products">
                        <Paragraph className="title-product overflow-ellipsis overflow-hidden whitespace-nowrap">
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
                        <div className="truncate">Khu vực: {item.area}</div>
                        <div className="truncate">Loại sân: {item.field_type}</div>

                        <div className="price-amount">
                          <Paragraph className="price-product">
                            {numberWithCommas(Number(item.price))}đ/giờ
                          </Paragraph>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default ProductList;
