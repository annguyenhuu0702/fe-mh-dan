import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { isNil, map } from "lodash";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { problemIndustries, problemReciever } from "../../../assets/data";
import { ROLE } from "../../../constants/role";
import { adminUserApi } from "../../../services/apis/adminUser";
import { authApi } from "../../../services/apis/authApi";
import { departmentApi } from "../../../services/apis/departmentApi";
import { problemApi } from "../../../services/apis/problem";
import { ProblemDto } from "../../../types/problem";
import { PROBLEM_STATUS } from "../../../constants/problem";

const { TextArea } = Input;

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
    queryFn: () => adminUserApi.getAllNoPagination(),
    enabled: user?.data?.role === ROLE.SUPER_ADMIN,
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => departmentApi.getAllNoPagination(),
    enabled: user?.data?.role === ROLE.SUPER_ADMIN,
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
    note: problem?.data?.note ?? "",
    adminUserId: problem?.data?.adminUserId ?? "",
    departmentId: problem?.data?.departmentId ?? "",
    reciever: problem?.data?.reciever ?? "",
  };

  const handleFinish = useCallback(
    (values: ProblemDto) => {
      const formData = {
        title: values.title,
        industry: values.industry,
        contact: values.contact,
        status: values.status,
        note: values.note,
        reciever: values.reciever ?? "",
        adminUserId: values.adminUserId ?? user?.data?.id,
        departmentId: values.departmentId ?? user?.data?.departmentId,
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


  const checkRoleAdmin = useMemo(() => {
    if (user?.data?.role === ROLE.SUPER_ADMIN) {
      return true;
    }
    return false;
  }, [user?.data?.role]);
  console.log(
    "🚀 ~ file: FormProblem.tsx:125 ~ checkRoleAdmin ~ checkRoleAdmin:",
    checkRoleAdmin
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
              label="Vấn đề"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập vấn đề" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              label="Lãnh vực"
              name="industry"
              rules={[{ required: true, message: "Vui lòng nhập lãnh vực" }]}
            >
              <Select
                options={
                  map(problemIndustries, (industry) => {
                    return {
                      label: industry.label,
                      value: industry.value,
                    };
                  }) ?? []
                }
              />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              label="Liên hệ"
              name="contact"
              rules={[
                { required: true, message: "Vui lòng nhập cách liên hệ" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          {id && (
            <Col xl={12}>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                  { required: true, message: "Vui lòng chọn trạng thái" },
                ]}
              >
                <Select
                  disabled={!checkRoleAdmin}
                  placeholder="Chọn nhân viên"
                  options={map(PROBLEM_STATUS, (status) => {
                    return {
                      label: status.label,
                      value: status.value,
                    };
                  })}
                />
              </Form.Item>
            </Col>
          )}

          {user?.data.role === ROLE.SUPER_ADMIN && (
            <Col xl={12}>
              <Form.Item
                label="Nhân viên"
                name="adminUserId"
                rules={[{ required: true, message: "Vui lòng chọn nhân viên" }]}
              >
                <Select
                  placeholder="Chọn nhân viên"
                  options={
                    map(adminUsers?.data, (adminUser) => {
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

          {user?.data.role === ROLE.SUPER_ADMIN && (
            <Col xl={12}>
              <Form.Item
                label="Khoa"
                name="departmentId"
                rules={[{ required: true, message: "Vui lòng chọn nhân viên" }]}
              >
                <Select
                  placeholder="Chọn nhân viên"
                  options={
                    map(departments?.data, (department) => {
                      return {
                        label: department.name,
                        value: department.id,
                      };
                    }) ?? []
                  }
                />
              </Form.Item>
            </Col>
          )}
          {user?.data.role === ROLE.SUPER_ADMIN && (
            // mh muốn cho ẩn cái người tiếp nhận bên phía user á cho thằng superAdmin nhập/ đang ẩn đó
            <Col xl={12}>
              <Form.Item label="Người tiếp nhận" name="reciever">
                <Select
                  placeholder="Chọn người tiếp nhận"
                  options={
                    map(problemReciever, (reciever) => {
                      return {
                        label: reciever.label,
                        value: reciever.value,
                      };
                    }) ?? []
                  }
                />
              </Form.Item>
            </Col>
          )}

          <Col xl={12}>
            <Form.Item label="Nội dung phản ánh" name="note">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
          {id ? (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                (!checkRoleAdmin && problem?.data?.status === "processing" ) ||
                problem?.data?.status === "processed"
              }
            >
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
