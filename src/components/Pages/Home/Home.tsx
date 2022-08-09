import './Home.scss';
import { Button, Card } from 'antd';
import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading/Loading';

interface IHomeProps {
  userName: string;
  userEmail: string;
  userUsername: string;
  logOut: () => void;
  loading: boolean;
}

const Home: React.FC<IHomeProps> = ({
  userName,
  userEmail,
  userUsername,
  logOut,
  loading,
}) => {
  const navigate = useNavigate();

  const handlerTransitionContacts = () => {
    navigate('/contacts');
  };

  const handlerTransitionOut = () => {
    navigate('/');
    logOut();
  };
  
  if (loading) {
    return <Loading />;
  }

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
  const { userName, userEmail, userUsername, logOut, loading } = UserStore;

  return {
    userName,
    userEmail,
    userUsername,
    logOut,
    loading
  };
})(observer(Home));
