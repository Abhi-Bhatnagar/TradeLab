import React from 'react';
import Sidebar from './Sidebar';

function Dashboard() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ position: 'sticky' }}>
        <Sidebar />
      </div>
      <div style={{ flex: 1 }}>
        {/* Your bento grid content goes here */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', padding: '20px' }}>
          {/* Sample grid items with different sizes */}
          <div style={{ backgroundColor: 'lightblue', height: '200px' }}>Item 1</div>
          <div style={{ backgroundColor: 'lightcoral', height: '300px' }}>Item 2</div>
          <div style={{ backgroundColor: 'lightgreen', height: '250px' }}>Item 3</div>
          <div style={{ backgroundColor: 'lightpink', height: '150px' }}>Item 4</div>
          <div style={{ backgroundColor: 'lightyellow', height: '350px' }}>Item 5</div>
          <div style={{ backgroundColor: 'lightsalmon', height: '400px' }}>Item 6</div>
          {/* Add more grid items with different sizes as needed */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
