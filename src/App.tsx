import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css';

import RouteMenu from './components/RouteMenu/RouteMenu';

function App() {
  return (
    <div className="app-container">
      <RouteMenu
        getUsers={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
}

export default App;
