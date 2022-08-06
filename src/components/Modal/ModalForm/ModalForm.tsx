import './ModalForm.scss';
import { Modal } from 'antd';

interface IModalForm {
  visible: boolean;
  title: string;
  handleModalOk?: () => void;
  handleModalCancel?: () => void;
  footer: null;
  children: React.ReactNode;
}

const ModalForm: React.FC<IModalForm> = ({
  visible,
  title,
  handleModalOk,
  handleModalCancel,
  footer,
  children,
}) => (
  <Modal
    visible={visible}
    title={title}
    onOk={handleModalOk}
    onCancel={handleModalCancel}
    footer={footer}>
    {children}
  </Modal>
);

export default ModalForm;
