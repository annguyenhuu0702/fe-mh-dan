import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import React, { useCallback, useEffect } from "react";
import { departmentApi } from "../../../services/apis/departmentApi";
import { DepartmentDto } from "../../../types/department";
import { useNavigate, useParams } from "react-router-dom";
import { isNil } from "lodash";

const FormDepartment: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // fetch department detail using userQuery
  const { data: department } = useQuery({
    queryKey: ["department", id],
    queryFn: () => departmentApi.getById(id as string),
    enabled: !isNil(id),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialValues = {
    name: department?.data?.name ?? "",
    code: department?.data?.code ?? "",
  };

  const createDepartmentMutation = useMutation({
    mutationFn: (values: DepartmentDto) => {
      return departmentApi.create(values);
    },
  });

  const updateDepartmentMutation = useMutation({
    mutationFn: (values: DepartmentDto) => {
      return departmentApi.update(id as string, values);
    },
  });

  const handleFinish = useCallback(
    (values: DepartmentDto) => {
      const formData = {
        name: values.name,
        code: values.code,
      };
      if (id) {
        updateDepartmentMutation.mutate(formData, {
          onSuccess: () => {
            message.success("Cập nhật khoa thành công");
            navigate("/department");
          },
          onError: () => {
            message.error("Cập nhật khoa thất bại");
          },
        });
      } else {
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
      }
    },
    [createDepartmentMutation, id, navigate, updateDepartmentMutation]
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  return (
    <section>
      <h1>Form {id ? "sửa" : "thêm"} khoa</h1>
      <Form
        form={form}
        name="department"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
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
