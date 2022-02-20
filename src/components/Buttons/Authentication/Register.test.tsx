import { render, screen } from "@testing-library/react";
import Register from "./Register";
import { RecoilRoot } from "recoil";

it("Should render Register Button", () => {
  render(
    <RecoilRoot>
      <Register />
    </RecoilRoot>
  );

  const element = screen.getByText("Register");
  expect(element).toBeInTheDocument();
});
