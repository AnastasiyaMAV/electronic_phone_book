import './ContactAdd.scss';
import { inject, observer } from 'mobx-react';
import { Form, Input, Tooltip, Button } from 'antd';

const ContactAdd = (
  {
    // loading,
    // errload,
    // setErrload,
    // successLoad,
    // setSuccessLoad,
    // handleAddUserUnderAdmin
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
    console.log('valuesAdd', values);
    // const token = localStorage.getItem('token');
    // await handleAddUserUnderAdmin(
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
        name="contactAdd"
        onFinish={onFinish}
        scrollToFirstError
        className="contactAdd-container"
        initialValues={{
          name: '',
          email: '',
          tel: '',
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
            <Input
              placeholder="Имя"
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
    userLang,
    handleAddUserUnderAdmin,
    handleAllUsers,
    errload,
    setErrload,
    successLoad,
    setSuccessLoad,
  } = UserStore;

  return {
    userLang,
    handleAddUserUnderAdmin,
    handleAllUsers,
    errload,
    setErrload,
    successLoad,
    setSuccessLoad,
  };
})(observer(ContactAdd));
