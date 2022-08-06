import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handlerTransitionContacts = () => {
    navigate('/contacts');
  };

  const handlerTransitionOut = () => {
    navigate('/login');
  };

  return (
    <Card title="Добро пожаловать!" bordered={false} style={{ width: 300 }}>
      <p>Имя</p>
      <p>Ник</p>
      <p>Email</p>
      <div className='home-container__btn'>
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

export default Home;
