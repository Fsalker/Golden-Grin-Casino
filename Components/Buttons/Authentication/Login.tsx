import { FunctionComponent } from "react";
import LargeButton from "../Wrappers/LargeButton";
import { useRecoilState } from "recoil";
import { accountFormState } from "../../../recoil/atoms";

const Login: FunctionComponent = () => {
  const [, setAccountFormStatus] = useRecoilState(accountFormState);

  const handleLogin = () => {
    setAccountFormStatus("logging in");
  };

  return (
    <div onClick={handleLogin}>
      <LargeButton>Login</LargeButton>
    </div>
  );
};

export default Login;
