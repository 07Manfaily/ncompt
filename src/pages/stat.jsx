import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Chart from 'react-apexcharts';
import ReactWordcloud from 'react-wordcloud';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress,
  Autocomplete,
  TextField,
  Chip,
  Avatar,
  Tooltip,
  Alert
} from '@mui/material';

// Données de test basées sur vos APIs
const mockSessionsData = {
  "data": [
    {
      "after_session_notification_sent": true,
      "city": "Abidjan",
      "code_formation": "P25023",
      "code_session": "P25023S3",
      "duration_hours": 4,
      "end_datetime": "2025-08-07 12:00:00",
      "final_cost": 250000,
      "id": 15,
      "last_effective_invitation_date": "2025-07-20",
      "participants": [
        { "id": 1, "name": "Kouadio Jean", "email": "jean.kouadio@example.com", "matricule": "9759" },
        { "id": 2, "name": "Traoré Awa", "email": "awa.traore@example.com", "matricule": "9760" }
      ],
      "place": "Salle de conférence Plateau",
      "registration_file": "regfile_15.pdf",
      "session_is_ended": true,
      "start_datetime": "2025-08-07 08:00:00",
      "status": "Planifiée",
      "teacher": "Dr. Yao Koffi",
      "type": "Présentiel"
    },
    {
      "after_session_notification_sent": false,
      "city": "Yamoussoukro",
      "code_formation": "P25023",
      "code_session": "P25023S9",
      "duration_hours": 6,
      "end_datetime": "2025-08-07 14:00:00",
      "final_cost": 300000,
      "id": 21,
      "last_effective_invitation_date": "2025-07-22",
      "participants": [
        { "id": 3, "name": "Koné Mariam", "email": "mariam.kone@example.com", "matricule": "9761" },
        { "id": 4, "name": "Ouattara Ibrahim", "email": "ibrahim.ouattara@example.com", "matricule": "9762" }
      ],
      "place": "Institut National Polytechnique",
      "registration_file": "regfile_21.pdf",
      "session_is_ended": true,
      "start_datetime": "2025-08-07 08:00:00",
      "status": "Planifiée",
      "teacher": "Mme N'Guessan Clarisse",
      "type": "En ligne"
    }
  ]
};

const mockAnswersData = {
  "data": [
    {
      "La formation a-t-elle répondu à vos attentes ? Va-t-elle vous servir dans votre travail ?": "Oui, parfaitement",
      "Les objectifs annoncés de la formation ont-ils été entièrement atteints ?": "Oui, parfaitement",
      "Quelles suggestions faites-vous pour les prochaines formations ?": "Plus de cas pratiques",
      "full_name": "Kouadio Jean",
      "matricule": "9759",
      "score": 4.9,
      "Êtes-vous satisfaits de la durée et du rythme de la formation ?": "Très satisfait",
      "Êtes-vous satisfaits de l'animation de la formation et de la prestation du formateur ?": "Très satisfait",
      "Êtes-vous satisfaits de l'équilibre entre théorie et pratique lors de la formation ?": "Très satisfait",
      "Êtes-vous satisfaits des méthodes et moyens utilisés par le formateur ?": "Très satisfait",
      "Êtes-vous satisfaits des services de pause-café et de restauration ?": "Satisfait",
      "Êtes-vous satisfaits des supports utilisés (documents, vidéos, etc.) ?": "Très satisfait",
      "Êtes-vous satisfaits des échanges entre participants et des réponses du formateur ?": "Très satisfait",
      "Êtes-vous satisfaits du cadre de formation (salle, matériel, etc.) ?": "Très satisfait"
    },
    {
      "La formation a-t-elle répondu à vos attentes ? Va-t-elle vous servir dans votre travail ?": "Oui, parfaitement",
      "Les objectifs annoncés de la formation ont-ils été entièrement atteints ?": "Oui, parfaitement",
      "Quelles suggestions faites-vous pour les prochaines formations ?": "Inviter plus d'intervenants",
      "full_name": "Traoré Awa",
      "matricule": "9760",
      "score": 4.7,
      "Êtes-vous satisfaits de la durée et du rythme de la formation ?": "Satisfait",
      "Êtes-vous satisfaits de l'animation de la formation et de la prestation du formateur ?": "Très satisfait",
      "Êtes-vous satisfaits de l'équilibre entre théorie et pratique lors de la formation ?": "Très satisfait",
      "Êtes-vous satisfaits des méthodes et moyens utilisés par le formateur ?": "Très satisfait",
      "Êtes-vous satisfaits des services de pause-café et de restauration ?": "Satisfait",
      "Êtes-vous satisfaits des supports utilisés (documents, vidéos, etc.) ?": "Très satisfait",
      "Êtes-vous satisfaits des échanges entre participants et des réponses du formateur ?": "Très satisfait",
      "Êtes-vous satisfaits du cadre de formation (salle, matériel, etc.) ?": "Très satisfait"
    },
    {
      "La formation a-t-elle répondu à vos attentes ? Va-t-elle vous servir dans votre travail ?": "Partiellement",
      "Les objectifs annoncés de la formation ont-ils été entièrement atteints ?": "Oui, parfaitement",
      "Quelles suggestions faites-vous pour les prochaines formations ?": "Plus d'exercices pratiques",
      "full_name": "Koné Mariam",
      "matricule": "9761",
      "score": 4.2,
      "Êtes-vous satisfaits de la durée et du rythme de la formation ?": "Satisfait",
      "Êtes-vous satisfaits de l'animation de la formation et de la prestation du formateur ?": "Satisfait",
      "Êtes-vous satisfaits de l'équilibre entre théorie et pratique lors de la formation ?": "Plus ou moins satisfait",
      "Êtes-vous satisfaits des méthodes et moyens utilisés par le formateur ?": "Très satisfait",
      "Êtes-vous satisfaits des services de pause-café et de restauration ?": "Insatisfait",
      "Êtes-vous satisfaits des supports utilisés (documents, vidéos, etc.) ?": "Satisfait",
      "Êtes-vous satisfaits des échanges entre participants et des réponses du formateur ?": "Très satisfait",
      "Êtes-vous satisfaits du cadre de formation (salle, matériel, etc.) ?": "Satisfait"
    }
  ],
  "ok": true,
  "prepared_text_for_word_cloud": "Excellent Formateur Pratique Utile Intéressant Clair Dynamique Enrichissant Complet Motivant Pédagogique Adapté",
  "quiz": {
    "La formation a-t-elle répondu à vos attentes ? Va-t-elle vous servir dans votre travail ?": {
      "Oui, parfaitement": 2,
      "Partiellement": 1
    },
    "Les objectifs annoncés de la formation ont-ils été entièrement atteints ?": {
      "Oui, parfaitement": 3
    },
    "Êtes-vous satisfaits de la durée et du rythme de la formation ?": {
      "Satisfait": 2,
      "Très satisfait": 1
    },
    "Êtes-vous satisfaits de l'animation de la formation et de la prestation du formateur ?": {
      "Très satisfait": 2,
      "Satisfait": 1
    },
    "Êtes-vous satisfaits de l'équilibre entre théorie et pratique lors de la formation ?": {
      "Très satisfait": 2,
      "Plus ou moins satisfait": 1
    },
    "Êtes-vous satisfaits des méthodes et moyens utilisés par le formateur ?": {
      "Très satisfait": 3
    },
    "Êtes-vous satisfaits des services de pause-café et de restauration ?": {
      "Satisfait": 2,
      "Insatisfait": 1
    },
    "Êtes-vous satisfaits des supports utilisés (documents, vidéos, etc.) ?": {
      "Très satisfait": 2,
      "Satisfait": 1
    },
    "Êtes-vous satisfaits des échanges entre participants et des réponses du formateur ?": {
      "Très satisfait": 3
    },
    "Êtes-vous satisfaits du cadre de formation (salle, matériel, etc.) ?": {
      "Très satisfait": 2,
      "Satisfait": 1
    }
  }
};

// Composant pour texte tronqué avec tooltip
const TruncatedText = ({ children, maxLength = 30 }) => {
  const shouldTruncate = children.length > maxLength;
  const displayText = shouldTruncate ? `${children.substring(0, maxLength)}...` : children;

  return (
    <Tooltip title={shouldTruncate ? children : ''} arrow>
      <Typography variant="body2" sx={{ cursor: shouldTruncate ? 'help' : 'default' }}>
        {displayText}
      </Typography>
    </Tooltip>
  );
};

// Composant Filtre de Sessions (SIMPLE - une seule session)
const SessionFilter = ({ sessions, selectedSession, onChange, loading }) => {
  return (
    <Autocomplete
      options={sessions}
      value={selectedSession}
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={(option) => `${option.code_session} - ${option.city}`}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="📅 Sélectionner une Session"
          placeholder="Choisissez une session"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Box>
            <Typography variant="body1">{option.code_session}</Typography>
            <Typography variant="body2" color="text.secondary">
              {option.city} • {option.teacher} • {option.participants?.length || 0} participants
            </Typography>
          </Box>
        </li>
      )}
    />
  );
};

// Composant Filtre de Participants (SIMPLE - un seul participant)
const ParticipantFilter = ({ participants, selectedParticipant, onChange, loading, disabled }) => {
  return (
    <Autocomplete
      disabled={disabled}
      options={participants}
      value={selectedParticipant}
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={(option) => `${option.name} (${option.email})`}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="👥 Filtrer par Participant (optionnel)"
          placeholder={disabled ? "Sélectionnez d'abord une session" : "Choisir un participant..."}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
            {option.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="body1">{option.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {option.email} • Matricule: {option.matricule}
            </Typography>
          </Box>
        </li>
      )}
    />
  );
};

// Composant Pie Chart avec ApexCharts
const CustomPieChart = ({ title, data, isIndividualView = false, participantName = "" }) => {
  const chartConfig = useMemo(() => {
    if (!data || Object.keys(data).length === 0) return null;

    const labels = Object.keys(data);
    const series = Object.values(data);

    return {
      series,
      options: {
        chart: {
          type: 'pie',
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800
          }
        },
        labels,
        colors: ['#4caf50', '#8bc34a', '#ffc107', '#ff9800', '#f44336'],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '12px'
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return isIndividualView ? "100%" : val.toFixed(1) + '%';
          },
          style: {
            fontSize: '11px',
            fontWeight: 'bold'
          }
        },
        plotOptions: {
          pie: {
            expandOnClick: true
          }
        },
        tooltip: {
          theme: 'light',
          y: {
            formatter: function(val, opts) {
              if (isIndividualView) {
                return `Réponse: ${opts.w.config.labels[opts.seriesIndex]}`;
              }
              return `${val} réponses`;
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    };
  }, [data, isIndividualView]);

  if (!chartConfig) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={250}>
        <Typography color="text.secondary">Aucune donnée disponible</Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ height: '100%', border: isIndividualView ? '2px solid #3b82f6' : '1px solid #e0e0e0' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          {isIndividualView && (
            <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>
              {participantName.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <TruncatedText maxLength={25}>{title}</TruncatedText>
        </Box>
        {isIndividualView && (
          <Typography variant="caption" color="primary" sx={{ mb: 1, display: 'block' }}>
            Vue individuelle: {participantName}
          </Typography>
        )}
        <Box mt={2}>
          <Chart
            options={chartConfig.options}
            series={chartConfig.series}
            type="pie"
            width="100%"
            height={250}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

// Composant Word Cloud
const WordCloudComponent = ({ data, isFiltered = false, participantName = "" }) => {
  const wordCloudData = useMemo(() => {
    if (!data) return [];
    
    const words = data.split(' ').filter(word => word.length > 2);
    const wordCounts = {};
    
    words.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    return Object.entries(wordCounts).map(([text, value]) => ({
      text,
      value
    }));
  }, [data]);

  const options = useMemo(() => ({
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'Arial, sans-serif',
    fontSizes: [16, 48],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 3,
    rotations: 2,
    rotationAngles: [0, 90],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000
  }), []);

  const onWordClick = useCallback((word) => {
    console.log(`Mot cliqué: ${word.text} (${word.value} occurrences)`);
  }, []);

  const getWordTooltip = useCallback((word) => 
    `${word.text}: ${word.value} mentions`, []);

  const callbacks = useMemo(() => ({
    onWordClick,
    getWordTooltip
  }), [onWordClick, getWordTooltip]);
  
  if (wordCloudData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={300}>
        <Typography color="text.secondary">
          Aucun mot à afficher
        </Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ border: isFiltered ? '2px solid #3b82f6' : '1px solid #e0e0e0' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Typography variant="h6">
            💬 Nuage de Mots - Commentaires
          </Typography>
          {isFiltered && (
            <Chip 
              label={`Vue: ${participantName}`} 
              color="primary" 
              size="small"
              avatar={<Avatar sx={{ width: 20, height: 20 }}>{participantName.charAt(0)}</Avatar>}
            />
          )}
        </Box>
        <Box height={300} sx={{ '& canvas': { maxWidth: '100%', height: 'auto' } }}>
          <ReactWordcloud
            words={wordCloudData}
            options={options}
            callbacks={callbacks}
            size={[600, 300]}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" mt={1}>
          {wordCloudData.length} mots analysés {isFiltered && `pour ${participantName}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Composant principal du Dashboard
const TrainingEvaluationDashboard = () => {
  // États principaux
  const [sessions, setSessions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [answersData, setAnswersData] = useState(null);
  
  // États des filtres (SIMPLES - pas de multi-select)
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  
  // États de chargement
  const [loading, setLoading] = useState({
    sessions: true,
    participants: false,
    answers: false
  });

  // Chargement initial des sessions
  useEffect(() => {
    const loadSessions = async () => {
      try {
        setLoading(prev => ({ ...prev, sessions: true }));
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSessions(mockSessionsData.data);
      } catch (error) {
        console.error('Erreur chargement sessions:', error);
      } finally {
        setLoading(prev => ({ ...prev, sessions: false }));
      }
    };

    loadSessions();
  }, []);

  // Chargement des participants depuis mockAnswersData quand la session change
  useEffect(() => {
    if (!selectedSession) {
      setParticipants([]);
      setSelectedParticipant(null);
      return;
    }

    const loadParticipants = async () => {
      try {
        setLoading(prev => ({ ...prev, participants: true }));
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Extraire les participants depuis mockAnswersData basé sur full_name
        const participantsFromAnswers = mockAnswersData.data.map((answer, index) => ({
          id: index + 1,
          name: answer.full_name,
          email: `${answer.full_name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
          matricule: answer.matricule,
          full_name: answer.full_name // Garder le full_name pour la correspondance
        }));
        
        setParticipants(participantsFromAnswers);
        setSelectedParticipant(null);
      } catch (error) {
        console.error('Erreur chargement participants:', error);
      } finally {
        setLoading(prev => ({ ...prev, participants: false }));
      }
    };

    loadParticipants();
  }, [selectedSession]);

  // Chargement des données de réponses quand la session change
  useEffect(() => {
    if (!selectedSession) {
      setAnswersData(null);
      return;
    }

    const loadAnswersData = async () => {
      try {
        setLoading(prev => ({ ...prev, answers: true }));
        console.log('Récupération des données pour la session:', selectedSession.code_session);
        await new Promise(resolve => setTimeout(resolve, 800));
        setAnswersData(mockAnswersData);
      } catch (error) {
        console.error('Erreur chargement données réponses:', error);
      } finally {
        setLoading(prev => ({ ...prev, answers: false }));
      }
    };

    loadAnswersData();
  }, [selectedSession]);

  // Fonction pour créer les données de graphique pour un participant individuel
  const createIndividualQuizData = useCallback((participantAnswer) => {
    if (!participantAnswer) return {};

    const quiz = {};
    const questionFields = [
      "La formation a-t-elle répondu à vos attentes ? Va-t-elle vous servir dans votre travail ?",
      "Les objectifs annoncés de la formation ont-ils été entièrement atteints ?",
      "Êtes-vous satisfaits de la durée et du rythme de la formation ?",
      "Êtes-vous satisfaits de l'animation de la formation et de la prestation du formateur ?",
      "Êtes-vous satisfaits de l'équilibre entre théorie et pratique lors de la formation ?",
      "Êtes-vous satisfaits des méthodes et moyens utilisés par le formateur ?",
      "Êtes-vous satisfaits des services de pause-café et de restauration ?",
      "Êtes-vous satisfaits des supports utilisés (documents, vidéos, etc.) ?",
      "Êtes-vous satisfaits des échanges entre participants et des réponses du formateur ?",
      "Êtes-vous satisfaits du cadre de formation (salle, matériel, etc.) ?"
    ];

    questionFields.forEach(question => {
      const response = participantAnswer[question];
      if (response) {
        quiz[question] = { [response]: 1 };
      }
    });

    return quiz;
  }, []);

  // Calcul de la moyenne des scores
  const averageScore = useMemo(() => {
    if (!answersData || !answersData.data) return 0;
    
    if (selectedParticipant) {
      // Score individuel basé sur full_name
      const participantAnswer = answersData.data.find(
        answer => answer.full_name === selectedParticipant.full_name
      );
      return participantAnswer ? participantAnswer.score.toFixed(1) : '0.0';
    }
    
    // Score moyen global
    const scores = answersData.data.map(item => item.score);
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return (sum / scores.length).toFixed(1);
  }, [answersData, selectedParticipant]);

  // Génération des graphiques en secteurs
  const pieChartsData = useMemo(() => {
    if (!answersData) return [];
    
    if (selectedParticipant) {
      // Vue individuelle basée sur full_name
      const participantAnswer = answersData.data.find(
        answer => answer.full_name === selectedParticipant.full_name
      );
      
      if (!participantAnswer) return [];
      
      const individualQuiz = createIndividualQuizData(participantAnswer);
      return Object.entries(individualQuiz).map(([question, answers]) => ({
        title: question,
        data: answers
      }));
    }
    
    // Vue globale
    return Object.entries(answersData.quiz).map(([question, answers]) => ({
      title: question,
      data: answers
    }));
  }, [answersData, selectedParticipant, createIndividualQuizData]);

  // Calcul des totaux de satisfaction pour la légende
  const satisfactionCounts = useMemo(() => {
    if (!answersData) return {
      "Très satisfait": 0,
      "Satisfait": 0,
      "Plus ou moins satisfait": 0,
      "Insatisfait": 0,
      "Très insatisfait": 0
    };

    const counts = {
      "Très satisfait": 0,
      "Satisfait": 0,
      "Plus ou moins satisfait": 0,
      "Insatisfait": 0,
      "Très insatisfait": 0
    };

    if (selectedParticipant) {
      // Comptage individuel basé sur full_name
      const participantAnswer = answersData.data.find(
        answer => answer.full_name === selectedParticipant.full_name
      );
      
      if (participantAnswer) {
        const questionFields = [
          "Êtes-vous satisfaits de la durée et du rythme de la formation ?",
          "Êtes-vous satisfaits de l'animation de la formation et de la prestation du formateur ?",
          "Êtes-vous satisfaits de l'équilibre entre théorie et pratique lors de la formation ?",
          "Êtes-vous satisfaits des méthodes et moyens utilisés par le formateur ?",
          "Êtes-vous satisfaits des services de pause-café et de restauration ?",
          "Êtes-vous satisfaits des supports utilisés (documents, vidéos, etc.) ?",
          "Êtes-vous satisfaits des échanges entre participants et des réponses du formateur ?",
          "Êtes-vous satisfaits du cadre de formation (salle, matériel, etc.) ?"
        ];
        
        questionFields.forEach(question => {
          const response = participantAnswer[question];
          if (response && counts.hasOwnProperty(response)) {
            counts[response] += 1;
          }
        });
      }
    } else {
      // Comptage global
      Object.values(answersData.quiz).forEach(questionAnswers => {
        Object.entries(questionAnswers).forEach(([satisfaction, count]) => {
          if (counts.hasOwnProperty(satisfaction)) {
            counts[satisfaction] += count;
          }
        });
      });
    }

    return counts;
  }, [answersData, selectedParticipant]);

  // Calcul du nuage de mots
  const wordCloudText = useMemo(() => {
    if (!answersData || !answersData.data) return "";
    
    if (selectedParticipant) {
      // Vue individuelle - suggestion du participant basée sur full_name
      const participantAnswer = answersData.data.find(
        answer => answer.full_name === selectedParticipant.full_name
      );
      return participantAnswer ? 
        participantAnswer["Quelles suggestions faites-vous pour les prochaines formations ?"] || "Aucune suggestion" :
        "";
    }
    
    return answersData.prepared_text_for_word_cloud || "";
  }, [answersData, selectedParticipant]);

  const isIndividualView = !!selectedParticipant;

  return (
    <Box sx={{ 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh', 
      padding: 3,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* En-tête */}
      <Card sx={{ 
        mb: 3, 
        borderLeft: '4px solid #3b82f6',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                📊 ANALYSE DES ÉVALUATIONS À CHAUD DES FORMATIONS
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>📚 Module de formation:</Typography>
                  <Typography variant="h6">Programme de Leadership</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>📍 Lieu de formation:</Typography>
                  <Typography variant="h6">{selectedSession?.city || 'Non sélectionné'}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>📅 Date de formation:</Typography>
                  <Typography variant="h6">Août 2025</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 3,
                padding: 3,
                textAlign: 'center',
                border: isIndividualView ? '2px solid #ffd700' : 'none'
              }}>
                <Typography variant="h2" sx={{ fontWeight: 900, mb: 1 }}>
                  {averageScore}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {isIndividualView ? 'SCORE INDIVIDUEL' : 'SCORE GLOBAL MOYEN'}
                </Typography>
                <Typography variant="h3">😊</Typography>
                {isIndividualView && (
                  <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                    {selectedParticipant.name}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Filtres */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <SessionFilter
            sessions={sessions}
            selectedSession={selectedSession}
            onChange={setSelectedSession}
            loading={loading.sessions}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ParticipantFilter
            participants={participants}
            selectedParticipant={selectedParticipant}
            onChange={setSelectedParticipant}
            loading={loading.participants}
            disabled={!selectedSession}
          />
        </Grid>
      </Grid>

      {/* Légende des couleurs avec compteurs */}
      {selectedSession && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              📈 Légende des niveaux de satisfaction {isIndividualView && `- ${selectedParticipant.name}`}
            </Typography>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6} md={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <span style={{ fontSize: '20px' }}>😍</span>
                  <Box sx={{ width: 16, height: 16, backgroundColor: '#4caf50', borderRadius: 1 }} />
                  <Typography variant="body2">Très satisfait ({satisfactionCounts["Très satisfait"]})</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <span style={{ fontSize: '20px' }}>😊</span>
                  <Box sx={{ width: 16, height: 16, backgroundColor: '#8bc34a', borderRadius: 1 }} />
                  <Typography variant="body2">Satisfait ({satisfactionCounts["Satisfait"]})</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <span style={{ fontSize: '20px' }}>😐</span>
                  <Box sx={{ width: 16, height: 16, backgroundColor: '#ffc107', borderRadius: 1 }} />
                  <Typography variant="body2">Plus ou moins satisfait ({satisfactionCounts["Plus ou moins satisfait"]})</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <span style={{ fontSize: '20px' }}>😞</span>
                  <Box sx={{ width: 16, height: 16, backgroundColor: '#ff9800', borderRadius: 1 }} />
                  <Typography variant="body2">Insatisfait ({satisfactionCounts["Insatisfait"]})</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <span style={{ fontSize: '20px' }}>😡</span>
                  <Box sx={{ width: 16, height: 16, backgroundColor: '#f44336', borderRadius: 1 }} />
                  <Typography variant="body2">Très insatisfait ({satisfactionCounts["Très insatisfait"]})</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Message d'état */}
      {!selectedSession && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Veuillez sélectionner une session pour voir les données d'évaluation.
        </Alert>
      )}

      {/* Indicateur de vue filtrée */}
      {isIndividualView && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>🔍 Vue individuelle activée:</strong> Vous visualisez les réponses de {selectedParticipant.name}. 
            Les graphiques montrent ses réponses spécifiques à chaque question.
          </Typography>
        </Alert>
      )}

      {/* Graphiques en secteurs */}
      {loading.answers ? (
        <Box display="flex" justifyContent="center" p={5}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        pieChartsData.length > 0 && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {pieChartsData.map((chartData, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CustomPieChart
                  title={chartData.title}
                  data={chartData.data}
                  isIndividualView={isIndividualView}
                  participantName={selectedParticipant?.name || ""}
                />
              </Grid>
            ))}
          </Grid>
        )
      )}

      {/* Word Cloud */}
      {wordCloudText && (
        <WordCloudComponent 
          data={wordCloudText} 
          isFiltered={isIndividualView}
          participantName={selectedParticipant?.name || ""}
        />
      )}

      {/* Statistiques rapides */}
      {answersData && selectedSession && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📈 Statistiques rapides
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  👥 Total participants
                </Typography>
                <Typography variant="h4">
                  {participants.length}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  🎯 Session sélectionnée
                </Typography>
                <Typography variant="h4">
                  {selectedSession.code_session}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  📝 Réponses collectées
                </Typography>
                <Typography variant="h4">
                  {answersData.data.length}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  ⭐ Score {isIndividualView ? 'individuel' : 'moyen'}
                </Typography>
                <Typography variant="h4">
                  {averageScore}/5
                </Typography>
              </Grid>
            </Grid>
            
            {/* Détails du participant sélectionné */}
            {isIndividualView && selectedParticipant && (
              <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  👤 Détails du participant
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2, border: '1px solid #3b82f6' }}>
                      <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Avatar sx={{ width: 50, height: 50 }}>
                          {selectedParticipant.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {selectedParticipant.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedParticipant.email}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Matricule: {selectedParticipant.matricule}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {(() => {
                        const participantAnswer = answersData.data.find(
                          answer => answer.full_name === selectedParticipant.full_name
                        );
                        
                        if (!participantAnswer) {
                          return (
                            <Typography variant="body2" color="error">
                              Aucune réponse trouvée pour ce participant
                            </Typography>
                          );
                        }
                        
                        return (
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Score individuel:
                            </Typography>
                            <Typography variant="h4" color="primary">
                              {participantAnswer.score}/5
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                              Suggestion principale:
                            </Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic', p: 1, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
                              "{participantAnswer["Quelles suggestions faites-vous pour les prochaines formations ?"]}"
                            </Typography>
                          </Box>
                        );
                      })()}
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        📋 Résumé des réponses
                      </Typography>
                      {(() => {
                        const participantAnswer = answersData.data.find(
                          answer => answer.full_name === selectedParticipant.full_name
                        );
                        
                        if (!participantAnswer) return null;
                        
                        const satisfactionQuestions = [
                          "Êtes-vous satisfaits de la durée et du rythme de la formation ?",
                          "Êtes-vous satisfaits de l'animation de la formation et de la prestation du formateur ?",
                          "Êtes-vous satisfaits de l'équilibre entre théorie et pratique lors de la formation ?",
                          "Êtes-vous satisfaits des méthodes et moyens utilisés par le formateur ?",
                          "Êtes-vous satisfaits des services de pause-café et de restauration ?",
                          "Êtes-vous satisfaits des supports utilisés (documents, vidéos, etc.) ?",
                          "Êtes-vous satisfaits des échanges entre participants et des réponses du formateur ?",
                          "Êtes-vous satisfaits du cadre de formation (salle, matériel, etc.) ?"
                        ];
                        
                        return (
                          <Box>
                            {satisfactionQuestions.slice(0, 4).map((question, index) => {
                              const answer = participantAnswer[question];
                              const getColor = (answer) => {
                                if (answer === "Très satisfait") return "#4caf50";
                                if (answer === "Satisfait") return "#8bc34a";
                                if (answer === "Plus ou moins satisfait") return "#ffc107";
                                if (answer === "Insatisfait") return "#ff9800";
                                if (answer === "Très insatisfait") return "#f44336";
                                return "#666";
                              };
                              
                              return (
                                <Box key={index} sx={{ mb: 1 }}>
                                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '11px' }}>
                                    {question.replace("Êtes-vous satisfaits ", "")}
                                  </Typography>
                                  <Box 
                                    sx={{ 
                                      p: 0.5, 
                                      backgroundColor: getColor(answer), 
                                      color: 'white', 
                                      borderRadius: 1, 
                                      fontSize: '12px',
                                      textAlign: 'center'
                                    }}
                                  >
                                    {answer}
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                        );
                      })()}
                    </Card>
                  </Grid>
                </Grid>
                
                {/* Bouton pour réinitialiser le filtre participant */}
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <button
                    onClick={() => setSelectedParticipant(null)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    🔄 Revenir à la vue globale
                  </button>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default TrainingEvaluationDashboard;