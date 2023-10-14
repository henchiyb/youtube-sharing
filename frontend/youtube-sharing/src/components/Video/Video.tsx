import styled from "styled-components";

const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
  width: 100%;
  max-width: 768px;
  box-shadow: 0 3px 8px rgba(50, 50, 50, 0.17);
  border: 1px solid #e0e0e0;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const VideoFrame = styled.iframe`
  width: 70%;
  height: 100%;
  min-height: 280px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

const Description = styled.div`
  text-align: left;
  width: 30%;
  margin-left: 10px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    text-align: center;
  }
`;

type VideoProps = {
  title: string;
  description: string;
  url: string;
  shareBy: string;
};

const Video = (video: VideoProps) => {
  return (
    <VideoContainer>
      <VideoFrame
        src={video.url}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></VideoFrame>
      <Description>
        <h3>{video.title}</h3>
        <div>
          <b>Share by:</b>
        </div>
        {video.shareBy}
        <div>
          <b>Description:</b>
        </div>
        <div>{video.description}</div>
      </Description>
    </VideoContainer>
  );
};

export default Video;
