import { useEffect, useState } from "react";
import Video from "../../components/Video/Video";
import styled from "styled-components";
import { axiosClient } from "../../lib/axios";
import { useParams } from "react-router-dom";

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

function VideoPage() {
  const [video, setVideo] = useState<Video | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const getVideo = async () => {
      const response = await axiosClient.get("/videos/" + id);
      setVideo(response.data.video);
    };
    getVideo();
  }, []);

  return <Container className="App">{video && <Video {...video} />}</Container>;
}

export default VideoPage;
