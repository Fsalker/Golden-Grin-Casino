import { FunctionComponent } from 'react';
import SmallButton from '../Wrappers/SmallButton';
import { useRecoilState } from 'recoil';
import { loggedInState } from '../../../recoil/atoms';
import apolloClient from '../../../utils/apolloClient';

const Logout: FunctionComponent = () => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  const handleLogout = async () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    await apolloClient.resetStore();
  };

  return (
    <div onClick={handleLogout}>
      <SmallButton>Log Out</SmallButton>
    </div>
  );
};

export default Logout;
