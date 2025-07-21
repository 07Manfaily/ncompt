import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, Toolbar, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 260;
const menuItems = [
  { 
    text: 'Formations', 
    icon: <HomeIcon />, 
    path: '/home',
    subItems: [
      { text: 'Sessions', path: '/sessions' },
      { text: 'Plan de formation', path: '/formation-plan' },
      { text: 'Action de formati', path: '/formation-action' },
    ]
  },
  { text: 'Form', icon: <BarChartIcon />, path: '/form' },
  { text: 'Chart', icon: <BarChartIcon />, path: '/chart' },
  { text: 'Bookings', icon: <CalendarMonthIcon />, path: '/bookings' },
  { text: 'Apartments', icon: <ApartmentIcon />, path: '/apartments' },
  { text: 'Pricing', icon: <LocalOfferIcon />, path: '/pricing' },
  { text: 'Notifications', icon: <SupportAgentIcon />, path: '/notif' },
  { text: 'Support', icon: <SupportAgentIcon />, path: '/support' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState({});

  const toggleSubMenu = (text) => {
    setExpandedItems(prev => ({
      ...prev,
      [text]: !prev[text]
    }));
  };

  useEffect(() => {
    const newExpandedItems = {};
    menuItems.forEach(item => {
      if (item.subItems) {
        const shouldExpand = item.subItems.some(subItem => location.pathname === subItem.path);
        if (shouldExpand) {
          newExpandedItems[item.text] = true;
        }
      }
    });
    setExpandedItems(prev => ({ ...prev, ...newExpandedItems }));
  }, [location.pathname]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#020235',
          borderRight: '1px solid #e0e0e0',
          borderTopRightRadius: '60px',
          mt: 8,
        },
      }}
    >
      <Toolbar sx={{ minHeight: 64 }} />
      <List>
        {menuItems.map((item) => {
          const hasSubItems = item.subItems?.length > 0;
          const isActive = location.pathname === item.path || 
            (hasSubItems && item.subItems.some(subItem => subItem.path === location.pathname));
          const isExpanded = expandedItems[item.text] || false;

          return (
            <React.Fragment key={item.text}>
              <ListItem
                button={hasSubItems}
                component={hasSubItems ? 'div' : NavLink}
                to={hasSubItems ? undefined : item.path}
                onClick={() => hasSubItems ? toggleSubMenu(item.text) : navigate(item.path)}
                sx={{
                  borderRadius: '0 24px 24px 0',
                  bgcolor: isActive ? '#e3f2fd' : 'transparent',
                  color: isActive ? '#1976d2' : '#FFFFFF',
                  mb: 0.5,
                  '&:hover': {
                    bgcolor: isActive ? '#e3f2fd' : 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{ fontSize: '14px' }}
                />
                {hasSubItems && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              
              {hasSubItems && isExpanded && (
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => {
                    const isSubActive = location.pathname === subItem.path;
                    return (
                      <ListItem
                        key={subItem.text}
                        component={NavLink}
                        to={subItem.path}
                        sx={{
                          pl: 4,
                          borderRadius: '0 24px 24px 0',
                          bgcolor: isSubActive ? '#e3f2fd' : 'transparent',
                          color: isSubActive ? '#1976d2' : '#FFFFFF',
                          '&:hover': {
                            bgcolor: isSubActive ? '#e3f2fd' : 'rgba(255,255,255,0.1)',
                          },
                        }}
                      >
                        <ListItemText 
                          primary={subItem.text}
                          primaryTypographyProps={{ fontSize: '14px' }}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;