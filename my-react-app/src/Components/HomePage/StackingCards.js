import React from 'react';

const CardContainer = () => {
  return (
    <div style={styles.container}>
      <ul style={styles.cards} id="cards">
        <li style={{position: 'sticky', top: 0, paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%'}} >
          <div style={styles.cardBody}>
            <h2>Card 1</h2>
          </div>
        </li>
        <li style={{position: 'sticky', top: 0, paddingTop: '6%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%'}}>
          <div style={styles.cardBody}>
            <h2>Card 2</h2>
          </div>
        </li>
        <li style={{position: 'sticky', top: 0, paddingTop: '7%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%'}}>
          <div style={styles.cardBody}>
            <h2>Card 3</h2>
          </div>
        </li>
        <li style={{position: 'sticky', top: 0, paddingTop: '8%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%'}}>
          <div style={styles.cardBody}>
            <h2>Card 4</h2>
          </div>
        </li>
      </ul>
    </div>
  );
};


const styles = {
  container:{
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
    backgroundColor: '#52b2cf',
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