import { Pagination } from "antd";

interface PaginationCustomProps {
  total: number;
  pageSize: number;
  current: number;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  onChange: (page: number, pageSize: number) => void;
}

const PaginationCustom = (props: PaginationCustomProps) => {
  const {
    total,
    hideOnSinglePage,
    showSizeChanger,
    pageSize,
    current,
    onChange,
  } = props;
  return (
    <Pagination
      current={current}
      onChange={onChange}
      pageSize={pageSize}
      total={total}
      hideOnSinglePage={hideOnSinglePage ?? true} //don't hide pagination if page has one page
      showSizeChanger={showSizeChanger ?? false}
      
    />
  );
};

export default PaginationCustom;
