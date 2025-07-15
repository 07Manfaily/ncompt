import React, { useState, useCallback, useMemo, useEffect } from 'react';
// ... existing code ...

function CreateTrainingSession() {
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionsData, setSessionsData] = useState({});
  const [validatedSessions, setValidatedSessions] = useState({});
  const [numberOfSessions, setNumberOfSessions] = useState(0);

  // Fonction pour récupérer le nombre de sessions depuis l'API
  const fetchNumberOfSessions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Remplacez cette URL par votre vraie API
      const response = await fetch('/api/sessions/count');
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du nombre de sessions');
      }
      
      const data = await response.json();
      const count = data.numberOfSessions || 3; // Valeur par défaut si l'API ne retourne rien
      
      setNumberOfSessions(count);
      
      // Initialiser les données pour toutes les sessions
      const initialSessionsData = {};
      const initialValidatedSessions = {};
      
      for (let i = 0; i < count; i++) {
        initialSessionsData[i] = {
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
        };
        initialValidatedSessions[i] = false;
      }
      
      setSessionsData(initialSessionsData);
      setValidatedSessions(initialValidatedSessions);
      
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
      // En cas d'erreur, on utilise une valeur par défaut
      setNumberOfSessions(3);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction pour envoyer les données vers l'API
  const submitSessionsToAPI = useCallback(async (sessionsData) => {
    try {
      setLoading(true);
      
      // Remplacez cette URL par votre vraie API
      const response = await fetch('/api/sessions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessions: Object.values(sessionsData)
        })
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi des sessions');
      }
      
      const result = await response.json();
      return result;
      
    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger le nombre de sessions au montage du composant
  useEffect(() => {
    fetchNumberOfSessions();
  }, [fetchNumberOfSessions]);

  const handleInputChange = useCallback((sessionIndex, field, value) => {
    setSessionsData(prev => ({
      ...prev,
      [sessionIndex]: {
        ...prev[sessionIndex],
        [field]: value
      }
    }));
  }, []);

  const validateSession = useCallback((sessionIndex) => {
    const session = sessionsData[sessionIndex];
    return session.code_session && 
           session.intitule_session && 
           session.date && 
           session.heure_debut && 
           session.ville && 
           session.lieu;
  }, [sessionsData]);

  const handleValidateSession = useCallback((sessionIndex) => {
    if (validateSession(sessionIndex)) {
      setValidatedSessions(prev => ({
        ...prev,
        [sessionIndex]: true
      }));
      
      setSnackbar({
        open: true,
        message: `Session ${sessionIndex + 1} validée avec succès !`
      });
      
      // Auto-switch to next tab if available
      if (sessionIndex < numberOfSessions - 1) {
        setActiveTab(sessionIndex + 1);
      }
    } else {
      setSnackbar({
        open: true,
        message: 'Veuillez remplir tous les champs obligatoires (Code session, Intitulé, Date, Heure début, Ville, Lieu)'
      });
    }
  }, [validateSession, numberOfSessions]);

  const canAccessTab = useCallback((tabIndex) => {
    if (tabIndex === 0) return true;
    return validatedSessions[tabIndex - 1];
  }, [validatedSessions]);

  const handleSubmitAll = useCallback(async () => {
    const allValidated = Object.values(validatedSessions).every(v => v);
    if (allValidated) {
      try {
        await submitSessionsToAPI(sessionsData);
        setSnackbar({
          open: true,
          message: `${numberOfSessions} sessions ont été créées avec succès !`
        });
      } catch (err) {
        setSnackbar({
          open: true,
          message: `Erreur: ${err.message}`
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: 'Veuillez valider toutes les sessions avant de soumettre.'
      });
    }
  }, [validatedSessions, sessionsData, numberOfSessions, submitSessionsToAPI]);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  const CustomTabPanel = useMemo(() => {
    return React.memo(({ children, value, index, ...other }) => (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`session-tabpanel-${index}`}
        aria-labelledby={`session-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
      </div>
    ));
  }, []);

  const renderSessionForm = useCallback((sessionIndex) => {
    const session = sessionsData[sessionIndex];
    const isValidated = validatedSessions[sessionIndex];

    if (!session) return null;

    return (
      <Box sx={{ opacity: isValidated ? 0.75 : 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            Session {sessionIndex + 1}
          </Typography>
          {isValidated && (
            <Chip
              icon={<CheckCircle size={16} />}
              label="Validée"
              color="success"
              variant="outlined"
            />
          )}
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <MenuBook sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="h6" component="h3">
              Informations générales
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Code de la session"
                value={session.code_session}
                onChange={(e) => handleInputChange(sessionIndex, 'code_session', e.target.value)}
                disabled={isValidated}
                placeholder="Ex: SESS-001"
                required
                variant="outlined"
                key={`code_session_${sessionIndex}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={isValidated}>
                <InputLabel>Statut</InputLabel>
                <Select
                  value={session.statut}
                  onChange={(e) => handleInputChange(sessionIndex, 'statut', e.target.value)}
                  label="Statut"
                  key={`statut_${sessionIndex}`}
                >
                  <MenuItem value="planifiee">Planifiée</MenuItem>
                  <MenuItem value="en_cours">En cours</MenuItem>
                  <MenuItem value="terminee">Terminée</MenuItem>
                  <MenuItem value="annulee">Annulée</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Intitulé de la session"
                value={session.intitule_session}
                onChange={(e) => handleInputChange(sessionIndex, 'intitule_session', e.target.value)}
                disabled={isValidated}
                placeholder="Ex: Formation avancée en développement web"
                required
                variant="outlined"
                key={`intitule_session_${sessionIndex}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Code formation"
                value={session.code_formation}
                onChange={(e) => handleInputChange(sessionIndex, 'code_formation', e.target.value)}
                disabled={isValidated}
                placeholder="Ex: FORM-WEB-001"
                variant="outlined"
                key={`code_formation_${sessionIndex}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Intitulé formation"
                value={session.intitule_formation}
                onChange={(e) => handleInputChange(sessionIndex, 'intitule_formation', e.target.value)}
                disabled={isValidated}
                placeholder="Ex: Développement Web Full Stack"
                variant="outlined"
                key={`intitule_formation_${sessionIndex}`}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="h6" component="h3">
              Planification
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date de début"
                type="date"
                value={session.date}
                onChange={(e) => handleInputChange(sessionIndex, 'date', e.target.value)}
                disabled={isValidated}
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                key={`date_${sessionIndex}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Heure de début"
                type="time"
                value={session.heure_debut}
                onChange={(e) => handleInputChange(sessionIndex, 'heure_debut', e.target.value)}
                disabled={isValidated}
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                key={`heure_debut_${sessionIndex}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date de fin"
                type="date"
                value={session.date_fin}
                onChange={(e) => handleInputChange(sessionIndex, 'date_fin', e.target.value)}
                disabled={isValidated}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                key={`date_fin_${sessionIndex}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Heure de fin"
                type="time"
                value={session.heure_fin}
                onChange={(e) => handleInputChange(sessionIndex, 'heure_fin', e.target.value)}
                disabled={isValidated}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                key={`heure_fin_${sessionIndex}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Durée en jours"
                type="number"
                value={session.duree_jours}
                onChange={(e) => handleInputChange(sessionIndex, 'duree_jours', e.target.value)}
                disabled={isValidated}
                placeholder="Ex: 5"
                variant="outlined"
                key={`duree_jours_${sessionIndex}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Durée en heures"
                type="number"
                value={session.duree_heures}
                onChange={(e) => handleInputChange(sessionIndex, 'duree_heures', e.target.value)}
                disabled={isValidated}
                placeholder="Ex: 40"
                variant="outlined"
                key={`duree_heures_${sessionIndex}`}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="h6" component="h3">
              Lieu et Configuration
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ville"
                value={session.ville}
                onChange={(e) => handleInputChange(sessionIndex, 'ville', e.target.value)}
                disabled={isValidated}
                placeholder="Ex: Paris"
                required
                variant="outlined"
                key={`ville_${sessionIndex}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Lieu"
                value={session.lieu}
                onChange={(e) => handleInputChange(sessionIndex, 'lieu', e.target.value)}
                disabled={isValidated}
                placeholder="Ex: Centre de formation ABC"
                required
                variant="outlined"
                key={`lieu_${sessionIndex}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={isValidated}>
                <InputLabel>Type de session</InputLabel>
                <Select
                  value={session.type}
                  onChange={(e) => handleInputChange(sessionIndex, 'type', e.target.value)}
                  label="Type de session"
                  key={`type_${sessionIndex}`}
                >
                  <MenuItem value="presentiel">Présentiel</MenuItem>
                  <MenuItem value="distanciel">Distanciel</MenuItem>
                  <MenuItem value="hybride">Hybride</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={isValidated}>
                <InputLabel>Mode de diffusion</InputLabel>
                <Select
                  value={session.mode_de_diffusion}
                  onChange={(e) => handleInputChange(sessionIndex, 'mode_de_diffusion', e.target.value)}
                  label="Mode de diffusion"
                  key={`mode_de_diffusion_${sessionIndex}`}
                >
                  <MenuItem value="intra_entreprise">Intra-entreprise</MenuItem>
                  <MenuItem value="inter_entreprise">Inter-entreprise</MenuItem>
                  <MenuItem value="individuel">Individuel</MenuItem>
                  <MenuItem value="groupe">Groupe</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Formateur"
                value={session.formateur}
                onChange={(e) => handleInputChange(sessionIndex, 'formateur', e.target.value)}
                disabled={isValidated}
                placeholder="Ex: Jean Dupont"
                variant="outlined"
                key={`formateur_${sessionIndex}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Début de session"
                value={session.debut}
                onChange={(e) => handleInputChange(sessionIndex, 'debut', e.target.value)}
                disabled={isValidated}
                placeholder="Ex: Accueil des participants"
                variant="outlined"
                key={`debut_${sessionIndex}`}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={session.Name_Description}
                onChange={(e) => handleInputChange(sessionIndex, 'Name_Description', e.target.value)}
                disabled={isValidated}
                placeholder="Description détaillée de la session..."
                variant="outlined"
                multiline
                rows={4}
                key={`Name_Description_${sessionIndex}`}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
          {!isValidated ? (
            <Button
              onClick={() => handleValidateSession(sessionIndex)}
              variant="contained"
              startIcon={<CheckCircle size={20} />}
              size="large"
              sx={{ px: 4 }}
            >
              Valider la session {sessionIndex + 1}
            </Button>
          ) : (
            <Button
              disabled
              variant="outlined"
              startIcon={<CheckCircle size={20} />}
              size="large"
              sx={{ px: 4 }}
            >
              Session {sessionIndex + 1} validée
            </Button>
          )}
        </Box>
      </Box>
    );
  }, [sessionsData, validatedSessions, handleInputChange, handleValidateSession]);

  // Affichage du chargement
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Typography variant="h6">Chargement des sessions...</Typography>
        </Box>
      </Container>
    );
  }

  // Affichage de l'erreur
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button onClick={fetchNumberOfSessions} variant="contained">
          Réessayer
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Création de {numberOfSessions} Sessions de Formation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Créez et validez chaque session une par une. Une fois une session validée, vous pourrez passer à la suivante.
        </Typography>
      </Box>

      <Card elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => canAccessTab(newValue) && setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ px: 2 }}
          >
            {Array.from({ length: numberOfSessions }, (_, sessionIndex) => (
              <Tab
                key={sessionIndex}
                disabled={!canAccessTab(sessionIndex)}
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1,
                        bgcolor: validatedSessions[sessionIndex] 
                          ? 'success.main' 
                          : canAccessTab(sessionIndex)
                          ? 'primary.main'
                          : 'grey.300',
                        color: validatedSessions[sessionIndex] || canAccessTab(sessionIndex) 
                          ? 'white' 
                          : 'grey.500'
                      }}
                    >
                      {validatedSessions[sessionIndex] ? (
                        <CheckCircle size={20} />
                      ) : !canAccessTab(sessionIndex) ? (
                        <Lock size={20} />
                      ) : (
                        sessionIndex + 1
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      Session {sessionIndex + 1}
                    </Typography>
                    {validatedSessions[sessionIndex] && (
                      <Typography variant="caption" color="success.main">
                        Validée
                      </Typography>
                    )}
                    {!canAccessTab(sessionIndex) && (
                      <Typography variant="caption" color="text.disabled">
                        Verrouillée
                      </Typography>
                    )}
                  </Box>
                }
                sx={{ minHeight: 100, minWidth: 120 }}
              />
            ))}
          </Tabs>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {Array.from({ length: numberOfSessions }, (_, sessionIndex) => (
            <CustomTabPanel key={sessionIndex} value={activeTab} index={sessionIndex}>
              {renderSessionForm(sessionIndex)}
            </CustomTabPanel>
          ))}
        </CardContent>

        {Object.values(validatedSessions).every(v => v) && (
          <Box sx={{ borderTop: 1, borderColor: 'divider', p: 4, textAlign: 'center' }}>
            <Button
              onClick={handleSubmitAll}
              variant="contained"
              color="success"
              size="large"
              startIcon={<Save size={24} />}
              sx={{ px: 6, py: 2, fontSize: '1.1rem' }}
              disabled={loading}
            >
              {loading ? 'Envoi en cours...' : `Créer les ${numberOfSessions} sessions`}
            </Button>
          </Box>
        )}
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Container>
  );
}

export default CreateTrainingSession;