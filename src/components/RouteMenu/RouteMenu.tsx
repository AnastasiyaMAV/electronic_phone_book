import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from '../Auth';
import Login from '../Login';
import Empty from '../Pages/Empty';
import Home from '../Pages/Home';
import Сontacts from '../Pages/Сontacts';

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
                  throw new Error('Function not implemented');
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
              handleLogin={function (
                email: string,
                username: string,
              ): Promise<void> {
                throw new Error('Function not implemented');
              }}
              loading={false}
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
                  throw new Error('Function not implemented');
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
                  throw new Error('Function not implemented');
                }}
                userContacts={[]}
                loading={false}
                errload={false}
                handleDelleteContact={function (id: number): void {
                  throw new Error('Function not implemented');
                }}
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
