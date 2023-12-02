import {
  BarChartOutlined,
  FileSearchOutlined,
  FormOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Phiếu ghi nhận", "/abc", <FormOutlined />),
  getItem("Quản lý khoa", "/sub2", <TeamOutlined />, [
    getItem("Danh sách khoa", "/department"),
    getItem("Danh sách nhân viên", "/employee"),
  ]),
  getItem("Báo cáo sự cố", "sub1", <FileSearchOutlined />, [
    getItem("BC theo khoa", "/problem-report-department"),
    getItem("BC theo lãnh vực", "/problem-report-industry"),
  ]),
  getItem("Thống kê", "/statistical", <BarChartOutlined />),
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleContent = useCallback(
    (item: any) => {
      navigate(item.key);
    },
    [navigate]
  );

  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "6px",
            padding: "20px",
            width: "100%",
          }}
        >
          <img
            style={{
              height: "60px",
            }}
            alt=""
            src="https://res.cloudinary.com/dtvgddjmz/image/upload/v1701245260/Ti%C3%AAu_%C4%91%E1%BB%81_Website_BV_16_-removebg-preview_yjlulq_uk19pi.png"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          className="w-full"
          onClick={handleContent}
          selectedKeys={[location.pathname]}
        />
      </Sider>
    </Layout>
  );
};

export default Sidebar;
