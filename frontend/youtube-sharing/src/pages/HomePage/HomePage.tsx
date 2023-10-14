import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Video from "../../components/Video/Video";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px;
`;

function HomePage() {
  const videos = [
    {
      title: "Funny video",
      description: "This is a funny video",
      url: "https://www.youtube.com/embed/Snmh_IJL8M0?si=Htndj-ynHvIPEBH6",
      shareBy: "admin",
    },
    {
      title: "Funny video",
      description: "This is a funny video",
      url: "https://www.youtube.com/embed/1qN72LEQnaU",
      shareBy: "admin",
    },
    {
      title: "Funny video",
      description: "This is a funny video",
      url: "https://www.youtube.com/embed/1qN72LEQnaU",
      shareBy: "admin",
    },
  ];
  return (
    <Container className="App">
      {videos.map((video, index) => (
        <Video {...video} key={index} />
      ))}
    </Container>
  );
}

export default HomePage;
