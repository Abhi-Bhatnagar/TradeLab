import React from "react";
import Spline from '@splinetool/react-spline';
import HorizontalScrollCarousel from './HorizontalScrollCarousel'; // Assuming the HorizontalScrollCarousel component is in the same directory
import StackingCards from './StackingCards'
import Footer from "../Footer";



function Homepage() {
  return (
    <div style={{ backgroundColor: '#131D28' }}>
      <div style={{ backgroundColor: '#131D28', height: '125vh', zIndex: '1' }}>
        <h1 style={{ color: 'white', paddingLeft: '250px', paddingTop: '300px', fontSize: '64px' }}>Your Financial Journey <br /> begins here</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '24px', marginBottom: '40px', paddingLeft: '250px' }}>Empower yourself with our cutting-edge financial tools and insights.</p>
        <div style={{ position: 'absolute', zIndex: '2', left: '17%' }}>
          <button style={{ backgroundColor: '#2962E1', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '8px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s', }}>Get Started</button>
        </div>
      </div>
      <div>
        <Spline style={{ height: '100vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '0', position: 'absolute', }} scene="https://prod.spline.design/zCPjrRYABFzN12sT/scene.splinecode" />
      </div>
      <div style={{ height: '100vh', backgroundColor: '#131D28', textAlign: 'center', color: 'white', paddingTop: '200px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '30px' }}>The Problem</h1>
        <p style={{ fontSize: '2rem', lineHeight: '2', maxWidth: '800px', margin: '0 auto' }}>
          In today's rapidly evolving financial landscape, there exists a crucial gap in financial literacy and trading knowledge among Generation Z and younger demographics.
        </p>
      </div>
      <HorizontalScrollCarousel />
      <div style={{ height: '100vh', backgroundColor: '#131D28', textAlign: 'center', color: 'white', paddingTop: '200px' }}>
        <h1>The Solution</h1>
        <p>TradeLabs, a risk free and innovative online platform, bridges this gap by providing interactive and educational resources tailored to Generation Z and younger demographics. Through real-time simulations and personalized learning experiences, TradeLabs empowers users to develop essential trading skills and financial literacy in a safe and supportive environment. With TradeLabs, users can unlock their full potential in the world of trading, gaining confidence and expertise to navigate the complexities of the financial landscape.</p>
      </div>
      <div style={{ paddingBottom: '200px' }}>
        <StackingCards />
      </div>
      <div style={{ height: '20vh', backgroundColor: '#171d24' }}>
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;