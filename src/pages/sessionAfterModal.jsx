import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Select, MenuItem,
  FormControl, InputLabel, Button, Tabs, Tab, Grid, Chip, Container, Snackbar, Divider
} from '@mui/material';
import { CheckCircle, Lock, Save } from '@mui/icons-material';

const CreateTrainingSession = () => {
  const [sessionsData, setSessionsData] = useState({});
  const [validatedSessions, setValidatedSessions] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // 🔁 Simuler réponse API
  useEffect(() => {
    const fakeApiResponse = [
      {
        code_formation: 'P25039',
        code_session: 'P2503951',
        intitule_formation: 'Formation React',
      },
      {
        code_formation: 'P25039',
        code_session: 'P2503952',
        intitule_formation: 'Formation JS',
      },
      {
        code_formation: 'P25039',
        code_session: 'P2503953',
        intitule_formation: 'Formation API',
      }
    ];

    const initialSessions = {};
    const initialValidation = {};

    fakeApiResponse.forEach((item, index) => {
      initialSessions[index] = {
        code_formation: item.code_formation,
        code_session: item.code_session,
        intitule_formation: item.intitule_formation,
      intitule_session: '',
      statut: '',
      date: '',
      heure_debut: '',
      date_fin: '',
      heure_fin: '',
      duree_jours: '',
      duree_heures: '',
      ville: '',
      lieu: '',
      type: '',
      mode_de_diffusion: '',
        formateur: '',
      Name_Description: '',
        debut: ''
      };
      initialValidation[index] = false;
    });

    setSessionsData(initialSessions);
    setValidatedSessions(initialValidation);
  }, []);

  const handleInputChange = useCallback((index, field, value) => {
    setSessionsData(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value
      }
    }));
  }, []);

  const validateSession = useCallback((index) => {
    const session = sessionsData[index];
    return session.code_session && session.intitule_session && session.date && session.heure_debut && session.ville && session.lieu;
  }, [sessionsData]);

  const handleValidateSession = useCallback((index) => {
    if (validateSession(index)) {
      setValidatedSessions(prev => ({ ...prev, [index]: true }));
      setSnackbar({ open: true, message: `Session ${sessionsData[index].code_session} validée !` });
      if (index < Object.keys(sessionsData).length - 1) {
        setActiveTab(index + 1);
      }
    } else {
      setSnackbar({ open: true, message: 'Veuillez remplir tous les champs obligatoires.' });
    }
  }, [validateSession, sessionsData]);

  const handleSubmitAll = () => {
    const allValid = Object.values(validatedSessions).every(Boolean);
    if (allValid) {
      console.log("Toutes les sessions prêtes à l'envoi :", sessionsData);
      setSnackbar({ open: true, message: 'Toutes les sessions ont été soumises avec succès !' });
    } else {
      setSnackbar({ open: true, message: 'Veuillez valider toutes les sessions avant.' });
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const canAccessTab = (tabIndex) => tabIndex === 0 || validatedSessions[tabIndex - 1];

  if (Object.keys(sessionsData).length === 0) {
    return <Typography>Chargement des sessions simulées...</Typography>;
  }

    return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Créer des Sessions de Formation</Typography>

      <Card>
        <Tabs value={activeTab} onChange={(e, newValue) => canAccessTab(newValue) && setActiveTab(newValue)} variant="scrollable">
          {Object.entries(sessionsData).map(([index, session]) => (
            <Tab
              key={index}
              label={validatedSessions[index]
                ? `${session.code_session} ✅`
                : `${session.code_session}`}
              disabled={!canAccessTab(parseInt(index))}
            />
          ))}
        </Tabs>

        <CardContent>
          {Object.entries(sessionsData).map(([index, session]) => (
            parseInt(index) === activeTab && (
              <Box key={index}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Détails de la session {session.code_session}
            </Typography>

                <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Code session" value={session.code_session} disabled />
            </Grid>
            <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Code formation" value={session.code_formation} disabled />
            </Grid>
            <Grid item xs={12}>
                    <TextField fullWidth label="Intitulé formation" value={session.intitule_formation} disabled />
            </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Intitulé session" value={session.intitule_session} onChange={(e) => handleInputChange(index, 'intitule_session', e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Date début" type="date" InputLabelProps={{ shrink: true }} value={session.date} onChange={(e) => handleInputChange(index, 'date', e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Heure début" type="time" InputLabelProps={{ shrink: true }} value={session.heure_debut} onChange={(e) => handleInputChange(index, 'heure_debut', e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Ville" value={session.ville} onChange={(e) => handleInputChange(index, 'ville', e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Lieu" value={session.lieu} onChange={(e) => handleInputChange(index, 'lieu', e.target.value)} />
            </Grid>
          </Grid>

                <Box sx={{ mt: 3 }}>
            <Button
                    variant={validatedSessions[index] ? 'outlined' : 'contained'}
                    color={validatedSessions[index] ? 'success' : 'primary'}
                    onClick={() => handleValidateSession(parseInt(index))}
                  >
                    {validatedSessions[index] ? 'Session validée' : 'Valider la session'}
            </Button>
        </Box>
      </Box>
            )
          ))}
        </CardContent>

        {Object.values(validatedSessions).every(Boolean) && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Button variant="contained" color="success" onClick={handleSubmitAll} startIcon={<Save />}>
              Soumettre toutes les sessions
            </Button>
          </Box>
        )}
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Container>
  );
};

export default CreateTrainingSession;
