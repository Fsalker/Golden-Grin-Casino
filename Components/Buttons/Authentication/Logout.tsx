import { FunctionComponent } from "react";
import SmallButton from "../Wrappers/SmallButton";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { loggedInState } from "../../../recoil/atoms";
import apolloClient from "../../../utils/apolloClient";

export const handleLogout = async ({
  setLoggedIn,
}: {
  setLoggedIn: SetterOrUpdater<null | boolean>;
}) => {
  localStorage.removeItem("jwt");
  setLoggedIn(false);
  await apolloClient.resetStore();
};

const Logout: FunctionComponent = () => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return (
    <div onClick={() => handleLogout({ setLoggedIn })}>
      <SmallButton>Log Out</SmallButton>
    </div>
  );
};

export default Logout;
