'use client'
import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ProfileCreationLoader = () => {
  return (
    <div style={{ backgroundColor: '#0E0E0E', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <DotLottieReact
        src="/Animation.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default ProfileCreationLoader;
