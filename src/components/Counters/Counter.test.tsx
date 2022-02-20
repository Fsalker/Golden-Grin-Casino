import { render, screen } from "@testing-library/react";
import Counter from "./Counter";

it("Renders Counter", () => {
  render(<Counter value={20} description="Some description" />);

  const valueDiv = screen.getByText(20);
  const descriptionDiv = screen.getByText("Some description");

  expect(valueDiv).toBeInTheDocument();
  expect(descriptionDiv).toBeInTheDocument();
  expect(valueDiv.parentElement).toEqual(descriptionDiv.parentElement);
});
