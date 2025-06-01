import React, { useState, useEffect } from 'react';
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
  Grid
} from '@mui/material';
import {
  Person,
  Business,
  ContactMail,
  Payment,
  Close,
  NavigateNext,
  NavigateBefore,
  Check,
  Celebration
} from '@mui/icons-material';

// Animation des confettis
const Confetti = () => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
    const newConfetti = [];
    
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 4,
        speedX: (Math.random() - 0.5) * 2,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }
    setConfetti(newConfetti);

    const animateConfetti = () => {
      setConfetti(prev => prev.map(piece => ({
        ...piece,
        x: piece.x + piece.speedX,
        y: piece.y + piece.speedY,
        rotation: piece.rotation + piece.rotationSpeed,
        speedY: piece.speedY + 0.1
      })).filter(piece => piece.y < 110));
    };

    const interval = setInterval(animateConfetti, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {confetti.map(piece => (
        <Box
          key={piece.id}
          sx={{
            position: 'absolute',
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: '2px'
          }}
        />
      ))}
    </Box>
  );
};

// Page de félicitations
const CongratulationsStep = ({ formData, onRestart }) => (
  <Fade in={true} timeout={800}>
    <Card elevation={0} sx={{ background: 'transparent', position: 'relative', overflow: 'visible' }}>
      <Confetti />
      <CardContent sx={{ p: 6, textAlign: 'center' }}>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
            borderRadius: '50%',
            width: 120,
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 4,
            boxShadow: '0 20px 60px rgba(76, 175, 80, 0.3)',
            animation: 'bounce 2s infinite'
          }}
        >
          <Celebration sx={{ color: 'white', fontSize: 60 }} />
        </Box>
        
        <Typography variant="h3" fontWeight="bold" color="primary.main" mb={2}>
          Félicitations ! 🎉
        </Typography>
        
        <Typography variant="h6" color="text.secondary" mb={4}>
          Votre inscription a été complétée avec succès !
        </Typography>

        <Paper sx={{ p: 3, mb: 4, background: 'rgba(255,255,255,0.8)' }}>
          <Typography variant="h6" color="primary" mb={2}>
            Récapitulatif de vos informations :
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Nom :</strong> {formData.step1.firstName} {formData.step1.lastName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Email :</strong> {formData.step3.email}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Entreprise :</strong> {formData.step2.company}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Ville :</strong> {formData.step3.city}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Button
          variant="contained"
          size="large"
          onClick={onRestart}
          sx={{
            background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
            borderRadius: 3,
            px: 4,
            py: 2,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
            }
          }}
        >
          Nouvelle inscription
        </Button>
      </CardContent>
      
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </Card>
  </Fade>
);

// Composant pour chaque étape avec layout 2x2
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

// Étape 1: Informations personnelles (2x2)
const Step1 = ({ formData, setFormData }) => {
  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      step1: { ...prev.step1, [field]: event.target.value }
    }));
  };

  return (
    <StepComponent
      title="Informations Personnelles"
      description="Renseignez vos informations de base"
      icon={<Person sx={{ color: 'white', fontSize: 28 }} />}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Prénom"
            variant="outlined"
            value={formData.step1.firstName || ''}
            onChange={handleChange('firstName')}
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
            label="Nom"
            variant="outlined"
            value={formData.step1.lastName || ''}
            onChange={handleChange('lastName')}
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
            label="Date de naissance"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={formData.step1.birthDate || ''}
            onChange={handleChange('birthDate')}
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
            label="Numéro de téléphone"
            variant="outlined"
            value={formData.step1.phone || ''}
            onChange={handleChange('phone')}
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

// Étape 2: Informations professionnelles (2x2)
const Step2 = ({ formData, setFormData }) => {
  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      step2: { ...prev.step2, [field]: event.target.value }
    }));
  };

  return (
    <StepComponent
      title="Informations Professionnelles"
      description="Détails sur votre activité professionnelle"
      icon={<Business sx={{ color: 'white', fontSize: 28 }} />}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Entreprise"
            variant="outlined"
            value={formData.step2.company || ''}
            onChange={handleChange('company')}
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
            label="Poste"
            variant="outlined"
            value={formData.step2.position || ''}
            onChange={handleChange('position')}
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
            label="Secteur d'activité"
            variant="outlined"
            value={formData.step2.sector || ''}
            onChange={handleChange('sector')}
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
            label="Expérience (années)"
            type="number"
            variant="outlined"
            value={formData.step2.experience || ''}
            onChange={handleChange('experience')}
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

// Étape 3: Contact (2x2)
const Step3 = ({ formData, setFormData }) => {
  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      step3: { ...prev.step3, [field]: event.target.value }
    }));
  };

  return (
    <StepComponent
      title="Informations de Contact"
      description="Comment pouvons-nous vous joindre ?"
      icon={<ContactMail sx={{ color: 'white', fontSize: 28 }} />}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={formData.step3.email || ''}
            onChange={handleChange('email')}
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
            label="Adresse"
            variant="outlined"
            value={formData.step3.address || ''}
            onChange={handleChange('address')}
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
            label="Ville"
            variant="outlined"
            value={formData.step3.city || ''}
            onChange={handleChange('city')}
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
            label="Code postal"
            variant="outlined"
            value={formData.step3.zipCode || ''}
            onChange={handleChange('zipCode')}
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

// Étape 4: Informations de paiement (2x2)
const Step4 = ({ formData, setFormData }) => {
  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      step4: { ...prev.step4, [field]: event.target.value }
    }));
  };

  return (
    <StepComponent
      title="Informations de Paiement"
      description="Sécurisez votre compte avec vos informations de paiement"
      icon={<Payment sx={{ color: 'white', fontSize: 28 }} />}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Numéro de carte"
            variant="outlined"
            placeholder="1234 5678 9012 3456"
            value={formData.step4.cardNumber || ''}
            onChange={handleChange('cardNumber')}
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
            label="Nom sur la carte"
            variant="outlined"
            value={formData.step4.cardName || ''}
            onChange={handleChange('cardName')}
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
            label="Date d'expiration"
            placeholder="MM/YY"
            variant="outlined"
            value={formData.step4.expiryDate || ''}
            onChange={handleChange('expiryDate')}
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
            label="CVV"
            placeholder="123"
            variant="outlined"
            value={formData.step4.cvv || ''}
            onChange={handleChange('cvv')}
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

const WizardFormModal = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {}
  });

  const steps = ['Personnel', 'Professionnel', 'Contact', 'Paiement'];
  const totalSteps = steps.length;

  const handleStepClick = (step) => {
    setCurrentStep(step);
    setShowCongratulations(false);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Formulaire soumis:', formData);
    setShowCongratulations(true);
  };

  const handleRestart = () => {
    setShowCongratulations(false);
    setCurrentStep(0);
    setFormData({
      step1: {},
      step2: {},
      step3: {},
      step4: {}
    });
    setOpen(false);
  };

  const renderStep = () => {
    if (showCongratulations) {
      return <CongratulationsStep formData={formData} onRestart={handleRestart} />;
    }

    switch (currentStep) {
      case 0:
        return <Step1 formData={formData} setFormData={setFormData} />;
      case 1:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step3 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step4 formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  const progress = showCongratulations ? 100 : ((currentStep + 1) / totalSteps) * 100;

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
        Ouvrir le Formulaire Wizard
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            minHeight: '70vh',
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
            {showCongratulations ? 'Inscription Terminée !' : `Formulaire d'inscription - Étape ${currentStep + 1}/${totalSteps}`}
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

        {!showCongratulations && (
          <Box sx={{ px: 3, py: 2 }}>
            <Stepper activeStep={currentStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton
                    onClick={() => handleStepClick(index)}
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontWeight: index === currentStep ? 'bold' : 'normal',
                        color: index === currentStep ? '#667eea' : 'text.secondary',
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

        <DialogContent sx={{ px: 0, py: 0 }}>
          <Box sx={{ minHeight: 400 }}>
            {renderStep()}
          </Box>
        </DialogContent>

        {!showCongratulations && (
          <DialogActions sx={{ 
            p: 3, 
            background: 'rgba(255,255,255,0.8)',
            borderTop: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <Button
              onClick={handlePrev}
              disabled={currentStep === 0}
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
            
            <Box sx={{ flex: 1 }} />
            
            {currentStep === totalSteps - 1 ? (
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
                Terminer
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
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default WizardFormModal;