import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/DynamicTable";
import { adminUserApi } from "../../../services/apis/adminUser";

const ListEmployee = () => {
  const navigate = useNavigate();
  const { data: adminUsers } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: () => adminUserApi.getAll(),
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      key: "userName",
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
      title: "Tên khoa",
      dataIndex: "departmentName",
      key: "departmentName",
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
      <div>code nút thêm vô đây để navigate ra trang thêm</div>
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
