import React, { useEffect, useState } from 'react';
import { getCustomerById } from '../services/api';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

const CustomerInfo = ({ customerId }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!customerId) {
      setCustomer(null);
      return;
    }

    setLoading(true);
    getCustomerById(customerId)
      .then((res) => {
        setCustomer(res.data);
        setError(null);
      })
      .catch(() => {
        setCustomer(null);
        setError('Failed to load customer info');
      })
      .finally(() => setLoading(false));
  }, [customerId]);

  if (!customerId) {
    return <Typography>Customer Details</Typography>;
  }
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  if (!customer) {
    return <Typography>No customer found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Customer Details:
      </Typography>
	  <Typography variant="body1" gutterBottom>
        <strong>CustomerID:</strong> {customer.customerId}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Name:</strong> {customer.name}
      </Typography>
	  <Typography variant="body1" gutterBottom>
        <strong>Email:</strong> {customer.email}
      </Typography>
    </Box>
  );
};

export default CustomerInfo;
