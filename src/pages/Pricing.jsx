import React, { useState } from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import HighchartsReact from 'highcharts-react-official';
import {
  Modal, Box, Typography, Button, TextField, Select, MenuItem, InputLabel, FormControl, Stack, IconButton, Switch, Divider, Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EuroIcon from '@mui/icons-material/Euro';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

const fakeFormation = {
  code_formation: 'F2024-001',
  intitule_formation: 'Formation Leadership',
  objectif_formation: 'Développer les compétences managériales',
  ogf: 'OGF-123',
  thematique: 'Management',
  type_de_programme: 'Interne',
  origine_de_la_demande: 'Direction Générale',
  formation_obligatoire: true,
  formation_diplomante: false,
  priorite: 'Haute',
  mode_diffusion: 'Présentiel',
  direction: 'RH',
  profil_cible: 'Cadres',
  effectif: 25,
  type: 'Collectif',
  formateur: 'Jean Dupont',
  nbr_session: 2,
  duree_jours: 5,
  duree_heures: 35,
  date_de_debut: '15/09/2024',
  date_de_fin: '20/09/2024',
  periode_couts: '2024',
  conception_animation: 1200,
  couts_logistique: 800,
  couts_total: 2000,
  statut: 'Validée',
  avis_drh: 'Très favorable'
};

const directions = ['RH', 'Technique', 'Finance', 'Marketing'];
const priorites = ['Haute', 'Moyenne', 'Basse'];
const modes = ['Présentiel', 'Distanciel', 'Hybride'];
const types = ['Collectif', 'Individuel'];
const statuts = ['Validée', 'En attente', 'Refusée'];

const GanttChart = () => {
  const [selectedData, setSelectedData] = useState(fakeFormation);
  const [open, setOpen] = useState(true); // Pour la démo, ouvert par défaut
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState(fakeFormation);

  const handleEdit = () => setEditMode(true);
  const handleClose = () => { setOpen(false); setEditMode(false); };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditValues({ ...editValues, [name]: type === 'checkbox' ? checked : value });
  };
  const handleSwitch = (name) => (e) => {
    setEditValues({ ...editValues, [name]: e.target.checked });
  };
  const handleSave = () => {
    setSelectedData(editValues);
    setEditMode(false);
  };

  // Pour la démo, le Gantt n'affiche qu'une tâche fictive
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day).getTime();
  };
  const series = [{
    name: 'Formations',
    data: [{
      name: fakeFormation.intitule_formation,
      start: parseDate(fakeFormation.date_de_debut),
      end: parseDate(fakeFormation.date_de_fin),
      owner: fakeFormation.code_formation,
      completed: { amount: 0.7 },
      events: {
        click: () => setOpen(true)
      }
    }]
  }];
  const options = {
    chart: {
      plotBackgroundColor: 'rgba(128,128,128,0.02)',
      plotBorderColor: 'rgba(128,128,128,0.1)',
      plotBorderWidth: 1
    },
    title: { text: 'Planning des formations' },
    xAxis: [{
      currentDateIndicator: true,
      min: parseDate('01/01/2024'),
      max: parseDate('01/01/2025'),
    }],
    yAxis: { staticScale: 30 },
    tooltip: {
      pointFormat: '<b>{point.name}</b><br>Début : {point.start:%e %b %Y}<br>Fin : {point.end:%e %b %Y}<br>Code: {point.owner}'
    },
    series
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'ganttChart'}
        options={options}
      />
<Modal open={open} onClose={handleClose}>
  <Box sx={{
    p: 0,
    bgcolor: 'transparent',
    m: 'auto',
    mt: '1%',
    width: '95%',
    maxWidth: 1300,
    maxHeight: '95vh',
    borderRadius: 4,
    boxShadow: 'none',
    overflowY: 'auto',
    overflowX: 'hidden',
  }}>
    {/* Container principal avec glassmorphism */}
    <Box sx={{
      bgcolor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: 4,
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden',
    }}>
      {/* Header moderne avec gradient */}
      <Box sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        px: 4,
        py: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
          <Box sx={{
            p: 1.5,
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AssignmentIcon sx={{ fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              Formation Details
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.9rem' }}>
              Gestion et suivi des formations
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={handleClose} 
          sx={{ 
            color: 'white', 
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' },
            position: 'relative',
            zIndex: 1
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Contenu principal */}
      <Box sx={{ p: 4 }}>
        {selectedData && (
          <Stack spacing={4} direction="column" width="100%">
            {/* Les 3 premières sections en cartes */}
            <Grid container spacing={3} width="100%">
              <Grid item xs={12} lg={4}>
                {/* Card 1 : Informations générales */}
                <Box sx={{
                  bgcolor: 'white',
                  borderRadius: 3,
                  p: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)'
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    pb: 2,
                    borderBottom: '2px solid #f0f0f0'
                  }}>
                    <Box sx={{
                      p: 1,
                      bgcolor: 'rgba(103, 126, 234, 0.1)',
                      borderRadius: 2,
                      mr: 2
                    }}>
                      <SchoolIcon sx={{ color: '#667eea', fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2d3748' }}>
                      Informations générales
                    </Typography>
                  </Box>
                  
                  <Stack spacing={2.5} direction="column" width="100%">
                    {[
                      { label: 'Code formation', key: 'code_formation' },
                      { label: 'Intitulé', key: 'intitule_formation' },
                      { label: 'Objectif', key: 'objectif_formation' },
                      { label: 'OGF', key: 'ogf' },
                      { label: 'Thématique', key: 'thematique' }
                    ].map((item) => (
                      <Box key={item.key} sx={{ 
                        bgcolor: '#f8fafc',
                        borderRadius: 2,
                        p: 2,
                        border: '1px solid #e2e8f0'
                      }}>
                        <Typography sx={{ 
                          fontSize: '0.85rem', 
                          fontWeight: 600, 
                          color: '#64748b',
                          mb: 0.5,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {item.label}
                        </Typography>
                        {editMode ? (
                          <TextField 
                            name={item.key} 
                            value={editValues[item.key]} 
                            onChange={handleChange} 
                            size="small" 
                            fullWidth
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                bgcolor: 'white',
                                borderRadius: 2
                              }
                            }}
                          />
                        ) : (
                          <Typography sx={{ 
                            color: '#2d3748', 
                            fontWeight: 500,
                            wordBreak: 'break-word'
                          }}>
                            {selectedData[item.key] || 'Non défini'}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Grid>
              
              <Grid item xs={12} lg={4}>
                {/* Card 2 : Organisation */}
                <Box sx={{
                  bgcolor: 'white',
                  borderRadius: 3,
                  p: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)'
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    pb: 2,
                    borderBottom: '2px solid #f0f0f0'
                  }}>
                    <Box sx={{
                      p: 1,
                      bgcolor: 'rgba(118, 75, 162, 0.1)',
                      borderRadius: 2,
                      mr: 2
                    }}>
                      <BusinessIcon sx={{ color: '#764ba2', fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2d3748' }}>
                      Organisation
                    </Typography>
                  </Box>
                  
                  <Stack spacing={2.5} direction="column" width="100%">
                    {[
                      { label: 'Type de programme', key: 'type_de_programme', type: 'text' },
                      { label: 'Origine demande', key: 'origine_de_la_demande', type: 'text' },
                      { label: 'Direction', key: 'direction', type: 'select', options: directions },
                      { label: 'Profil cible', key: 'profil_cible', type: 'text' },
                      { label: 'Priorité', key: 'priorite', type: 'select', options: priorites },
                      { label: 'Mode diffusion', key: 'mode_diffusion', type: 'select', options: modes },
                      { label: 'Type', key: 'type', type: 'select', options: types },
                      { label: 'Formateur', key: 'formateur', type: 'text' },
                      { label: 'Nb sessions', key: 'nbr_session', type: 'number' },
                      { label: 'Effectif', key: 'effectif', type: 'number' }
                    ].map((item) => (
                      <Box key={item.key} sx={{ 
                        bgcolor: '#f8fafc',
                        borderRadius: 2,
                        p: 2,
                        border: '1px solid #e2e8f0'
                      }}>
                        <Typography sx={{ 
                          fontSize: '0.85rem', 
                          fontWeight: 600, 
                          color: '#64748b',
                          mb: 0.5,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {item.label}
                        </Typography>
                        {editMode ? (
                          item.type === 'select' ? (
                            <FormControl size="small" fullWidth>
                              <Select 
                                name={item.key} 
                                value={editValues[item.key]} 
                                onChange={handleChange}
                                sx={{
                                  bgcolor: 'white',
                                  borderRadius: 2
                                }}
                              >
                                {item.options.map(option => (
                                  <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          ) : (
                            <TextField 
                              name={item.key} 
                              value={editValues[item.key]} 
                              onChange={handleChange} 
                              type={item.type}
                              size="small" 
                              fullWidth
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  bgcolor: 'white',
                                  borderRadius: 2
                                }
                              }}
                            />
                          )
                        ) : (
                          <Typography sx={{ 
                            color: '#2d3748', 
                            fontWeight: 500,
                            wordBreak: 'break-word'
                          }}>
                            {selectedData[item.key] || 'Non défini'}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Grid>
              
              <Grid item xs={12} lg={4}>
                {/* Card 3 : Dates & Durées */}
                <Box sx={{
                  bgcolor: 'white',
                  borderRadius: 3,
                  p: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)'
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    pb: 2,
                    borderBottom: '2px solid #f0f0f0'
                  }}>
                    <Box sx={{
                      p: 1,
                      bgcolor: 'rgba(16, 185, 129, 0.1)',
                      borderRadius: 2,
                      mr: 2
                    }}>
                      <DateRangeIcon sx={{ color: '#10b981', fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2d3748' }}>
                      Dates & Durées
                    </Typography>
                  </Box>
                  
                  <Stack spacing={2.5} direction="column" width="100%">
                    {[
                      { label: 'Date début', key: 'date_de_debut' },
                      { label: 'Date fin', key: 'date_de_fin' },
                      { label: 'Durée (jours)', key: 'duree_jours', type: 'number' },
                      { label: 'Durée (heures)', key: 'duree_heures', type: 'number' }
                    ].map((item) => (
                      <Box key={item.key} sx={{ 
                        bgcolor: '#f8fafc',
                        borderRadius: 2,
                        p: 2,
                        border: '1px solid #e2e8f0'
                      }}>
                        <Typography sx={{ 
                          fontSize: '0.85rem', 
                          fontWeight: 600, 
                          color: '#64748b',
                          mb: 0.5,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {item.label}
                        </Typography>
                        {editMode ? (
                          <TextField 
                            name={item.key} 
                            value={editValues[item.key]} 
                            onChange={handleChange} 
                            type={item.type || 'text'}
                            size="small" 
                            fullWidth
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                bgcolor: 'white',
                                borderRadius: 2
                              }
                            }}
                          />
                        ) : (
                          <Typography sx={{ 
                            color: '#2d3748', 
                            fontWeight: 500,
                            wordBreak: 'break-word'
                          }}>
                            {selectedData[item.key] || 'Non défini'}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
            
            {/* Sections 4 et 5 en bas */}
            <Grid container spacing={3} width="100%">
              <Grid item xs={12} md={6}>
                {/* Card 4 : Coûts */}
                <Box sx={{
                  bgcolor: 'white',
                  borderRadius: 3,
                  p: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)'
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    pb: 2,
                    borderBottom: '2px solid #f0f0f0'
                  }}>
                    <Box sx={{
                      p: 1,
                      bgcolor: 'rgba(245, 158, 11, 0.1)',
                      borderRadius: 2,
                      mr: 2
                    }}>
                      <EuroIcon sx={{ color: '#f59e0b', fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2d3748' }}>
                      Coûts
                    </Typography>
                  </Box>
                  
                  <Stack spacing={2.5} direction="column" width="100%">
                    {[
                      { label: 'Période coûts', key: 'periode_couts' },
                      { label: 'Conception/Animation', key: 'conception_animation', type: 'number', suffix: ' €' },
                      { label: 'Logistique', key: 'couts_logistique', type: 'number', suffix: ' €' },
                      { label: 'Coût total', key: 'couts_total', type: 'number', suffix: ' €' }
                    ].map((item) => (
                      <Box key={item.key} sx={{ 
                        bgcolor: '#f8fafc',
                        borderRadius: 2,
                        p: 2,
                        border: '1px solid #e2e8f0'
                      }}>
                        <Typography sx={{ 
                          fontSize: '0.85rem', 
                          fontWeight: 600, 
                          color: '#64748b',
                          mb: 0.5,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {item.label}
                        </Typography>
                        {editMode ? (
                          <TextField 
                            name={item.key} 
                            value={editValues[item.key]} 
                            onChange={handleChange} 
                            type={item.type || 'text'}
                            size="small" 
                            fullWidth
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                bgcolor: 'white',
                                borderRadius: 2
                              }
                            }}
                          />
                        ) : (
                          <Typography sx={{ 
                            color: '#2d3748', 
                            fontWeight: 500,
                            wordBreak: 'break-word'
                          }}>
                            {selectedData[item.key] ? selectedData[item.key] + (item.suffix || '') : 'Non défini'}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                {/* Card 5 : Statut & avis */}
                <Box sx={{
                  bgcolor: 'white',
                  borderRadius: 3,
                  p: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)'
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    pb: 2,
                    borderBottom: '2px solid #f0f0f0'
                  }}>
                    <Box sx={{
                      p: 1,
                      bgcolor: 'rgba(168, 85, 247, 0.1)',
                      borderRadius: 2,
                      mr: 2
                    }}>
                      <StarIcon sx={{ color: '#a855f7', fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2d3748' }}>
                      Statut & avis
                    </Typography>
                  </Box>
                  
                  <Stack spacing={2.5} direction="column" width="100%">
                    <Box sx={{ 
                      bgcolor: '#f8fafc',
                      borderRadius: 2,
                      p: 2,
                      border: '1px solid #e2e8f0'
                    }}>
                      <Typography sx={{ 
                        fontSize: '0.85rem', 
                        fontWeight: 600, 
                        color: '#64748b',
                        mb: 0.5,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Statut
                      </Typography>
                      {editMode ? (
                        <FormControl size="small" fullWidth>
                          <Select 
                            name="statut" 
                            value={editValues.statut} 
                            onChange={handleChange}
                            sx={{
                              bgcolor: 'white',
                              borderRadius: 2
                            }}
                          >
                            {statuts.map(s => (
                              <MenuItem key={s} value={s}>{s}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <Typography sx={{ 
                          color: '#2d3748', 
                          fontWeight: 500,
                          wordBreak: 'break-word'
                        }}>
                          {selectedData.statut || 'Non défini'}
                        </Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ 
                      bgcolor: '#f8fafc',
                      borderRadius: 2,
                      p: 2,
                      border: '1px solid #e2e8f0'
                    }}>
                      <Typography sx={{ 
                        fontSize: '0.85rem', 
                        fontWeight: 600, 
                        color: '#64748b',
                        mb: 0.5,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Avis DRH
                      </Typography>
                      {editMode ? (
                        <TextField 
                          name="avis_drh" 
                          value={editValues.avis_drh} 
                          onChange={handleChange} 
                          size="small" 
                          fullWidth
                          multiline
                          rows={2}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'white',
                              borderRadius: 2
                            }
                          }}
                        />
                      ) : (
                        <Typography sx={{ 
                          color: '#2d3748', 
                          fontWeight: 500,
                          wordBreak: 'break-word'
                        }}>
                          {selectedData.avis_drh || 'Non défini'}
                        </Typography>
                      )}
                    </Box>
                    
                    {/* Switches pour obligatoire et diplômante */}
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ 
                          bgcolor: '#f8fafc',
                          borderRadius: 2,
                          p: 2,
                          border: '1px solid #e2e8f0',
                          textAlign: 'center'
                        }}>
                          <Typography sx={{ 
                            fontSize: '0.85rem', 
                            fontWeight: 600, 
                            color: '#64748b',
                            mb: 1,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Obligatoire
                          </Typography>
                          {editMode ? (
                            <Switch 
                              checked={editValues.formation_obligatoire} 
                              onChange={handleSwitch('formation_obligatoire')}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: '#10b981',
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: '#10b981',
                                },
                              }}
                            />
                          ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              {selectedData.formation_obligatoire ? 
                                <CheckCircleIcon sx={{ color: '#10b981', fontSize: 28 }} /> : 
                                <WarningIcon sx={{ color: '#f59e0b', fontSize: 28 }} />
                              }
                            </Box>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ 
                          bgcolor: '#f8fafc',
                          borderRadius: 2,
                          p: 2,
                          border: '1px solid #e2e8f0',
                          textAlign: 'center'
                        }}>
                          <Typography sx={{ 
                            fontSize: '0.85rem', 
                            fontWeight: 600, 
                            color: '#64748b',
                            mb: 1,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Diplômante
                          </Typography>
                          {editMode ? (
                            <Switch 
                              checked={editValues.formation_diplomante} 
                              onChange={handleSwitch('formation_diplomante')}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: '#10b981',
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: '#10b981',
                                },
                              }}
                            />
                          ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              {selectedData.formation_diplomante ? 
                                <CheckCircleIcon sx={{ color: '#10b981', fontSize: 28 }} /> : 
                                <WarningIcon sx={{ color: '#f59e0b', fontSize: 28 }} />
                              }
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Stack>
        )}
      </Box>
      
      {/* Footer moderne */}
      <Box sx={{ 
        px: 4, 
        py: 3, 
        bgcolor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          {editMode ? 'Mode édition activé' : 'Mode lecture seule'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {editMode ? (
            <>
              <Button 
                variant="outlined" 
                onClick={() => setEditMode(false)}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Annuler
              </Button>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />} 
                onClick={handleSave}
                sx={{ 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
                  }
                }}
              >
                Enregistrer
              </Button>
            </>
          ) : (
            <Button 
              variant="contained" 
              startIcon={<EditIcon />} 
              onClick={handleEdit}
              sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(103, 126, 234, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  boxShadow: '0 6px 20px rgba(103, 126, 234, 0.4)'
                }
              }}
            >
              Modifier
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  </Box>
</Modal>
    </div>
  );
};

export default GanttChart;
