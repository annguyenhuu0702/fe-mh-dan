import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon"; // Import từ Luxon
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
  console.log(
    "🚀 ~ file: ListEmployee.tsx:13 ~ ListEmployee ~ adminUsers:",
    adminUsers
  );

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
        <span>{DateTime.fromISO(createdAt).toLocaleString()}</span>
      ),
    },
  ];

  return (
    <main>
      <div style={{ padding: "20px 0", float: "right" }}>
        <Button type="primary" style={{ height: "35px", marginRight: "30px" }}>
          {" "}
          Tìm kiếm
        </Button>
        <Button type="primary" style={{ height: "35px" }}>
          {" "}
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
