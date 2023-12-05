import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/DynamicTable";
import { adminUserApi } from "../../../services/apis/adminUser";
import { Button } from "antd";

const ListEmployee = () => {
  const navigate = useNavigate();
  const { data: adminUsers } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: () => adminUserApi.getAll(),
  });

  const columns = [
    {
      title: "Khoa",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "Mã nhân viên",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span>{moment(createdAt).format("DD/MM/YYYY")}</span>
      ),
    },
  ];

  return (
    <main>
      <div style={{ padding: "20px 0", float: "right" }}>
        <Button type="primary" style={{ height: "35px", marginRight: "30px" }}>
          Tìm kiếm
        </Button>
        <Button
          type="primary"
          style={{ height: "35px" }}
          onClick={() => {
            navigate("/employee/add");
          }}
        >
          Thêm nhân viên
        </Button>
      </div>
      <DynamicTable
        dataSource={adminUsers?.data.adminUsers}
        columns={columns}
        onRow={(record) => {
          navigate(`/employee/${record.id}`);
        }}
      />
    </main>
  );
};

export default ListEmployee;
