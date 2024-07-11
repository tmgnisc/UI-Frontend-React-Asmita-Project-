import React from "react";
import ReactPlayer from "react-player/youtube";

const YouTubePlayer = () => {
  const videoUrl = "https://www.youtube.com/watch?v=z-IR48Mb3W0"; // Example video URL

  return (
    <div className="video-container">
      <ReactPlayer
        url={videoUrl}
        controls={true}
        width="100%"
        height="100%"
        className="react-player"
      />
      <style jsx>{`
        .video-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          background-color: #000;
        }
        .react-player {
          position: absolute;
          top: 0;
          left: 0;
        }
        @media (max-width: 800px) {
          .react-player {
            width: 100%;
            height: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default YouTubePlayer;
