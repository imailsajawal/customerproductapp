import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  MenuItem,
  Select,
} from '@mui/material';
import { getCustomers } from '../services/api';

const drawerWidth = 240;

export default function Sidebar({ selectedCustomer, setSelectedCustomer, activeTab, setActiveTab }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers().then((res) => {
      setCustomers(res.data);
      if (!selectedCustomer && res.data.length > 0) {
        setSelectedCustomer(res.data[0].customerId);
        setActiveTab('info'); // Default to Customer Info tab
      }
    });
  }, [selectedCustomer, setSelectedCustomer, setActiveTab]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          borderRight: '1px solid #eee',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Select
          fullWidth
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select Customer
          </MenuItem>
          {customers.map((c) => (
            <MenuItem key={c.customerId} value={c.customerId}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton selected={activeTab === 'info'} onClick={() => setActiveTab('info')}>
            <ListItemText primary="Customer Info" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton selected={activeTab === 'product'} onClick={() => setActiveTab('product')}>
            <ListItemText primary="Product Details" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
