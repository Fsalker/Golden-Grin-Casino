import { FunctionComponent, useEffect } from 'react';
import StartGameBtn from '../Buttons/StartGameBtn';
import Logout from '../Buttons/Authentication/Logout';
import Login from '../Buttons/Authentication/Login';
import Register from '../Buttons/Authentication/Register';
import { useRecoilState } from 'recoil';
import { accountFormState, loggedInState, numCardsInDeckState } from '../../recoil/atoms';
import { checkIfUserIsLoggedIn } from '../../utils/auth';
import AccountForm from '../Buttons/Authentication/AccountForm';

const MainMenu: FunctionComponent = () => {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const [numCardsInDeck, setNumCardsInDeck] = useRecoilState(numCardsInDeckState);
  const [accountFormStatus] = useRecoilState(accountFormState);

  const loggedOutButtons =
    accountFormStatus === 'invisible' ? (
      <>
        <Register />
        <Login />
      </>
    ) : (
      <AccountForm />
    );

  const loggedInButtons = (
    <>
      <Logout />
    </>
  );

  useEffect(() => {
    if (loggedIn === null) {
      setLoggedIn(checkIfUserIsLoggedIn());
    }
  }, []);

  const authButtons = loggedIn ? loggedInButtons : loggedOutButtons;

  return (
    <div className="h-screen">
      <div className="flex flex-col justify-end items-center h-[45%]">
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
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="mt-0" />
        {authButtons}
      </div>
    </div>
  );
};

export default MainMenu;
