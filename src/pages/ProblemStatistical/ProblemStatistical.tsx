import { useQuery } from "@tanstack/react-query";
import { Col, DatePicker, DatePickerProps, Row, Tag, Button } from "antd";
import {
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import { map, reduce } from "lodash";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { MdLinearScale } from "react-icons/md";
import { problemApi } from "../../services/apis/problem";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

const ProblemStatistical = () => {
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const { data: problems, refetch } = useQuery({
    queryKey: ["problems", startDate, endDate],
    queryFn: () =>
      problemApi.problemReportStatistical({
        startDate: moment(startDate).toDate(),
        endDate: moment(endDate).toDate(),
      }),
    enabled: false,
  });

  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    const startOfMonth = moment(dateString)
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = moment(dateString).endOf("month").format("YYYY-MM-DD");
    setStartDate(startOfMonth);
    setEndDate(endOfMonth);
  };

  const handleConfirmClick = useCallback(() => {
    if (startDate && endDate) {
      refetch();
    }
  }, [endDate, refetch, startDate]);

  const totalPoblem = useMemo(() => {
    return reduce(problems?.data, (sum, n) => sum + n.totalProblem, 0);
  }, [problems?.data]);

  return (
    <section>
      <div style={{margin: "10px 0"}}>
        <Row gutter={[16, 16]}>
          <Col xl={8}>
            <DatePicker
              onChange={onChange}
              picker="month"
              style={{
                width: "100%",
              }}
            />
          </Col>
          <Col xl={8}>
            <Button
              onClick={() => {
                handleConfirmClick();
              }}
            >
              Xác nhận
            </Button>
          </Col>
        </Row>
      </div>

      <div>
        <div>
          <h2>Thống kê</h2>
          <div>
            <BiSolidBarChartSquare />
          </div>
        </div>

        <div>
          <span>Tổng phiếu sự cố: {totalPoblem}</span>
        </div>

        <div>
          <div>
            <Line
              data={{
                labels: map(problems?.data, "startDate"),
                datasets: [
                  {
                    data: map(problems?.data, "totalProblem"),
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                elements: {
                  point: {
                    radius: 0,
                  },
                  line: {
                    tension: 0.4,
                    borderWidth: 2,
                    borderColor: "#00BB77",
                    backgroundColor: "#00BB77",
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: "#555555",
                      font: {
                        size: 12,
                        family: "Gilroy",
                      },
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: "#555555",
                      font: {
                        size: 12,
                        family: "Gilroy",
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <div>
            <Tag>
              <span>
                <MdLinearScale />
              </span>
              {moment(problems?.data[0].startDate).format("DD/MM/YYYY")}
            </Tag>
            <Tag>
              ------
              {moment(
                problems?.data[problems.data.length - 1].startDate
              ).format("DD/MM/YYYY")}
            </Tag>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatistical;
