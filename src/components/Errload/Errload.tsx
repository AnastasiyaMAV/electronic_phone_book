import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Errload: React.FC = () => {
  const navigate = useNavigate();
  const handlerTransitionHome = () => {
    navigate('/home');
  };
  return (
    <>
      <Result
        status="error"
        title="Кажется, что-то пошло не так ..."
        subTitle="Пожалуйста, попробуйте зайти чуть позже."
      />

      <Button
        onClick={handlerTransitionHome}
        type="primary"
        style={{
          marginBottom: 16,
        }}>
        Попробовать снова
      </Button>
    </>
  );
};

export default Errload;
