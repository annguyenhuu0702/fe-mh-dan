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
    <section style={{display: "flex", justifyContent: "center"}}>
      <div style={{padding: "60px"}}>
        <h1 style={{ fontWeight: 800 }}>ĐĂNG NHẬP</h1>
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            style={{width: "300px"}}
            
          >
            <Input style={{ width: "300px", height: "40px" }} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password style={{ width: "300px", height: "40px" }} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default FormLogin;
