import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DnsIcon from "@mui/icons-material/Dns";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PublicIcon from "@mui/icons-material/Public";
import GroupIcon from "@mui/icons-material/Group";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const sections = [
  {
    title: "MANAGE",
    items: [
      { label: "Proxy", icon: <DnsIcon /> },
      { label: "Balance", icon: <AccountBalanceWalletIcon /> },
      { label: "Online check", icon: <PublicIcon /> },
      { label: "Affiliate system", icon: <GroupIcon /> },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      { label: "Tickets", icon: <ConfirmationNumberIcon /> },
      { label: "FAQ", icon: <HelpOutlineIcon /> },
    ],
  },
];

export default function Sidebar() {
  const [selected, setSelected] = useState("Balance");

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
        {sections.map((section, idx) => (
          <Box key={idx} sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{ pl: 2, color: "#b197fc", fontSize: "0.75rem", mb: 1, textTransform: "uppercase" }}
            >
              {section.title}
            </Typography>
            {section.items.map((item) => {
              const isSelected = selected === item.label;
              return (
                <ListItem
                  key={item.label}
                  disablePadding
                  onClick={() => setSelected(item.label)}
                  sx={{
                    position: "relative",
                    my: 0.5,
                    backgroundColor: isSelected ? "#fff" : "transparent",
                    color: isSelected ? "#4C1D95" : "#a289f0",
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
                      boxShadow: isSelected ? "5px 5px 0 5px #fff" : "none",
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
                      boxShadow: isSelected ? "5px -5px 0 5px #fff" : "none",
                      transition: "box-shadow 0.2s ease-in-out",
                    },
                  }}
                >
                  <ListItemButton
                    sx={{
                      py: 1,
                      "&:hover": {
                        backgroundColor: isSelected ? "#fff" : "rgba(255, 255, 255, 0.1)",
                        color: isSelected ? "#4C1D95" : "#fff",
                        borderTopLeftRadius: "20px",
                        borderBottomLeftRadius: "20px",
                      },
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isSelected ? "#00E0FF" : "#a289f0",
                        minWidth: "40px",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            fontWeight: isSelected ? "bold" : 500,
                          }}
                        >
                          {item.label}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </Box>
        ))}
      </List>
    </Box>
  );
}
