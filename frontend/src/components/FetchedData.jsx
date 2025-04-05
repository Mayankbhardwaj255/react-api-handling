import React from 'react';

const FetchedData = ({ products }) => {
    
  return (
    <div style={{ padding: '20px' }}>
      <h2>Fetched Products</h2>
      <textarea
        value={products ? JSON.stringify(products, null, 2) : 'No data fetched'}
        readOnly
        rows={15}
        style={{
          width: '100%',
          padding: '10px',
          fontFamily: 'monospace',
          fontSize: '14px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          resize: 'vertical',
        }}
      />
    </div>
  );
};

export default FetchedData;
