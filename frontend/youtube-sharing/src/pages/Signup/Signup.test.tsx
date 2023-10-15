import { render, screen } from "@testing-library/react";
import Signup from "./Signup";
import { BrowserRouter } from "react-router-dom";

test("renders component", () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Email/i);
  expect(linkElement).toBeInTheDocument();
});
