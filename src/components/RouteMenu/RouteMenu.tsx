import './RouteMenu.scss';
import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Empty from '../Pages/Empty/Empty';
import Home from '../Pages/Home/Home';
import Сontacts from '../Pages/Сontacts/Сontacts';
import Auth from '../Auth/Auth';

interface IRouteMenuProps {
  loggedIn: boolean;
  handleLogin: (email: string, username: string) => void;
}

const RouteMenu: React.FC<IRouteMenuProps> = ({ loggedIn, handleLogin }) => {
  useEffect(() => {
    const LOCAL_USERNAME = localStorage.getItem('username');
    const LOCAL_EMAIL = localStorage.getItem('email');
    if (LOCAL_USERNAME && LOCAL_EMAIL) {
      handleLogin(LOCAL_EMAIL, LOCAL_USERNAME);
    }
  }, [localStorage.getItem('username'), localStorage.getItem('email')]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Auth loggedIn={loggedIn}>
              <Home
                userName={''}
                userEmail={''}
                userUsername={''}
                logOut={function (): void {
                  throw new Error('Функция не реализована.');
                }}
                loading={false}
              />
            </Auth>
          }
        />

        <Route
          path="/login"
          element={
            <Login
              handleLogin={function (email: string, username: string): void {
                throw new Error('Функция не реализована.');
              }}
            />
          }
        />

        <Route
          path="/home"
          element={
            <Auth loggedIn={loggedIn}>
              <Home
                userName={''}
                userEmail={''}
                userUsername={''}
                logOut={function (): void {
                  throw new Error('Функция не реализована.');
                }}
                loading={false}
              />
            </Auth>
          }
        />

        <Route
          path="/contacts"
          element={
            <Auth loggedIn={loggedIn}>
              <Сontacts
                getContacts={function (): void {
                  throw new Error('Функция не реализована.');
                }}
                userContacts={[]}
                loading={false}
                errload={false}
              />
            </Auth>
          }
        />
        <Route path="*" element={<Empty />} />
      </Routes>
    </Router>
  );
};

export default inject(({ UserStore }) => {
  const { loggedIn, handleLogin } = UserStore;

  return {
    loggedIn,
    handleLogin,
  };
})(observer(RouteMenu));
