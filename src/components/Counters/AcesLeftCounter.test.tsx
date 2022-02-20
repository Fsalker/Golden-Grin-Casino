import { render, screen } from "@testing-library/react";
import AcesLeftCounter from "./AcesLeftCounter";
import { RecoilRoot, SetRecoilState } from "recoil";
import { acesLeftState } from "../../recoil/atoms";

it("Should render Aces Counter", () => {
  const initializeState = ({ set }: { set: SetRecoilState }) => {
    set(acesLeftState, 3);
  };
  render(
    <RecoilRoot initializeState={initializeState}>
      <AcesLeftCounter />
    </RecoilRoot>
  );

  const valueDiv = screen.getByText(3);
  const descriptionDiv = screen.getByText("Aces Left");

  expect(valueDiv).toBeInTheDocument();
  expect(descriptionDiv).toBeInTheDocument();
  expect(valueDiv.parentElement).toEqual(descriptionDiv.parentElement);
});
