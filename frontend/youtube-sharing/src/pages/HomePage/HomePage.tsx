import { useEffect, useState } from "react";
import Video from "../../components/Video/Video";
import styled from "styled-components";
import { axiosClient } from "../../lib/axios";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px;
`;
type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  shareBy: string;
};

function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    const getVideos = async () => {
      const response = await axiosClient.get("/videos");
      setVideos(response.data.videos);
    };
    getVideos();
  }, []);

  return (
    <Container className="App">
      {videos.map((video, index) => (
        <Video {...video} key={index} />
      ))}
    </Container>
  );
}

export default HomePage;
