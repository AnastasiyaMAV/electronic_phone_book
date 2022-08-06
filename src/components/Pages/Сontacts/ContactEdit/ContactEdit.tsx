import './ContactEdit.scss';
import { inject, observer } from 'mobx-react';
import { Form, Input, Tooltip, Button } from 'antd';

interface IContactEdit {
  oneUser: Record<string, string | number>;
}

const ContactEdit: React.FC <IContactEdit> = (
  {
    oneUser,
    // loading,
    // errload,
    // setErrload,
    // successLoad,
    // setSuccessLoad,
    // handleEditUserInfoUnderAdmin
  },
) => {
  const [form] = Form.useForm();

  // useEffect(() => {
  //   setErrload();
  // }, [setErrload]);

  // useEffect(() => {
  //   setSuccessLoad();
  // }, [setSuccessLoad]);

  const onFinish = async (values: any) => {
    console.log('valuesEdit', values);
    // const token = localStorage.getItem('token');
    // await handleEditUserInfoUnderAdmin(
      // oneUser.key,
    //   values.name,
    //   values.email,
    //   values.tel,
    // )
    //   .then(async () => {
    //     await handleAllUsers(token);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        name="contactEdit"
        onFinish={onFinish}
        scrollToFirstError
        className="contactEdit-container"
        initialValues={{
          name: oneUser.name,
          email: oneUser.email,
          tel: oneUser.tel,
        }}>
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
            <Input placeholder="Имя" 
            // disabled={loading}
            />
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
          <Input
            placeholder={'Электронный адрес'}
            // disabled={loading}
          />
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
            <Input
              placeholder="Телефон"
              // disabled={loading}
            />
          </Form.Item>
        </Tooltip>

        <Form.Item>
          <div className="contactAdd-containe__btnGroup">
            {/* {
            errload || successLoad ? (
              <>
                <div>{errload}</div>
                <div>{successLoad}</div>
              </>
            ) : ( */}
            <Button
              type="primary"
              htmlType="submit"
              // isabled={loading}
            >
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
  const {
    oneUser,
    userLang,
    handleAddUserUnderAdmin,
    handleAllUsers,
    errload,
    setErrload,
    successLoad,
    setSuccessLoad,
  } = UserStore;

  return {
    oneUser,
    userLang,
    handleAddUserUnderAdmin,
    handleAllUsers,
    errload,
    setErrload,
    successLoad,
    setSuccessLoad,
  };
})(observer(ContactEdit));
