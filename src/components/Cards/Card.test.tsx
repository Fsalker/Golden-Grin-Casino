import { render, screen } from "@testing-library/react";
import Card from "./Card";

it("Should render Card", () => {
  render(
    <Card cardNumber="7" cardSymbol="♣" cardIndex={0} canRotateCards={false} />
  );

  const valueDiv = screen.getByText(7);
  const smallImgDiv = screen.getByAltText("Small card symbol image");

  expect(valueDiv).toBeInTheDocument();
  expect(smallImgDiv).toBeInTheDocument();
});
