import { render, screen } from "@testing-library/react";
import ShareVideo from "./ShareVideo";

test("renders learn react link", () => {
  render(<ShareVideo />);
  const linkElement = screen.getByText(/ShareVideo/i);
  expect(linkElement).toBeInTheDocument();
});
