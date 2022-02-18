import { FunctionComponent, useState } from "react";
import { useRecoilState } from "recoil";
import { accountFormState, loggedInState } from "../../../recoil/atoms";
import SmallButton from "../Wrappers/SmallButton";
import {
  authenticationFailedErrorMessage,
  usernameTakenErrorMessage,
} from "../../../pages/api/gql-modules/types";
import loginRequest from "../../gql-requests/login";
import registerRequest from "../../gql-requests/register";

const AccountForm: FunctionComponent = () => {
  const [accountFormStatus, setAccountFormStatus] =
    useRecoilState(accountFormState);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setLoggedIn] = useRecoilState(loggedInState);

  // const headerText =
  //   accountFormStatus === 'logging in' ? 'Log into your account' : 'Register a new account';
  const submitText = accountFormStatus === "logging in" ? "Login" : "Register";

  const handleCancel = () => {
    setAccountFormStatus("invisible");
  };

  const handleSubmit = async () => {
    try {
      let jwt;
      if (accountFormStatus === "logging in") {
        const { data } = await loginRequest({ username, password });
        jwt = data.login;
      } else {
        const { data } = await registerRequest({ username, password });
        jwt = data.register;
      }

      localStorage.setItem("jwt", jwt);
      setErrorMessage("");
      setAccountFormStatus("invisible");
      setLoggedIn(jwt);
    } catch (err: any) {
      if (
        [usernameTakenErrorMessage, authenticationFailedErrorMessage].includes(
          err.message
        )
      ) {
        setErrorMessage(err.message);
      } else {
        console.error(err);
        setErrorMessage("An unexpected error has occurred. Please try again.");
      }
    }
  };

  return (
    <div className="mt-8 w-[400px] font-courierPrimeBold">
      {/*<h1 className="text-game-yellow">{headerText}</h1>*/}
      <div>
        <input
          className="mb-2 w-full"
          placeholder="Your username..."
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div>
        <input
          id="dhfsdhi"
          className="w-full"
          type="password"
          placeholder="Your password..."
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="flex justify-between">
        <div onClick={handleCancel}>
          <SmallButton>Cancel</SmallButton>
        </div>
        <div onClick={handleSubmit}>
          <SmallButton>{submitText}</SmallButton>
        </div>
      </div>
      <div className="flex justify-center mt-2 font-courierPrime text-red-500">
        {errorMessage}
      </div>
    </div>
  );
};

export default AccountForm;
