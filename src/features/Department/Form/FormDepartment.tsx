import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import React, { useCallback } from "react";
import { departmentApi } from "../../../services/apis/departmentApi";
import { DepartmentDto } from "../../../types/department";
import { useNavigate, useParams } from "react-router-dom";

const FormDepartment: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const createDepartmentMutation = useMutation({
    mutationFn: (values: DepartmentDto) => {
      return departmentApi.create(values);
    },
  });
  const handleFinish = useCallback(
    (values: DepartmentDto) => {
      const formData = {
        name: values.name,
        code: values.code,
      };
      createDepartmentMutation.mutate(formData, {
        onSuccess: () => {
          message.success("Tạo khoa thành công");
          navigate("/department");
        },
        onError: (error: any) => {
          const { data } = error;
          if (data?.response?.data?.statusCode === 401) {
            message.error("Lỗi rồi");
          }
        },
      });
    },
    [createDepartmentMutation, navigate]
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section>
      <h1>Form thêm khoa</h1>
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Tên khoa"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên khoa" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mã khoa"
          name="code"
          rules={[{ required: true, message: "Vui lòng nhập mã khoa" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {id ? "Cập nhật" : "Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default FormDepartment;
