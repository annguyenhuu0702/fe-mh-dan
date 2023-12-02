import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon"; // Import từ Luxon
import DynamicTable from "../../../components/DynamicTable";
import { departmentApi } from "../../../services/apis/departmentApi";
import { useNavigate } from "react-router-dom";

const ListDepartment = () => {
  const navigate = useNavigate();
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => departmentApi.getAll(),
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã khoa",
      dataIndex: "code",
      key: "code",
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
      <div>code nút thêm vô đây để navigate ra trang thêm</div>
      <DynamicTable
        dataSource={departments?.data.departments}
        columns={columns}
        onRow={(record) => {
          navigate(`/department/${record.id}`);
        }}
      />
    </main>
  );
};

export default ListDepartment;
