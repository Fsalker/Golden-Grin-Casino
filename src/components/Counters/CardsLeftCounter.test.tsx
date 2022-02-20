import { render, screen } from "@testing-library/react";
import CardsLeftCounter from "./CardsLeftCounter";
import { RecoilRoot, SetRecoilState } from "recoil";
import { cardsLeftState } from "../../recoil/atoms";

it("Should render Cards Counter", () => {
  const initializeState = ({ set }: { set: SetRecoilState }) => {
    set(cardsLeftState, 2);
  };
  render(
    <RecoilRoot initializeState={initializeState}>
      <CardsLeftCounter />
    </RecoilRoot>
  );

  const valueDiv = screen.getByText(2);
  const descriptionDiv = screen.getByText("Cards Left");

  expect(valueDiv).toBeInTheDocument();
  expect(descriptionDiv).toBeInTheDocument();
  expect(valueDiv.parentElement).toEqual(descriptionDiv.parentElement);
});
