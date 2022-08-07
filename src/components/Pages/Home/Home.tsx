import { Button, Card } from 'antd';
import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

interface IHomeProps {
  userName: string;
  userEmail: string;
  userUsername: string;
  logOut: () => void;
}

const Home: React.FC<IHomeProps> = ({
  userName,
  userEmail,
  userUsername,
  logOut,
}) => {
  const navigate = useNavigate();

  const handlerTransitionContacts = () => {
    navigate('/contacts');
  };

  const handlerTransitionOut = () => {
    navigate('/login');
    logOut();
  };

  return (
    <Card title="Добро пожаловать!" bordered={false} style={{ width: 300 }}>
      <p>{userName}</p>
      <p>{userUsername}</p>
      <p>{userEmail}</p>
      <div className="home-container__btn">
        <Button type="primary" onClick={handlerTransitionContacts}>
          Перейти в контакты
        </Button>
        <Button type="primary" onClick={handlerTransitionOut}>
          Выйти
        </Button>
      </div>
    </Card>
  );
};

export default inject(({ UserStore }) => {
  const { userName, userEmail, userUsername, logOut } = UserStore;

  return {
    userName,
    userEmail,
    userUsername,
    logOut,
  };
})(observer(Home));
