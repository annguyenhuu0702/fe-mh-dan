import { Modal } from "antd";

interface ModalCommonProps {
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  title: string;
}

const ModalCommon = (props: ModalCommonProps) => {
  const { isOpen, onOk, onCancel, children, title } = props;
  return (
    <Modal title={title} open={isOpen} onOk={onOk} onCancel={onCancel} width={650} centered>
      {children}
    </Modal>
  );
};

export default ModalCommon;
