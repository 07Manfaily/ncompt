import React from 'react';
import { AppBar, Toolbar, Typography, Box, InputBase, IconButton, Avatar,TextField,InputAdornment, Badge } from '@mui/material';
import {
  Folder,
  NotificationsIcon,
  Search,
  Settings,
  Help,

  Menu,

} from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{boxShadow: 'none', bgcolor: 'white', color: '#5f6368', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton aria-label="menu">
          <Menu />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box 
            sx={{ 
              width: 24, 
              height: 24, 
              bgcolor: '#4285f4', 
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Folder sx={{ color: 'white', fontSize: 16 }} />
          </Box>
          <Typography variant="h6" sx={{ color: '#5f6368', fontWeight: 400 }}>
            Google Drive
          </Typography>
        </Box>
      </Box>
      <TextField
        placeholder="Search Drive"
        variant="outlined"
        size="small"
        sx={{ 
          width: { xs: 120, sm: 250, md: 400, lg: 600 },
          '& .MuiOutlinedInput-root': {
            bgcolor: '#f1f3f4',
            borderRadius: '24px',
            '& fieldset': { border: 'none' }
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: '#5f6368' }} />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton aria-label="help">
          <Help sx={{ color: '#5f6368' }} />
        </IconButton>
        <IconButton aria-label="settings">
          <Settings sx={{ color: '#5f6368' }} />
        </IconButton>
        <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>J</Avatar>
        <IconButton aria-label="menu options">
          <Menu sx={{ color: '#5f6368' }} />
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
  );
};

export default Header;