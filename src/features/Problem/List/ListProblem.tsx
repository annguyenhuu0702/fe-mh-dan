import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon"; // Import từ Luxon
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/DynamicTable";
import { problemApi } from "../../../services/apis/problem";
import { Button } from "antd";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";

const ListProblem = () => {
  const navigate = useNavigate();
  const { data: problems } = useQuery({
    queryKey: ["problems"],
    queryFn: () => problemApi.getAll(), 
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sự cố",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thể loại",
      dataIndex: "industry",
      key: "industry",
    },
    {
      title: "Ngày dự kiến",
      dataIndex: "processingDate",
      key: "processingDate",
    },
    {
      title: "Thời gian xử lý",
      dataIndex: "watingdate",
      key: "watingdate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
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
        <Button type="primary" style={{height: "35px"}}> Tìm kiếm</Button>
        <Button type="primary" style={{margin: "0 30px", height: "35px"}}>
          <VerticalAlignBottomOutlined /> Excel
        </Button>
        <Button type="primary" style={{height: "35px"}}> Thêm sự cố</Button>
      </div>
      <DynamicTable
        dataSource={problems?.data.problems}
        columns={columns}
        onRow={(record) => {
          navigate(`/problem/${record.id}`);
        }}
      />
    </main>
  );
};

export default ListProblem;
