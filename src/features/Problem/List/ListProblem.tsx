import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/DynamicTable";
import { problemApi } from "../../../services/apis/problem";
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
        <span>{moment(createdAt).format("DD/MM/YYYY")}</span>
      ),
    },
  ];

  return (
    <main>
      <div>code nút thêm vô đây để navigate ra trang thêm</div>
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
