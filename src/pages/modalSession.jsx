import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Divider,
  IconButton,
  Container,
  Paper,
  Fade,
  Backdrop,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const FormationSessionModal = () => {
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    Name_Description: '',
    code_session: '',
    intitule_session: '',
    statut: '',
    date: '',
    debut: '',
    heure_debut: '',
    date_fin: '',
    heure_fin: '',
    duree_jours: '',
    duree_heures: '',
    ville: '',
    lieu: '',
    type: '',
    code_formation: '',
    intitule_formation: '',
    mode_de_diffusion: '',
    formateur: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setShowAlert(false);
  };

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = () => {
    // Validation des champs requis
    const requiredFields = [
      'Name_Description', 'code_session', 'intitule_session', 'statut',
      'date', 'heure_debut', 'date_fin', 'heure_fin', 'ville', 'lieu',
      'type', 'code_formation', 'intitule_formation', 'mode_de_diffusion', 'formateur'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setShowAlert(true);
      return;
    }
    
    // Afficher les données (remplacer par votre appel API)
    console.log('Données à envoyer à l\'API:', formData);
    
    // Exemple d'appel API
    /*
    fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(result => {
      console.log('Succès:', result);
      handleClose();
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
    */
    
    alert('Session créée avec succès!\nVérifiez la console pour voir les données.');
    handleClose();
  };

  const statutOptions = [
    { value: 'planifiee', label: 'Planifiée' },
    { value: 'en_cours', label: 'En cours' },
    { value: 'terminee', label: 'Terminée' },
    { value: 'annulee', label: 'Annulée' }
  ];

  const typeOptions = [
    { value: 'presentiel', label: 'Présentiel' },
    { value: 'distanciel', label: 'Distanciel' },
    { value: 'hybride', label: 'Hybride' }
  ];

  const modeDiffusionOptions = [
    { value: 'inter', label: 'Inter-entreprise' },
    { value: 'intra', label: 'Intra-entreprise' },
    { value: 'individuel', label: 'Individuel' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3
        }}
      >
        <Box textAlign="center">
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              color: 'white',
              px: 4,
              py: 2,
              fontSize: '1.1rem',
              borderRadius: 2,
              boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2, #1BA0D2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(33, 150, 243, 0.4)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Créer une session de formation
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          }
        }}
        TransitionComponent={Fade}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            color: 'white',
            position: 'relative',
            py: 3
          }}
        >
          <Typography variant="h4" component="h2" fontWeight="600">
            Nouvelle Session de Formation
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ py: 4 }}>
          {showAlert && (
            <Alert 
              severity="error" 
              onClose={() => setShowAlert(false)}
              sx={{ mb: 3 }}
            >
              Veuillez remplir tous les champs obligatoires
            </Alert>
          )}

          <Box sx={{ mt: 2 }}>
            {/* Section Identification */}
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                color="primary" 
                gutterBottom
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Identification
              </Typography>
              <Divider sx={{ mb: 3, borderColor: '#e3f2fd', borderWidth: 2 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nom/Description"
                    value={formData.Name_Description}
                    onChange={handleChange('Name_Description')}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Code Session"
                    value={formData.code_session}
                    onChange={handleChange('code_session')}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Intitulé Session"
                    value={formData.intitule_session}
                    onChange={handleChange('intitule_session')}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Statut</InputLabel>
                    <Select
                      value={formData.statut}
                      onChange={handleChange('statut')}
                      label="Statut"
                      sx={{
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#2196F3',
                        },
                      }}
                    >
                      {statutOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* Section Dates et Durée */}
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                color="primary" 
                gutterBottom
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Dates et Durée
              </Typography>
              <Divider sx={{ mb: 3, borderColor: '#e3f2fd', borderWidth: 2 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date de début"
                    value={formData.date}
                    onChange={handleChange('date')}
                    InputLabelProps={{ shrink: true }}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="time"
                    label="Heure de début"
                    value={formData.heure_debut}
                    onChange={handleChange('heure_debut')}
                    InputLabelProps={{ shrink: true }}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date de fin"
                    value={formData.date_fin}
                    onChange={handleChange('date_fin')}
                    InputLabelProps={{ shrink: true }}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="time"
                    label="Heure de fin"
                    value={formData.heure_fin}
                    onChange={handleChange('heure_fin')}
                    InputLabelProps={{ shrink: true }}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Durée (jours)"
                    value={formData.duree_jours}
                    onChange={handleChange('duree_jours')}
                    inputProps={{ min: 0 }}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Durée (heures)"
                    value={formData.duree_heures}
                    onChange={handleChange('duree_heures')}
                    inputProps={{ min: 0, step: 0.5 }}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Section Lieu */}
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                color="primary" 
                gutterBottom
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Lieu
              </Typography>
              <Divider sx={{ mb: 3, borderColor: '#e3f2fd', borderWidth: 2 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Ville"
                    value={formData.ville}
                    onChange={handleChange('ville')}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Lieu"
                    value={formData.lieu}
                    onChange={handleChange('lieu')}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={formData.type}
                      onChange={handleChange('type')}
                      label="Type"
                      sx={{
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#2196F3',
                        },
                      }}
                    >
                      {typeOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* Section Formation */}
            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="h6" 
                color="primary" 
                gutterBottom
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Formation
              </Typography>
              <Divider sx={{ mb: 3, borderColor: '#e3f2fd', borderWidth: 2 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Code Formation"
                    value={formData.code_formation}
                    onChange={handleChange('code_formation')}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Intitulé Formation"
                    value={formData.intitule_formation}
                    onChange={handleChange('intitule_formation')}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Mode de Diffusion</InputLabel>
                    <Select
                      value={formData.mode_de_diffusion}
                      onChange={handleChange('mode_de_diffusion')}
                      label="Mode de Diffusion"
                      sx={{
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#2196F3',
                        },
                      }}
                    >
                      {modeDiffusionOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Formateur"
                    value={formData.formateur}
                    onChange={handleChange('formateur')}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2196F3',
                        },
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions 
          sx={{ 
            p: 3, 
            backgroundColor: '#f8f9fa',
            borderRadius: '0 0 12px 12px'
          }}
        >
          <Button
            onClick={handleClose}
            startIcon={<CancelIcon />}
            sx={{
              color: '#6c757d',
              borderColor: '#6c757d',
              '&:hover': {
                backgroundColor: '#6c757d',
                color: 'white',
              }
            }}
            variant="outlined"
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2, #1BA0D2)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Créer la session
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FormationSessionModal;