import { render, screen } from "@testing-library/react";
import Deal from "./Deal";
import { RecoilRoot, SetRecoilState } from "recoil";
import { cardsLeftState, deckValuesState } from "../../recoil/atoms";

it("Should render Deal Button", () => {
  const initializeState = ({ set }: { set: SetRecoilState }) => {
    set(cardsLeftState, 1);
  };
  render(
    <RecoilRoot initializeState={initializeState}>
      <Deal />
    </RecoilRoot>
  );

  const element = screen.getByText("DEAL");
  expect(element).toBeInTheDocument();
});

it("Should deal cards (offline mode) without crashing", () => {
  const initializeState = ({ set }: { set: SetRecoilState }) => {
    set(cardsLeftState, 5);
    set(deckValuesState, [0, 1, 2, 3, 4, 5]);
  };
  render(
    <RecoilRoot initializeState={initializeState}>
      <Deal />
    </RecoilRoot>
  );

  const dealButton = screen.getByTestId("deal-button");
  expect(dealButton).toBeInTheDocument();
  dealButton.click();
});
