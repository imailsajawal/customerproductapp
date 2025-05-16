import React, { useState } from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';
import Sidebar from './components/Sidebar';
import ProductDetails from './components/ProductDetails';
import CustomerInfo from './components/CustomerInfo';

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [activeTab, setActiveTab] = useState('info');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: '#f9fafc', minHeight: '100vh' }}
      >
        {selectedCustomer ? (
          activeTab === 'info' ? (
            <CustomerInfo customerId={selectedCustomer} />
          ) : (
            <ProductDetails customerId={selectedCustomer} />
          )
        ) : (
          <Typography>Please select a customer.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default App;
