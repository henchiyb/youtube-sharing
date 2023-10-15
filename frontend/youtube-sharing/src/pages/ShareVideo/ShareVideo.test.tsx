import { render, screen } from "@testing-library/react";
import ShareVideo from "./ShareVideo";
import { BrowserRouter } from "react-router-dom";

test("renders component", () => {
  render(
    <BrowserRouter>
      <ShareVideo />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Description/i);
  expect(linkElement).toBeInTheDocument();
});
