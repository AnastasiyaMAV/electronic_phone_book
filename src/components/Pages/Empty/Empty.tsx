import './Empty.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Empty: React.FC = () => {
  const navigate = useNavigate();
  const handlerTransitionHome = () => {
    navigate('/home');
  };
  return (
    <div className="empty-container">
      <div>Кажется вы забрели не туда...</div>
      <Button
        onClick={handlerTransitionHome}
        type="primary"
        style={{
          marginBottom: 16,
        }}>
        На главную
      </Button>
    </div>
  );
};

export default Empty;
