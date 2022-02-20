import { render, screen } from "@testing-library/react";
import SmallButton from "./SmallButton";

it("Should render (generic) Large Button", () => {
  render(<SmallButton>Cool smol button</SmallButton>);

  const element = screen.getByText("Cool smol button");
  expect(element).toBeInTheDocument();
});
