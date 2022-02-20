import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { RecoilRoot } from "recoil";

it("Should render Login Button", () => {
  render(
    <RecoilRoot>
      <Login />
    </RecoilRoot>
  );

  const element = screen.getByText("Login");
  expect(element).toBeInTheDocument();
});
