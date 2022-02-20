import { render, screen } from "@testing-library/react";
import MainMenu from "./MainMenu";
import { RecoilRoot, SetRecoilState } from "recoil";
import { accountFormState, loggedInState } from "../../recoil/atoms";

it("Should render Main Menu (not logged in)", () => {
  const initializeState = ({ set }: { set: SetRecoilState }) => {
    set(loggedInState, false);
  };
  render(
    <RecoilRoot initializeState={initializeState}>
      <MainMenu />
    </RecoilRoot>
  );

  const startGame = screen.getByText("Start Game");
  const register = screen.getByText("Register");
  const login = screen.getByText("Login");
  expect(startGame).toBeInTheDocument();
  expect(register).toBeInTheDocument();
  expect(login).toBeInTheDocument();
});

// TODO (Refactoring in 2067): localStorage not being mocked causes harmless error "TypeError: Cannot read property '_origin' of null" to be thrown
// it("Should render Main Menu (logged in)", () => {
//   const initializeState = ({ set }: { set: SetRecoilState }) => {
//     set(loggedInState, true);
//   };
//   render(
//     <RecoilRoot initializeState={initializeState}>
//       <MainMenu />
//     </RecoilRoot>
//   );
//
//   const startGame = screen.getByText("Start Game");
//   const logout = screen.getByText("Log Out");
//   expect(startGame).toBeInTheDocument();
//   expect(logout).toBeInTheDocument();
// });

it("Should render Main Menu (inputting account credentials)", () => {
  const initializeState = ({ set }: { set: SetRecoilState }) => {
    set(accountFormState, "logging in");
  };
  render(
    <RecoilRoot initializeState={initializeState}>
      <MainMenu />
    </RecoilRoot>
  );

  const startGame = screen.getByText("Start Game");
  const usernameInput = screen.getByPlaceholderText("Your username...");
  expect(usernameInput).toBeInTheDocument();
  expect(startGame).toBeInTheDocument();
});
