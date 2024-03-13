import React from 'react';
import Sidebar from './Sidebar';

function Dashboard() {
  const styles = {
    box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '400px',
      height: '180px',
      backgroundColor: '#f0f0f0',
      borderRadius: '20px',
      margin: '0 10px',
    },
  };
  

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ position: 'sticky' }}>
        <Sidebar />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={styles.box}>
          <h3>180x400</h3>
        </div>
        <div style={styles.box}>
          <h3>180x400</h3>
        </div>
        <div style={styles.box}>
          <h3>180x400</h3>
        </div>
        <div style={{ ...styles.box, width: '400px', height: '400px' }}>
          <h3>400x400</h3>
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ ...styles.box, width: '1200px', height: '360px' }}>
          <h3>360x1200</h3>
        </div>
        <div style={{ ...styles.box, width: '400px', height: '140px' }}>
          <h3>400x140</h3>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ ...styles.box, width: '820px', height: '360px' }}>
          <h3>360x820</h3>
        </div>
        <div style={{ ...styles.box, width: '820px', height: '360px' }}>
          <h3>360x820</h3>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;