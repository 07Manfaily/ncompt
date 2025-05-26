import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Avatar,
  IconButton,
  Pagination,
  Toolbar,
  InputAdornment,
  TextField
} from '@mui/material';
import {
  Add as AddIcon,
  FilterList as FilterIcon,
  FileDownload as ExportIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon
} from '@mui/icons-material';

const ProductTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(3);

  const products = [
    {
      id: 1,
      name: 'Cherry Delight',
      productId: '#KP267400',
      price: '$90.50',
      stock: '350 pcs',
      type: 'Dessert',
      status: 'Pending',
      avatar: '🍒'
    },
    {
      id: 2,
      name: 'Kiwi',
      productId: '#TL651535',
      price: '$12.00',
      stock: '650 kg',
      type: 'Fruits',
      status: 'Active',
      avatar: '🥝'
    },
    {
      id: 3,
      name: 'Mango Magic',
      productId: '#GB651535',
      price: '$100.50',
      stock: '1200 pcs',
      type: 'Ice Cream',
      status: 'Inactive',
      avatar: '🥭'
    },
    {
      id: 4,
      name: 'Joy Care',
      productId: '#ER651535',
      price: '$59.99',
      stock: '700 pcs',
      type: 'Care',
      status: 'On Sale',
      avatar: '🧴'
    },
    {
      id: 5,
      name: 'Blueberry Bliss',
      productId: '#SD487441',
      price: '$150.90',
      stock: '100 lt',
      type: 'Dessert',
      status: 'Bouncing',
      avatar: '🫐'
    },
    {
      id: 6,
      name: 'Watermelon',
      productId: '#TL449003',
      price: '$10.99',
      stock: '23 lt',
      type: 'Juice',
      status: 'Pending',
      avatar: '🍉'
    },
    {
      id: 7,
      name: 'Trilogy',
      productId: '#KP651535',
      price: '$130.00',
      stock: '3000 pcs',
      type: 'Oil',
      status: 'Active',
      avatar: '🌿'
    },
    {
      id: 8,
      name: 'Dryskin',
      productId: '#GB449003',
      price: '$40.70',
      stock: '400 pcs',
      type: 'Cream',
      status: 'Inactive',
      avatar: '🧴'
    },
    {
      id: 9,
      name: 'Olive Oil',
      productId: '#SD449003',
      price: '$35.50',
      stock: '200 lt',
      type: 'Oil',
      status: 'On Sale',
      avatar: '🫒'
    },
    {
      id: 10,
      name: 'Citrus Burst',
      productId: '#ER558512',
      price: '$9.99',
      stock: '1200 pcs',
      type: 'Flowers',
      status: 'Bouncing',
      avatar: '🍋'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return { backgroundColor: '#e8f5e8', color: '#2e7d32' };
      case 'Inactive':
        return { backgroundColor: '#ffebee', color: '#c62828' };
      case 'Pending':
        return { backgroundColor: '#fff3e0', color: '#ef6c00' };
      case 'On Sale':
        return { backgroundColor: '#e3f2fd', color: '#1976d2' };
      case 'Bouncing':
        return { backgroundColor: '#f3e5f5', color: '#7b1fa2' };
      default:
        return { backgroundColor: '#f5f5f5', color: '#757575' };
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Header */}
        <Toolbar sx={{ px: 3, py: 2, backgroundColor: 'white', borderBottom: 1, borderColor: '#e0e0e0' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#333', flex: 1 }}>
            Plan de Formations
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Showing
              </Typography>
              <FormControl size="small">
                <Select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(e.target.value)}
                  sx={{ minWidth: 60 }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              sx={{ 
                color: '#666',
                borderColor: '#e0e0e0',
                '&:hover': { borderColor: '#ccc' }
              }}
            >
              Filter
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<ExportIcon />}
              sx={{ 
                color: '#666',
                borderColor: '#e0e0e0',
                '&:hover': { borderColor: '#ccc' }
              }}
            >
              Export
            </Button>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: '#4285f4',
                '&:hover': { backgroundColor: '#3367d6' },
                borderRadius: 2,
                px: 3
              }}
            >
              Add New Product
            </Button>
          </Box>
        </Toolbar>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#fafafa' }}>
                <TableCell sx={{ fontWeight: 600, color: '#666', py: 2 }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#666', py: 2 }}>Product ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#666', py: 2 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#666', py: 2 }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#666', py: 2 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#666', py: 2 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#666', py: 2 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 40, height: 40, backgroundColor: '#f5f5f5', fontSize: '1.2rem' }}>
                        {product.avatar}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {product.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {product.productId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {product.price}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {product.stock}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {product.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.status}
                      size="small"
                      sx={{
                        ...getStatusColor(product.status),
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        minWidth: 80,
                        border: 'none'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" sx={{ color: '#666' }}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 3,
          borderTop: 1,
          borderColor: '#e0e0e0'
        }}>
          <Button
            variant="text"
            sx={{ color: '#666', textTransform: 'none' }}
          >
            ← Previous
          </Button>
          
          <Pagination
            count={11}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: '#4285f4',
                  color: 'white'
                }
              }
            }}
          />
          
          <Button
            variant="text"
            sx={{ color: '#666', textTransform: 'none' }}
          >
            Next →
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductTable;