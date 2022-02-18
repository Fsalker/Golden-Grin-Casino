import { FunctionComponent } from "react";
import LargeButton from "../Wrappers/LargeButton";
import { useRecoilState } from "recoil";
import { accountFormState } from "../../../recoil/atoms";

const Register: FunctionComponent = () => {
  const [, setAccountFormStatus] = useRecoilState(accountFormState);

  const handleRegister = () => {
    setAccountFormStatus("registering");
  };

  return (
    <div onClick={handleRegister}>
      <LargeButton>Register</LargeButton>
    </div>
  );
};

export default Register;
