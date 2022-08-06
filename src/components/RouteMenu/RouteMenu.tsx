import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Home from '../Pages/Home/Home';
import Сontacts from '../Pages/Сontacts/Сontacts';
import './RouteMenu.scss';

interface IRouteMenu {
  getUsers: () => void;
}

const RouteMenu: React.FC<IRouteMenu> = ({ getUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/contacts" element={<Сontacts />} />

        {/* <Route path="*" element={loggedIn ? <Home /> : <Login />} /> */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default inject(({ UserStore }) => {
  const { getUsers } = UserStore;

  return {
    getUsers,
  };
})(observer(RouteMenu));
