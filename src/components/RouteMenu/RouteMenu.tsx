import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Empty from '../Pages/Empty/Empty';
import Home from '../Pages/Home/Home';
import Сontacts from '../Pages/Сontacts/Сontacts';
import './RouteMenu.scss';

interface IRouteMenu {
  getUsers: () => void;
  loggedIn: boolean;
}

const RouteMenu: React.FC<IRouteMenu> = ({ getUsers, loggedIn }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              handleLogin={function (email: string, username: string): void {
                throw new Error('Function not implemented.');
              }}
            />
          }
        />

        <Route
          path="/home"
          element={
            loggedIn ? (
              <Home userName={''} userEmail={''} userUsername={''} logOut={function (): void {
                throw new Error('Function not implemented.');
              } } />
            ) : (
              <Login
                handleLogin={function (email: string, username: string): void {
                  throw new Error('Function not implemented.');
                }}
              />
            )
          }
        />

        <Route
          path="/contacts"
          element={
            loggedIn ? (
              <Сontacts getContacts={function (): void {
                throw new Error('Function not implemented.');
              } } contactsUserMass={[]}/>
            ) : (
              <Login
                handleLogin={function (email: string, username: string): void {
                  throw new Error('Function not implemented.');
                }}
              />
            )
          }
        />
{/* 
        <Route
          path="*"
          element={
            loggedIn ? (
              <Home userName={''} userEmail={''} userUsername={''} logOut={function (): void {
                throw new Error('Function not implemented.');
              } } />
            ) : (
              <Login
                handleLogin={function (email: string, username: string): void {
                  throw new Error('Function not implemented.');
                }}
              />
            )
          }
        /> */}
        <Route path="*" element={<Empty />} />
      </Routes>
    </Router>
  );
};

export default inject(({ UserStore }) => {
  const { getUsers, loggedIn } = UserStore;

  return {
    getUsers,
    loggedIn,
  };
})(observer(RouteMenu));
