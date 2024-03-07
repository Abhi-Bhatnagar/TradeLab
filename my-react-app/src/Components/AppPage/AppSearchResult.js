import React, { useEffect, useRef, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, db } from '../Firebase'; // Import the Firebase Firestore instance
import { getFirestore, collection, query, where, getDocs, updateDoc, addDoc, setDoc, doc, arrayRemove, arrayUnion } from 'firebase/firestore';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'


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
        "width": "100%",
        "locale": "en",
        "colorTheme": "dark",
        "isTransparent": false
      }`;
            if (infoContainer.current) {
                infoContainer.current.innerHTML = '';
                infoContainer.current.appendChild(infoScript);
                infoScriptAppended.current = true;
            }
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
                "width": "100%",
                "height": "400", // Change to a specific height, not a percentage
                "isTransparent": false,
                "colorTheme": "dark",
                "locale": "en"
            });
            if (profileContainer.current) {
                profileContainer.current.innerHTML = '';
                profileContainer.current.appendChild(profileScript);
                profileScriptAppended.current = true;
            }
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
                "width": "100%", // Wrap in quotes
                "height": "775", // Change to a specific height, not a percentage
                "colorTheme": "dark",
                "locale": "en"
            });
            if (financialsContainer.current) {
                financialsContainer.current.innerHTML = '';
                financialsContainer.current.appendChild(financialsScript);
                financialsScriptAppended.current = true;
            }
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
                "width": '100%',
                "isTransparent": false,
                "height": 400,
                "showIntervalTabs": true,
                "displayMode": "single",
                "locale": "en",
                "colorTheme": "dark"
            });
            if (analysisContainer.current) {
                analysisContainer.current.innerHTML = '';
                analysisContainer.current.appendChild(analysisScript);
                analysisScriptAppended.current = true;
            }
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
                "width": '100%',
                "height": 400,
                "colorTheme": "dark",
                "locale": "en",
            });
            if (newsContainer.current) {
                newsContainer.current.innerHTML = '';
                newsContainer.current.appendChild(newsScript);
                newsScriptAppended.current = true;
            }
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
                "width": "100%",
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
                "wickDownColor": "#f7525f"
            });
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

    const [amountBuy, setAmountBuy] = useState(0);

    const [amountSell, setAmountSell] = useState(0);

    const currentTime = new Date();


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
                const db = getFirestore();
                const usersCollection = collection(db, 'user_info');
                const q = query(usersCollection, where('UserID', '==', user.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.log(stockData)
                    handleBuyStock(stockData, doc);
                });
            }
        } else {
            console.log('No user is logged in');
        }
    };

    const handleBuyStock = async (stockData, userInfoDoc) => {
        // Check if user has enough funds
        const cost = parseInt(amountBuy) * stockData.price;
        console.log(cost)
        const walletBalance = parseFloat(userInfoDoc.data().Wallet);
        if (cost <= walletBalance && amountBuy != 0) {
            // Deduct cost from wallet
            await updateDoc(userInfoDoc.ref, {
                Wallet: parseFloat(walletBalance) - parseFloat(cost)
            });

            // Check if user already owns the stock
            const stockName = stockData.name;
            const userStocksCollection = collection(userInfoDoc.ref, 'stocks');
            const stockQuery = query(userStocksCollection, where('stockName', '==', stockName));
            const stockQuerySnapshot = await getDocs(stockQuery);

            if (!stockQuerySnapshot.empty) {
                // Update existing stock document
                const stockDoc = stockQuerySnapshot.docs[0];
                const stockDocData = stockDoc.data();
                const newQuantity = parseInt(stockDocData.quantity) + parseInt(amountBuy);
                const newInvestmentValue = stockDocData.IV + (amountBuy * stockData.price);

                await updateDoc(stockDoc.ref, {
                    quantity: newQuantity,
                    IV: newInvestmentValue
                });
            } else {
                // Create new stock document
                await addDoc(userStocksCollection, {
                    stockName: stockName,
                    quantity: amountBuy,
                    IV: amountBuy * stockData.price
                });
            }

            const transactionRef = doc(collection(userInfoDoc.ref, 'transactions'));
            await setDoc(transactionRef, {
                action: "Buy",
                price: stockData.price,
                quantity: parseInt(amountBuy),
                stock_name: stockName,
                time: currentTime // Current server time
            });

            // Reset amount input field
            setAmountBuy(0);
        } else {
            console.log('Insufficient funds/ 0 bought');
            setAmountBuy(0);
        }
    };

    const handleSell = async () => {
        if (userLoggedIn) {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const db = getFirestore();
                const usersCollection = collection(db, 'user_info');
                const q = query(usersCollection, where('UserID', '==', user.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // Sell logic
                    handleSellStock(stockData, doc);
                });
            }
        } else {
            console.log('No user is logged in');
        }
    };

    const handleSellStock = async (stockData, userInfoDoc) => {
        const walletBalance = userInfoDoc.data().Wallet;
        if (amountSell !== 0) {
            const sellProceeds = amountSell * stockData.price;
            // Add returns from wallet
            await updateDoc(userInfoDoc.ref, { Wallet: parseFloat(walletBalance) + parseFloat(sellProceeds) });

            const stockName = stockData.name;
            // Find the stock
            const userStocksCollection = collection(userInfoDoc.ref, 'stocks');
            const stockQuery = query(userStocksCollection, where('stockName', '==', stockName));
            const stockQuerySnapshot = await getDocs(stockQuery);

            if (!stockQuerySnapshot.empty) {
                const stockDoc = stockQuerySnapshot.docs[0];
                const stockDocData = stockDoc.data();

                // Check if user owns enough quantity to sell
                if (stockDocData.quantity >= amountSell) {
                    const initialQuantity = stockDocData.quantity;
                    const remainingQuantity = parseInt(initialQuantity) - parseInt(amountSell);
                    const investmentValue = stockDocData.IV;

                    // Calculate new IV after selling
                    const newIV = (1 - (amountSell / initialQuantity)) * investmentValue;

                    // Update user's wallet and stock data
                    await updateDoc(stockDoc.ref, { quantity: remainingQuantity, IV: newIV });

                    // Reset amount input field
                    setAmountSell(0);

                    const transactionRef = doc(collection(userInfoDoc.ref, 'transactions'));
                    await setDoc(transactionRef, {
                        action: "Sell",
                        price: stockData.price,
                        quantity: parseInt(amountSell),
                        stock_name: stockName,
                        time: currentTime // Current server time
                    });
                } else {
                    console.log('Insufficient quantity to sell');
                    setAmountSell(0);
                }
            } else {
                console.log('Stock not found in user\'s portfolio');
                setAmountSell(0);
            }
        } else {
            console.log('Amount to sell is 0');
        }
    };

    const [isBuyActive, setIsBuyActive] = useState(false);
    const [isSellActive, setIsSellActive] = useState(false);

    const toggleBuyPopup = () => {
        setIsBuyActive(!isBuyActive);
    };

    const toggleSellPopup = () => {
        setIsSellActive(!isSellActive);
    };

    const [isFollowing, setIsFollowing] = useState(false);
    
    useEffect(() => {
        async function checkFollowing() {
            const auth = getAuth();
            const user = auth.currentUser;
            const db = getFirestore();
            const usersCollection = collection(db, 'user_info');
            const q = query(usersCollection, where('UserID', '==', user.uid));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach(doc => {
                const watchlist = doc.data().Watchlist || [];
                setIsFollowing(watchlist.includes(test));
            });
        }
    }, );

    const toggleFollow = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const db = getFirestore();
        const usersCollection = collection(db, 'user_info');
        const q = query(usersCollection, where('UserID', '==', user.uid));
        const querySnapshot = await getDocs(q);
    
        querySnapshot.forEach(async (doc) => {
            const watchlist = doc.data().Watchlist || [];
            const docRef = doc.ref; // Get the reference to the document
            
            if (isFollowing) {
                await updateDoc(docRef, { Watchlist: arrayRemove(stockData.name) }); // Update the document with the reference
            } else {
                await updateDoc(docRef, { Watchlist: arrayUnion(stockData.name) }); // Update the document with the reference
            }
        });
    
        setIsFollowing(!isFollowing);
    };



    return (
        <div style={{ display: 'flex', position: 'relative', maxWidth: '100vw', backgroundColor: '#1E222D' }}>
            <div style={{ position: 'fixed' }}>
                <Sidebar />
            </div>
            <div style={{ marginLeft: '68px', width: '100vw', paddingLeft: '150px', paddingRight: '20px', paddingTop: '50px', paddingBottom: '50px' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}>

                    <button
                        style={{
                            backgroundColor: '#2962E1',
                            color: 'white',
                            border: 'none',
                            padding: '10px 40px',
                            margin: '5px',
                            borderRadius: '25px',
                            cursor: 'pointer'
                        }}
                        onClick={toggleFollow}
                    >
                        <FontAwesomeIcon icon={isFollowing ? faMinus : faPlus} style={{ color: 'white' }} size="xs" /> {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>

                    <button onClick={toggleBuyPopup} style={{ backgroundColor: '#049981', color: 'white', border: 'none', padding: '10px 40px', margin: '5px', borderRadius: '5px', cursor: 'pointer' }}>Buy</button>
                    <button onClick={toggleSellPopup} style={{ backgroundColor: '#F23545', color: 'white', border: 'none', padding: '10px 40px', margin: '5px', borderRadius: '5px', cursor: 'pointer' }}>Sell</button>
                </div>

                <div style={{ width: '100%' }}>
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
            {isBuyActive && (
                <div className="popup-container" style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, .3)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '1' }}>
                    <div className="popup-box" style={{ width: '500px', background: '#f2f2f2', borderRadius: '6px', boxShadow: '0 0 10px rgba(0, 0, 0, .1)', padding: '30px', transition: 'transform .4s ease-in-out' }}>
                        <h1 style={{ color: '#333', lineHeight: 1 }}>Buy</h1>
                        <p style={{ color: '#333', margin: '12px 0 20px' }}>Write costs and other info</p>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="amountBuy">Amount:</label>
                            <input type="number" id="amountBuy" name="amountBuy" step="1" min='0' value={amountBuy} onChange={(e) => setAmountBuy(e.target.value)} />
                        </form>
                        <br /><br />
                        <button className="close-btn" style={{ width: '100%', height: '45px', background: '#6e78ff', borderRadius: '6px', border: 'none', outline: 'none', boxShadow: '0 0 10px rgba(0, 0, 0, .1)', cursor: 'pointer', fontSize: '18px', color: '#f2f2f2', fontWeight: '500' }} onClick={() => { toggleBuyPopup(); handleBuy(); }}>
                            OK
                        </button>
                    </div>
                </div>
            )}
            {isSellActive && (
                <div className="popup-container" style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, .3)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '1' }}>
                    <div className="popup-box" style={{ width: '500px', background: '#f2f2f2', borderRadius: '6px', boxShadow: '0 0 10px rgba(0, 0, 0, .1)', padding: '30px', transition: 'transform .4s ease-in-out' }}>
                        <h1 style={{ color: '#333', lineHeight: 1 }}>Hello World!</h1>
                        <p style={{ color: '#333', margin: '12px 0 20px' }}>Sell</p>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="amountSell">Amount:</label>
                            <input type="number" id="amountSell" name="amountSell" step="1" min='0' value={amountSell} onChange={(e) => setAmountSell(e.target.value)} />
                        </form>
                        <br /><br />
                        <button className="close-btn" style={{ width: '100%', height: '45px', background: '#6e78ff', borderRadius: '6px', border: 'none', outline: 'none', boxShadow: '0 0 10px rgba(0, 0, 0, .1)', cursor: 'pointer', fontSize: '18px', color: '#f2f2f2', fontWeight: '500' }} onClick={() => { toggleSellPopup(); handleSell(); }}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}

export default SearchResult;

//<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '100px', paddingTop: '50px' }}>
//<div style={{ display: 'flex', justifyContent: 'center' }}>
//<button onClick={toggleChartType}>Toggle Chart Type</button>
//<button onClick={handleBuy} style={{ backgroundColor: '#049981', color: 'white', border: 'none', padding: '10px 40px', margin: '5px', borderRadius: '5px', cursor: 'pointer' }}>Buy</button>
//<button style={{ backgroundColor: '#F23545', color: 'white', border: 'none', padding: '10px 40px', margin: '5px', borderRadius: '5px', cursor: 'pointer' }}>Sell</button>
//</div>
//<div className="tradingview-widget-container" ref={infoContainer}></div>
//<div className="tradingview-widget-container" ref={infoContainer}></div>
//<div className="tradingview-widget-container" ref={overviewContainer}></div>
//<div className="tradingview-widget-container" ref={profileContainer}></div>
//<div className="tradingview-widget-container" ref={financialsContainer}></div>
//<div style={{ display: 'flex' }}>
//<div className="tradingview-widget-container" ref={analysisContainer}></div>
//<div className="tradingview-widget-container" ref={newsContainer}></div>
//</div>
//</div>