import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Refresh,
  Download,
  Visibility,
  Email,
  FilterList
} from '@mui/icons-material';

export default function SyntheseNotificationPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSynthese, setSelectedSynthese] = useState(null);

  const synthesesData = [
    {
      id: 1,
      actionFormation: "Formation React avancé",
      dateDebut: "2025-08-15",
      dateFin: "2025-08-17",
      nombreSessions: 3,
      totalParticipants: 45,
      status: "completed",
      responsable: "Marie Dupont",
      budget: "15000€"
    },
    {
      id: 2,
      actionFormation: "Gestion de projet Agile",
      dateDebut: "2025-09-01",
      dateFin: "2025-09-05",
      nombreSessions: 5,
      totalParticipants: 30,
      status: "in-progress",
      responsable: "Jean Martin",
      budget: "12000€"
    },
    {
      id: 3,
      actionFormation: "Leadership et management",
      dateDebut: "2025-09-20",
      dateFin: "2025-09-22",
      nombreSessions: 2,
      totalParticipants: 25,
      status: "planned",
      responsable: "Sophie Dubois",
      budget: "8000€"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'planned': return 'info';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Terminée';
      case 'in-progress': return 'En cours';
      case 'planned': return 'Planifiée';
      default: return status;
    }
  };

  const handleViewDetails = (synthese) => {
    setSelectedSynthese(synthese);
    setOpenDialog(true);
  };

  const filteredData = synthesesData.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = item.actionFormation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.responsable.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
        PGIF-16 - Notification de la disponibilité d'une synthèse d'action de formation
      </Typography>
      
      <Typography variant="subtitle1" sx={{ mb: 3, color: '#666' }}>
        Synthèse globale des sessions de formation
      </Typography>

      {/* Filtres et actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Rechercher"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Statut</InputLabel>
                <Select
                  value={filterStatus}
                  label="Statut"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">Tous</MenuItem>
                  <MenuItem value="completed">Terminées</MenuItem>
                  <MenuItem value="in-progress">En cours</MenuItem>
                  <MenuItem value="planned">Planifiées</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" startIcon={<Refresh />}>
                  Actualiser
                </Button>
                <Button variant="outlined" startIcon={<Download />}>
                  Exporter
                </Button>
                <Button variant="contained" startIcon={<Email />}>
                  Envoyer notifications
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Statistiques rapides */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                8
              </Typography>
              <Typography variant="body2">Total actions de formation</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: '#e8f5e8' }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                3
              </Typography>
              <Typography variant="body2">Actions terminées</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: '#fff3e0' }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                2
              </Typography>
              <Typography variant="body2">En cours</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: '#f3e5f5' }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                100
              </Typography>
              <Typography variant="body2">Participants total</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tableau des synthèses */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Synthèses d'actions de formation disponibles
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>Action de Formation</strong></TableCell>
                  <TableCell><strong>Période</strong></TableCell>
                  <TableCell><strong>Sessions</strong></TableCell>
                  <TableCell><strong>Participants</strong></TableCell>
                  <TableCell><strong>Responsable</strong></TableCell>
                  <TableCell><strong>Budget</strong></TableCell>
                  <TableCell><strong>Statut</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                        {row.actionFormation}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        Du {new Date(row.dateDebut).toLocaleDateString('fr-FR')} 
                        au {new Date(row.dateFin).toLocaleDateString('fr-FR')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={`${row.nombreSessions} sessions`} 
                        size="small" 
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{row.totalParticipants}</TableCell>
                    <TableCell>{row.responsable}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{row.budget}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusLabel(row.status)}
                        color={getStatusColor(row.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleViewDetails(row)}
                          title="Voir détails"
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="success"
                          title="Télécharger synthèse"
                        >
                          <Download />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="info"
                          title="Envoyer notification"
                        >
                          <Email />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredData.length === 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Aucune synthèse trouvée avec les critères de recherche actuels.
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Dialog de détails */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Détails de la synthèse - {selectedSynthese?.actionFormation}
        </DialogTitle>
        <DialogContent>
          {selectedSynthese && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Responsable
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedSynthese.responsable}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Budget alloué
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedSynthese.budget}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Nombre de sessions
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedSynthese.nombreSessions}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total participants
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedSynthese.totalParticipants}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Fermer</Button>
          <Button variant="contained" startIcon={<Download />}>
            Télécharger synthèse
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}