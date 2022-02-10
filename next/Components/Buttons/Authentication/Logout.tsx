import { FunctionComponent } from 'react';
import SmallButton from '../Wrappers/SmallButton';
import { useRecoilState } from 'recoil';
import { loggedInState } from '../../../recoil/atoms';

const Logout: FunctionComponent = () => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  };

  return (
    <div onClick={handleLogout}>
      <SmallButton>Log Out</SmallButton>
    </div>
  );
};

export default Logout;
