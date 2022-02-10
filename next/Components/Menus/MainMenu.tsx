import { FunctionComponent } from 'react';
import StartGame from '../Buttons/StartGame';
import Logout from '../Buttons/Authentication/Logout';
import Login from '../Buttons/Authentication/Login';
import Register from '../Buttons/Authentication/Register';

const MainMenu: FunctionComponent = () => {
  const loggedIn = false;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <StartGame />
      <div />
      {!loggedIn && <Register />}
      {!loggedIn && <Login />}
      {loggedIn && <Logout />}
      {/*{!loggedIn && <Register />}*/}
      {/*{!loggedIn && <Login />}*/}
      {/*{loggedIn && <Logout /> }*/}
    </div>
  );
};

export default MainMenu;
