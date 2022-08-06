import './Сontacts.scss';
import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Table, Button, Popconfirm, Typography } from 'antd';

import ModalForm from '../../Modal/ModalForm/ModalForm';
import ContactAdd from './ContactAdd/ContactAdd';
import ContactEdit from './ContactEdit/ContactEdit';

import originData from '../../../utils/json/contacts.json';

interface IСontacts {
  key: number;
  name: string;
  tel: string;
  email: string;
}

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const Сontacts: React.FC = (
  {
    // handleAllUsers,
    // usersObj,
    // userLang,
    // handleDellUserUnderAdmin,
  },
) => {
  const [dataSource, setDataSource] = useState<IСontacts[]>(originData);
  const [visibleModalAddUser, setVisibleModalAddUser] = useState(false);
  const [visibleModalEditUser, setVisibleModalEditUser] = useState(false);
  const [oneUser, setOneUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   handleAllUsers(token);
  // }, [handleAllUsers]);

  // useEffect(() => {
  //   if (usersObj) {
  //     setDataSource(usersObj);
  //   }
  // }, [usersObj]);

  const handleModalAddUserCancel = () => {
    setVisibleModalAddUser(false);
  };

  const handleModalEditUserCancel = () => {
    setVisibleModalEditUser(false);
    setOneUser(null);
  };

  const handleDelete = async (_id: number) => {
    console.log('dell');
    // await handleDellUserUnderAdmin(token, key)
    //   .then(() => {
    //     const newData = dataSource.filter((item) => item.key !== key);
    //     setDataSource(newData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

    

  const handlerTransitionHome = () => {
    navigate('/home');
  };

  const defaultColumns: (ColumnTypes[number] & { dataIndex: string })[] = [
    {
      title: 'Имя',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      width: '30%',
    },
    {
      title: 'Телефон',
      dataIndex: 'tel',
      width: '15%',
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '30%',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div className="contacts-container__table-operation">
            <Typography.Link
              onClick={() => {
                setVisibleModalEditUser(true);
                // @ts-ignore
                setOneUser(record);
              }}>
              Редактировать
            </Typography.Link>
            <Popconfirm
              title="Вы уверенны, что хотите удалить контакт?"
              // @ts-ignore
              onConfirm={() => handleDelete(record.key)}>
              <Typography.Link>Удалить</Typography.Link>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => ({
    ...col,
    // @ts-ignore
    onCell: (record) => ({
      record,
      dataindex: col.dataIndex,
      title: col.title,
    }),
  }));

  return (
    <>
      <div className="contacts-container">
        <div className="contacts-container__btn">
          <Button
            onClick={() => setVisibleModalAddUser(true)}
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

        {visibleModalAddUser && (
          <ModalForm
            visible={visibleModalAddUser}
            title='Добавление контакта'
            handleModalCancel={handleModalAddUserCancel}
            footer={null}>
            <ContactAdd />
          </ModalForm>
        )}

        {oneUser && (
          <ModalForm
            visible={visibleModalEditUser}
            title='Добавление контакта'
            handleModalCancel={handleModalEditUserCancel}
            footer={null}>
            <ContactEdit oneUser={oneUser} />
          </ModalForm>
        )}

        <Table
          bordered
          dataSource={dataSource}
          // @ts-ignore
          columns={columns}
          // @ts-ignore
          rowKey={(record) => record.key}
        />
      </div>
    </>
  );
};

export default inject(({ UserStore }) => {
  const {
    usersObj,
    handleAllUsers,
    userLang,
    handleEditUserInfoAdmin,
    handleDellUserUnderAdmin,
  } = UserStore;

  return {
    usersObj,
    handleAllUsers,
    userLang,
    handleEditUserInfoAdmin,
    handleDellUserUnderAdmin,
  };
})(observer(Сontacts));
