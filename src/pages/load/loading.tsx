import React, { useMemo } from "react";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import "../../styles/index.scss";
import { ROLE } from "../../constants/role";

const Loading = () => {
  // Kiểm tra quyền admin
  const checkRoleAdmin = useMemo(() => {
    const userRole = localStorage.getItem("userRole");
    return userRole === ROLE.SUPER_ADMIN; // Thay ROLE.ADMIN bằng quyền admin của bạn
  }, []);

  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          letterSpacing: "3px",
          fontWeight: "900",
          fontSize: "36px",
          marginBottom: "60px",
        }}
      >
        Bạn là?
      </h1>
      <Row justify="space-evenly">
        <Col span={4}>
          <Link to="/">
            <div
              style={{
                border: "1px solid #000",
                borderRadius: "8px",
                width: "100%",
                minHeight: "266px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              className="hover"
            >
              <i className="fa-solid fa-user fa-7x"></i>
            </div>
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              letterSpacing: "1px",
              fontSize: "20px",
              fontWeight: "700",
              marginTop: "10px",
            }}
          >
            Khách hàng
          </div>
        </Col>
        
        <Col span={4} className={!checkRoleAdmin ? "disabled" : ""}>
          <Link to="/">
            <div
              style={{
                border: "1px solid #000",
                borderRadius: "8px",
                width: "100%",
                minHeight: "266px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // cursor: checkRoleAdmin ? "pointer" : "not-allowed", // Thêm cursor "not-allowed" để chỉ ra là không thể nhấn vào
                // opacity: checkRoleAdmin ? 1 : 0.5, // Đặt opacity để làm mờ phần này
              }}
              className="hover"
            >
              <i className="fa-solid fa-user-doctor fa-7x"></i>
            </div>
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              letterSpacing: "1px",
              fontSize: "20px",
              fontWeight: "700",
              marginTop: "10px",
            }}
          >
            Bác sĩ
          </div>
        </Col>
        
        <Col span={4}>
          <Link to="/">
            <div
              style={{
                border: "1px solid #000",
                borderRadius: "8px",
                width: "100%",
                minHeight: "266px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              className="hover"
            >
              <i className="fa-solid fa-user-nurse fa-7x"></i>
            </div>
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              letterSpacing: "1px",
              fontSize: "20px",
              fontWeight: "700",
              marginTop: "10px",
            }}
          >
            Điều dưỡng
          </div>
        </Col>
        
        <Col span={4}>
          <Link to="/">
            <div
              style={{
                border: "1px solid #000",
                borderRadius: "8px",
                width: "100%",
                minHeight: "266px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              className="hover"
            >
              <i className="fa-solid fa-gear fa-7x"></i>
            </div>
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              letterSpacing: "1px",
              fontSize: "20px",
              fontWeight: "700",
              marginTop: "10px",
            }}
          >
            Quản lý
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Loading;
