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
  const queryClient = useQueryClient();
  const problem: ProblemResponse | undefined = queryClient.getQueryData([
    "problem",
  ]);

  if (!problem) return <></>;

  return (
    <ModalCommon
      title={problem.title}
      isOpen={isModalOpen}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div>
        <div>
          <span>Người đề xuất: </span>
          <span>{problem.adminUserName}</span>
        </div>
        <div>
          <span>Ngày đề xuất: </span>
          <span>{moment(problem.createdAt).format("DD/MM/YYYY")}</span>
        </div>
        <div>
          <span>Người tiếp nhận: </span>
          <span>{problem.reciever}</span>
        </div>
        <div>
          <span>Lãnh vực: </span>
          <span>
            {
              find(
                problemIndustries,
                (problemIndustry) => problemIndustry.value === problem.industry
              )?.label
            }
          </span>
        </div>
        <div>
          <span>Liên hệ: </span>
          <span>{problem.contact}</span>
        </div>
        <div>
          <span>Trạng thái: </span>
          <StatusTag status={problem.status} />
        </div>
        <div>
          <span>Khoa: </span>
          <span>{problem.departmentName}</span>
        </div>
        <div>
          <span>Ngày xử lý: </span>
          <span>{moment(problem.processingDate).format("DD/MM/YYYY")}</span>
        </div>
        <div>
          <span>Ngày chờ: </span>
          <span>{problem.waittingTime}</span>
        </div>
      </div>
    </ModalCommon>
  );
};

export default ModalReportDataProblem;
