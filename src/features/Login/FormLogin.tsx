import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import Cookies from "js-cookie";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services/apis/authApi";
import { LoginDto } from "../../types/auth";

const FormLogin: React.FC = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (values: LoginDto) => {
      return authApi.login(values);
    },
  });

  const handleFinish = useCallback((values: LoginDto) => {
    const formData = {
      username: values.username,
      password: values.password,
    };
    loginMutation.mutate(formData, {
      onSuccess: (res) => {
        const { token } = res.data;
        Cookies.set("accessToken", token);
        navigate("/");
      },
      onError: (error: any) => {
        const { data } = error;
        if (data?.response?.data?.statusCode === 401) {
          message.error("Lỗi rồi");
        }
      },
    });
  }, []);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "700px",
      }}
    >
      <div
        style={{
          padding: "40px",
          marginTop: "150px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          height: "400px",
          borderRadius: "6%",
        }}
      >
        <h1 style={{ fontWeight: 800 }}>ĐĂNG NHẬP</h1>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "15px",
            paddingTop: "5px",
            fontSize: "13px"
          }}
        >
          Đăng nhập tài khoản của bạn
        </span>
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          style={{ width: "300px" }}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            style={{ width: "400px" }}
          >
            <Input style={{ width: "300px", height: "40px" }} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            style={{ width: "400px" }}
          >
            <Input.Password style={{ width: "300px", height: "40px" }} />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            style={{ marginTop: "30px" }}
          >
            <Button type="primary" htmlType="submit" style={{ height: "40px" }}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default FormLogin;
