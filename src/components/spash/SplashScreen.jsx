import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";

const SplashScreen = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(
      "https://lottie.host/8ca2a310-366f-4c7e-b5a9-ff3ccb21c10b/uQ20OU3h27.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setAnimationData(data);
      });
  }, []);

  if (!animationData) return null;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="splash-screen">
      <Lottie options={defaultOptions} height={400} width={650} />
    </div>
  );
};

export default SplashScreen;
