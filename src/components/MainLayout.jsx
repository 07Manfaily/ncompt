import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../pages/side2'; // Assurez-vous que le chemin est correct

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f4f6f8', // Une couleur de fond neutre pour le contenu
          overflowY: 'auto', // Permet le défilement si le contenu est long
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout; 