import { Button, Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';
import './Login.scss';

const Login: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    console.log(1111);
  };

  return (
    <div className="login-container">
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        scrollToFirstError
        // className="login__form"
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
  const { getUsers } = UserStore;

  return {
    getUsers,
  };
})(observer(Login));
