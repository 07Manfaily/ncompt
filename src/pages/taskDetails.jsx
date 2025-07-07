import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  Grid,
  Divider,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import {
  Close as CloseIcon,
  Info as InfoIcon,
  Schedule as ScheduleIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

const SessionModal = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  // Données d'exemple
  const sessionData = {
    Name_Description: "Formation complète sur JavaScript moderne et ses frameworks",
    code_session: "FORM-2024-001",
    intitule_session: "Session JavaScript Avancé",
    statut: "Actif",
    date: "15/03/2024",
    debut: "15/03/2024",
    heure_debut: "09:00",
    date_fin: "17/03/2024",
    heure_fin: "17:00",
    duree_jours: 3,
    duree_heures: 24,
    ville: "Paris",
    lieu: "Centre de Formation TechSkills - Salle A205",
    type: "Formation Continue",
    code_formation: "JS-ADV-001",
    intitule_formation: "JavaScript Avancé et Frameworks Modernes",
    mode_de_diffusion: "Présentiel",
    formateur: "Marie Dubois"
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'actif':
        return 'success';
      case 'planifié':
        return 'warning';
      case 'terminé':
        return 'error';
      default:
        return 'default';
    }
  };

  const InfoSection = ({ title, icon, children, color = 'primary' }) => (
    <Card 
      elevation={0} 
      sx={{ 
        mb: 3, 
        border: '1px solid',
        borderColor: 'divider',
        borderLeft: 4,
        borderLeftColor: `${color}.main`,
        backgroundColor: 'grey.50'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ 
            bgcolor: `${color}.main`, 
            mr: 2, 
            width: 32, 
            height: 32 
          }}>
            {icon}
          </Avatar>
          <Typography variant="h6" component="h3" color={`${color}.main`}>
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );

  const InfoField = ({ label, value, fullWidth = false }) => (
    <Grid item xs={12} sm={fullWidth ? 12 : 6}>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ mt: 0.5 }}>
          {value}
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '600px'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {sessionData.intitule_session}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {sessionData.Name_Description}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ pt: 3 }}>
        {/* Section Informations Générales */}
        <InfoSection 
          title="Informations Générales" 
          icon={<InfoIcon />}
          color="primary"
        >
          <Grid container spacing={3}>
            <InfoField label="Code Session" value={sessionData.code_session} />
            <InfoField label="Intitulé Session" value={sessionData.intitule_session} />
            <InfoField 
              label="Statut" 
              value={
                <Chip 
                  label={sessionData.statut}
                  color={getStatusColor(sessionData.statut)}
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              } 
            />
            <InfoField label="Type" value={sessionData.type} />
          </Grid>
        </InfoSection>

        {/* Section Planning */}
        <InfoSection 
          title="Planning" 
          icon={<ScheduleIcon />}
          color="secondary"
        >
          <Grid container spacing={3}>
            <InfoField label="Date de début" value={sessionData.debut} />
            <InfoField label="Heure de début" value={sessionData.heure_debut} />
            <InfoField label="Date de fin" value={sessionData.date_fin} />
            <InfoField label="Heure de fin" value={sessionData.heure_fin} />
          </Grid>
          
          <Box sx={{ 
            mt: 2, 
            p: 2, 
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 1,
            textAlign: 'center'
          }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <CalendarIcon />
              Durée totale : {sessionData.duree_jours} jours • {sessionData.duree_heures} heures
            </Typography>
          </Box>
        </InfoSection>

        {/* Section Formation */}
        <InfoSection 
          title="Formation" 
          icon={<SchoolIcon />}
          color="info"
        >
          <Grid container spacing={3}>
            <InfoField label="Code Formation" value={sessionData.code_formation} />
            <InfoField label="Intitulé Formation" value={sessionData.intitule_formation} fullWidth />
            <InfoField label="Mode de diffusion" value={sessionData.mode_de_diffusion} />
            <InfoField 
              label="Formateur" 
              value={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <PersonIcon color="action" fontSize="small" />
                  {sessionData.formateur}
                </Box>
              } 
            />
          </Grid>
        </InfoSection>

        {/* Section Logistique */}
        <InfoSection 
          title="Logistique" 
          icon={<LocationIcon />}
          color="warning"
        >
          <Grid container spacing={3}>
            <InfoField label="Ville" value={sessionData.ville} />
            <InfoField label="Lieu" value={sessionData.lieu} fullWidth />
          </Grid>
        </InfoSection>
      </DialogContent>
      
      <Divider />
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Fermer
        </Button>
        <Button variant="contained" sx={{ ml: 1 }}>
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Composant principal avec bouton pour ouvrir le modal
const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box sx={{ p: 4, backgroundColor: 'grey.100', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Sessions de Formation
      </Typography>
      
      <Button 
        variant="contained" 
        size="large"
        onClick={() => setModalOpen(true)}
        sx={{ mb: 3 }}
      >
        Voir les détails de la session
      </Button>

      {modalOpen && <SessionModal />}
    </Box>
  );
};

export default App; 