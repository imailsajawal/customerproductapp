import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel,
  TablePagination, Button, Paper, Typography, Box, IconButton, Menu, MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getProductsByCustomer, deleteProduct } from '../services/api';
import ProductForm from './ProductForm';

const ProductDetails = ({ customerId }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('ProductId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingProduct, setEditingProduct] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const loadProducts = () => {
    if (!customerId) {
      setProducts([]);
      setTotal(0);
      return;
    }
    getProductsByCustomer(customerId, page + 1, rowsPerPage, sortBy, sortOrder)
      .then(res => {
        setProducts(res.data.products);
        setTotal(res.data.total);
      });
  };

  useEffect(() => {
    loadProducts();
  }, [customerId, page, rowsPerPage, sortBy, sortOrder]);

  const handleSortRequest = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
    setPage(0);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleMenuOpen = (event, productId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProductId(productId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProductId(null);
  };

  const handleDelete = async () => {
    await deleteProduct(selectedProductId);
    handleMenuClose();
    loadProducts();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Products ({total})</Typography>
        <Button variant="contained" onClick={() => { setEditingProduct(null); setOpenForm(true); }}>
          Add Product
        </Button>
      </Box>

      {openForm && (
        <ProductForm
          customerId={customerId}
          product={editingProduct}
          onClose={() => {
            setOpenForm(false);
            loadProducts();
          }}
        />
      )}

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {['ProductId', 'ProductName', 'ProductPrice'].map((col) => (
                <TableCell key={col} sortDirection={sortBy === col ? sortOrder : false}>
                  <TableSortLabel
                    active={sortBy === col}
                    direction={sortBy === col ? sortOrder : 'asc'}
                    onClick={() => handleSortRequest(col)}
                  >
                    {col}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length ? (
              products.map((p) => (
                <TableRow key={p.productId}>
                  <TableCell>{p.productId}</TableCell>
                  <TableCell>{p.productName}</TableCell>
                  <TableCell>{p.productPrice}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(e) => handleMenuOpen(e, p.productId)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedProductId === p.productId)}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <MenuItem
                        onClick={() => {
                          setEditingProduct(p);
                          setOpenForm(true);
                          handleMenuClose();
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No products found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
};

export default ProductDetails;
