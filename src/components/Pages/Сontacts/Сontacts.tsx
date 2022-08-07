import './Сontacts.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Table, Button, Popconfirm, Typography } from 'antd';

import ModalForm from '../../Modal/ModalForm/ModalForm';
import ContactAdd from './ContactAdd/ContactAdd';
import ContactEdit from './ContactEdit/ContactEdit';
import { ColumnsType } from 'antd/lib/table';

interface IContactProps {
  getContacts: () => void;
  userContacts: IСontacts[];
}
interface IСontacts {
  key: number;
  name: string;
  tel: string;
  email: string;
}

const Сontacts: React.FC<IContactProps> = ({
  getContacts,
  userContacts,
  // handleDellUserUnderAdmin,
}) => {
  const [isAddContactModal, setIsAddContactModal] = useState(false);
  const [isEditContactModal, setIsEditContactModal] = useState(false);
  const [oneContact, setOneContact] = useState<IСontacts | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const handleModalAddContactCancel = () => {
    setIsAddContactModal(false);
  };

  const handleModalEditContactCancel = () => {
    setIsEditContactModal(false);
    setOneContact(null);
  };

  const handleDelete = async (_id: number) => {
    console.log('dell');
    // await handleDellUserUnderAdmin(token, key)
    //   .then(() => {
    //     const newData = userContacts.filter((item) => item.key !== key);
    //     setDataSource(newData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handlerTransitionHome = () => {
    navigate('/home');
  };

  const columns: ColumnsType<IСontacts> = [
    { title: 'Имя', dataIndex: 'name', key: 'name', width: '20%' },
    { title: 'Почта', dataIndex: 'email', key: 'email', width: '30%' },
    { title: 'Телефон', dataIndex: 'tel', key: 'tel', width: '15%' },
    {
      title: '',
      dataIndex: 'operation',
      width: '30%',
      render: (_, record) =>
        userContacts.length >= 1 ? (
          <div className="contacts-container__table-operation">
            <Typography.Link
              onClick={() => {
                setIsEditContactModal(true);
                setOneContact(record);
              }}>
              Редактировать
            </Typography.Link>
            <Popconfirm
              title="Вы уверенны, что хотите удалить контакт?"
              onConfirm={() => handleDelete(record.key)}>
              <Typography.Link>Удалить</Typography.Link>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];
  return (
    <>
      <div className="contacts-container">
        <div className="contacts-container__btn">
          <Button
            onClick={() => setIsAddContactModal(true)}
            type="primary"
            style={{
              marginBottom: 16,
            }}>
            Добавить контакт
          </Button>
          <Button
            onClick={handlerTransitionHome}
            type="primary"
            style={{
              marginBottom: 16,
            }}>
            На главную
          </Button>
        </div>

        {isAddContactModal && (
          <ModalForm
            visible={isAddContactModal}
            title="Добавление контакта"
            handleModalCancel={handleModalAddContactCancel}
            footer={null}>
            <ContactAdd />
          </ModalForm>
        )}

        {oneContact && (
          <ModalForm
            visible={isEditContactModal}
            title="Редактирование контакта"
            handleModalCancel={handleModalEditContactCancel}
            footer={null}>
            <ContactEdit oneContact={oneContact} />
          </ModalForm>
        )}

        <Table bordered dataSource={userContacts} columns={columns} />
      </div>
    </>
  );
};

export default inject(({ UserStore }) => {
  const {
    getContacts,
    userContacts,
    handleEditUserInfoAdmin,
    handleDellUserUnderAdmin,
  } = UserStore;

  return {
    getContacts,
    userContacts,
    handleEditUserInfoAdmin,
    handleDellUserUnderAdmin,
  };
})(observer(Сontacts));
