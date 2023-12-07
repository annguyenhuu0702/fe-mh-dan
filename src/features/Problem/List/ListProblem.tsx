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
      title: "Khoa",
      dataIndex: "",
      key: "",
    },
    {
      title: "Vấn đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Lãnh vực",
      dataIndex: "industry",
      key: "industry",
    },
    {
      title: "Liên hệ",
      dataIndex: "",
      key: "",
    },
    {
      title: "Ngày đề xuất",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span>{moment(createdAt).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Người đề xuất",
      dataIndex: "",
      key: "",
    },
    {
      title: "Người tiếp nhận",
      dataIndex: "",
      key: "",
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
