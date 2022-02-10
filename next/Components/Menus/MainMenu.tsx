import { FunctionComponent, useEffect } from 'react';
import StartGame from '../Buttons/StartGame';
import Logout from '../Buttons/Authentication/Logout';
import Login from '../Buttons/Authentication/Login';
import Register from '../Buttons/Authentication/Register';
import { atom, useRecoilState } from 'recoil';
import { loggedInState } from '../../recoil/atoms';
import { checkIfUserIsLoggedIn } from '../../utils/auth';

const MainMenu: FunctionComponent = () => {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  const loggedOutButtons = (
    <>
      <Register />
      <Login />
    </>
  );

  const loggedInButtons = (
    <>
      <Logout />
    </>
  );

  useEffect(() => {
    console.log(`loggedIn => `, loggedIn);
    if (loggedIn === null) {
      setLoggedIn(checkIfUserIsLoggedIn());
    }
  }, []);

  const authButtons = loggedIn ? loggedInButtons : loggedOutButtons;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <StartGame />
      <div className="mt-0" />
      {authButtons}
    </div>
  );
};

export default MainMenu;
