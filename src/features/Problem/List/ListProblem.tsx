import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/DynamicTable";
import { problemApi } from "../../../services/apis/problem";
import { Button } from "antd";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import moment from "moment";

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
      render: (processingDate: string) => (
        <span>{moment(processingDate).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Thời gian xử lý (Ngày)",
      dataIndex: "waitingDate",
      key: "waitingDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let statusLabel = "";

        switch (status) {
          case "unprocessed":
            statusLabel = "Chưa xử lý";
            break;
          case "processing":
            statusLabel = "Đang xử lý";
            break;
          default:
            statusLabel = "Đã xử lý";
        }
        return <span>{statusLabel}</span>;
      },
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
        <Button type="primary" style={{ height: "35px" }}>
          Tìm kiếm
        </Button>
        <Button type="primary" style={{ margin: "0 30px", height: "35px" }}>
          <VerticalAlignBottomOutlined /> Excel
        </Button>
        <Button
          type="primary"
          style={{ height: "35px" }}
          onClick={() => {
            navigate("/problem/add");
          }}
        >
          Thêm sự cố
        </Button>
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
