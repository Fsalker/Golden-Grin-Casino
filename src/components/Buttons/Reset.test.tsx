import { render, screen } from "@testing-library/react";
import Reset from "./Reset";
import { RecoilRoot } from "recoil";

it("Should render Reset Button", () => {
  render(
    <RecoilRoot>
      <Reset />
    </RecoilRoot>
  );

  const element = screen.getByText("Reset");
  expect(element).toBeInTheDocument();
});
