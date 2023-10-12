import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

test("renders learn react link", () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
