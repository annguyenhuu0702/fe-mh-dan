import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import DynamicTable from "../../../components/DynamicTable";
import PaginationCustom from "../../../components/Pagination/Pagination";
import { adminUserApi } from "../../../services/apis/adminUser";
import { Button } from "antd";

const ListEmployee = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); //muốn 1 trang có bao nhiêu phần tử thì bỏ vào đây
  const { data: adminUsers, refetch } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: () =>
      adminUserApi.getAll({
        page: page,
        limit: pageSize,
      }),
    enabled: true,
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

  const handleChangPage = useCallback((page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  }, []);

  useEffect(() => {
    refetch();
  }, [page, pageSize, refetch]);

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
      <div style={{ marginTop: "5px" }}></div>
      <PaginationCustom
        total={adminUsers?.data?.meta?.total}
        current={page}
        pageSize={pageSize}
        onChange={(page: number, pageSize: number) => {
          handleChangPage(page, pageSize);
        }}
      />
    </main>
  );
};

export default ListEmployee;
