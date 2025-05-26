import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Chip } from '@mui/material';

const apartments = [
  {
    id: 1,
    name: 'Studio cosy centre-ville',
    desc: 'Studio lumineux et moderne, idéal pour une personne ou un couple. Proche de toutes commodités.',
    price: 65,
    status: 'Disponible',
    img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Appartement familial',
    desc: 'Grand appartement avec 3 chambres, balcon et parking. Parfait pour une famille.',
    price: 120,
    status: 'Occupé',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Loft design',
    desc: 'Loft spacieux avec cuisine équipée et vue sur la ville. Décoration contemporaine.',
    price: 95,
    status: 'Disponible',
    img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Appartement terrasse',
    desc: 'Appartement 2 pièces avec grande terrasse privative. Calme et lumineux.',
    price: 80,
    status: 'Disponible',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
];

const Apartments = () => (
  <Box sx={{ p: { xs: 2, sm: 4 } }}>
    <Typography variant="h4" fontWeight={700} color="primary.main" mb={3}>
      Gestion des appartements
    </Typography>
    <Grid container spacing={3}>
      {apartments.map((apt) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={apt.id}>
          <Card elevation={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="160"
              image={apt.img}
              alt={apt.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {apt.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {apt.desc}
              </Typography>
              <Typography variant="subtitle1" color="primary" fontWeight={700}>
                {apt.price} € / nuit
              </Typography>
              <Chip
                label={apt.status}
                color={apt.status === 'Disponible' ? 'success' : 'default'}
                size="small"
                sx={{ mt: 1 }}
              />
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="primary" disabled={apt.status !== 'Disponible'}>
                Réserver
              </Button>
              <Button size="small" variant="outlined" color="primary">
                Détails
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Apartments; 