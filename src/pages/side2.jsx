import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
} from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const sections = [
  {
    text: 'Formations', 
    icon: <HomeIcon />, 
    path: '/home',
    subItems: [
      { text: 'Sessions', path: '/sessions' },
      { text: 'Plan de formation', path: '/formation-plan' },
      { text: 'Action de formation', path: '/formation-action' },
    ]
  },
  { text: 'Form', icon: <BarChartIcon />, path: '/form' },
  { text: 'Chart', icon: <BarChartIcon />, path: '/chart' },
  { text: 'Bookings', icon: <CalendarMonthIcon />, path: '/bookings' },
  { text: 'Apartments', icon: <ApartmentIcon />, path: '/apartments' },
  { text: 'Pricing', icon: <LocalOfferIcon />, path: '/pricing' },
  { text: 'Support', icon: <SupportAgentIcon />, path: '/support' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState({});

  const handleExpandClick = (sectionText) => {
    setExpanded((prev) => ({
      ...prev,
      [sectionText]: !prev[sectionText],
    }));
  };

  const handleSubItemClick = (subItem) => {
    navigate(subItem.path);
  };

  return (
    <Box
      sx={{
        width: "230px",
        height: "100vh",
        backgroundColor: "#4C1D95",
        paddingTop: 2,
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 4,
        }}
      >
        Airnow
      </Typography>

      <List component="nav" sx={{ p: "0 10px" }}>
        {sections.map((section, idx) => {
          const isActive = location.pathname === section.path || 
            (section.subItems && section.subItems.some(subItem => subItem.path === location.pathname));
          const hasSubItems = !!section.subItems;
          const isExpanded = expanded[section.text] || false;
          return (
        <Box key={idx} sx={{ mb: 2 }}>
              <ListItem
                disablePadding
                sx={{
                  position: "relative",
                  my: 0.5,
                  backgroundColor: isActive ? "#fff" : "transparent",
                  color: isActive ? "#4C1D95" : "#a289f0",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  marginLeft:"10px",
                  "&::before": {
                    content: '""',
                        position: "absolute",
                        top: "-20px",
                    right: "0px",
                        height: "20px",
                    width: "44px",
                    backgroundColor: "transparent",
                        borderBottomRightRadius: "20px",
                    boxShadow: isActive ? "5px 5px 0 5px #fff" : "none",
                    transition: "box-shadow 0.2s ease-in-out",
                  },
                  "&::after": {
                    content: '""',
                        position: "absolute",
                        bottom: "-20px",
                    right: "0px",
                    height: "20px",
                        width: "20px",
                    backgroundColor: "transparent",
                        borderTopRightRadius: "20px",
                    boxShadow: isActive ? "5px -5px 0 5px #fff" : "none",
                    transition: "box-shadow 0.2s ease-in-out",
                  },
                }}
              >
                <ListItemButton
                  onClick={hasSubItems ? () => handleExpandClick(section.text) : () => navigate(section.path)}
                  sx={{
                    py: 1,
                    "&:hover": {
                      backgroundColor: isActive ? "#fff" : "rgba(255, 255, 255, 0.1)",
                      color: isActive ? "#4C1D95" : "#fff",
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                    },
                    borderTopLeftRadius: "20px",
                    borderBottomLeftRadius: "20px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#00E0FF" : "#a289f0",
                      minWidth: "40px",
                    }}
                  >
                    {section.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                          fontWeight: isActive ? "bold" : 500,
                        }}
                      >
                        {section.text}
                      </Typography>
                    }
                  />
                  {hasSubItems && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {/* Sous-menus */}
              {hasSubItems && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {section.subItems.map((subItem, subIdx) => {
                      const isSubActive = location.pathname === subItem.path;
                      return (
                        <ListItem
                          key={subIdx}
                          disablePadding
                          onClick={() => handleSubItemClick(subItem)}
                          sx={{
                            pl: 4,
                            my: 0.5,
                            color: isSubActive ? "#4C1D95" : "#a289f0",
                            backgroundColor: isSubActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
                            borderRadius: "0 20px 20px 0",
                            cursor: "pointer",
                          }}
                        >
                          <ListItemButton
                            sx={{
                              py: 0.5,
                              "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                color: "#fff",
                              },
                            }}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{
                                    fontSize: "0.8rem",
                                    fontWeight: isSubActive ? "bold" : 500,
                                  }}
                                >
                                  {subItem.text}
                    </Typography>
                  }
                />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              )}
              </Box>
            );
          })}
      </List>
    </Box>
  );
}
