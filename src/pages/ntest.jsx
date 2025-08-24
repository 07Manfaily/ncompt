import React, { useState, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Autocomplete, TextField, Card, CardContent, Typography, Grid, Box } from '@mui/material';

// Données mockées
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
      "La formation a-t-elle répondu à vos attentes ? Va-t-elle vous servir dans votre travail ?": "Non, parfaitement",
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

const FormationAnalytics = () => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  // Obtenir la liste des participants
  const participants = useMemo(() => {
    return mockAnswersData.data.map(participant => ({
      label: participant.full_name,
      value: participant.full_name,
      data: participant
    }));
  }, []);

  // Créer les options de graphiques pour les questions du quiz global
  const createPieChartOptions = (question, data) => {
    const labels = Object.keys(data);
    const series = Object.values(data);
    
    return {
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: labels,
      series: series,
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
      legend: {
        position: 'bottom',
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
    };
  };

  // Créer un pie chart pour la réponse d'un participant spécifique
  const createParticipantPieChart = (question, participantAnswer) => {
    // Obtenir toutes les options possibles pour cette question
    const allOptions = mockAnswersData.quiz[question] || {};
    const optionKeys = Object.keys(allOptions);
    
    // Créer les données pour le pie chart
    const labels = optionKeys;
    const series = optionKeys.map(option => 
      option === participantAnswer ? 1 : 0
    );

    // Couleurs : vert pour la réponse du participant, gris pour les autres
    const colors = optionKeys.map(option => 
      option === participantAnswer ? '#27ae60' : '#ecf0f1'
    );

    return {
      chart: {
        type: 'pie',
        height: 300,
      },
      labels: labels,
      series: series,
      colors: colors,
      legend: {
        position: 'bottom',
        fontSize: '12px'
      },
      plotOptions: {
        pie: {
          donut: {
            size: '50%',
            labels: {
              show: true,
              name: {
                show: true
              },
              value: {
                show: false
              },
              total: {
                show: true,
                label: 'Réponse',
                formatter: () => participantAnswer
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return opts.w.config.labels[opts.seriesIndex] === participantAnswer ? participantAnswer : '';
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          }
        }
      }]
    };
  };

  // Obtenir les questions et réponses d'un participant pour les pie charts
  const getParticipantChartData = (participantData) => {
    const chartData = [];
    Object.keys(participantData).forEach(key => {
      if (key !== 'full_name' && key !== 'matricule' && key !== 'score' && key !== 'Quelles suggestions faites-vous pour les prochaines formations ?') {
        // Vérifier si cette question existe dans le quiz global
        if (mockAnswersData.quiz[key]) {
          chartData.push({
            question: key,
            answer: participantData[key]
          });
        }
      }
    });
    return chartData;
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif' 
    }}>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '30px' 
      }}>
        <h1 style={{ 
          color: '#2c3e50', 
          fontSize: '2.5rem', 
          marginBottom: '10px' 
        }}>
          Tableau de Bord d'Analyse des Formations
        </h1>
        <p style={{ 
          color: '#7f8c8d', 
          fontSize: '1.2rem' 
        }}>
          Analyse des retours participants et statistiques de satisfaction
        </p>
      </div>

      {/* Section Sélecteur de Participant */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px', 
        marginBottom: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          color: '#34495e', 
          marginBottom: '15px' 
        }}>
          Sélectionner un Participant
        </h2>
        <Autocomplete
          options={participants}
          getOptionLabel={(option) => option.label}
          value={selectedParticipant}
          onChange={(event, newValue) => setSelectedParticipant(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Rechercher un participant" variant="outlined" />
          )}
          style={{ marginBottom: '20px' }}
        />
      </div>

      {/* Statistiques du Participant Sélectionné */}
      {selectedParticipant && (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '10px', 
          marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            color: '#34495e', 
            marginBottom: '15px' 
          }}>
            Réponses de {selectedParticipant.label}
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '15px', 
            marginBottom: '30px' 
          }}>
            <div style={{ 
              backgroundColor: '#3498db', 
              color: 'white', 
              padding: '15px', 
              borderRadius: '8px', 
              textAlign: 'center' 
            }}>
              <h3 style={{ margin: '0 0 5px 0' }}>Score Global</h3>
              <p style={{ 
                margin: '0', 
                fontSize: '1.5rem', 
                fontWeight: 'bold' 
              }}>
                {selectedParticipant.data.score}/5
              </p>
            </div>
            <div style={{ 
              backgroundColor: '#2ecc71', 
              color: 'white', 
              padding: '15px', 
              borderRadius: '8px', 
              textAlign: 'center' 
            }}>
              <h3 style={{ margin: '0 0 5px 0' }}>Matricule</h3>
              <p style={{ 
                margin: '0', 
                fontSize: '1.2rem', 
                fontWeight: 'bold' 
              }}>
                {selectedParticipant.data.matricule}
              </p>
            </div>
          </div>

          <h3 style={{ 
            color: '#34495e', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Réponses aux Questions (Graphiques)
          </h3>
          
          {/* Pie Charts pour les réponses du participant */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '25px',
            marginBottom: '20px'
          }}>
            {getParticipantChartData(selectedParticipant.data).map((item, index) => (
              <div key={index} style={{ 
                backgroundColor: '#fafafa', 
                padding: '15px', 
                borderRadius: '10px',
                border: '1px solid #e0e0e0',
                textAlign: 'center'
              }}>
                <h4 style={{ 
                  margin: '0 0 15px 0', 
                  color: '#2c3e50',
                  fontSize: '0.85rem',
                  lineHeight: '1.3'
                }}>
                  {item.question}
                </h4>
                <Chart
                  options={createParticipantPieChart(item.question, item.answer)}
                  series={Object.keys(mockAnswersData.quiz[item.question] || {}).map(option => 
                    option === item.answer ? 1 : 0
                  )}
                  type="donut"
                  height={300}
                />
              </div>
            ))}
          </div>

          {/* Suggestions */}
          {selectedParticipant.data["Quelles suggestions faites-vous pour les prochaines formations ?"] && (
            <div style={{ 
              marginTop: '20px',
              backgroundColor: '#f39c12',
              color: 'white',
              padding: '15px',
              borderRadius: '8px'
            }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Suggestions</h4>
              <p style={{ margin: '0' }}>
                {selectedParticipant.data["Quelles suggestions faites-vous pour les prochaines formations ?"]}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Section Graphiques Globaux */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          color: '#34495e', 
          marginBottom: '25px',
          textAlign: 'center'
        }}>
          Analyse Globale des Réponses
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '30px' 
        }}>
          {Object.entries(mockAnswersData.quiz).map(([question, data], index) => (
            <div key={index} style={{ 
              backgroundColor: '#fafafa', 
              padding: '20px', 
              borderRadius: '10px',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ 
                color: '#2c3e50', 
                marginBottom: '15px',
                fontSize: '0.9rem',
                textAlign: 'center',
                lineHeight: '1.4'
              }}>
                {question}
              </h3>
              <Chart
                options={createPieChartOptions(question, data)}
                series={Object.values(data)}
                type="pie"
                height={350}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section Résumé */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        marginTop: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          color: '#34495e', 
          marginBottom: '15px' 
        }}>
          Résumé des Formations
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          <div style={{ 
            backgroundColor: '#e74c3c', 
            color: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            textAlign: 'center' 
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Nombre de Sessions</h3>
            <p style={{ 
              margin: '0', 
              fontSize: '2rem', 
              fontWeight: 'bold' 
            }}>
              {mockSessionsData.data.length}
            </p>
          </div>
          <div style={{ 
            backgroundColor: '#9b59b6', 
            color: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            textAlign: 'center' 
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Participants Total</h3>
            <p style={{ 
              margin: '0', 
              fontSize: '2rem', 
              fontWeight: 'bold' 
            }}>
              {mockAnswersData.data.length}
            </p>
          </div>
          <div style={{ 
            backgroundColor: '#1abc9c', 
            color: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            textAlign: 'center' 
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Score Moyen</h3>
            <p style={{ 
              margin: '0', 
              fontSize: '2rem', 
              fontWeight: 'bold' 
            }}>
              {(mockAnswersData.data.reduce((sum, p) => sum + p.score, 0) / mockAnswersData.data.length).toFixed(1)}/5
            </p>
          </div>
          <div style={{ 
            backgroundColor: '#f39c12', 
            color: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            textAlign: 'center' 
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Taux de Satisfaction</h3>
            <p style={{ 
              margin: '0', 
              fontSize: '2rem', 
              fontWeight: 'bold' 
            }}>
              {Math.round((mockAnswersData.data.reduce((sum, p) => sum + p.score, 0) / mockAnswersData.data.length / 5) * 100)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationAnalytics;