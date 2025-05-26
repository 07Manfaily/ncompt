import React from 'react';
import { Box, Paper, Typography, TextField, Button, Link } from '@mui/material';
import backImg from "../assets/back.png"

const Login = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: '#f5f7fa',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        zIndex: 1300,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          overflow: 'hidden',
        }}
      >
        {/* Partie gauche : illustration ou image */}
        <Box
          sx={{
            flex: 1.2,
            bgcolor: '#020235',
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 320,
          }}
        >
          {/* Remplace ce Box par <img ... /> si tu veux afficher une image réelle */}
          
            <img src={backImg} alt="back" />
          
        </Box>
        {/* Partie droite : formulaire */}
        <Box
          sx={{
            flex: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f7fa',
            p: { xs: 2, sm: 4 },
            width: '100%',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 360 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#181c54', textAlign: 'center', mb: 1 }}>
              PLATEFORME-<Box component="span" sx={{ color: '#e60028' }}>RH</Box>
            </Typography>
            <Typography variant="h6" sx={{ color: '#23286b', textAlign: 'center', mb: 3 }}>
              Bienvenue !
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="IDENTIFIANT"
                placeholder="xxxx@xxxx.com"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="MOT DE PASSE"
                type="password"
                placeholder="*********"
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                <Link href="#" underline="hover" sx={{ color: '#181c54', fontSize: 15 }}>
                 Mot de passe oublié ?
                </Link>
              </Box>
              <Button
              onClick={window.location.href="/home"}
                type="submit"
                variant="contained"
                sx={{
                  width: '100%',
                  background: '#181c54',
                  color: '#fff',
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: 18,
                  py: 1.2,
                  boxShadow: 2,
                  '&:hover': { background: '#f5f7fa' },
                }}
              >
                Connexion
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login; 