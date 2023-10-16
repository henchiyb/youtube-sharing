import { useEffect, useState } from "react";
import Video from "../../components/Video/Video";
import styled from "styled-components";
import { axiosClient } from "../../lib/axios";
import { Video as VideoType } from "../../types/video";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px;
`;

function HomePage() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axiosClient.get("/videos");
        setVideos(response.data.videos);
      } catch (error) {
        console.log(error);
      }
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
