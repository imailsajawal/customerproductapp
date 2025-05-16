import React, { useEffect, useState } from 'react';
import { getCustomers } from '../services/api';

const CustomerDropdown = ({ selectedCustomer, setSelectedCustomer }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers().then(res => setCustomers(res.data));
  }, []);

  return (
    <select onChange={(e) => setSelectedCustomer(e.target.value)} value={selectedCustomer}>
      {customers.map(c => (
        <option key={c.customerId} value={c.customerId}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default CustomerDropdown;
