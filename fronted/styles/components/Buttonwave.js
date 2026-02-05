import React from 'react';

const ButtonWave = ({ children, onClick, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`wave bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonWave;