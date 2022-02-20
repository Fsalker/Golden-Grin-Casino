import { render, screen } from "@testing-library/react";
import Logout from "./Logout";
import { RecoilRoot } from "recoil";

it("Should render Log Out Button", () => {
  render(
    <RecoilRoot>
      <Logout />
    </RecoilRoot>
  );

  const element = screen.getByText("Log Out");
  expect(element).toBeInTheDocument();
});
