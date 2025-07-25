import React, { useState, useEffect } from 'react';

const Task = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFormation, setSelectedFormation] = useState('all');

  // Simulation de l'appel API avec vos données
  useEffect(() => {
    // Simule votre réponse API
    const mockApiResponse = {
      data: [
        {
          id: 141,
          code_formation: "P25039",
          code_session: "P2503951",
          formateur: "K",
          participants: [
            {
              email: "mianpaulette@live.fr",
              matricule: "5063",
              nom: "MIAN",
              prenom: "PAUL ELIE"
            }
          ],
        },
        {
          id: 144,
          code_formation: "P25040",
          code_session: "P2504002",
          formateur: "N",
          participants: [
            {
              email: "lucas.moreau@example.fr",
              matricule: "5067",
              nom: "MOREAU",
              prenom: "LUCAS"
            },
            {
              email: "claire.petit@example.fr",
              matricule: "5068",
              nom: "PETIT",
              prenom: "CLAIRE"
            }
          ]
        },
        {
          id: 145,
          code_formation: "P25041",
          code_session: "P2504101",
          formateur: "O",
          participants: [
            {
              email: "thomas.robert@example.fr",
              matricule: "5069",
              nom: "ROBERT",
              prenom: "THOMAS"
            }
          ]
        } ,
        {
          id: 142,
          code_formation: "P25039",
          code_session: "P2503952",
          formateur: "L",
          participants: [
            {
              email: "marie.dupont@example.fr",
              matricule: "5064",
              nom: "DUPONT",
              prenom: "MARIE"
            },
            {
              email: "jean.martin@example.fr",
              matricule: "5065",
              nom: "MARTIN",
              prenom: "JEAN"
            }
          ]
        },
        {
          id: 143,
          code_formation: "P25040",
          code_session: "P2504001",
          formateur: "M",
          participants: [
            {
              email: "sophie.bernard@example.fr",
              matricule: "5066",
              nom: "BERNARD",
              prenom: "SOPHIE"
            }
          ]
        }
      ]
    };

    // Simule un délai d'API
    setTimeout(() => {
      setApiData(mockApiResponse.data);
      setLoading(false);
    }, 1000);
  }, []);

  // Transformation des données API en format compatible avec votre design
  // Obtenir les codes de formation uniques
  const getUniqueFormations = (data) => {
    const formations = [...new Set(data.map(item => item.code_formation))];
    return formations.sort();
  };

  // Filtrer les données selon la formation sélectionnée
  const getFilteredData = () => {
    if (selectedFormation === 'all') {
      return apiData;
    }
    return apiData.filter(item => item.code_formation === selectedFormation);
  };

  const transformApiDataToTasks = (apiData) => {
    return apiData.map((item, index) => {
      const statuses = ['Not started', 'Started', 'In Progress', 'Completed'];
      const categories = ['Formation', 'Session', 'Training', 'Workshop'];
      const priorities = ['High', 'Medium', 'Urgent', 'Low'];
      
      // Génération des assignés basée sur les participants
      const assignees = item.participants.map((participant, pIndex) => ({
        initials: `${participant.prenom.charAt(0)}${participant.nom.charAt(0)}`,
        priority: priorities[pIndex % priorities.length],
        color: getRandomColor(pIndex),
        email: participant.email,
        matricule: participant.matricule,
        fullName: `${participant.prenom} ${participant.nom}`
      }));

      // Ajouter le formateur comme assigné principal
      assignees.unshift({
        initials: item.formateur,
        priority: 'High',
        color: '#ff5722',
        role: 'Formateur'
      });

      return {
        id: item.id,
        title: `Formation ${item.code_formation}`,
        description: `Session ${item.code_session} avec ${item.participants.length} participant(s)`,
        category: categories[index % categories.length],
        progress: Math.floor(Math.random() * 8) + 2,
        total: 10,
        comments: Math.floor(Math.random() * 20) + 5,
        attachments: Math.floor(Math.random() * 15) + 3,
        date: 'Nov',
        assignees: assignees,
        status: statuses[index % statuses.length],
        formateur: item.formateur,
        codeFormation: item.code_formation,
        codeSession: item.code_session,
        participantCount: item.participants.length
      };
    });
  };

  const getRandomColor = (index) => {
    const colors = ['#ff5722', '#2196f3', '#4caf50', '#9c27b0', '#ff9800', '#607d8b', '#795548', '#e91e63'];
    return colors[index % colors.length];
  };

  const filteredData = getFilteredData();
  const uniqueFormations = getUniqueFormations(apiData);
  const tasks = transformApiDataToTasks(filteredData);

  const columns = [
    { id: 'Not started', title: 'Not started', count: 0 },
    { id: 'Started', title: 'Started', count: 0 },
    { id: 'In Progress', title: 'In Progress', count: 0 },
    { id: 'Completed', title: 'Completed', count: 0 }
  ];

  // Count tasks for each column
  columns.forEach(column => {
    column.count = tasks.filter(task => task.status === column.id).length;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Formation': '#00bcd4',
      'Session': '#ff9800',
      'Training': '#2196f3',
      'Workshop': '#9c27b0'
    };
    return colors[category] || '#666';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': '#f44336',
      'Medium': '#ff9800',
      'Urgent': '#ff5722',
      'Low': '#4caf50'
    };
    return colors[priority] || '#666';
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Roboto, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e0e0e0',
            borderTop: '4px solid #4285f4',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>
            Chargement des formations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: '#f5f5f5', 
      marginTop:'60px',
      fontFamily: 'Roboto, sans-serif',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '600', 
            color: '#333',
            margin: 0
          }}>
            Formations
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#666',
            margin: '8px 0 0 0'
          }}>
            {selectedFormation === 'all' ? 
              `${tasks.length} formation(s) • ${tasks.reduce((sum, task) => sum + task.participantCount, 0)} participant(s) total` :
              `Formation ${selectedFormation} • ${tasks.length} session(s) • ${tasks.reduce((sum, task) => sum + task.participantCount, 0)} participant(s)`
            }
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Select pour filtrer par formation */}
          <select 
            value={selectedFormation}
            onChange={(e) => setSelectedFormation(e.target.value)}
            style={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '14px',
              color: '#333',
              cursor: 'pointer',
              outline: 'none',
              minWidth: '200px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <option value="all">Toutes les formations</option>
            {uniqueFormations.map(formation => (
              <option key={formation} value={formation}>
                Formation {formation}
              </option>
            ))}
          </select>
          
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <span style={{ fontSize: '18px', color: '#666' }}>🔍</span>
          </div>
          <button style={{
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <span>+</span>
            Nouvelle Formation
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '24px',
        height: 'calc(100vh - 200px)'
      }}>
        {columns.map(column => (
          <div key={column.id} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Column Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              padding: '0 8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: '500', 
                  color: '#333',
                  margin: 0
                }}>
                  {column.title}
                </h3>
                <span style={{
                  backgroundColor: '#e0e0e0',
                  color: '#666',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {column.count}
                </span>
              </div>
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                fontSize: '18px',
                padding: '4px'
              }}>
                ⋯
              </button>
            </div>

            {/* Tasks */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px',
              overflowY: 'auto'
            }}>
              {tasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <div key={task.id} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, boxShadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                  }}>
                    {/* Category Badge */}
                    <div style={{
                      backgroundColor: getCategoryColor(task.category),
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      display: 'inline-block',
                      marginBottom: '12px'
                    }}>
                      {task.category}
                    </div>

                    {/* Title - Adapté selon le filtre */}
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#333',
                      margin: '0 0 8px 0',
                      lineHeight: '1.4'
                    }}>
                      {selectedFormation === 'all' ? task.title : `Session ${task.codeSession}`}
                    </h4>

                    {/* Description avec informations API - Adaptée selon le filtre */}
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: '0 0 12px 0',
                      lineHeight: '1.4'
                    }}>
                      {selectedFormation === 'all' ? 
                        task.description : 
                        `Formation ${task.codeFormation} avec ${task.participantCount} participant(s)`
                      }
                    </p>

                    {/* Informations spécifiques API - Adaptées selon le filtre */}
                    <div style={{
                      backgroundColor: '#f8f9fa',
                      padding: '12px',
                      borderRadius: '8px',
                      marginBottom: '16px'
                    }}>
                      {selectedFormation === 'all' && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '12px', color: '#666' }}>Code Formation:</span>
                          <span style={{ fontSize: '12px', fontWeight: '500', color: '#333' }}>{task.codeFormation}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', color: '#666' }}>Code Session:</span>
                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#333' }}>{task.codeSession}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', color: '#666' }}>Formateur:</span>
                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#333' }}>{task.formateur}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', color: '#666' }}>Participants:</span>
                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#333' }}>{task.participantCount}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                          Progress
                        </span>
                        <span style={{ fontSize: '14px', color: '#666' }}>
                          {task.progress}/{task.total}
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '2px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${(task.progress / task.total) * 100}%`,
                          height: '100%',
                          backgroundColor: '#ff5722',
                          borderRadius: '2px'
                        }} />
                      </div>
                    </div>

                    {/* Bottom Info */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      {/* Stats */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '16px' }}>💬</span>
                          <span style={{ fontSize: '14px', color: '#666' }}>{task.comments}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '16px' }}>📎</span>
                          <span style={{ fontSize: '14px', color: '#666' }}>{task.attachments}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '16px' }}>📅</span>
                          <span style={{ fontSize: '14px', color: '#666' }}>{task.date}</span>
                        </div>
                      </div>

                      {/* Assignees */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', marginRight: '8px' }}>
                          {task.assignees.slice(0, 3).map((assignee, index) => (
                            <div key={index} style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: assignee.color,
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: '600',
                              marginLeft: index > 0 ? '-8px' : '0',
                              border: '2px solid white',
                              zIndex: task.assignees.length - index,
                              cursor: 'pointer'
                            }}
                            title={assignee.fullName || `${assignee.initials} - ${assignee.priority}${assignee.role ? ` (${assignee.role})` : ''}`}>
                              {assignee.initials}
                            </div>
                          ))}
                          {task.assignees.length > 3 && (
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: '#666',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              fontWeight: '600',
                              marginLeft: '-8px',
                              border: '2px solid white',
                              cursor: 'pointer',
                              zIndex: 1
                            }}
                            title={`+${task.assignees.length - 3} autres personnes`}>
                              +{task.assignees.length - 3}
                            </div>
                          )}
                        </div>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          color: getPriorityColor(task.assignees[0]?.priority),
                          backgroundColor: `${getPriorityColor(task.assignees[0]?.priority)}15`,
                          padding: '4px 8px',
                          borderRadius: '12px'
                        }}>
                          {task.assignees[0]?.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Task;