import { Button, Form, Input } from 'antd';

import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

interface ILogin {
  handleLogin: (email: string, username: string) => void;
}

const Login: React.FC<ILogin> = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; username: string }) => {
    await handleLogin(values.email, values.username)
    //@ts-ignore
      .then(() => navigate('/home'))
      .catch((err: any) => console.log(err));

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
            // disabled={loading}
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
            // disabled={loading}
          />
        </Form.Item>

        <Button
          block
          htmlType="submit"
          // disabled={loading}
        >
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default inject(({ UserStore }) => {
  const { handleLogin } = UserStore;

  return {
    handleLogin,
  };
})(observer(Login));
