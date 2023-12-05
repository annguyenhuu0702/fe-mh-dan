import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { authApi } from "../../../services/apis/authApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { problemApi } from "../../../services/apis/problem";
import { isNil, map } from "lodash";
import { ProblemDto } from "../../../types/problem";
import { useCallback, useEffect, useMemo } from "react";
import { adminUserApi } from "../../../services/apis/adminUser";
import moment from "moment";
const FormProblem = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => authApi.getProfile(),
  });

  const { data: adminUsers } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: () => adminUserApi.getAll(),
    enabled: user?.data?.role === "superAdmin",
  });

  const { data: problem } = useQuery({
    queryKey: ["problem", id],
    queryFn: () => problemApi.getById(id as string),
    enabled: !isNil(id),
  });

  const createProblemMutation = useMutation({
    mutationFn: (values: ProblemDto) => {
      return problemApi.create(values);
    },
  });

  const updateProblemtMutation = useMutation({
    mutationFn: (values: ProblemDto) => {
      return problemApi.update(id as string, values);
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialValues = {
    title: problem?.data?.title ?? "",
    industry: problem?.data?.industry ?? "",
    contact: problem?.data?.contact ?? "",
    status: problem?.data?.status ?? "",
    processingDate: moment(problem?.data?.processingDate) ?? moment(),
    note: problem?.data?.note ?? "",
    adminUserId: problem?.data?.adminUserId ?? "",
  };

  const handleFinish = useCallback(
    (values: ProblemDto) => {
      const formData = {
        title: values.title,
        industry: values.industry,
        contact: values.contact,
        status: values.status,
        processingDate: values.processingDate,
        note: values.note,
        adminUserId: values.adminUserId ?? user?.data?.id,
      };

      if (id) {
        updateProblemtMutation.mutate(formData, {
          onSuccess: () => {
            message.success("Cập nhật phiếu thành công");
            navigate("/");
          },
          onError: () => {
            message.error("Cập nhật phiếu thất bại");
          },
        });
      } else {
        createProblemMutation.mutate(formData, {
          onSuccess: () => {
            message.success("Tạo phiếu thành công");
            navigate("/");
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

  const checkRole = useMemo(() => {
    if (
      user?.data?.role === "superAdmin" ||
      problem?.data?.adminUserId === user?.data?.id
    ) {
      return true;
    }
    return false;
  }, [problem?.data?.adminUserId, user?.data?.id, user?.data?.role]);
  console.log(
    "🚀 ~ file: FormProblem.tsx:117 ~ checkRole ~ checkRole:",
    checkRole
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  return (
    <section>
      <h1>Form {id ? "sửa" : "thêm"} phiếu ghi nhận sự cố</h1>

      <Form
        form={form}
        name="problem"
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
              label="Tên sự cố"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập tên sự cố" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              label="Thể loại"
              name="industry"
              rules={[{ required: true, message: "Vui lòng nhập thể loại" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              label="Kết nối"
              name="contact"
              rules={[{ required: true, message: "Vui lòng nhập kết nối" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xl={12}>
            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            >
              <Select
                placeholder="Chọn nhân viên"
                options={[
                  {
                    label: "Chưa xử lý",
                    value: "unprocessed",
                  },
                  {
                    label: "Đang xử lý",
                    value: "processing",
                  },
                  {
                    label: "Đã xử lý",
                    value: "processed",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              label="Ngày xử lý"
              name="processingDate"
              rules={[{ required: true, message: "Vui lòng chọn ngày xử lý" }]}
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
                placeholder="Chọn thời gian"
              />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item label="Chú thích" name="note">
              <Input />
            </Form.Item>
          </Col>

          {user?.data.role === "superAdmin" && (
            <Col xl={12}>
              <Form.Item
                label="Nhân viên"
                name="adminUserId"
                rules={[{ required: true, message: "Vui lòng chọn nhân viên" }]}
              >
                <Select
                  placeholder="Chọn nhân viên"
                  options={
                    map(adminUsers?.data.adminUsers, (adminUser) => {
                      return {
                        label: adminUser.fullName,
                        value: adminUser.id,
                      };
                    }) ?? []
                  }
                />
              </Form.Item>
            </Col>
          )}
        </Row>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {id ? (
            <Button type="primary" htmlType="submit" disabled={!checkRole}>
              Sửa
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          )}
        </Form.Item>
      </Form>
    </section>
  );
};

export default FormProblem;
