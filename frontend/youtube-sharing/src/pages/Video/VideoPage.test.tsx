import { render, screen } from "@testing-library/react";
import VideoPage from "./VideoPage";
import { BrowserRouter } from "react-router-dom";
import { axiosClient } from "../../lib/axios";
import MockAdapter from "axios-mock-adapter";

const mockAdapter = new MockAdapter(axiosClient);
test("renders component", async () => {
  mockAdapter.onGet("/videos/undefined").reply(200, {
    message: "Videos",
    video: {
      id: 1,
      title: "Test Video 1",
      description: "Test Description 1",
      url: "https://www.youtube.com/watch?v=1234567890",
      shareBy: "test@test.com",
    },
  });
  render(
    <BrowserRouter>
      <VideoPage />
    </BrowserRouter>
  );
  const linkElement = await screen.findByText(/Test Video 1/i);
  expect(linkElement).toBeInTheDocument();
});
