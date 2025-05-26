import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Button, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { NavLink, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Rate plans', icon: <BarChartIcon />, path: '/rate-plans' },
  { text: 'Bookings', icon: <CalendarMonthIcon />, path: '/bookings' },
  { text: 'Apartments', icon: <ApartmentIcon />, path: '/apartments' },
  { text: 'Pricing', icon: <LocalOfferIcon />, path: '/pricing' },
  { text: 'Support', icon: <SupportAgentIcon />, path: '/support' },
];

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 220,
          boxSizing: 'border-box',
          bgcolor: 'primary.main',
          color: '#fff',
          borderRight: 0,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2 }}>
        <HomeIcon sx={{ bgcolor: 'primary.dark', borderRadius: '50%', p: 0.5, color: '#fff', mr: 1 }} />
        <Typography variant="h6" fontWeight={700} color="#fff">PinHome</Typography>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.15)' }} />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={NavLink}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              borderRadius: '24px',
              margin: '8px 8px',
              color: isActive ? '#1976d2' : '#fff',
              background: isActive ? '#fff' : 'transparent',
              fontWeight: isActive ? 700 : 500,
            })}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2, mb: 2, bgcolor: 'primary.dark', borderRadius: 2, mx: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} color="#fff" mb={1}>
          Upgrade now!
        </Typography>
        <Typography variant="body2" color="rgba(255,255,255,0.7)" mb={1}>
          And get full access to all features platform!
        </Typography>
        <Button variant="contained" color="warning" fullWidth sx={{ fontWeight: 600, borderRadius: 2 }}>
          Upgrade
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;