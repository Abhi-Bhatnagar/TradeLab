import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCubes, faMoneyBillTrendUp, faChartArea, faBookOpen, faFire, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Fetch the user's watchlist from Firestore
    const fetchWatchlist = async () => {
        const auth = getAuth();
        // Add a reload listener to the auth object
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const db = getFirestore();
                const usersCollection = collection(db, 'user_info');
                const q = query(usersCollection, where('UserID', '==', user.uid));
                getDocs(q).then((querySnapshot) => {
                    console.log(user.uid);
                    console.log(auth);
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        const userWatchlist = data.Watchlist || [];
                        setWatchlist(userWatchlist);
                    });
                }).catch((error) => {
                    console.error('Error fetching watchlist:', error);
                });
            } else {
                console.log('User is not authenticated');
                // Handle the case when the user is not authenticated
            }
        });
    };
    fetchWatchlist();
}, []);


    // Styles for the elements
    const watchlist_styles = {
        navItem: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
        },
        icon: {
            marginRight: '10px',
        },
        text: {
            color: '#FFFFFF',
        },
        watchlistItem: {
            color: '#FFFFFF',
            marginLeft: '20px',
        },
    };

  return (
    <div style={styles.container}>
      <div style={styles.toggleButton} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isMinimized ? faBars : faTimes} />
      </div>
      {!isMinimized && (
        <>
          <div style={styles.logo}>Logo</div>
          <ul style={styles.navItems}>
            <li style={styles.navItem}>
              <FontAwesomeIcon icon={faCubes} style={styles.icon} />
              <span style={styles.text}>Dashboard</span>
            </li>
            <li style={styles.navItem}>
              <FontAwesomeIcon icon={faMoneyBillTrendUp} style={styles.icon} />
              <span onClick={() => window.location.href = "/trade"} style={styles.text}>Trade</span>
            </li>
            <li style={styles.navItem}>
              <FontAwesomeIcon icon={faChartArea} style={styles.icon} />
              <span onClick={() => window.location.href = "/charts"} style={styles.text}>Charts</span>
            </li>
            <li style={styles.navItem}>
              <FontAwesomeIcon icon={faBookOpen} style={styles.icon} />
              <span style={styles.text}>Learn</span>
            </li>
            <hr style={styles.separator} />
            <li style={styles.navItem}>
              <FontAwesomeIcon icon={faFire} style={styles.icon} />
              <span style={styles.text}>Watchlist</span>
            </li>
            {watchlist.map((item, index) => (
                <div key={index} style={watchlist_styles}>
                    {item}
                </div>
            ))}
            <hr style={styles.separator} /> 
            <li style={styles.navItem}>
              <FontAwesomeIcon icon={faCog} style={styles.icon} />
              <span style={styles.text}>Settings</span>
            </li>
            <li style={styles.navItem}>
              <FontAwesomeIcon icon={faSignOutAlt} style={styles.icon} />
              <span style={styles.text}>Logout</span>
            </li>
          </ul>
          <h1>light/dark mode?</h1>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    width: '200px',
    backgroundColor: '#131722',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    position: 'relative',
  },
  toggleButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    color: '#fff',
  },
  logo: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2962E1',
  },
  navItems: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    color: '#fff',
  },
  icon: {
    marginRight: '10px',
    fontSize: '16px',
    fontWeight: 'normal',
  },
  text: {
    fontWeight: 'normal',
  },
  separator: {
    border: '0',
    height: '1px',
    backgroundColor: '#ccc',
    margin: '10px 0',
  },
};

export default Sidebar;
