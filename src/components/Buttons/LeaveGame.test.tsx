import { render, screen } from "@testing-library/react";
import LeaveGame from "./LeaveGame";
import { RecoilRoot } from "recoil";

it("Should render Leave Game Button", () => {
  render(
    <RecoilRoot>
      <LeaveGame />
    </RecoilRoot>
  );

  const element = screen.getByText("Leave Game");
  expect(element).toBeInTheDocument();
});
