import { render, screen } from "@testing-library/react";
import AccountForm from "./AccountForm";
import { RecoilRoot, SetRecoilState } from "recoil";
import { accountFormState } from "../../../recoil/atoms";

it("Should render Register Form", () => {
  const initializeState = ({ set }: { set: SetRecoilState }) => {
    set(accountFormState, "registering");
  };
  render(
    <RecoilRoot initializeState={initializeState}>
      <AccountForm />
    </RecoilRoot>
  );

  const usernameInput = screen.getByPlaceholderText("Your username...");
  const passwordInput = screen.getByPlaceholderText("Your password...");
  const cancelButton = screen.getByText("Cancel");
  const registerButton = screen.getByText("Register");
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();

  expect(registerButton).toBeInTheDocument();
});

it("Should render Login Form", () => {
  const initializeState = ({ set }: { set: SetRecoilState }) => {
    set(accountFormState, "logging in");
  };
  render(
    <RecoilRoot initializeState={initializeState}>
      <AccountForm />
    </RecoilRoot>
  );

  const usernameInput = screen.getByPlaceholderText("Your username...");
  const passwordInput = screen.getByPlaceholderText("Your password...");
  const cancelButton = screen.getByText("Cancel");
  const loginButton = screen.getByText("Login");
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();

  expect(loginButton).toBeInTheDocument();
});

// invisible
