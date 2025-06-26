import React, { useState , useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  Checkbox,
  Alert,
  InputAdornment,
  Chip,
  Select,Grid,
  Avatar,
  Dialog,DialogTitle,DialogContent,DialogActions,Button,Stepper,Step,
  StepButton,Typography,Box,Fade,Slide,IconButton,LinearProgress,
  Card,CardContent,Divider,TextField,MenuItem,FormControl,InputLabel,  
  Table, TableHead, TableBody, TableRow, TableCell
} from '@mui/material';
import {
  Search,
  SelectAll,
  Clear,
  School, Business,  
  Schedule, Euro, Close,
   NavigateNext, NavigateBefore, Check, Celebration, People,
  
} from '@mui/icons-material';
import { testUsers, mockApiCall } from './testUsersData';



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
const Step5 = ({ formData, setFormData, errors }) => {
  const [users, setUsers] = useState([]); // Liste complète des utilisateurs
  const [filteredUsers, setFilteredUsers] = useState([]); // Utilisateurs filtrés
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [posteFilter, setPosteFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Listes uniques pour les filtres
  const [departments, setDepartments] = useState([]);
  const [postes, setPostes] = useState([]);

  // Charger la liste des utilisateurs au montage du composant
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        // Option 1: Utiliser les données de test directement
        // const userData = testUsers;
        
        // Option 2: Simuler un appel API avec délai
        const response = await mockApiCall();
        const userData = response.data;
        
        // Option 3: Utiliser le vrai appel API (à décommenter quand prêt)
        // const response = await axios.get('/api/users');
        // const userData = response.data;
        
        setUsers(userData);
        setFilteredUsers(userData);
        
        // Extraire les départements et postes uniques
        const uniqueDepartments = [...new Set(userData.map(user => user.departement))];
        const uniquePostes = [...new Set(userData.map(user => user.poste))];
        
        setDepartments(uniqueDepartments);
        setPostes(uniquePostes);
        
        // Initialiser selectedUsers depuis formData si disponible
        if (formData?.step5?.selected_users) {
          setSelectedUsers(formData.step5.selected_users);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);


  // Effet pour filtrer les utilisateurs
  useEffect(() => {
    let filtered = users;

    // Filtre par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(user =>
        `${user.nom} ${user.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par département
    if (departmentFilter) {
      filtered = filtered.filter(user => user.departement === departmentFilter);
    }

    // Filtre par poste
    if (posteFilter) {
      filtered = filtered.filter(user => user.poste === posteFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, departmentFilter, posteFilter]);

  const handleUserSelection = (userId) => {
    setSelectedUsers(prev => {
      const newSelection = prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId];
      
      // Mettre à jour formData
      setFormData(prev => ({
        ...prev,
        step5: { 
          ...prev.step5, 
          selected_users: newSelection 
        }
      }));
      
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    const allFilteredIds = filteredUsers.map(user => user.id);
    const newSelection = [...new Set([...selectedUsers, ...allFilteredIds])];
    
    setSelectedUsers(newSelection);
    setFormData(prev => ({
      ...prev,
      step5: { 
        ...prev.step5, 
        selected_users: newSelection 
      }
    }));
  };

  const handleDeselectAll = () => {
    const filteredIds = filteredUsers.map(user => user.id);
    const newSelection = selectedUsers.filter(id => !filteredIds.includes(id));
    
    setSelectedUsers(newSelection);
    setFormData(prev => ({
      ...prev,
      step5: { 
        ...prev.step5, 
        selected_users: newSelection 
      }
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('');
    setPosteFilter('');
  };

  const getSelectedUserNames = () => {
    return users
      .filter(user => selectedUsers.includes(user.id))
      .map(user => `${user.nom} ${user.prenom}`);
  };

  if (loading) {
    return (
      <StepComponent
        title="Sélection des Participants"
        description="Chargement des utilisateurs..."
        icon={<People sx={{ color: 'white', fontSize: 28 }} />}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography>Chargement...</Typography>
        </Box>
      </StepComponent>
    );
  }

  return (
    <StepComponent
      title="Sélection des Participants"
      description="Choisissez les utilisateurs à former"
      icon={<People sx={{ color: 'white', fontSize: 28 }} />}
    >
      <Grid container spacing={3}>
        {/* Barre de recherche et filtres */}
        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Département</InputLabel>
                  <Select
                    value={departmentFilter}
                    label="Département"
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                  >
                    <MenuItem value="">Tous</MenuItem>
                    {departments.map(dept => (
                      <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Poste</InputLabel>
                  <Select
                    value={posteFilter}
                    label="Poste"
                    onChange={(e) => setPosteFilter(e.target.value)}
                  >
                    <MenuItem value="">Tous</MenuItem>
                    {postes.map(poste => (
                      <MenuItem key={poste} value={poste}>{poste}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={clearFilters}
                  startIcon={<Clear />}
                >
                  Effacer
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Actions de sélection */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<SelectAll />}
              onClick={handleSelectAll}
              disabled={filteredUsers.length === 0}
            >
              Sélectionner tout ({filteredUsers.length})
            </Button>
            <Button
              variant="outlined"
              startIcon={<Clear />}
              onClick={handleDeselectAll}
              disabled={filteredUsers.length === 0}
            >
              Désélectionner tout
            </Button>
          </Box>
        </Grid>

        {/* Liste des utilisateurs */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Utilisateurs disponibles ({filteredUsers.length})
          </Typography>
          
          {filteredUsers.length === 0 ? (
            <Alert severity="info">
              Aucun utilisateur ne correspond aux critères de recherche.
            </Alert>
          ) : (
            <Box sx={{ 
              maxHeight: 400, 
              overflow: 'auto', 
              border: '1px solid #e0e0e0', 
              borderRadius: 2 
            }}>
              {filteredUsers.map((user, index) => (
                <Box key={user.id}>
                  <Box
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.1)'
                      },
                      backgroundColor: selectedUsers.includes(user.id) 
                        ? 'rgba(102, 126, 234, 0.2)' 
                        : 'transparent'
                    }}
                    onClick={() => handleUserSelection(user.id)}
                  >
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleUserSelection(user.id)}
                    />
                    
                    <Avatar sx={{ ml: 2, mr: 2, bgcolor: 'primary.main' }}>
                      {user.nom.charAt(0)}{user.prenom.charAt(0)}
                    </Avatar>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {user.nom} {user.prenom}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.poste} - {user.departement}
                      </Typography>
                      {user.email && (
                        <Typography variant="caption" color="text.secondary">
                          {user.email}
                        </Typography>
                      )}
                    </Box>
                    
                    {selectedUsers.includes(user.id) && (
                      <Chip
                        label="Sélectionné"
                        color="primary"
                        size="small"
                        sx={{ ml: 2 }}
                      />
                    )}
                  </Box>
                  {index < filteredUsers.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
          )}
        </Grid>

        {/* Résumé de la sélection */}
        <Grid item xs={12}>
          <Alert 
            severity={selectedUsers.length > 0 ? "success" : "info"} 
            sx={{ mt: 2 }}
          >
            <Typography variant="subtitle2" gutterBottom>
              {selectedUsers.length} utilisateur(s) sélectionné(s)
            </Typography>
            {selectedUsers.length > 0 && (
              <Box sx={{ mt: 1 }}>
                {getSelectedUserNames().slice(0, 3).map((name, index) => (
                  <Chip
                    key={index}
                    label={name}
                    size="small"
                    sx={{ mr: 1, mb: 0.5 }}
                  />
                ))}
                {selectedUsers.length > 3 && (
                  <Chip
                    label={`+${selectedUsers.length - 3} autres`}
                    size="small"
                    variant="outlined"
                  />
                )}
              </Box>
            )}
          </Alert>
        </Grid>

        {/* Validation des erreurs */}
        {errors?.step5?.selected_users && (
          <Grid item xs={12}>
            <Alert severity="error">
              {errors.step5.selected_users}
            </Alert>
          </Grid>
        )}
      </Grid>
    </StepComponent>
  );
};

const Step6 = ({ formData, setFormData, errors }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [directions, setDirections] = useState([]);
  const [services, setServices] = useState([]);
  const [usersByService, setUsersByService] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Charger les données au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await mockApiCall();
        const userData = response.data;
        
        setUsers(userData);
        
        // Extraire les directions uniques
        const uniqueDirections = [...new Set(userData.map(user => user.direction))];
        setDirections(uniqueDirections);

        // Organiser les utilisateurs par service
        const usersByServiceMap = userData.reduce((acc, user) => {
          if (!acc[user.service]) {
            acc[user.service] = [];
          }
          acc[user.service].push(user);
          return acc;
        }, {});
        
        setUsersByService(usersByServiceMap);
        setServices(Object.keys(usersByServiceMap));

        if (formData?.step6?.selected_users) {
          setSelectedUsers(formData.step6.selected_users);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filtrer les services en fonction de la direction sélectionnée
  const filteredServices = useMemo(() => {
    if (!selectedDirection) return services;
    return services.filter(service => 
      usersByService[service]?.some(user => user.direction === selectedDirection)
    );
  }, [selectedDirection, services, usersByService]);

  // Filtrer les utilisateurs en fonction du service sélectionné et du terme de recherche
  const filteredUsers = useMemo(() => {
    if (!selectedService) return [];
    let users = usersByService[selectedService] || [];
    
    if (searchTerm) {
      users = users.filter(user =>
        `${user.nom} ${user.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.poste?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return users;
  }, [selectedService, usersByService, searchTerm]);

  const handleUserSelection = (userId) => {
    setSelectedUsers(prev => {
      const newSelection = prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId];
      
      setFormData(prev => ({
        ...prev,
        step6: { 
          ...prev.step6, 
          selected_users: newSelection 
        }
      }));
      
      return newSelection;
    });
  };

  // Grouper les utilisateurs sélectionnés par service
  const selectedUsersByService = useMemo(() => {
    return selectedUsers.reduce((acc, userId) => {
      const user = users.find(u => u.id === userId);
      if (user) {
        if (!acc[user.service]) {
          acc[user.service] = [];
        }
        acc[user.service].push(user);
      }
      return acc;
    }, {});
  }, [selectedUsers, users]);

  if (loading) {
    return (
      <StepComponent
        title="Sélection des Participants par Direction"
        description="Chargement des données..."
        icon={<People sx={{ color: 'white', fontSize: 28 }} />}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography>Chargement...</Typography>
        </Box>
      </StepComponent>
    );
  }

  return (
    <StepComponent
      title="Sélection des Participants par Direction"
      description="Sélectionnez les participants par direction et service"
      icon={<People sx={{ color: 'white', fontSize: 28 }} />}
    >
      <Grid container spacing={3}>
        {/* Sélection de la direction et du service */}
        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Direction</InputLabel>
                  <Select
                    value={selectedDirection}
                    label="Direction"
                    onChange={(e) => {
                      setSelectedDirection(e.target.value);
                      setSelectedService('');
                      setSearchTerm('');
                    }}
                    sx={{
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#764ba2'
                      }
                    }}
                  >
                    <MenuItem value="">Sélectionnez une direction</MenuItem>
                    {directions.map(direction => (
                      <MenuItem key={direction} value={direction}>
                        {direction}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Service</InputLabel>
                  <Select
                    value={selectedService}
                    label="Service"
                    onChange={(e) => {
                      setSelectedService(e.target.value);
                      setSearchTerm('');
                    }}
                    disabled={!selectedDirection}
                    sx={{
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#764ba2'
                      }
                    }}
                  >
                    <MenuItem value="">Sélectionnez un service</MenuItem>
                    {filteredServices.map(service => (
                      <MenuItem key={service} value={service}>
                        {service}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Barre de recherche */}
        {selectedService && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Rechercher un participant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchTerm('')}
                      edge="end"
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#667eea'
                  }
                }
              }}
            />
          </Grid>
        )}

        {/* Liste des utilisateurs du service sélectionné */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Utilisateurs du service {selectedService || 'sélectionné'}
          </Typography>
          <Box sx={{ 
            maxHeight: 400, 
            overflow: 'auto', 
            border: '1px solid #e0e0e0', 
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {filteredUsers.length === 0 ? (
              <Alert severity="info" sx={{ m: 2 }}>
                Aucun utilisateur disponible dans ce service
              </Alert>
            ) : (
              filteredUsers.map((user) => (
                <Box
                  key={user.id}
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.1)'
                    },
                    backgroundColor: selectedUsers.includes(user.id) 
                      ? 'rgba(102, 126, 234, 0.2)' 
                      : 'transparent',
                    borderBottom: '1px solid #e0e0e0'
                  }}
                  onClick={() => handleUserSelection(user.id)}
                >
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelection(user.id)}
                    sx={{
                      color: '#667eea',
                      '&.Mui-checked': {
                        color: '#764ba2'
                      }
                    }}
                  />
                  <Avatar 
                    sx={{ 
                      ml: 2, 
                      mr: 2, 
                      bgcolor: 'primary.main',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  >
                    {user.nom.charAt(0)}{user.prenom.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {user.nom} {user.prenom}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.poste}
                    </Typography>
                    {user.email && (
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Grid>

        {/* Tableau des participants sélectionnés */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold', mt: 3 }}>
            Participants sélectionnés
          </Typography>
          <Box sx={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            {Object.keys(selectedUsersByService).length === 0 ? (
              <Alert severity="info" sx={{ m: 2 }}>
                Aucun participant sélectionné
              </Alert>
            ) : (
              <Box sx={{ overflowX: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>Service</TableCell>
                      <TableCell sx={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>Nom</TableCell>
                      <TableCell sx={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>Poste</TableCell>
                      <TableCell sx={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>Email</TableCell>
                      <TableCell sx={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(selectedUsersByService).map(([service, users]) => (
                      <React.Fragment key={service}>
                        {users.map((user, index) => (
                          <TableRow 
                            key={user.id}
                            sx={{ 
                              '&:nth-of-type(odd)': { backgroundColor: 'rgba(102, 126, 234, 0.05)' },
                              '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.1)' }
                            }}
                          >
                            <TableCell>{index === 0 ? service : ''}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar 
                                  sx={{ 
                                    mr: 2, 
                                    width: 32, 
                                    height: 32,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                  }}
                                >
                                  {user.nom.charAt(0)}{user.prenom.charAt(0)}
                                </Avatar>
                                {user.nom} {user.prenom}
                              </Box>
                            </TableCell>
                            <TableCell>{user.poste}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <IconButton
                                size="small"
                                onClick={() => handleUserSelection(user.id)}
                                sx={{ 
                                  color: '#667eea',
                                  '&:hover': {
                                    color: '#764ba2',
                                    backgroundColor: 'rgba(102, 126, 234, 0.1)'
                                  }
                                }}
                              >
                                <Close fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Box>
        </Grid>

        {/* Résumé et validation */}
        <Grid item xs={12}>
          <Alert 
            severity={selectedUsers.length > 0 ? "success" : "info"} 
            sx={{ 
              mt: 2,
              borderRadius: 2,
              '& .MuiAlert-icon': {
                color: selectedUsers.length > 0 ? '#4CAF50' : '#667eea'
              }
            }}
          >
            <Typography variant="subtitle2" fontWeight="medium">
              {selectedUsers.length} participant(s) sélectionné(s) au total
            </Typography>
          </Alert>
        </Grid>

        {errors?.step6?.selected_users && (
          <Grid item xs={12}>
            <Alert 
              severity="error"
              sx={{ 
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  color: '#f44336'
                }
              }}
            >
              {errors.step6.selected_users}
            </Alert>
          </Grid>
        )}
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

const WizardFormModal = ({ open, onClose }) => {
 // const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
    step6: {}
  });
  const [showConfirm, setShowConfirm] = useState(false);

  const steps = ['Formation', 'Programme', 'Planning', 'Coûts', 'Participants', 'Sélection par Direction'];
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
      case 4:
        if (!formData.step5?.selected_users?.length) {
          newErrors.selected_users = 'Veuillez sélectionner au moins un participant';
        }
        break;
      case 5:
        if (!formData.step6?.selected_users?.length) {
          newErrors.selected_users = 'Veuillez sélectionner au moins un participant';
        }
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


  useEffect(() => {
    if (open) {
      setActiveStep(0);
      setShowSuccess(false);
      setErrors({});
      setFormData({
        step1: {},
        step2: {},
        step3: {},
        step4: {},
        step5: {},
        step6: {}
      });
    }
  }, [open]);

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'closeButton' || !reason) {
      setShowConfirm(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirm(false);
    onClose();
  };

  const handleRestart = () => {
    setShowSuccess(false);
    setActiveStep(0);
    setErrors({});
    setFormData({
      step1: {},
      step2: {},
      step3: {},
      step4: {},
      step5: {},
      step6: {}
    });
    onClose();
    //setOpen(false);
  };

  const renderStep = () => {
    if (showSuccess) {
      return <SuccessComponent formData={formData} onRestart={handleRestart} />;
    }

    switch (activeStep) {
      case 0:
        return <Step5 formData={formData} setFormData={setFormData} errors={errors} />;
      case 1:
        return <Step5 formData={formData} setFormData={setFormData} errors={errors} />;
      case 2:
        return <Step3 formData={formData} setFormData={setFormData} errors={errors} />;
      case 3:
        return <Step4 formData={formData} setFormData={setFormData} errors={errors} />;
      case 4:
        return <Step1 formData={formData} setFormData={setFormData} errors={errors} />;
      case 5:
        return <Step2 formData={formData} setFormData={setFormData} errors={errors} />;
      default:
        return null;
    }
  };

  const progress = showSuccess ? 100 : ((activeStep + 1) / totalSteps) * 100;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <IconButton onClick={() => handleClose(null, 'closeButton')} sx={{ color: 'white' }}>
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
      {/* Dialog de confirmation */}
      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Voulez-vous vraiment quitter le formulaire ? Les modifications seront perdues.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirm(false)}>Annuler</Button>
          <Button onClick={handleConfirmClose} color="error">Quitter</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WizardFormModal;