import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  StepButton,
  Typography,
  Box,
  Paper,
  Fade,
  Slide,
  IconButton,
  LinearProgress,
  Card,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert
} from '@mui/material';
import {
  School,
  Business,
  Schedule,
  Euro,
  Close,
  NavigateNext,
  NavigateBefore,
  Check,
  Celebration
} from '@mui/icons-material';

// Composant pour chaque étape avec layout adaptatif
const StepComponent = ({ title, icon, children, description }) => (
  <Fade in={true} timeout={600}>
    <Card elevation={0} sx={{ background: 'transparent' }}>
      <CardContent sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              width: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="h5" fontWeight="bold" color="primary.main">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 3, background: 'linear-gradient(90deg, #667eea, #764ba2)' }} />
        {children}
      </CardContent>
    </Card>
  </Fade>
);

// Étape 1: Informations de base de la formation
const Step1 = ({ formData, setFormData, errors }) => {
  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      step1: { ...prev.step1, [field]: event.target.value }
    }));
  };

  return (
    <StepComponent
      title="Informations de Formation"
      description="Détails de base sur la formation"
      icon={<School sx={{ color: 'white', fontSize: 28 }} />}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Code Formation *"
            variant="outlined"
            value={formData.step1.code_formation || ''}
            onChange={handleChange('code_formation')}
            error={!!errors.code_formation}
            helperText={errors.code_formation}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Intitulé Formation *"
            variant="outlined"
            value={formData.step1.intitule_formation || ''}
            onChange={handleChange('intitule_formation')}
            error={!!errors.intitule_formation}
            helperText={errors.intitule_formation}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Objectif Formation *"
            variant="outlined"
            multiline
            rows={3}
            value={formData.step1.objectif_formation || ''}
            onChange={handleChange('objectif_formation')}
            error={!!errors.objectif_formation}
            helperText={errors.objectif_formation}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="OGF"
            variant="outlined"
            value={formData.step1.ogf || ''}
            onChange={handleChange('ogf')}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Thématique *"
            variant="outlined"
            value={formData.step1.thematique || ''}
            onChange={handleChange('thematique')}
            error={!!errors.thematique}
            helperText={errors.thematique}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
      </Grid>
    </StepComponent>
  );
};

// Étape 2: Programme et modalités
const Step2 = ({ formData, setFormData, errors }) => {
  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      step2: { ...prev.step2, [field]: event.target.value }
    }));
  };

  return (
    <StepComponent
      title="Programme et Modalités"
      description="Organisation et type de formation"
      icon={<Business sx={{ color: 'white', fontSize: 28 }} />}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.type_de_programme}>
            <InputLabel>Type de Programme *</InputLabel>
            <Select
              value={formData.step2.type_de_programme || ''}
              onChange={handleChange('type_de_programme')}
              label="Type de Programme *"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Présentiel">Présentiel</MenuItem>
              <MenuItem value="Distanciel">Distanciel</MenuItem>
              <MenuItem value="Mixte">Mixte</MenuItem>
            </Select>
            {errors.type_de_programme && (
              <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                {errors.type_de_programme}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.origine_de_la_demande}>
            <InputLabel>Origine de la Demande *</InputLabel>
            <Select
              value={formData.step2.origine_de_la_demande || ''}
              onChange={handleChange('origine_de_la_demande')}
              label="Origine de la Demande *"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Direction">Direction</MenuItem>
              <MenuItem value="Employé">Employé</MenuItem>
              <MenuItem value="RH">Ressources Humaines</MenuItem>
              <MenuItem value="Client">Client</MenuItem>
            </Select>
            {errors.origine_de_la_demande && (
              <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                {errors.origine_de_la_demande}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Formation Obligatoire</InputLabel>
            <Select
              value={formData.step2.formation_obligatoire || ''}
              onChange={handleChange('formation_obligatoire')}
              label="Formation Obligatoire"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Oui">Oui</MenuItem>
              <MenuItem value="Non">Non</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Formation Diplômante</InputLabel>
            <Select
              value={formData.step2.formation_diplomante || ''}
              onChange={handleChange('formation_diplomante')}
              label="Formation Diplômante"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Oui">Oui</MenuItem>
              <MenuItem value="Non">Non</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.priorite}>
            <InputLabel>Priorité *</InputLabel>
            <Select
              value={formData.step2.priorite || ''}
              onChange={handleChange('priorite')}
              label="Priorité *"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Haute">Haute</MenuItem>
              <MenuItem value="Moyenne">Moyenne</MenuItem>
              <MenuItem value="Basse">Basse</MenuItem>
            </Select>
            {errors.priorite && (
              <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                {errors.priorite}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.mode_diffusion}>
            <InputLabel>Mode de Diffusion *</InputLabel>
            <Select
              value={formData.step2.mode_diffusion || ''}
              onChange={handleChange('mode_diffusion')}
              label="Mode de Diffusion *"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Interne">Interne</MenuItem>
              <MenuItem value="Externe">Externe</MenuItem>
              <MenuItem value="Mixte">Mixte</MenuItem>
            </Select>
            {errors.mode_diffusion && (
              <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                {errors.mode_diffusion}
              </Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </StepComponent>
  );
};

// Étape 3: Planning et participants
const Step3 = ({ formData, setFormData, errors }) => {
  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      step3: { ...prev.step3, [field]: event.target.value }
    }));
  };

  return (
    <StepComponent
      title="Planning et Participants"
      description="Dates, durée et profil des participants"
      icon={<Schedule sx={{ color: 'white', fontSize: 28 }} />}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Direction *"
            variant="outlined"
            value={formData.step3.direction || ''}
            onChange={handleChange('direction')}
            error={!!errors.direction}
            helperText={errors.direction}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Profil Cible *"
            variant="outlined"
            value={formData.step3.profil_cible || ''}
            onChange={handleChange('profil_cible')}
            error={!!errors.profil_cible}
            helperText={errors.profil_cible}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Effectif *"
            type="number"
            variant="outlined"
            value={formData.step3.effectif || ''}
            onChange={handleChange('effectif')}
            error={!!errors.effectif}
            helperText={errors.effectif}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Formateur *"
            variant="outlined"
            value={formData.step3.formateur || ''}
            onChange={handleChange('formateur')}
            error={!!errors.formateur}
            helperText={errors.formateur}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Durée (jours) *"
            type="number"
            variant="outlined"
            value={formData.step3.duree_jours || ''}
            onChange={handleChange('duree_jours')}
            error={!!errors.duree_jours}
            helperText={errors.duree_jours}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Durée (heures) *"
            type="number"
            variant="outlined"
            value={formData.step3.duree_heures || ''}
            onChange={handleChange('duree_heures')}
            error={!!errors.duree_heures}
            helperText={errors.duree_heures}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date de Début *"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={formData.step3.date_de_debut || ''}
            onChange={handleChange('date_de_debut')}
            error={!!errors.date_de_debut}
            helperText={errors.date_de_debut}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date de Fin *"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={formData.step3.date_de_fin || ''}
            onChange={handleChange('date_de_fin')}
            error={!!errors.date_de_fin}
            helperText={errors.date_de_fin}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
      </Grid>
    </StepComponent>
  );
};

// Étape 4: Coûts et informations finales
const Step4 = ({ formData, setFormData, errors }) => {
  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      step4: { ...prev.step4, [field]: event.target.value }
    }));
  };

  return (
    <StepComponent
      title="Coûts et Informations Finales"
      description="Budget et détails administratifs"
      icon={<Euro sx={{ color: 'white', fontSize: 28 }} />}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Période Courts"
            variant="outlined"
            value={formData.step4.periode_courts || ''}
            onChange={handleChange('periode_courts')}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Conception Animation *"
            type="number"
            variant="outlined"
            value={formData.step4.conception_animation || ''}
            onChange={handleChange('conception_animation')}
            error={!!errors.conception_animation}
            helperText={errors.conception_animation}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
            InputProps={{
              endAdornment: <Typography variant="body2" color="text.secondary">€</Typography>
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Coûts Logistique *"
            type="number"
            variant="outlined"
            value={formData.step4.couts_logistique || ''}
            onChange={handleChange('couts_logistique')}
            error={!!errors.couts_logistique}
            helperText={errors.couts_logistique}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
            InputProps={{
              endAdornment: <Typography variant="body2" color="text.secondary">€</Typography>
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Coûts Total *"
            type="number"
            variant="outlined"
            value={formData.step4.couts_total || ''}
            onChange={handleChange('couts_total')}
            error={!!errors.couts_total}
            helperText={errors.couts_total}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
            InputProps={{
              endAdornment: <Typography variant="body2" color="text.secondary">€</Typography>
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.statut_avis_drh}>
            <InputLabel>Statut Avis DRH *</InputLabel>
            <Select
              value={formData.step4.statut_avis_drh || ''}
              onChange={handleChange('statut_avis_drh')}
              label="Statut Avis DRH *"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="En attente">En attente</MenuItem>
              <MenuItem value="Approuvé">Approuvé</MenuItem>
              <MenuItem value="Refusé">Refusé</MenuItem>
            </Select>
            {errors.statut_avis_drh && (
              <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                {errors.statut_avis_drh}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre de Sessions *"
            type="number"
            variant="outlined"
            value={formData.step4.nbr_session || ''}
            onChange={handleChange('nbr_session')}
            error={!!errors.nbr_session}
            helperText={errors.nbr_session}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.type}>
            <InputLabel>Type *</InputLabel>
            <Select
              value={formData.step4.type || ''}
              onChange={handleChange('type')}
              label="Type *"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Formation">Formation</MenuItem>
              <MenuItem value="Séminaire">Séminaire</MenuItem>
              <MenuItem value="Atelier">Atelier</MenuItem>
              <MenuItem value="Conférence">Conférence</MenuItem>
            </Select>
            {errors.type && (
              <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                {errors.type}
              </Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </StepComponent>
  );
};

// Composant de félicitations
const SuccessComponent = ({ formData, onRestart }) => (
  <Fade in={true} timeout={800}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 400,
        textAlign: 'center',
        p: 4
      }}
    >
      <Celebration sx={{ fontSize: 80, color: '#4CAF50', mb: 3 }} />
      <Typography variant="h4" fontWeight="bold" color="primary.main" mb={2}>
        Formation Enregistrée !
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Votre formation "{formData.step1?.intitule_formation}" a été créée avec succès.
      </Typography>
      <Button
        onClick={onRestart}
        variant="contained"
        size="large"
        sx={{
          background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
          borderRadius: 3,
          px: 4,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 'bold'
        }}
      >
        Créer une Nouvelle Formation
      </Button>
    </Box>
  </Fade>
);

const WizardFormModal = () => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {}
  });

  const steps = ['Formation', 'Programme', 'Planning', 'Coûts'];
  const totalSteps = steps.length;

  // Validation des champs obligatoires pour chaque étape
  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    switch (stepNumber) {
      case 0:
        if (!formData.step1.code_formation?.trim()) newErrors.code_formation = 'Code formation requis';
        if (!formData.step1.intitule_formation?.trim()) newErrors.intitule_formation = 'Intitulé requis';
        if (!formData.step1.objectif_formation?.trim()) newErrors.objectif_formation = 'Objectif requis';
        if (!formData.step1.thematique?.trim()) newErrors.thematique = 'Thématique requise';
        break;
      case 1:
        if (!formData.step2.type_de_programme?.trim()) newErrors.type_de_programme = 'Type de programme requis';
        if (!formData.step2.origine_de_la_demande?.trim()) newErrors.origine_de_la_demande = 'Origine de la demande requise';
        if (!formData.step2.priorite?.trim()) newErrors.priorite = 'Priorité requise';
        if (!formData.step2.mode_diffusion?.trim()) newErrors.mode_diffusion = 'Mode de diffusion requis';
        break;
      case 2:
        if (!formData.step3.direction?.trim()) newErrors.direction = 'Direction requise';
        if (!formData.step3.profil_cible?.trim()) newErrors.profil_cible = 'Profil cible requis';
        if (!formData.step3.effectif) newErrors.effectif = 'Effectif requis';
        if (!formData.step3.formateur?.trim()) newErrors.formateur = 'Formateur requis';
        if (!formData.step3.duree_jours) newErrors.duree_jours = 'Durée en jours requise';
        if (!formData.step3.duree_heures) newErrors.duree_heures = 'Durée en heures requise';
        if (!formData.step3.date_de_debut) newErrors.date_de_debut = 'Date de début requise';
        if (!formData.step3.date_de_fin) newErrors.date_de_fin = 'Date de fin requise';
        break;
      case 3:
        if (!formData.step4.conception_animation) newErrors.conception_animation = 'Coût conception requis';
        if (!formData.step4.couts_logistique) newErrors.couts_logistique = 'Coût logistique requis';
        if (!formData.step4.couts_total) newErrors.couts_total = 'Coût total requis';
        if (!formData.step4.statut_avis_drh?.trim()) newErrors.statut_avis_drh = 'Statut avis DRH requis';
        if (!formData.step4.nbr_session) newErrors.nbr_session = 'Nombre de sessions requis';
        if (!formData.step4.type?.trim()) newErrors.type = 'Type requis';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepClick = (step) => {
    // Permettre de revenir en arrière, mais pas d'avancer sans validation
    if (step <= activeStep || validateStep(activeStep)) {
      setActiveStep(step);
      setShowSuccess(false);
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      if (activeStep < totalSteps - 1) {
        setActiveStep(prev => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
      setErrors({}); // Clear errors when going back
    }
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      setShowSuccess(true);
      console.log('Données de formation:', formData);
    }
  };

  const handleRestart = () => {
    setShowSuccess(false);
    setActiveStep(0);
    setErrors({});
    setFormData({
      step1: {},
      step2: {},
      step3: {},
      step4: {}
    });
    setOpen(false);
  };

  const renderStep = () => {
    if (showSuccess) {
      return <SuccessComponent formData={formData} onRestart={handleRestart} />;
    }

    switch (activeStep) {
      case 0:
        return <Step1 formData={formData} setFormData={setFormData} errors={errors} />;
      case 1:
        return <Step2 formData={formData} setFormData={setFormData} errors={errors} />;
      case 2:
        return <Step3 formData={formData} setFormData={setFormData} errors={errors} />;
      case 3:
        return <Step4 formData={formData} setFormData={setFormData} errors={errors} />;
      default:
        return null;
    }
  };

  const progress = showSuccess ? 100 : ((activeStep + 1) / totalSteps) * 100;

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <Button
        variant="contained"
        size="large"
        onClick={() => setOpen(true)}
        sx={{
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(255, 105, 135, 0.3)',
          px: 4,
          py: 2,
          fontSize: '1.1rem',
          fontWeight: 'bold',
          textTransform: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 40px rgba(255, 105, 135, 0.4)',
          },
          transition: 'all 0.3s ease'
        }}
      >
        Créer une Formation
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            minHeight: '80vh',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            overflow: 'visible'
          }
        }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3
        }}>
          <Typography variant="h5" fontWeight="bold">
            {showSuccess ? 'Formation Créée !' : `Création de Formation - Étape ${activeStep + 1}/${totalSteps}`}
          </Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <Box sx={{ px: 3, pt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              background: 'rgba(102, 126, 234, 0.1)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                borderRadius: 4
              }
            }}
          />
        </Box>

        {!showSuccess && (
          <Box sx={{ px: 3, py: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton
                    onClick={() => handleStepClick(index)}
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontWeight: index === activeStep ? 'bold' : 'normal',
                        color: index === activeStep ? '#667eea' : 'text.secondary',
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#667eea'
                        }
                      }
                    }}
                  >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}

        {Object.keys(errors).length > 0 && !showSuccess && (
          <Box sx={{ px: 3, pb: 2 }}>
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              Veuillez remplir tous les champs obligatoires (*) avant de continuer.
            </Alert>
          </Box>
        )}

        <DialogContent sx={{ px: 0, py: 0 }}>
          <Box sx={{ minHeight: 500 }}>
            {renderStep()}
          </Box>
        </DialogContent>

        {!showSuccess && (
          <DialogActions sx={{ 
            p: 3, 
            background: 'rgba(255,255,255,0.8)',
            borderTop: '1px solid rgba(102, 126, 234, 0.1)',
            justifyContent: 'space-between'
          }}>
            <Button
              onClick={handlePrev}
              disabled={activeStep === 0}
              startIcon={<NavigateBefore />}
              sx={{
                borderRadius: 2,
                px: 3,
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              Précédent
            </Button>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Étape {activeStep + 1} sur {totalSteps}
              </Typography>
              
              {activeStep === totalSteps - 1 ? (
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  endIcon={<Check />}
                  sx={{
                    background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)',
                    borderRadius: 2,
                    px: 4,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)'
                    }
                  }}
                >
                  Créer la Formation
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  endIcon={<NavigateNext />}
                  sx={{
                    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                    borderRadius: 2,
                    px: 4,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)'
                    }
                  }}
                >
                  Suivant
                </Button>
              )}
            </Box>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default WizardFormModal;