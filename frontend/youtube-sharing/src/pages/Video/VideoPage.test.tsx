import { render, screen } from "@testing-library/react";
import HomePage from "./VideoPage";

test("renders learn react link", () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
