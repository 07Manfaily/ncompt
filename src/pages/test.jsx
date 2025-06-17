import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Chip,
  Card,
  CardContent,
  IconButton,
  Badge,
  Fade,
  Grow,
  TextField,
  InputAdornment,
  Tooltip,
  Button,
  Divider,
  Paper
} from '@mui/material';
import {
  People,
  Close,
  Search,
  FilterList,
  PersonAdd,
  Business,
  AccountTree,
  CheckCircle,
  Group
} from '@mui/icons-material';

// Mock data pour la démonstration
const mockUsers = [
  { id: 1, nom: 'Romain', prenom: 'Davis', poste: 'Chef de Produit', direction: 'Direction Produit', service: 'Service Produit', avatar: null },
  { id: 2, nom: 'Julien', prenom: 'Taylor', poste: 'Administrateur Système', direction: 'Direction IT', service: 'Service Infrastructure', avatar: null },
  { id: 3, nom: 'Nicolas', prenom: 'Richard', poste: 'DevOps Engineer', direction: 'Direction IT', service: 'Service Infrastructure', avatar: null },
  { id: 4, nom: 'Martin', prenom: 'Sophie', poste: 'UX Designer', direction: 'Direction Produit', service: 'Service Design', avatar: null },
  { id: 5, nom: 'Dubois', prenom: 'Marc', poste: 'Développeur Frontend', direction: 'Direction IT', service: 'Service Développement', avatar: null },
  { id: 6, nom: 'Leroy', prenom: 'Julie', poste: 'Product Owner', direction: 'Direction Produit', service: 'Service Produit', avatar: null },
  { id: 7, nom: 'Bernard', prenom: 'Paul', poste: 'Architecte Système', direction: 'Direction IT', service: 'Service Infrastructure', avatar: null },
  { id: 8, nom: 'Petit', prenom: 'Emma', poste: 'Scrum Master', direction: 'Direction Produit', service: 'Service Agile', avatar: null }
];

const StepComponent = ({ title, description, icon, children }) => (
  <Box sx={{ p: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <Box sx={{ 
        bgcolor: 'primary.main', 
        borderRadius: '50%', 
        p: 2, 
        mr: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Box>
    {children}
  </Box>
);

const UserCard = ({ user, isSelected, onToggle, isHighlighted = false }) => (
  <Grow in timeout={300}>
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isSelected ? 4 : 1,
        border: isSelected ? '2px solid' : '2px solid transparent',
        borderColor: isSelected ? 'primary.main' : 'transparent',
        backgroundColor: isHighlighted ? 'rgba(102, 126, 234, 0.05)' : 'background.paper',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 3,
          backgroundColor: 'rgba(102, 126, 234, 0.08)'
        }
      }}
      onClick={() => onToggle(user.id)}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              isSelected ? (
                <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
              ) : null
            }
          >
            <Avatar
              sx={{
                width: 50,
                height: 50,
                bgcolor: isSelected ? 'primary.main' : 'grey.400',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}
            >
              {user.nom.charAt(0)}{user.prenom.charAt(0)}
            </Avatar>
          </Badge>
          <Box sx={{ ml: 2, flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
              {user.prenom} {user.nom}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {user.poste}
            </Typography>
            <Chip
              label={user.service}
              size="small"
              sx={{
                fontSize: '0.7rem',
                height: 20,
                bgcolor: 'rgba(102, 126, 234, 0.1)',
                color: 'primary.main'
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grow>
);

const ServiceGroup = ({ service, users, onRemoveUser }) => (
  <Paper
    elevation={2}
    sx={{
      mb: 2,
      borderRadius: 3,
      overflow: 'hidden',
      border: '1px solid rgba(102, 126, 234, 0.2)'
    }}
  >
    <Box
      sx={{
        bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Business sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {service}
        </Typography>
      </Box>
      <Chip
        label={`${users.length} participant${users.length > 1 ? 's' : ''}`}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          fontWeight: 'bold'
        }}
      />
    </Box>
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {users.map(user => (
          <Grid item xs={12} sm={6} key={user.id}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                borderRadius: 2,
                bgcolor: 'rgba(102, 126, 234, 0.05)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(102, 126, 234, 0.1)',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <Avatar sx={{ width: 35, height: 35, bgcolor: 'primary.main', mr: 2 }}>
                {user.nom.charAt(0)}{user.prenom.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  {user.prenom} {user.nom}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.poste}
                </Typography>
              </Box>
              <Tooltip title="Retirer">
                <IconButton
                  size="small"
                  onClick={() => onRemoveUser(user.id)}
                  sx={{
                    color: 'error.main',
                    '&:hover': {
                      bgcolor: 'error.light',
                      color: 'white'
                    }
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Paper>
);

const Step6 = ({ formData = {}, setFormData, errors }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [directions, setDirections] = useState([]);
  const [services, setServices] = useState([]);
  const [usersByService, setUsersByService] = useState({});
  const [loading, setLoading] = useState(false);

  // Simulation du chargement des données
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulation d'un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userData = mockUsers;
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
      
      setLoading(false);
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
    let result = selectedService ? usersByService[selectedService] || [] : [];
    
    if (searchTerm) {
      result = result.filter(user =>
        user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.poste.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return result;
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

  const handleSelectAll = () => {
    const allUserIds = filteredUsers.map(user => user.id);
    const allSelected = allUserIds.every(id => selectedUsers.includes(id));
    
    if (allSelected) {
      // Désélectionner tous
      const newSelection = selectedUsers.filter(id => !allUserIds.includes(id));
      setSelectedUsers(newSelection);
      setFormData(prev => ({
        ...prev,
        step6: { 
          ...prev.step6, 
          selected_users: newSelection 
        }
      }));
    } else {
      // Sélectionner tous
      const newSelection = [...new Set([...selectedUsers, ...allUserIds])];
      setSelectedUsers(newSelection);
      setFormData(prev => ({
        ...prev,
        step6: { 
          ...prev.step6, 
          selected_users: newSelection 
        }
      }));
    }
  };

  if (loading) {
    return (
      <StepComponent
        title="Sélection des Participants"
        description="Chargement des données..."
        icon={<People sx={{ color: 'white', fontSize: 28 }} />}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography>Chargement en cours...</Typography>
        </Box>
      </StepComponent>
    );
  }

  return (
    <StepComponent
      title="Sélection des Participants"
      description="Organisez votre équipe par direction et service"
      icon={<People sx={{ color: 'white', fontSize: 28 }} />}
    >
      <Grid container spacing={4}>
        {/* Filtres */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(102, 126, 234, 0.02)' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <FilterList sx={{ mr: 1 }} />
              Filtres de sélection
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Direction</InputLabel>
                  <Select
                    value={selectedDirection}
                    label="Direction"
                    onChange={(e) => {
                      setSelectedDirection(e.target.value);
                      setSelectedService('');
                    }}
                    startAdornment={<AccountTree sx={{ mr: 1, color: 'text.secondary' }} />}
                  >
                    <MenuItem value="">Toutes les directions</MenuItem>
                    {directions.map(direction => (
                      <MenuItem key={direction} value={direction}>
                        {direction}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Service</InputLabel>
                  <Select
                    value={selectedService}
                    label="Service"
                    onChange={(e) => setSelectedService(e.target.value)}
                    disabled={!selectedDirection}
                    startAdornment={<Business sx={{ mr: 1, color: 'text.secondary' }} />}
                  >
                    <MenuItem value="">Tous les services</MenuItem>
                    {filteredServices.map(service => (
                      <MenuItem key={service} value={service}>
                        {service}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Rechercher un participant"
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
            </Grid>
          </Paper>
        </Grid>

        {/* Liste des utilisateurs */}
        <Grid item xs={12} lg={6}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonAdd sx={{ mr: 1 }} />
              Participants disponibles
              {selectedService && (
                <Chip
                  label={selectedService}
                  size="small"
                  sx={{ ml: 2 }}
                />
              )}
            </Typography>
            {filteredUsers.length > 0 && (
              <Button
                variant="outlined"
                size="small"
                onClick={handleSelectAll}
                sx={{ borderRadius: 3 }}
              >
                {filteredUsers.every(user => selectedUsers.includes(user.id)) ? 'Tout désélectionner' : 'Tout sélectionner'}
              </Button>
            )}
          </Box>
          
          <Box sx={{ maxHeight: 500, overflow: 'auto', pr: 1 }}>
            <Grid container spacing={2}>
              {filteredUsers.map((user) => (
                <Grid item xs={12} key={user.id}>
                  <UserCard
                    user={user}
                    isSelected={selectedUsers.includes(user.id)}
                    onToggle={handleUserSelection}
                  />
                </Grid>
              ))}
            </Grid>
            {filteredUsers.length === 0 && selectedService && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">
                  Aucun participant trouvé pour les critères sélectionnés
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>

        {/* Participants sélectionnés */}
        <Grid item xs={12} lg={6}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Group sx={{ mr: 1 }} />
            Participants sélectionnés
            <Chip
              label={`${selectedUsers.length} total`}
              color="primary"
              size="small"
              sx={{ ml: 2 }}
            />
          </Typography>
          
          <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
            {Object.entries(selectedUsersByService).map(([service, users]) => (
              <ServiceGroup
                key={service}
                service={service}
                users={users}
                onRemoveUser={handleUserSelection}
              />
            ))}
            {selectedUsers.length === 0 && (
              <Paper
                elevation={1}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  bgcolor: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 3,
                  border: '2px dashed rgba(0, 0, 0, 0.1)'
                }}
              >
                <People sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography color="text.secondary">
                  Sélectionnez des participants pour commencer
                </Typography>
              </Paper>
            )}
          </Box>
        </Grid>

        {/* Résumé */}
        <Grid item xs={12}>
          <Fade in={selectedUsers.length > 0}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                background: selectedUsers.length > 0 
                  ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)'
                  : 'rgba(0, 0, 0, 0.02)',
                border: selectedUsers.length > 0 ? '2px solid rgba(76, 175, 80, 0.3)' : '2px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, color: selectedUsers.length > 0 ? 'success.main' : 'text.secondary' }}>
                {selectedUsers.length > 0 ? '✓ Sélection confirmée' : 'Aucune sélection'}
              </Typography>
              <Typography variant="body1">
                {selectedUsers.length} participant{selectedUsers.length > 1 ? 's' : ''} sélectionné{selectedUsers.length > 1 ? 's' : ''} 
                {Object.keys(selectedUsersByService).length > 0 && 
                  ` réparti${selectedUsers.length > 1 ? 's' : ''} sur ${Object.keys(selectedUsersByService).length} service${Object.keys(selectedUsersByService).length > 1 ? 's' : ''}`
                }
              </Typography>
            </Paper>
          </Fade>
        </Grid>

        {errors?.step6?.selected_users && (
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2, bgcolor: 'error.light', borderRadius: 3 }}>
              <Typography color="error.main" sx={{ fontWeight: 'bold' }}>
                {errors.step6.selected_users}
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </StepComponent>
  );
};

export default Step6;