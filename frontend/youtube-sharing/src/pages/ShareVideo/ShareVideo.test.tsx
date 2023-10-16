import { render, screen } from "@testing-library/react";
import ShareVideo from "./ShareVideo";
import { BrowserRouter } from "react-router-dom";

test("renders component", () => {
  render(
    <BrowserRouter>
      <ShareVideo />
    </BrowserRouter>
  );
  const descriptionText = screen.getByText(/Description/i);
  expect(descriptionText).toBeInTheDocument();

  const urlText = screen.getByText(/Url/i);
  expect(urlText).toBeInTheDocument();
});
