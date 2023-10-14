import React from "react";
import { render, screen } from "@testing-library/react";
import ShareMovie from "./ShareMovie";

test("renders learn react link", () => {
  render(<ShareMovie />);
  const linkElement = screen.getByText(/ShareMovie/i);
  expect(linkElement).toBeInTheDocument();
});
