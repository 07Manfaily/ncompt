import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const RatePlans = () => (
  <Box sx={{ p: { xs: 2, sm: 4 }, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
    <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 }, maxWidth: 500, width: '100%', textAlign: 'center' }}>
      <Typography variant="h4" fontWeight={700} mb={2} color="primary.main">
        Rate Plans
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Gestion des plans tarifaires...
      </Typography>
    </Paper>
  </Box>
);

export default RatePlans; 