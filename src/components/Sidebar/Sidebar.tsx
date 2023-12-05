import {
  BarChartOutlined,
  FileSearchOutlined,
  FormOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.scss";
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

const menuItems = [
  getItem("Phiếu ghi nhận", "/", <FormOutlined />),
  getItem("Quản lý khoa", "/sub2", <TeamOutlined />, [
    getItem("Danh sách khoa", "/department"),
    getItem("Danh sách nhân viên", "/employee"),
  ]),
  getItem("Báo cáo sự cố", "sub1", <FileSearchOutlined />, [
    getItem("Báo cáo theo khoa", "/problem-report-department"),
    getItem("Báo cáo theo lãnh vực", "/problem-report-industry"),
  ]),
  getItem("Thống kê", "/statistical", <BarChartOutlined />),
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleContent = useCallback(
    (item: any) => {
      navigate(item.key);
    },
    [navigate]
  );

  const handleBackHome = useCallback(() => {
    navigate("/problem");
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
            paddingLeft: "52px",
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
