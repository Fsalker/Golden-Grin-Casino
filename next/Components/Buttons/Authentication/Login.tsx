import { FunctionComponent } from 'react';
import LargeButton from '../Wrappers/LargeButton';
import { useRecoilState } from 'recoil';
import { loggedInState } from '../../../recoil/atoms';

const Login: FunctionComponent = () => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  const handleLogin = () => {
    localStorage.setItem('jwt', 'asdf');
    setLoggedIn(true); // TODO: Actually log in
  };

  return (
    <div onClick={handleLogin}>
      <LargeButton>Login</LargeButton>
    </div>
  );
};

export default Login;
