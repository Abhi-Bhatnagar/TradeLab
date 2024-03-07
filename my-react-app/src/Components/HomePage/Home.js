import React from "react";
import Spline from '@splinetool/react-spline';
import HorizontalScrollCarousel from './HorizontalScrollCarousel'; // Assuming the HorizontalScrollCarousel component is in the same directory
import StackingCards from './StackingCards'

function Homepage() {
  return (
    <div>
      <div style={{ backgroundColor: '#131D28', height: '100vh', zIndex: '1' }}>
        <h1 style={{ color: 'white', paddingLeft: '20px', paddingTop: '300px', fontSize: '64px' }}>Your Financial <br /> Journey begins <br /> here</h1>
      </div>
      <div>
        <Spline style={{ height: '100vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} scene="https://prod.spline.design/zCPjrRYABFzN12sT/scene.splinecode" />
      </div>
      <HorizontalScrollCarousel />
      <div style={{ height: '100vh', backgroundColor: '#e0ffff', color:'white' }}>
        Scroll down to see the effect
      </div>
      <div>
        <StackingCards/>
      </div>
      <div style={{ height: '100vh', backgroundColor: '#e0ffff', color:'white' }}>
        Scroll down to see the effect
      </div>
    </div>
  );
}

export default Homepage;