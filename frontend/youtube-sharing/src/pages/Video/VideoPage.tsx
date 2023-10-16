import { useEffect, useState } from "react";
import Video from "../../components/Video/Video";
import styled from "styled-components";
import { axiosClient } from "../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Video as VideoType } from "../../types/video";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px;
`;

function VideoPage() {
  const [video, setVideo] = useState<VideoType | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await axiosClient.get("/videos/" + id);
        setVideo(response.data.video);
      } catch (error) {
        navigate("/");
      }
    };
    getVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="App">
      {video ? <Video {...video} /> : "Video not found"}
    </Container>
  );
}

export default VideoPage;
