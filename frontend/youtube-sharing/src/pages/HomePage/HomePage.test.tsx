import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { BrowserRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import { axiosClient } from "../../lib/axios";

const mockAdapter = new MockAdapter(axiosClient);

test("renders component", async () => {
  mockAdapter.onGet("/videos").reply(200, {
    message: "Videos",
    videos: [
      {
        id: 1,
        title: "Test Video 1",
        description: "Test Description 1",
        url: "https://www.youtube.com/watch?v=1234567890",
        shareBy: "test@test.com",
      },
      {
        id: 1,
        title: "Test Video 2",
        description: "Test Description 2",
        url: "https://www.youtube.com/watch?v=1234567890",
        shareBy: "test@test.com",
      },
    ],
  });
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  const video1Title = await screen.findByText(/Test Video 1/i);
  expect(video1Title).toBeInTheDocument();

  const video2Title = await screen.findByText(/Test Video 2/i);
  expect(video2Title).toBeInTheDocument();
});
