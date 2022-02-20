import { render, screen } from "@testing-library/react";
import LargeButton from "./LargeButton";

it("Should render (generic) Large Button", () => {
  render(<LargeButton>Cool large button</LargeButton>);

  const element = screen.getByText("Cool large button");
  expect(element).toBeInTheDocument();
});
