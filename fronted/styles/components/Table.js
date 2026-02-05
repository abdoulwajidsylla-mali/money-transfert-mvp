import React from 'react';

const Table = ({ headers, data, renderRow }) => {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr className="bg-gray-100">
          {headers.map((header, index) => (
            <th key={index} className="py-2 px-4 border-b text-left">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => renderRow(item, index))}
      </tbody>
    </table>
  );
};

export default Table;