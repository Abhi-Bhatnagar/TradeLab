import React, { useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import SearchBar from './AppSearchBar';

function Trade() {
  const tapeContainer = useRef(null); // Corrected initialization
  const tapeScriptAppended = useRef(false);
  const gainContainer = useRef(null); // Corrected initialization
  const gainScriptAppended = useRef(false);
  const newsContainer = useRef(null); // Corrected initialization
  const newsScriptAppended = useRef(false);

  useEffect(() => {
    if (!tapeScriptAppended.current) {
      const tape = document.createElement("script");
      tape.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      tape.async = true;
      tape.innerHTML = JSON.stringify({
        "symbols": [
          {
            "proName": "FOREXCOM:SPXUSD",
            "title": "S&P 500 Index"
          },
          {
            "description": "",
            "proName": "NASDAQ:TSLA"
          },
          {
            "description": "",
            "proName": "NASDAQ:NVDA"
          },
          {
            "description": "",
            "proName": "NASDAQ:AAPL"
          },
          {
            "description": "",
            "proName": "NASDAQ:GOOGL"
          },
          {
            "description": "",
            "proName": "NASDAQ:NFLX"
          },
          {
            "description": "",
            "proName": "NASDAQ:AMZN"
          },
          {
            "description": "",
            "proName": "NASDAQ:MSFT"
          }
        ],
        "showSymbolLogo": true,
        "isTransparent": false,
        "displayMode": "regular",
        "colorTheme": "dark",
        "locale": "en"
      });
      tapeContainer.current.appendChild(tape); // Corrected reference to tapeAppended
      tapeScriptAppended.current = true;
    }
  }, []); // Removed dependency array since tapeContainer doesn't change
 
  useEffect(() => {
    if (!gainScriptAppended.current) {
      const gain = document.createElement("script");
      gain.src = "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
      gain.async = true;
      gain.innerHTML = JSON.stringify({
            "colorTheme": "dark",
            "dateRange": "12M",
            "exchange": "US",
            "showChart": true,
            "locale": "en",
            "largeChartUrl": "",
            "isTransparent": false,
            "showSymbolLogo": false,
            "showFloatingTooltip": true,
            "width": "100%",
            "height": "100%",
            "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
            "plotLineColorFalling": "rgba(41, 98, 255, 1)",
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "scaleFontColor": "rgba(106, 109, 120, 1)",
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)"
      });
      gainContainer.current.appendChild(gain); // Corrected reference to tapeAppended
      gainScriptAppended.current = true;
    }
  }, []); // Removed dependency array since tapeContainer doesn't change
 
  useEffect(() => {
    if (!newsScriptAppended.current) {
      const news = document.createElement("script");
      news.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      news.async = true;
      news.innerHTML = JSON.stringify({
        "feedMode": "all_symbols",
        "isTransparent": false,
        "displayMode": "regular",
        "width": "100%",
        "height": "100%",
        "colorTheme": "dark",
        "locale": "en"
      });
      newsContainer.current.appendChild(news); // Corrected reference to tapeAppended
      newsScriptAppended.current = true;
    }
  }, []);

  return (
    <div style={{ display: 'flex', maxWidth:'100vw', backgroundColor: '#1E222D'}}>
      <div style={{position:'sticky'}}>
      <Sidebar/>
      </div>
      
      <div style={{width:'100vw'}}>
        <div className="tradingview-widget-container" ref={tapeContainer}></div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <div style={{ height: '35vh', display: 'flex', alignItems: 'center' }}>
    <SearchBar />
  </div>
</div>
        <div style={{height:'50vh', width:'100%', display:'flex', alignItems: 'center', justifyContent: 'space-around'}}>
        <div className="tradingview-widget-container" ref={newsContainer}></div>
        <div className="tradingview-widget-container" ref={gainContainer}></div>
        </div>
        
        <h1>Cool looking background</h1>
        <h1>Heatmap? widget</h1>
      </div>
    </div>
  );
}

export default Trade;
