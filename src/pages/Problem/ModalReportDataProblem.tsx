import React, { useRef, RefObject } from "react";
import { useReactToPrint } from "react-to-print";
import { useQueryClient } from "@tanstack/react-query";
import ModalCommon from "../../components/Modal/Modal";
import { ProblemResponse } from "../../types/problem";
import moment from "moment";
import { find } from "lodash";
import { problemIndustries } from "../../assets/data";
import StatusTag from "../../components/StatusTag";

interface ModalReportDataProblemProps {
  isModalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const ModalReportDataProblem = (props: ModalReportDataProblemProps) => {
  const { isModalOpen, onOk, onCancel } = props;
  const printRef: RefObject<HTMLDivElement> = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const queryClient = useQueryClient();
  const problem: ProblemResponse | undefined = queryClient.getQueryData([
    "problem",
  ]);

  if (!problem) return <></>;

  return (
    <div >
      <ModalCommon
        title="Bệnh viện Nhi Đồng 2"
        isOpen={isModalOpen}
        onOk={onOk}
        onCancel={onCancel}
      >
        <div style={{ paddingTop: "15px", margin: "0 20px"}} ref={printRef as React.MutableRefObject<HTMLDivElement>}>
          <h2
            style={{
              textTransform: "uppercase",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Phiếu ghi nhận sự cố
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
            <div style={{ fontSize: "15px" }}>
              <span style={{ fontWeight: "700" }}>Người đề xuất: </span>
              <span>{problem.adminUserName}</span>
            </div>
            <div style={{ fontSize: "15px" }}>
              <span style={{ fontWeight: "700" }}>Khoa: </span>
              <span>{problem.departmentName}</span>
            </div>
          </div>

          <div style={{ fontSize: "15px", paddingTop: "15px" }}>
            <span style={{ fontWeight: "700" }}>Liên hệ: </span>
            <span>{problem.contact}</span>
          </div>
          <div style={{ fontSize: "15px", paddingTop: "15px" }}>
            <span style={{ fontWeight: "700" }}>Vấn đề: </span>
            <span>{problem.title}</span>
          </div>
          <div style={{ fontSize: "15px", paddingTop: "15px" }}>
            <span style={{ fontWeight: "700" }}>Lãnh vực: </span>
            <span>
              {
                find(
                  problemIndustries,
                  (problemIndustry) =>
                    problemIndustry.value === problem.industry
                )?.label
              }
            </span>
          </div>
          <div style={{ fontSize: "15px", paddingTop: "15px" }}>
            <span style={{ fontWeight: "700" }}>Nội dung: </span>
            <span>{problem.note}</span>
          </div>
          <div style={{ fontSize: "15px", paddingTop: "15px" }}>
            <span style={{ fontWeight: "700" }}>Người tiếp nhận: </span>
            <span>{problem.reciever}</span>
          </div>
          <div style={{ fontSize: "15px", paddingTop: "15px" }}>
            <span style={{ fontWeight: "700" }}>Ngày đề xuất: </span>
            <span>{moment(problem.createdAt).format("DD/MM/YYYY")}</span>
          </div>
          <div style={{ fontSize: "15px", paddingTop: "15px" }}>
            <span style={{ fontWeight: "700" }}>Ngày xử lý: </span>
            <span>{moment(problem.processingDate).format("DD/MM/YYYY")}</span>
          </div>
          <div style={{ fontSize: "15px", paddingTop: "15px" }}>
            <span style={{ fontWeight: "700" }}>Ngày chờ: </span>
            <span>{problem.waittingTime}</span>
          </div>
          <div
            style={{
              fontSize: "15px",
              paddingTop: "15px",
              marginBottom: "50px",
            }}
          >
            <span style={{ fontWeight: "700" }}>Trạng thái: </span>
            <StatusTag status={problem.status} />
          </div>
          <button onClick={handlePrint}>In</button>
        </div>
      </ModalCommon>
    </div>
  );
};

export default ModalReportDataProblem;
