import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Search,
  FilterList,
  Person,
  Group,
  Add,
  Remove,
  Send,
  CheckCircle
} from '@mui/icons-material';

export default function ParticipantTargeting() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [includeManagers, setIncludeManagers] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  // Données d'exemple
  const departments = [
    'Ressources Humaines',
    'Finance',
    'Marketing',
    'Développement',
    'Commercial',
    'Production'
  ];

  const roles = [
    'Manager',
    'Employé',
    'Stagiaire',
    'Consultant',
    'Directeur'
  ];

  const allParticipants = [
    { id: 1, name: 'Marie Dubois', department: 'Ressources Humaines', role: 'Manager', email: 'marie.dubois@company.com', avatar: 'MD' },
    { id: 2, name: 'Jean Martin', department: 'Finance', role: 'Employé', email: 'jean.martin@company.com', avatar: 'JM' },
    { id: 3, name: 'Sophie Laurent', department: 'Marketing', role: 'Manager', email: 'sophie.laurent@company.com', avatar: 'SL' },
    { id: 4, name: 'Pierre Durand', department: 'Développement', role: 'Employé', email: 'pierre.durand@company.com', avatar: 'PD' },
    { id: 5, name: 'Anna Garcia', department: 'Commercial', role: 'Directeur', email: 'anna.garcia@company.com', avatar: 'AG' },
    { id: 6, name: 'Lucas Moreau', department: 'Production', role: 'Employé', email: 'lucas.moreau@company.com', avatar: 'LM' }
  ];

  const filteredParticipants = allParticipants.filter(participant => {
    return (
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDepartment === '' || participant.department === selectedDepartment) &&
      (selectedRole === '' || participant.role === selectedRole) &&
      (includeManagers || participant.role !== 'Manager')
    );
  });

  const handleAddParticipant = (participant) => {
    if (!selectedParticipants.find(p => p.id === participant.id)) {
      setSelectedParticipants([...selectedParticipants, participant]);
    }
  };

  const handleRemoveParticipant = (participantId) => {
    setSelectedParticipants(selectedParticipants.filter(p => p.id !== participantId));
  };

  const handleSendInvitations = () => {
    setOpenConfirmDialog(true);
  };

  const confirmSendInvitations = () => {
    // Logique d'envoi des invitations
    setOpenConfirmDialog(false);
    alert(`Invitations envoyées à ${selectedParticipants.length} participant(s)`);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
          PGIF-6 - Ciblage des participants
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          Sélectionnez les participants pour votre session de formation
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* Section des filtres - maintenant divisée en deux colonnes */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <FilterList sx={{ mr: 1 }} />
                Filtres de recherche
              </Typography>
              
              <TextField
                fullWidth
                label="Rechercher un participant"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Département</InputLabel>
                <Select
                  value={selectedDepartment}
                  label="Département"
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <MenuItem value="">Tous les départements</MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Rôle</InputLabel>
                <Select
                  value={selectedRole}
                  label="Rôle"
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <MenuItem value="">Tous les rôles</MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeManagers}
                    onChange={(e) => setIncludeManagers(e.target.checked)}
                  />
                }
                label="Inclure les managers"
              />

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {filteredParticipants.length} participant(s) trouvé(s)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Participants sélectionnés - maintenant à côté des filtres */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Group sx={{ mr: 1 }} />
                Participants sélectionnés ({selectedParticipants.length})
              </Typography>

              {selectedParticipants.length === 0 ? (
                <Alert severity="info">Aucun participant sélectionné</Alert>
              ) : (
                <List
                  dense
                  sx={
                    selectedParticipants.length > 4
                      ? { maxHeight: 240, overflowY: 'auto', transition: 'max-height 0.2s' }
                      : undefined
                  }
                >
                  {selectedParticipants.map((participant) => (
                    <ListItem key={participant.id}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.8rem' }}>
                          {participant.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={participant.name}
                        secondary={participant.department}
                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                        secondaryTypographyProps={{ fontSize: '0.8rem' }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleRemoveParticipant(participant.id)}
                          size="small"
                          color="error"
                        >
                          <Remove />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}

              {selectedParticipants.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Send />}
                    onClick={handleSendInvitations}
                    sx={{ 
                      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
                    }}
                  >
                    Envoyer les invitations
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Liste des participants disponibles - prend maintenant toute la largeur */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1 }} />
                Participants disponibles
              </Typography>

              <Grid container spacing={2}>
                {filteredParticipants.map((participant) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={participant.id}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        border: selectedParticipants.find(p => p.id === participant.id) ? 
                          '2px solid' : '1px solid',
                        borderColor: selectedParticipants.find(p => p.id === participant.id) ? 
                          'success.main' : 'divider',
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          {participant.avatar}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {participant.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {participant.role}
                          </Typography>
                        </Box>
                        {selectedParticipants.find(p => p.id === participant.id) ? (
                          <CheckCircle color="success" />
                        ) : (
                          <IconButton
                            onClick={() => handleAddParticipant(participant)}
                            color="primary"
                          >
                            <Add />
                          </IconButton>
                        )}
                      </Box>
                      
                      <Chip
                        label={participant.department}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                        color="primary"
                        variant="outlined"
                      />
                      
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {participant.email}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {filteredParticipants.length === 0 && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  Aucun participant ne correspond aux critères de recherche.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog de confirmation */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirmer l'envoi des invitations</DialogTitle>
        <DialogContent>
          <Typography>
            Vous êtes sur le point d'envoyer des invitations à {selectedParticipants.length} participant(s) pour la session PGIF-6.
          </Typography>
          <Typography sx={{ mt: 1, fontWeight: 'bold' }}>
            Cette action est irréversible. Continuer ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Annuler</Button>
          <Button onClick={confirmSendInvitations} variant="contained" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}