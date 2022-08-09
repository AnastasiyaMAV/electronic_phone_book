import './ContactEditAdd.scss';
import { inject, observer } from 'mobx-react';
import { Form, Input, Tooltip, Button } from 'antd';

interface IСontacts {
  id: number;
  name: string;
  tel: string;
  email: string;
}

interface IContactEditAddProps {
  oneContact?: IСontacts;
  onToggleModal: () => void;
  handleEditContact?: (
    id: number,
    name: string,
    email: string,
    tel: string,
  ) => void;
  handleAddContact?: (name: string, email: string, tel: string) => void;
  loading: boolean;
}

const ContactEditAdd: React.FC<IContactEditAddProps> = ({
  oneContact,
  onToggleModal,
  handleEditContact,
  handleAddContact,
  loading,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: { name: string; email: string; tel: string }) => {
    if (oneContact) {
      handleEditContact &&
        handleEditContact(oneContact.id, values.name, values.email, values.tel);
      onToggleModal();
    } else {
      handleAddContact &&
        handleAddContact(values.name, values.email, values.tel);
      onToggleModal();
    }
  };

  return (
    <>
      <Form
        form={form}
        name="contactEdit"
        onFinish={onFinish}
        scrollToFirstError
        className="contactEditAdd-container"
        initialValues={
          oneContact
            ? {
                name: oneContact?.name,
                email: oneContact?.email,
                tel: oneContact?.tel,
              }
            : { name: '', email: '', tel: '' }
        }>
        <Tooltip placement="rightBottom" title="Имя">
          <Form.Item
            name="name"
            label="Имя"
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
                whitespace: true,
              },
            ]}>
            <Input placeholder="Имя" disabled={loading} />
          </Form.Item>
        </Tooltip>

        <Form.Item
          name="email"
          label="Почта"
          rules={[
            {
              type: 'email',
              message: 'Допускается только E-mail',
            },
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]}>
          <Input placeholder={'Электронный адрес'} disabled={loading} />
        </Form.Item>

        <Tooltip placement="rightBottom" title="Телефон">
          <Form.Item
            name="tel"
            label="Телефон"
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              {
                pattern: new RegExp(
                  /^((8|\+7)[- ]?)?(\(?\d{3,4}\)?[- ]?)?[\d\- ]{5,10}$/,
                ),
                message: 'Неверный формат',
              },
            ]}>
            <Input placeholder="Телефон" disabled={loading} />
          </Form.Item>
        </Tooltip>

        <Form.Item>
          <div className="contactEditAdd-containe__btnGroup">
            {/* {
            errload || successLoad ? (
              <>
                <div>{errload}</div>
                <div>{successLoad}</div>
              </>
            ) : ( */}
            <Button type="primary" htmlType="submit" disabled={loading}>
              Сохранить
            </Button>
            {/* )} */}
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default inject(({ UserStore }) => {
  const { oneUser, handleEditContact, handleAddContact, loading } = UserStore;

  return {
    oneUser,
    handleEditContact,
    handleAddContact,
    loading,
  };
})(observer(ContactEditAdd));
