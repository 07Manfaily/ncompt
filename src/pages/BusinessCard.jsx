import React from 'react';
import { Box, Typography, Grid, Paper, Avatar, IconButton, Divider, Stack, Link } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const BusinessCard = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={8} sx={{ borderRadius: 4, overflow: 'hidden', width: 420, maxWidth: '95%', display: 'flex', p: 0 }}>
        {/* Partie gauche */}
        <Box sx={{ bgcolor: '#17634a', color: 'white', width: '55%', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: 1 }}>
              MICHAL <span style={{ color: '#b2dfdb' }}>SMITH</span>
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 3, color: '#b2dfdb' }}>
              Graphic Designer
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">+00 123-456-7890</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">+00 123-456-7890</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LanguageIcon fontSize="small" />
                <Link href="https://www.yourwebsite.com" color="inherit" underline="hover" variant="body2">
                  www.yourwebsite.com
                </Link>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">company@gmail.com</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">123 your address here, city name here-1234</Typography>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ position: 'absolute', right: -18, top: 0, bottom: 0, width: 36, bgcolor: 'transparent', zIndex: 1 }}>
            <Box sx={{ height: '100%', width: '100%', bgcolor: 'transparent', borderRadius: '0 40px 40px 0', borderRight: '6px solid #e53935', borderLeft: '6px solid transparent' }} />
          </Box>
        </Box>
        {/* Partie droite */}
        <Box sx={{ bgcolor: 'white', width: '45%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <Avatar sx={{ bgcolor: '#e53935', width: 56, height: 56 }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C19.3137 4 22 6.68629 22 10C22 13.3137 19.3137 16 16 16C12.6863 16 10 13.3137 10 10C10 6.68629 12.6863 4 16 4Z" stroke="#17634a" strokeWidth="2" />
                <path d="M16 18C10.4772 18 6 22.4772 6 28H26C26 22.4772 21.5228 18 16 18Z" stroke="#17634a" strokeWidth="2" />
              </svg>
            </Avatar>
          </Box>
          <Typography variant="h6" sx={{ color: '#17634a', fontWeight: 'bold', mb: 1 }}>COMPANY NAME</Typography>
          <Typography variant="body2" sx={{ color: '#b2dfdb', mb: 2 }}>YOUR SLOGAN HERE</Typography>
          <Divider sx={{ width: '100%', mb: 2 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <QrCode2Icon sx={{ fontSize: 48, color: '#17634a' }} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default BusinessCard; 