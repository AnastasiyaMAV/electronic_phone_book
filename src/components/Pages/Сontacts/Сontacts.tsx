import './Сontacts.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import {
  Table,
  Button,
  Popconfirm,
  Typography,
  InputRef,
  Input,
  Space,
} from 'antd';

import ModalForm from '../../ModalForm/ModalForm';
import ContactAdd from './ContactAdd/ContactAdd';
import ContactEdit from './ContactEdit/ContactEdit';
import { ColumnsType } from 'antd/lib/table';
import { ColumnType, FilterConfirmProps } from 'antd/lib/table/interface';

import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Loading from '../../Loading/Loading';
import Errload from '../../Errload/Errload';

interface IContactProps {
  getContacts: () => void;
  userContacts: IСontacts[];
  loading: boolean;
  errload: boolean;
}
interface IСontacts {
  key: number;
  name: string;
  tel: string;
  email: string;
}

type DataIndex = keyof IСontacts;

const Сontacts: React.FC<IContactProps> = ({
  getContacts,
  userContacts,
  loading,
  errload,
  // handleDellUserUnderAdmin,
}) => {
  const [isAddContactModal, setIsAddContactModal] = useState(false);
  const [isEditContactModal, setIsEditContactModal] = useState(false);
  const [oneContact, setOneContact] = useState<IСontacts | null>(null);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const navigate = useNavigate();

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

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
    getContacts();
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): ColumnType<IСontacts> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Найти
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}>
            Сбросить
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}>
            Фильтровать
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<IСontacts> = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
      width: '30%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Телефон',
      dataIndex: 'tel',
      key: 'tel',
      width: '15%',
      ...getColumnSearchProps('tel'),
    },
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

  if (loading) {
    return <Loading />;
  }

  if (errload) {
    return <Errload />;
  }

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
            <ContactEdit
              oneContact={oneContact}
              handleEditContact={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
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
    loading,
    errload,
    handleEditUserInfoAdmin,
    handleDellUserUnderAdmin,
  } = UserStore;

  return {
    getContacts,
    userContacts,
    loading,
    errload,
    handleEditUserInfoAdmin,
    handleDellUserUnderAdmin,
  };
})(observer(Сontacts));
