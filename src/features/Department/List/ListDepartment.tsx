import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/DynamicTable";
import PaginationCustom from "../../../components/Pagination/Pagination";
import { departmentApi } from "../../../services/apis/departmentApi";

const ListDepartment = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1); //muốn 1 trang có bao nhiêu phần tử thì bỏ vào đây
  const { data: departments, refetch } = useQuery({
    queryKey: ["departments"],
    queryFn: () =>
      departmentApi.getAll({
        page: page,
        limit: pageSize,
      }),
    enabled: true,
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
      <PaginationCustom
        total={departments?.data?.meta?.total}
        current={page}
        pageSize={pageSize}
        onChange={(page: number, pageSize: number) => {
          handleChangPage(page, pageSize);
        }}
      />
    </main>
  );
};

export default ListDepartment;
