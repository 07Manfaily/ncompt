import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Paper, Grid, Fade } from '@mui/material';
import Celebration from '@mui/icons-material/Celebration';

const fieldsLabels = [
  { name: 'code_formation', label: 'Code formation' },
  { name: 'intitule_formation', label: 'Intitulé formation' },
  { name: 'objectif_formation', label: 'Objectif formation' },
  { name: 'ogf', label: 'OGF' },
  { name: 'thematique', label: 'Thématique' },
  { name: 'type_de_programme', label: 'Type de programme' },
  { name: 'origine_de_la_demande', label: 'Origine de la demande' },
  { name: 'formation_obligatoire', label: 'Formation obligatoire' },
  { name: 'formation_diplomante', label: 'Formation diplômante' },
  { name: 'priorite', label: 'Priorité' },
  { name: 'mode_diffusion', label: 'Mode de diffusion' },
  { name: 'direction', label: 'Direction' },
  { name: 'profil_cible', label: 'Profil cible' },
  { name: 'effectif', label: 'Effectif' },
  { name: 'type', label: 'Type' },
  { name: 'formateur', label: 'Formateur' },
  { name: 'duree_jours', label: 'Durée (jours)' },
  { name: 'duree_heures', label: 'Durée (heures)' },
  { name: 'date_de_debut', label: 'Date de début' },
  { name: 'Date_de_fin', label: 'Date de fin' },
  { name: 'periode_couts', label: 'Période coûts' },
  { name: 'conception_animation', label: 'Conception animation' },
  { name: 'couts_logistique', label: 'Coûts logistique' },
  { name: 'couts_total', label: 'Coûts total' },
  { name: 'statut_avis_drh', label: 'Statut avis DRH' },
  { name: 'nbr_session', label: 'Nombre de sessions' },
];

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
  export const showCongratulations = ({ formData, onRestart }) => {
    return (
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
              Votre saisie a été enregistrée avec succès !
            </Typography>
    
            <Paper sx={{ p: 3, mb: 4, background: 'rgba(255,255,255,0.9)', maxWidth: 700, mx: 'auto' }}>
              <Typography variant="h6" color="primary" mb={2}>
                Récapitulatif de votre saisie :
              </Typography>
              <Grid container spacing={2}>
                {fieldsLabels.map(field => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{field.label} :</strong> {formData[field.name] || <span style={{color:'#bbb'}}>Non renseigné</span>}
                    </Typography>
                  </Grid>
                ))}
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
              Nouvelle saisie
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
  };
  