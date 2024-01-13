import React from 'react';

function RoundButton({ label, onClick }) {
  const style = {
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '16px',
    backgroundColor: '#4CAF50', /* Green */
    border: 'none',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    margin: '4px 2px',
    cursor: 'pointer',
  };

  return (
    <button style={style} onClick={onClick}>
      {label}
    </button>
  );
}

export default RoundButton;
