import { useQuery } from "@tanstack/react-query";
import { Col, DatePicker, Row, Select } from "antd";
import { find, map } from "lodash";
import moment from "moment";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { problemIndustries } from "../../assets/data";
import DynamicTable from "../../components/DynamicTable";
import { problemApi } from "../../services/apis/problem";

const ProblemReportIndustry = () => {
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [selectedIndustry, setSelectedIndustry] = useState();

  const handleChangeDateRange = (formatString: [string, string]) => {
    setStartDate(formatString?.[0]);
    setEndDate(formatString?.[1]);
  };

  const { data: problems, refetch } = useQuery({
    queryKey: ["problemReport", selectedIndustry, startDate, endDate],
    queryFn: () =>
      problemApi.problemReport({
        startDate: moment(startDate).toDate(),
        endDate: moment(endDate).toDate(),
        industry: selectedIndustry,
      }),
    enabled: false,
  });

  const handleConfirmClick = useCallback(() => {
    if (selectedIndustry && startDate && endDate) {
      refetch();
    }
  }, [endDate, refetch, selectedIndustry, startDate]);

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
    <section>
      <Row gutter={[16, 16]}>
        <Col xl={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn lĩnh vực"
            options={
              map(problemIndustries, (industry) => ({
                label: industry.label,
                value: industry.value,
              })) || []
            }
            onChange={(value) => setSelectedIndustry(value)}
          />
        </Col>
        <Col xl={8}>
          <RangePicker
            style={{ width: "100%" }}
            onChange={(_, formatString: [string, string]) => {
              handleChangeDateRange(formatString);
            }}
          />
        </Col>
        <Col xl={8}>
          <div
            onClick={() => {
              handleConfirmClick();
            }}
          >
            Xác nhận
          </div>
        </Col>
      </Row>
      <DynamicTable
        dataSource={problems?.data}
        columns={columns}
        onRow={(record) => {
          navigate(`/problem/${record.id}`);
        }}
      />
    </section>
  );
};

export default ProblemReportIndustry;
