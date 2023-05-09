import React from 'react';

function Table({numColumns}) {
  return (
    <table style={{width: '100%', height: '100%',border:'1px solid black'}}>
      <tr>
        {Array(numColumns).fill().map((_, i) => (
          <th key={i}>{i + 1}</th>
        ))}
      </tr>
      <tr >
        {Array(numColumns).fill().map((_, i) => (
          <td style={{width: '10%', height: '10%',border:'1px solid black'}} key={i}>  </td>
        ))}
      </tr>
    </table>
  );
}

export default Table;
