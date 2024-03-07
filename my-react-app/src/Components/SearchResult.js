import React, { useEffect, useRef, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from './Firebase'; // Import the Firebase Firestore instance
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { transform } from 'framer-motion';

function SearchResult() {
  const searchParams = new URLSearchParams(window.location.search);
  const search = searchParams.get('query');
  const [stockData, setStockData] = useState(null);
  const [chartType, setChartType] = useState('area');
  const infoContainer = useRef();
  const overviewContainer = useRef();
  const profileContainer = useRef();
  const financialsContainer = useRef();
  const analysisContainer = useRef();
  const newsContainer = useRef();
  const infoScriptAppended = useRef(false);
  const overviewScriptAppended = useRef(false);
  const profileScriptAppended = useRef(false);
  const financialsScriptAppended = useRef(false);
  const analysisScriptAppended = useRef(false);
  const newsScriptAppended = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/stock-data?symbol=${search}`);
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    if (search) {
      fetchData();
    }
  }, [search]);

  useEffect(() => {
    if (stockData && !infoScriptAppended.current) {
      const tickerSymbol = stockData.symbol.split('.')[0]; // Remove '.AX' suffix
      const infoScript = document.createElement("script");
      infoScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
      infoScript.async = true;
      infoScript.innerHTML = `{
        "symbol": "${tickerSymbol}",
        "width": "1200",
        "locale": "en",
        "colorTheme": "dark",
        "isTransparent": false
      }`;
      if (infoContainer.current) {
        infoContainer.current.innerHTML = '';
        infoContainer.current.appendChild(infoScript);
        infoScriptAppended.current = true;}
    }
  }, [stockData]);

  useEffect(() => {
    if (stockData && !profileScriptAppended.current) {
      const tickerSymbol = stockData.symbol.split('.')[0]; // Remove '.AX' suffix
      const profileScript = document.createElement("script");
      profileScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js";
      profileScript.async = true;
      profileScript.innerHTML = JSON.stringify({
        "symbol": tickerSymbol,
        "width": "1200",
        "height": "400", // Change to a specific height, not a percentage
        "isTransparent": false,
        "colorTheme": "dark",
        "locale": "en"
      });
      if (profileContainer.current){
      profileContainer.current.innerHTML = '';
      profileContainer.current.appendChild(profileScript);
      profileScriptAppended.current = true;}
    }
  }, [stockData]);

  useEffect(() => {
    if (stockData && !financialsScriptAppended.current) {
      const tickerSymbol = stockData.symbol.split('.')[0]; // Remove '.AX' suffix
      const financialsScript = document.createElement("script");
      financialsScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
      financialsScript.async = true;
      financialsScript.innerHTML = JSON.stringify({
        "symbol": tickerSymbol,
        "isTransparent": false,
        "largeChartUrl": "",
        "displayMode": "adaptive",
        "width": "1200", // Wrap in quotes
        "height": "775", // Change to a specific height, not a percentage
        "colorTheme": "dark",
        "locale": "en"
      });
      if (financialsContainer.current){
      financialsContainer.current.innerHTML = '';
      financialsContainer.current.appendChild(financialsScript);
      financialsScriptAppended.current = true;}
    }
  }, [stockData]);

  useEffect(() => {
    if (stockData && !analysisScriptAppended.current) {
      const tickerSymbol = stockData.symbol.split('.')[0]; // Remove '.AX' suffix
      const analysisScript = document.createElement("script");
      analysisScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
      analysisScript.async = true;
      analysisScript.innerHTML = JSON.stringify({
        "symbol": tickerSymbol,
        "interval": "1W",
        "width": 600,
        "isTransparent": false,
        "height": 400,
        "showIntervalTabs": true,
        "displayMode": "single",
        "locale": "en",
        "colorTheme": "dark"
      });
      if (analysisContainer.current){
        analysisContainer.current.innerHTML = '';
      analysisContainer.current.appendChild(analysisScript);
      analysisScriptAppended.current = true;}
    }
  }, [stockData]);

  useEffect(() => {
    if (stockData && !newsScriptAppended.current) {
      const tickerSymbol = stockData.symbol.split('.')[0]; // Remove '.AX' suffix
      const newsScript = document.createElement("script");
      newsScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      newsScript.async = true;
      newsScript.innerHTML = JSON.stringify({
        "symbol": tickerSymbol,
        "feedMode": "symbol",
        "isTransparent": false,
        "displayMode": "regular",
        "width": 600,
        "height": 400,
        "colorTheme": "dark",
        "locale": "en",
      });
      if (newsContainer.current){
        newsContainer.current.innerHTML = '';
      newsContainer.current.appendChild(newsScript);
      newsScriptAppended.current = true;}
    }
  }, [stockData]);

  useEffect(() => {
    if (stockData && !overviewScriptAppended.current) {
      const tickerSymbol = stockData.symbol.split('.')[0];
      const overviewScript = document.createElement("script");
      overviewScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      overviewScript.async = true;
      overviewScript.innerHTML = JSON.stringify({
        "symbols": [
          [
            stockData.name,
            `${tickerSymbol}|1D`
          ]
        ],
        "chartOnly": true,
        "chartType": chartType,
        "locale": "en",
        "colorTheme": "dark",
        "autosize": true,
        "width": "1200",
        "height": "500",
        "showVolume": false,
        "noTimeScale": true,
        "largeChartUrl": "",
        "displayMode": "regular",
        "isTransparent": false,
        "plotLineColorGrowing": "rgba(33, 150, 243, 0.12)",
        "plotLineColorFalling": "rgba(33, 150, 243, 0.12)",
        "gridLineColor": "rgba(240, 243, 250, 0)",
        "scaleFontColor": "rgba(120, 123, 134, 1)",
        "belowLineFillColorGrowing": "rgba(33, 150, 243, 0.12)",
        "belowLineFillColorFalling": "rgba(33, 150, 243, 0.12)",
        "symbolActiveColor": "rgba(33, 150, 243, 0.12)",
        "valuesTracking": "2",
        "priceType": "close",
        "dateRanges": [
          "1d|1",
          "1m|30",
          "3m|60",
          "12m|1D",
          "60m|1W",
          "all|1M"], 
        "upColor": "#22ab94",
        "downColor": "#f7525f",
        "borderUpColor": "#22ab94",
        "borderDownColor": "#f7525f",
        "wickUpColor": "#22ab94",
        "wickDownColor": "#f7525f"});
        if (overviewContainer.current) {
          overviewContainer.current.innerHTML = ''; // Clear existing container
          
        }
        overviewContainer.current.appendChild(overviewScript);
          overviewScriptAppended.current = true;
    }
  }, [stockData, chartType]);

  const toggleChartType = () => {
    setChartType(prevChartType => prevChartType === 'area' ? 'candlesticks' : 'area');
    console.log("y")
    console.log(chartType)
  };

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleBuy = async () => {
    if (userLoggedIn) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            console.log('User ID:', user.uid);

            const db = getFirestore();
            console.log(db)
            const usersCollection = collection(db, 'user_info');
            console.log(usersCollection)
            const q = query(usersCollection, where('UserID', '==', user.uid));
            console.log(q)
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                console.log('Matching document ID:', doc.id);
                // Do something with the document
            });
        }
    } else {
        console.log('No user is logged in');
    }
};



  
return (
  <div style={{ backgroundColor: '#1E222D', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom:'100px', paddingTop:'50px'}}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>

      <button onClick={handleBuy} style={{ backgroundColor: '#049981', color: 'white', border: 'none', padding: '10px 40px', margin: '5px', borderRadius: '5px', cursor: 'pointer', transform: 'translate(290%, 200%)'  }}>Buy</button>
      <button style={{ backgroundColor: '#F23545', color: 'white', border: 'none', padding: '10px 40px', margin: '5px', borderRadius: '5px', cursor: 'pointer', transform: 'translate(300%, 200%)' }}>Sell</button>
      </div>
      <div >
      <div className="tradingview-widget-container" ref={infoContainer}></div>
      <div className="tradingview-widget-container" ref={infoContainer}></div>
      <div className="tradingview-widget-container" ref={overviewContainer}></div>
      <div className="tradingview-widget-container" ref={profileContainer}></div>
      <div className="tradingview-widget-container" ref={financialsContainer}></div>
      <div style={{ display: 'flex' }}>
        <div className="tradingview-widget-container" ref={analysisContainer}></div>
        <div className="tradingview-widget-container" ref={newsContainer}></div>
      </div>
      </div>
    </div>
  </div>
);
}

export default SearchResult;
