import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { find } from "lodash";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { problemIndustries } from "../../../assets/data";
import DynamicTable from "../../../components/DynamicTable";
import StatusTag from "../../../components/StatusTag/StatusTag";
import { problemApi } from "../../../services/apis/problem";

const ListProblem = () => {
  const navigate = useNavigate();
  const { data: problems } = useQuery({
    queryKey: ["problems"],
    queryFn: () => problemApi.getAll(),
  });

  const columns = [
    {
      title: "Khoa",
      dataIndex: "departmentName",
      key: "departmentName",
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
      render: (industry: string) => (
        <span>
          {
            find(
              problemIndustries,
              (problemIndustry) => problemIndustry.value === industry
            )?.label
          }
        </span>
      ),
    },
    {
      title: "Liên hệ",
      dataIndex: "contact",
      key: "contact",
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
      dataIndex: "adminUserName",
      key: "adminUserName",
    },
    {
      title: "Người tiếp nhận",
      dataIndex: "reciever",
      key: "reciever",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        return <StatusTag status={status} />;
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
