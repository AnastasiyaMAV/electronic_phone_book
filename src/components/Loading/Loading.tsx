import './Loading.scss';
import { Spin } from 'antd';
import React from 'react';

const Loading: React.FC = () => (
  <div className="loading-container">
    <Spin size="large"/>
  </div>
);

export default Loading;