import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

const SplashScreen = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://lottie.host/8083810a-52b9-4b08-aab8-26d171583e43/ZVjBegDGp4.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
      });
  }, []);

  if (!animationData) return null;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="splash-screen">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default SplashScreen;
