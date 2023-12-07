import { useQuery } from "@tanstack/react-query";
import DynamicTable from "../../../components/DynamicTable";
import { departmentApi } from "../../../services/apis/departmentApi";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import moment from "moment";

const ListDepartment = () => {
  const navigate = useNavigate();
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => departmentApi.getAll(),
  });

  const columns = [
    {
      title: "Mã khoa",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên khoa",
      dataIndex: "name",
      key: "name",
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
            navigate("/department/add");
          }}
        >
          Thêm Khoa
        </Button>
      </div>
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
