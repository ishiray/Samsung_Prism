import React from 'react';

const Table = ({ data }) => {
  return (
    <table className="my-table">
      <thead>
        <tr>
          <th>Timer</th>
          <th>Value (sec)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.column1}</td>
            <td>{item.column2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;