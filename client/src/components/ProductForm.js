import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { addProduct, updateProduct } from '../services/api';

const ProductForm = ({ customerId, product, onClose }) => {
  const [form, setForm] = useState({
    productName: '',
    productPrice: '',
  });

  useEffect(() => {
    if (product) {
      setForm({
        productName: product.productName,
        productPrice: product.productPrice.toString(),
      });
    } else {
      setForm({
        productName: '',
        productPrice: '',
      });
    }
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.productName.trim() || form.productPrice === '') {
      alert('Please fill in all fields.');
      return;
    }

    const payload = {
      customerId,
      productName: form.productName.trim(),
      productPrice: parseFloat(form.productPrice),
    };

    try {
      if (product) {
        await updateProduct(product.productId, payload);
      } else {
        await addProduct(payload);
      }
      onClose();
    } catch (error) {
      alert('Error saving product. Please try again.');
      console.error(error);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        {}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Product Name"
            fullWidth
            value={form.productName}
            onChange={(e) =>
              setForm({ ...form, productName: e.target.value })
            }
            required
            autoFocus
          />
          <TextField
            label="Product Price"
            type="number"
            fullWidth
            value={form.productPrice}
            onChange={(e) =>
              setForm({ ...form, productPrice: e.target.value })
            }
            required
            inputProps={{ step: "0.01", min: "0" }}
          />
          <DialogActions sx={{ px: 0 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
