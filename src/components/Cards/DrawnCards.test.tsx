import { render, screen } from "@testing-library/react";
import DrawnCards from "./DrawnCards";
import { RecoilRoot, SetRecoilState } from "recoil";
import {
  cardsDrawnState,
  gameState,
  numCardsInDeckState,
} from "../../recoil/atoms";

it("Should render 3 Drawn cards", () => {
  const initializeState = ({ set }: { set: SetRecoilState }) => {
    set(numCardsInDeckState, 52);
    set(cardsDrawnState, [0, 1, 2]);
    set(gameState, "in progress");
  };

  render(
    <RecoilRoot initializeState={initializeState}>
      <DrawnCards />
    </RecoilRoot>
  );

  const cardValueDiv1 = screen.getByText("A");
  const cardValueDiv2 = screen.getByText("2");
  const cardValueDiv3 = screen.getByText("3");

  expect(cardValueDiv1).toBeInTheDocument();
  expect(cardValueDiv2).toBeInTheDocument();
  expect(cardValueDiv3).toBeInTheDocument();
});
