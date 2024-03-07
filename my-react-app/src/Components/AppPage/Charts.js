import React, { useEffect, useRef, memo } from 'react';
import Sidebar from './Sidebar'

function Charts(){

    const advChartContainer = useRef(false);
    const advChartAppended = useRef(false);

    useEffect(() => {
        if (!advChartAppended.current) {
          const advChart = document.createElement("script");
          advChart.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
          advChart.async = true;
          advChart.innerHTML = JSON.stringify({
          "height": "auto",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "calendar": false,
          "details": true,
          "support_host": "https://www.tradingview.com"
        
          });
          if (advChartContainer.current){
          advChartContainer.current.innerHTML = '';
          advChartContainer.current.appendChild(advChart);
          advChartAppended.current = true;}
        }
      });

    return(
        <div style={{display:'flex', width: '100vw'}}>
            <Sidebar/> 
            <div className="tradingview-widget-container" ref={advChartContainer}></div>
        </div>
    );
};

export default Charts