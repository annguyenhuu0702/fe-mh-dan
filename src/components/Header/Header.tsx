import { Avatar, Popover, Row, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "./header.scss";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="rs-header">
      <Row
        align="middle"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 20px",
          paddingTop: "5px",
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              paddingTop: "8px",
            }}
          >
            Quản lý sự cố
          </h2>
        </div>
        <Space>
          <div className="rs-header-profile">
            <div className="rs-header-profile-avatar">
              <Popover
                placement="bottomRight"
                trigger="click"
                content={
                  <div className="rs-header-popover">
                    <Link to={"/profile"}>
                      <div className="rs-header-popover-item">
                        Quản lý tài khoản
                      </div>
                    </Link>
                    <div
                      className="rs-header-popover-item"
                      onClick={() => {
                        Cookies.remove("accessToken");
                        navigate("/login");
                      }}
                    >
                      Đăng xuất
                    </div>
                  </div>
                }
              >
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  size="large"
                  icon={<UserOutlined />}
                />
              </Popover>
            </div>
          </div>
        </Space>
      </Row>
    </header>
  );
};

export default Header;
