import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { isNil, map } from "lodash";
import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { positionIndustries } from "../../../assets/data";
import { adminUserApi } from "../../../services/apis/adminUser";
import { authApi } from "../../../services/apis/authApi";
import { departmentApi } from "../../../services/apis/departmentApi";
import { AdminUserDto } from "../../../types/adminUser";

const FormEmployee: React.FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => authApi.getProfile(),
  });

  const { data: adminUser } = useQuery({
    queryKey: ["adminUser", id],
    queryFn: () => adminUserApi.getById(id as string),
    enabled: !isNil(id),
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => departmentApi.getAll(),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialValues = {
    fullName: adminUser?.data?.fullName ?? "",
    code: adminUser?.data?.code ?? "",
    password: "",
    departmentId: adminUser?.data?.departmentId ?? "",
    role: adminUser?.data?.role ?? "",
    userName: adminUser?.data?.userName ?? "",
  };

  const createAdminUserMutation = useMutation({
    mutationFn: (values: AdminUserDto) => {
      return adminUserApi.create(values);
    },
  });

  const updateAdminUsertMutation = useMutation({
    mutationFn: (values: AdminUserDto) => {
      return adminUserApi.update(id as string, values);
    },
  });

  const handleFinish = useCallback(
    (values: AdminUserDto) => {
      const formData = {
        fullName: values.fullName,
        code: values.code,
        password: values.password,
        departmentId: values.departmentId,
        role: values.role,
        userName: values.userName,
        adminId: user?.data?.id,
      };

      const formUpdateData = {
        fullName: values.fullName,
        code: values.code,
        departmentId: values.departmentId,
        role: values.role,
        userName: values.userName,
        adminId: user?.data?.id,
      };

      if (id) {
        updateAdminUsertMutation.mutate(formUpdateData, {
          onSuccess: () => {
            message.success("Cập nhật nhân viên thành công");
            navigate("/employee");
          },
          onError: () => {
            message.error("Cập nhật nhân viên thất bại");
          },
        });
      } else {
        createAdminUserMutation.mutate(formData, {
          onSuccess: () => {
            message.success("Tạo nhân viên thành công");
            navigate("/employee");
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
    [id, user?.data?.id]
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
      <h1>Form {id ? "sửa" : "thêm"} nhân viên</h1>
      <Form
        form={form}
        name="department"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
        onFinish={handleFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row>
          <Col xl={12}>
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập tên khoa" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              label="Tên đăng nhập"
              name="userName"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              label="Mã nhân viên"
              name="code"
              rules={[
                { required: true, message: "Vui lòng nhập mã nhân viên" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          {!id && (
            <Col xl={12}>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          )}
          <Col xl={12}>
            <Form.Item
              label="Khoa"
              name="departmentId"
              rules={[{ required: true, message: "Vui lòng chọn tên khoa" }]}
            >
              <Select
                options={
                  map(departments?.data.departments, (department) => {
                    return {
                      label: department.name,
                      value: department.id,
                    };
                  }) ?? []
                }
              />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              label="Chức vụ"
              name="industry"
              rules={[{ required: true, message: "Vui lòng chọn chức vụ" }]}
            >
              <Select
                options={
                  map(positionIndustries, (industry) => {
                    return {
                      label: industry.label,
                      value: industry.value,
                    };
                  }) ?? []
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {id ? "Cập nhật" : "Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default FormEmployee;
