import {
  BarChartOutlined,
  FileSearchOutlined,
  FormOutlined,
  TeamOutlined,
  PrinterOutlined,
  CalendarOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.scss";
import useAuth from "../../hooks/useAuth";
import { ROLE } from "../../constants/role";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const adminItem = [
  getItem("Phiếu ghi nhận sự cố", "/", <FormOutlined />),
  getItem(
    "Đăng ký sửa máy in",
    "/sign-up-for-printer-repair",
    <PrinterOutlined />
  ),
  getItem("Lịch", "calendar", <CalendarOutlined />, [
    getItem("Lịch họp", "/meeting-schedule"),
  ]),
  getItem("Quản lý khoa", "department", <TeamOutlined />, [
    getItem("Danh sách khoa", "/department"),
    getItem("Danh sách nhân viên", "/employee"),
  ]),
  getItem("Báo cáo", "sub1", <FileSearchOutlined />, [
    getItem("Báo cáo sự cố theo khoa", "/problem-report-department"),
    getItem("Báo cáo sự cố theo lãnh vực", "/problem-report-industry"),
  ]),
  getItem("Thống kê", "/statistical", <BarChartOutlined />),
];

const employeeItems = [
  getItem("Phiếu ghi nhận sự cố", "/", <FormOutlined />),
  getItem(
    "Đăng ký sửa máy in",
    "/sign-up-for-printer-repair",
    <PrinterOutlined />
  ),
  getItem("Lịch họp", "/meeting-schedule", <TeamOutlined />),
];

const Sidebar: React.FC = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const menuItems = useMemo(() => {
    if (user.user?.role === ROLE.SUPER_ADMIN) {
      return adminItem;
    }
    return employeeItems;
  }, [user]);

  const handleContent = useCallback(
    (item: any) => {
      navigate(item.key);
    },
    [navigate]
  );

  const handleBackHome = useCallback(() => {
    navigate("/");
  }, []);

  return (
    <section className="rs-sidebar">
      <div
        className="rs-sidebar-logo"
        onClick={() => {
          handleBackHome();
        }}
      >
        <img
          style={{
            height: "120px",
            // paddingLeft: "55px",
          }}
          alt=""
          src="https://res.cloudinary.com/dtvgddjmz/image/upload/v1701245260/Ti%C3%AAu_%C4%91%E1%BB%81_Website_BV_16_-removebg-preview_yjlulq_uk19pi.png"
        />
      </div>
      <Menu
        className="rs-sidebar-menu"
        mode="inline"
        theme="light"
        // auto expand all
        // remove open animation
        motion={{}}
        openKeys={menuItems.map((item: any) => item.key as string)}
        // defaultOpenKeys={menuItems.map((item: any) => item.key as string)}
        items={menuItems}
        onClick={handleContent}
        selectedKeys={[location.pathname]}
      />
    </section>
  );
};

export default Sidebar;
