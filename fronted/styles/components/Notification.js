import React from 'react';

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`p-4 mb-4 text-sm rounded ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {message}
      <button onClick={onClose} className="ml-4 underline">Fermer</button>
    </div>
  );
};

export default Notification;