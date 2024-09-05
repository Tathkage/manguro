import React from 'react';
import RootLayout from './layout'; // Assuming your layout is in the same folder

export default function Custom404() {
  return (
    <RootLayout>
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>500 - Server-side error occurred</h1>
      </div>
    </RootLayout>
  );
}
