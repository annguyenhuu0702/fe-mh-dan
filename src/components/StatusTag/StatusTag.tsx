import { Tag } from "antd";

interface StatusTagProps {
  status: string;
}

const StatusTag = (props: StatusTagProps) => {
  const { status } = props;
  let statusLabel = "";
  let statusColor = "";

  switch (status) {
    case "unprocessed":
      statusLabel = "Chưa xử lý";
      statusColor = "warning";
      break;
    case "processing":
      statusLabel = "Đang xử lý";
      statusColor = "processing";
      break;
    default:
      statusLabel = "Đã xử lý";
      statusColor = "success";
  }

  return <Tag color={statusColor}>{statusLabel}</Tag>;
};

export default StatusTag;
