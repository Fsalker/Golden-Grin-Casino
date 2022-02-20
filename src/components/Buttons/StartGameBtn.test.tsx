import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import StartGameBtn from "./StartGameBtn";

it("Should render Start Game Button", () => {
  render(
    <RecoilRoot>
      <StartGameBtn />
    </RecoilRoot>
  );

  const element = screen.getByText("Start Game");
  expect(element).toBeInTheDocument();
});
