import React from 'react';

const CardContainer = () => {
  return (
    <div>
      
      <div style={styles.container}>
      <div style={{ backgroundColor: '#131D28', textAlign: 'center', color: 'white', paddingTop: '200px' }}>
        <h1>How it Works?</h1>
      </div>
        <ul style={styles.cards} id="cards">
          <li style={{ position: 'sticky', top: 0, paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%' }} >
            <div style={styles.cardBody}>
              <h2>Step 1: create account</h2>
            </div>
          </li>
          <li style={{ position: 'sticky', top: 0, paddingTop: '6%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%' }}>
            <div style={styles.cardBody}>
              <h2>Step 2: Explore Content, rxplore apps countless features for new and experienced traders </h2>
            </div>
          </li>
          <li style={{ position: 'sticky', top: 0, paddingTop: '7%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%' }}>
            <div style={styles.cardBody}>
              <h2>Step 3: Learn, use the learn function to read and understand</h2>
            </div>
          </li>
          <li style={{ position: 'sticky', top: 0, paddingTop: '8%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%' }}>
            <div style={styles.cardBody}>
              <h2>Step 4: Trade start to buy and sell with virtual money </h2>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};


const styles = {
  container: {
    backgroundColor: '#131D28',
    height: '400vh'
  },
  cards: {
    listStyle: 'none',
    paddingLeft: 0,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'repeat(4, 87vh)',
    gap: '4vw',
    paddingBottom: '6em', // calc(4 * 1.5em)
    marginBottom: '4vw',
  },
  cardBody: {
    backgroundColor: '#192A59',
    boxSizing: 'border-box',
    padding: '30px',
    borderRadius: '50px',
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.3)',
    height: '87vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 1s',
  },
};

export default CardContainer;