import { useQuery } from "@tanstack/react-query";
import { Col, DatePicker, Row, Select } from "antd";
import { map } from "lodash";
import moment from "moment";
import { useState } from "react";
import { departmentApi } from "../../services/apis/departmentApi";
import { problemApi } from "../../services/apis/problem";

const ProblemReportByDepartment = () => {
  const { RangePicker } = DatePicker;

  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [selectedDepartment, setSelectedDepartment] = useState();

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => departmentApi.getAll(),
  });

  const handleChangeDateRange = (formatString: [string, string]) => {
    setStartDate(formatString?.[0]);
    setEndDate(formatString?.[1]);
  };

  const handleConfirmClick = () => {
    // Check if both department and date range are selected
    if (selectedDepartment && startDate && endDate) {
      return problemApi.problemReport({
        startDate: moment(startDate).toDate(),
        endDate: moment(endDate).toDate(),
        departmentId: selectedDepartment,
      });
    }
  };

  return (
    <section>
      <Row gutter={[16, 16]}>
        <Col xl={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn khoa"
            options={
              map(departments?.data.departments, (department) => ({
                label: department.name,
                value: department.id,
              })) || []
            }
            onChange={(value) => setSelectedDepartment(value)}
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
    </section>
  );
};

export default ProblemReportByDepartment;
