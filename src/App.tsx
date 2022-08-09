import './App.scss';
import 'antd/dist/antd.min.css';
import RouteMenu from './components/RouteMenu/RouteMenu';

function App() {
  return (
    <div className="app-container">
      <RouteMenu
        loggedIn={false}
        handleLogin={function (email: string, username: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
}

export default App;
