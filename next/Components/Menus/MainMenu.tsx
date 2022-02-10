import { FunctionComponent, useEffect } from 'react';
import StartGameBtn from '../Buttons/StartGameBtn';
import Logout from '../Buttons/Authentication/Logout';
import Login from '../Buttons/Authentication/Login';
import Register from '../Buttons/Authentication/Register';
import { useRecoilState } from 'recoil';
import { loggedInState, numCardsInDeckState } from '../../recoil/atoms';
import { checkIfUserIsLoggedIn } from '../../utils/auth';

const MainMenu: FunctionComponent = () => {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  // const [, setGameInProgress] = useRecoilState(gameInProgressState);
  const [numCardsInDeck, setNumCardsInDeck] = useRecoilState(numCardsInDeckState);

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
    if (loggedIn === null) {
      setLoggedIn(checkIfUserIsLoggedIn());
      // setGameInProgress(localStorage.getItem('gameInProgress') === 'true' ? true : false);
    }
  }, []);

  const authButtons = loggedIn ? loggedInButtons : loggedOutButtons;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <StartGameBtn />
      <div className="flex">
        <span className="font-courierPrimeBold">
          Cards per suit {numCardsInDeck / 4 < 10 && '\u00A0'}({numCardsInDeck / 4}):
        </span>
        <input
          type="range"
          min="2"
          max="20"
          value={numCardsInDeck / 4}
          onChange={(e) => setNumCardsInDeck(parseInt(e.target.value) * 4)}
        />
      </div>
      <div className="mt-0" />
      {authButtons}
    </div>
  );
};

export default MainMenu;
