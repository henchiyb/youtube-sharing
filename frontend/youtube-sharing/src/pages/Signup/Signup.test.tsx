import { render, screen } from "@testing-library/react";
import Signup from "./Signup";
import { BrowserRouter } from "react-router-dom";

test("renders component", () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
  const emailText = screen.getByText(/Email/i);
  expect(emailText).toBeInTheDocument();

  const passwordText = screen.getByText(/Password/i);
  expect(passwordText).toBeInTheDocument();

  screen.findAllByText(/Signup/i).then((res) => {
    res.forEach((element) => {
      expect(res[0]).toBeInTheDocument();
    });
  });
});
