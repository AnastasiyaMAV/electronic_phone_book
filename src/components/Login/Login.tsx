import React from 'react';
import './Login.scss';
import { Button, Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

interface ILogin {
  handleLogin: (email: string, username: string) => Promise<void>;
  loading: boolean;
}

const Login: React.FC<ILogin> = ({ handleLogin, loading }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; username: string }) => {
    handleLogin(values.email, values.username)
      .then(() => navigate('/home'))
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        scrollToFirstError
        initialValues={{
          email: '',
          password: '',
        }}>
        <Form.Item
          name="email"
          label="E-mail"
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
          <Input
            placeholder="E-mail"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="username"
          label="Пользовательское имя"
          rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]}>
          <Input
            placeholder="Пользовательское имя"
            disabled={loading}
          />
        </Form.Item>

        <Button
          block
          htmlType="submit"
          disabled={loading}
        >
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default inject(({ UserStore }) => {
  const { handleLogin, loading } = UserStore;

  return {
    handleLogin,
    loading
  };
})(observer(Login));
