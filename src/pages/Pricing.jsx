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
    bgcolor: 'background.paper',
    m: 'auto',
    mt: '2%',
    width: '90%',
    maxWidth: 1200,
    maxHeight: '90vh',
    borderRadius: 3,
    boxShadow: 24,
    overflowY: 'auto',
    overflowX: 'hidden',
  }}>
    {/* Header coloré */}
    <Box sx={{ bgcolor: 'primary.main', color: 'white', px: 3, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AssignmentIcon sx={{ fontSize: 28 }} /> Détails de la formation
      </Typography>
      <IconButton onClick={handleClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
    </Box>
    {/* Contenu en colonne unique avec scroll */}
    <Box sx={{ p: 3, pt: 2 }}>
      {selectedData && (
        <Stack spacing={3} direction="column" width="100%">
          {/* Les 3 premières sections côte à côte */}
          <Grid container spacing={2} width="100%">
            <Grid item xs={12} md={4}>
              {/* Section 1 : Informations générales */}
              <Box width="100%">
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'primary.main', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <SchoolIcon sx={{ mr: 1 }} /> Informations générales
                </Typography>
            <Stack spacing={1.5} direction="column" width="100%">
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Code formation :</Typography>
                {editMode ? 
                  <TextField name="code_formation" value={editValues.code_formation} onChange={handleChange} size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.code_formation}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Intitulé :</Typography>
                {editMode ? 
                  <TextField name="intitule_formation" value={editValues.intitule_formation} onChange={handleChange} size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.intitule_formation}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Objectif :</Typography>
                {editMode ? 
                  <TextField name="objectif_formation" value={editValues.objectif_formation} onChange={handleChange} size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.objectif_formation}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>OGF :</Typography>
                {editMode ? 
                  <TextField name="ogf" value={editValues.ogf} onChange={handleChange} size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.ogf}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Thématique :</Typography>
                {editMode ? 
                  <TextField name="thematique" value={editValues.thematique} onChange={handleChange} size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.thematique}</Typography>
                }
              </Box>
            </Stack>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              {/* Section 2 : Organisation */}
              <Box width="100%">
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'primary.main', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <BusinessIcon sx={{ mr: 1 }} /> Organisation
                </Typography>
            <Stack spacing={1.5} direction="column" width="100%">
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Type de programme :</Typography>
                {editMode ? 
                  <TextField name="type_de_programme" value={editValues.type_de_programme} onChange={handleChange} size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.type_de_programme}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Origine demande :</Typography>
                {editMode ? 
                  <TextField name="origine_de_la_demande" value={editValues.origine_de_la_demande} onChange={handleChange} size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.origine_de_la_demande}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Direction :</Typography>
                {editMode ? 
                  <FormControl size="small" sx={{ flex: 1 }}>
                    <Select name="direction" value={editValues.direction} onChange={handleChange}>
                      {directions.map(dir => <MenuItem key={dir} value={dir}>{dir}</MenuItem>)}
                    </Select>
                  </FormControl> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.direction}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Profil cible :</Typography>
                {editMode ? 
                  <TextField name="profil_cible" value={editValues.profil_cible} onChange={handleChange} size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.profil_cible}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Priorité :</Typography>
                {editMode ? 
                  <FormControl size="small" sx={{ flex: 1 }}>
                    <Select name="priorite" value={editValues.priorite} onChange={handleChange}>
                      {priorites.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                    </Select>
                  </FormControl> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.priorite}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Mode diffusion :</Typography>
                {editMode ? 
                  <FormControl size="small" sx={{ flex: 1 }}>
                    <Select name="mode_diffusion" value={editValues.mode_diffusion} onChange={handleChange}>
                      {modes.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                    </Select>
                  </FormControl> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.mode_diffusion}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Type :</Typography>
                {editMode ? 
                  <FormControl size="small" sx={{ flex: 1 }}>
                    <Select name="type" value={editValues.type} onChange={handleChange}>
                      {types.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                    </Select>
                  </FormControl> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.type}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Formateur :</Typography>
                {editMode ? 
                  <TextField name="formateur" value={editValues.formateur} onChange={handleChange} size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.formateur}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Nb sessions :</Typography>
                {editMode ? 
                  <TextField name="nbr_session" value={editValues.nbr_session} onChange={handleChange} type="number" size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.nbr_session}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Effectif :</Typography>
                {editMode ? 
                  <TextField name="effectif" value={editValues.effectif} onChange={handleChange} type="number" size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.effectif}</Typography>
                }
              </Box>
            </Stack>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              {/* Section 3 : Dates & Durées */}
              <Box width="100%">
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'primary.main', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <DateRangeIcon sx={{ mr: 1 }} /> Dates & Durées
                </Typography>
            <Stack spacing={1.5} direction="column" width="100%">
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Date début :</Typography>
                {editMode ? 
                  <TextField name="date_de_debut" value={editValues.date_de_debut} onChange={handleChange} size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.date_de_debut}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Date fin :</Typography>
                {editMode ? 
                  <TextField name="date_de_fin" value={editValues.date_de_fin} onChange={handleChange} size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.date_de_fin}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Durée (jours) :</Typography>
                {editMode ? 
                  <TextField name="duree_jours" value={editValues.duree_jours} onChange={handleChange} type="number" size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.duree_jours}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Durée (heures) :</Typography>
                {editMode ? 
                  <TextField name="duree_heures" value={editValues.duree_heures} onChange={handleChange} type="number" size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.duree_heures}</Typography>
                }
              </Box>
            </Stack>
              </Box>
            </Grid>
          </Grid>
          
          <Divider />
          
          {/* Section 4 : Coûts */}
          <Box width="100%">
            <Typography variant="subtitle1" sx={{ mb: 2, color: 'primary.main', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <EuroIcon sx={{ mr: 1 }} /> Coûts
            </Typography>
            <Stack spacing={1.5} direction="column" width="100%">
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Période coûts :</Typography>
                {editMode ? 
                  <TextField name="periode_couts" value={editValues.periode_couts} onChange={handleChange} size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.periode_couts}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Conception/Animation :</Typography>
                {editMode ? 
                  <TextField name="conception_animation" value={editValues.conception_animation} onChange={handleChange} type="number" size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.conception_animation} €</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Logistique :</Typography>
                {editMode ? 
                  <TextField name="couts_logistique" value={editValues.couts_logistique} onChange={handleChange} type="number" size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.couts_logistique} €</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Coût total :</Typography>
                {editMode ? 
                  <TextField name="couts_total" value={editValues.couts_total} onChange={handleChange} type="number" size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.couts_total} €</Typography>
                }
              </Box>
            </Stack>
          </Box>
          
          <Divider />
          
          {/* Section 5 : Statut & avis */}
          <Box width="100%">
            <Typography variant="subtitle1" sx={{ mb: 2, color: 'primary.main', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <StarIcon sx={{ mr: 1 }} /> Statut & avis
            </Typography>
            <Stack spacing={1.5} direction="column" width="100%">
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Statut :</Typography>
                {editMode ? 
                  <FormControl size="small" sx={{ flex: 1 }}>
                    <Select name="statut" value={editValues.statut} onChange={handleChange}>
                      {statuts.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </Select>
                  </FormControl> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.statut}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Avis DRH :</Typography>
                {editMode ? 
                  <TextField name="avis_drh" value={editValues.avis_drh} onChange={handleChange} size="small" sx={{ flex: 1 }} /> : 
                  <Typography sx={{ flex: 1 }}>{selectedData.avis_drh}</Typography>
                }
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Obligatoire :</Typography>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  {editMode ? 
                    <Switch checked={editValues.formation_obligatoire} onChange={handleSwitch('formation_obligatoire')} /> : 
                    (selectedData.formation_obligatoire ? <CheckCircleIcon color="success" /> : <WarningIcon color="warning" />)
                  }
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ minWidth: '140px', fontWeight: 600 }}>Diplômante :</Typography>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  {editMode ? 
                    <Switch checked={editValues.formation_diplomante} onChange={handleSwitch('formation_diplomante')} /> : 
                    (selectedData.formation_diplomante ? <CheckCircleIcon color="success" /> : <WarningIcon color="warning" />)
                  }
                </Box>
              </Box>
            </Stack>
          </Box>
        </Stack>
      )}
    </Box>
    {/* Footer avec bouton Modifier/Enregistrer */}
    <Box sx={{ px: 3, py: 2, bgcolor: 'grey.100', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
      {editMode ? (
        <Button variant="contained" color="success" startIcon={<SaveIcon />} onClick={handleSave}>Enregistrer</Button>
      ) : (
        <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>Modifier</Button>
      )}
    </Box>
  </Box>
</Modal>
    </div>
  );
};

export default GanttChart;
