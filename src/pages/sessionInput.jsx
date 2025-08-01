import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Settings,
  Filter,
  Heart,
  Mail,
  Phone,
  MessageCircle,
  Video,
  Edit,
  MoreHorizontal,
  Users,
  CheckCircle,
  AlertCircle,
  X,
  Info,
  Search,
  Plus,
  Trash2,
  Camera,
  Save,
  Upload,
  Clock,
  MapPin,
  Building,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const ProfileDashboard = () => {
  const options = ['Validé', 'Terminé', 'En cours'];
  const [status, setStatus] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddMember, setShowAddMember] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [participantSearch, setParticipantSearch] = useState('');
  const [showAllParticipants, setShowAllParticipants] = useState(false);
  const [loadingParticipants, setLoadingParticipants] = useState(false);

  // Nouveaux champs pour le modal
  const [sessionData, setSessionData] = useState({
    startDate: '',
    endDate: '',
    lieu: '',
    ville: '',
    status: ''
  });

  const [saving, setSaving] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulation des données API avec plus de participants
  const generateMockParticipants = () => {
    const noms = ['MARTIN', 'BERNARD', 'DUBOIS', 'THOMAS', 'ROBERT', 'PETIT', 'DURAND', 'LEROY', 'MOREAU', 'SIMON', 'LAURENT', 'LEFEBVRE', 'MICHEL', 'GARCIA', 'DAVID', 'BERTRAND', 'ROUX', 'VINCENT', 'FOURNIER', 'MOREL'];
    const prenoms = ['Jean', 'Marie', 'Pierre', 'Michel', 'Alain', 'Philippe', 'Daniel', 'Patrick', 'François', 'Jacques', 'André', 'René', 'Louis', 'Bernard', 'Claude', 'Paul', 'Gérard', 'Roger', 'Marcel', 'Henri'];
    const directions = ['Innovation', 'DCPP', 'RH', 'Finance', 'Marketing', 'IT', 'Production', 'Qualité'];
    const fonctions = ['Data Analyst', 'Gestionnaire', 'Manager', 'Développeur', 'Consultant', 'Chef de projet', 'Analyste', 'Technicien'];
   
    const mockList = [];
    for (let i = 0; i < 50; i++) {
      mockList.push({
        activite: "",
        departement: "",
        direction: directions[i % directions.length],
        email: `${prenoms[i % prenoms.length].toLowerCase()}.${noms[i % noms.length].toLowerCase()}@company.fr`,
        entite: "",
        fonction: fonctions[i % fonctions.length],
        matricule: `${1000 + i}`,
        nom: noms[i % noms.length],
        nom_manager: "MANAGER" + (i % 5 + 1),
        prenom: prenoms[i % prenoms.length],
        service: "Service " + (i % 10 + 1)
      });
    }
    return mockList;
  };

  const mockSessionsData = [
    {
      id: 47,
      city: null,
      code_formation: "P25028",
      code_session: "P2502851",
      duration_hours: null,
      end_datetime: null,
      participants: [
        {
          email: "mianpaulelie@live.fr",
          matricule: "123",
          nom: "MIAN",
          prenom: "PAULELIE"
        }
      ],
      place: null,
      start_datetime: null,
      status: null,
      teacher: null,
      type: null,
      title: "Formation Data Analysis",
      description: "Formation avancée en analyse de données avec Python et R",
      progress: 0,
      color: "gray",
      daysLeft: 15,
      lieu: "",
      ville: ""
    },
    {
      id: 48,
      city: null,
      code_formation: "P25028",
      code_session: "P2502852",
      duration_hours: null,
      end_datetime: null,
      participants: [
        {
          email: "yaolucien@live.fr",
          matricule: "456",
          nom: "YAO",
          prenom: "LUCIEN"
        }
      ],
      place: null,
      start_datetime: null,
      status: null,
      teacher: null,
      type: null,
      title: "Machine Learning Basics",
      description: "Introduction aux concepts fondamentaux du machine learning",
      progress: 0,
      color: "gray",
      daysLeft: 8,
      lieu: "",
      ville: ""
    },
    {
      id: 49,
      city: null,
      code_formation: "P25029",
      code_session: "P2502953",
      duration_hours: null,
      end_datetime: "2024-04-15T16:00",
      participants: [
        {
          email: "innovation@live.fr",
          matricule: "789",
          nom: "SMITH",
          prenom: "JOHN"
        }
      ],
      place: null,
      start_datetime: "2024-04-15T09:00",
      status: "Validé",
      teacher: null,
      type: null,
      title: "Innovation Workshop",
      description: "Atelier sur les méthodes d'innovation en entreprise",
      progress: 100,
      color: "green",
      daysLeft: 0,
      lieu: "Salle A101",
      ville: "Abidjan"
    }
  ];

  // Fonction pour générer les initiales
  const getInitials = (nom, prenom) => {
    const firstInitial = nom ? nom.charAt(0).toUpperCase() : '';
    const lastInitial = prenom ? prenom.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  };

  // Simulation du chargement des données
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSessions(mockSessionsData);
      setParticipants(generateMockParticipants());
      setLoading(false);
    };
    loadData();
  }, []);

  // Charger les participants depuis l'API
  const loadParticipants = async () => {
    setLoadingParticipants(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setParticipants(generateMockParticipants());
    setLoadingParticipants(false);
  };

  // Fonction pour filtrer les sessions
  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      session.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      session.code_formation.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus = statusFilter === 'all' ||
      (session.status && session.status.toLowerCase().replace(' ', '').includes(statusFilter.toLowerCase().replace(' ', '')));

    return matchesSearch && matchesStatus;
  });

  // Filtrer les participants pour l'ajout
  const filteredParticipants = participants.filter(participant => {
    if (!selectedSession) return false;
    const alreadyAdded = selectedSession.participants.some(p => p.matricule === participant.matricule);
    const matchesSearch = participantSearch === '' ||
      participant.nom.toLowerCase().includes(participantSearch.toLowerCase()) ||
      participant.prenom.toLowerCase().includes(participantSearch.toLowerCase()) ||
      participant.email.toLowerCase().includes(participantSearch.toLowerCase()) ||
      participant.matricule.includes(participantSearch);
    return !alreadyAdded && matchesSearch;
  });

  // Vérifier si une session est active
  const isSessionActive = (session) => {
    return session.start_datetime && session.end_datetime && session.status;
  };

  // Déterminer la couleur de la session
  const getSessionColor = (session) => {
    if (!session.start_datetime || !session.end_datetime) return 'gray';
   
    switch (session.status) {
      case "Validé": return 'green';
      case "En cours": return 'yellow';
      case "Terminé": return 'pink';
      default: return 'blue';
    }
  };

  // Mise à jour de la session sélectionnée
  useEffect(() => {
    if (selectedSession) {
      setSessionData({
        startDate: selectedSession.start_datetime || '',
        endDate: selectedSession.end_datetime || '',
        lieu: selectedSession.lieu || '',
        ville: selectedSession.ville || '',
        status: selectedSession.status || ''
      });
    }
  }, [selectedSession]);

  // Fonction pour sauvegarder la session
  const saveSession = async () => {
    setSaving(true);
   
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
   
    // Mettre à jour la session dans la liste
    setSessions(prev => prev.map(session => {
      if (session.id === selectedSession.id) {
        const updatedSession = {
          ...session,
          start_datetime: sessionData.startDate,
          end_datetime: sessionData.endDate,
          lieu: sessionData.lieu,
          ville: sessionData.ville,
          status: sessionData.status,
          color: getSessionColor({...session, ...sessionData})
        };
       
        // Mettre à jour aussi la session sélectionnée
        setSelectedSession(updatedSession);
        return updatedSession;
      }
      return session;
    }));

    setSaving(false);
    alert('Session enregistrée avec succès !');
  };

  // Fonction pour ajouter un participant
  const addParticipantToSession = (sessionId, participant) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        const isAlreadyParticipant = session.participants.some(p => p.matricule === participant.matricule);
        if (!isAlreadyParticipant) {
          const updatedSession = { ...session, participants: [...session.participants, participant] };
          if (selectedSession && selectedSession.id === sessionId) {
            setSelectedSession(updatedSession);
          }
          return updatedSession;
        }
      }
      return session;
    }));
  };

  // Fonction pour supprimer un participant
  const removeParticipantFromSession = (sessionId, participantIndex) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        const newParticipants = session.participants.filter((_, index) => index !== participantIndex);
        const updatedSession = { ...session, participants: newParticipants };
        if (selectedSession && selectedSession.id === sessionId) {
          setSelectedSession(updatedSession);
        }
        return updatedSession;
      }
      return session;
    }));
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10b981';
    if (progress >= 60) return '#f59e0b';
    if (progress >= 40) return '#3b82f6';
    return '#ef4444';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Validé": return '#10b981';
      case "En cours": return '#f59e0b';
      case "Terminé": return '#8b5cf6';
      case "Non démarré": return '#6b7280';
      case null:
      default: return '#9ca3af';
    }
  };

  const getSessionDisplayStatus = (status) => {
    return status === null ? "En attente de validation" : status;
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ArrowLeft size={24} color="#6b7280" style={{ cursor: 'pointer' }} />
            <h1 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#111827',
              margin: 0
            }}>
              Sessions de Formation
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              padding: '6px 12px',
              backgroundColor: '#e5e7eb',
              color: '#6b7280',
              borderRadius: '20px',
              fontSize: '14px'
            }}>
              {sessions.length} Sessions
            </span>
            <span style={{ color: '#6b7280', fontSize: '16px' }}>
              Mars, 2024
            </span>
            <Calendar size={20} color="#6b7280" />
          </div>
        </div>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '24px'
        }}>
          {/* Left Column - Profile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                height: '120px',
                background: profileImage
                  ? `linear-gradient(rgba(102, 126, 234, 0.7), rgba(118, 75, 162, 0.7)), url(${profileImage})`
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '-40px',
                  left: '24px',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '4px solid white',
                  overflow: 'hidden',
                  backgroundColor: '#f3f4f6'
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #fb923c, #ea580c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '600',
                    color: 'white'
                  }}>
                    YR
                  </div>
                </div>

                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)'
                }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer'
                    }}
                  />
                  <Camera size={20} color="white" />
                </div>
              </div>

              <div style={{ padding: '60px 24px 24px' }}>
                <div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#111827',
                    margin: '0 0 4px 0'
                  }}>
                    Yeray Rosales
                  </h2>
                  <p style={{ color: '#6b7280', fontSize: '16px', margin: '0 0 24px 0' }}>
                    UI/UX Designer
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    textAlign: 'center',
                    marginBottom: '24px'
                  }}>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>430</div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>Posts</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>2.32K</div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>Following</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>21.7K</div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>Followers</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    {[Mail, Phone, MessageCircle, Video].map((Icon, index) => (
                      <button key={index} style={{
                        width: '48px',
                        height: '48px',
                        border: 'none',
                        borderRadius: '50%',
                        backgroundColor: index === 0 ? '#111827' : '#f3f4f6',
                        color: index === 0 ? 'white' : '#6b7280',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={16} />
                      </button>
                    ))}
                  </div>

                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}>
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                        Statistiques
                      </h3>
                      <Edit size={16} color="#6b7280" />
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>Sessions actives</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Total</span>
                        <span style={{
                          backgroundColor: '#111827',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}>
                          {sessions.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sessions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '24px 24px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#111827',
                    margin: 0
                  }}>
                    Sessions de Formation
                  </h3>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Settings size={20} color="#6b7280" />
                    <Filter size={20} color="#6b7280" />
                    <Heart size={20} color="#6b7280" />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={16} color="#6b7280" style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }} />
                    <input
                      type="text"
                      placeholder="Rechercher des sessions..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 36px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        backgroundColor: '#f9fafb'
                      }}
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      backgroundColor: '#f9fafb',
                      minWidth: '140px'
                    }}
                  >
                    <option value="all">Tous statuts</option>
                    <option value="valide">Validé</option>
                    <option value="encours">En cours</option>
                    <option value="termine">Terminé</option>
                  </select>
                </div>
              </div>

              <div style={{
                padding: '0 24px 24px',
                maxHeight: '600px',
                overflowY: 'auto'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px'
                }}>
                  {filteredSessions.map((session) => {
                    const sessionColor = getSessionColor(session);
                    const active = isSessionActive(session);
                   
                    return (
                      <div
                        key={session.id}
                        onClick={() => setSelectedSession(session)}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          border: '1px solid',
                          backgroundColor: sessionColor === 'yellow' ? '#fefce8' :
                            sessionColor === 'blue' ? '#eff6ff' :
                              sessionColor === 'pink' ? '#fdf2f8' :
                                sessionColor === 'green' ? '#f0fdf4' : '#f9fafb',
                          borderColor: sessionColor === 'yellow' ? '#fde047' :
                            sessionColor === 'blue' ? '#93c5fd' :
                              sessionColor === 'pink' ? '#f9a8d4' :
                                sessionColor === 'green' ? '#86efac' : '#d1d5db',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          opacity: active ? 1 : 0.8
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {!active && (
                          <div style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#ef4444',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            color: 'white',
                            fontWeight: 'bold'
                          }}>
                            🔒
                          </div>
                        )}

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}>
                          <span style={{ fontSize: '11px', color: '#6b7280' }}>
                            {session.code_formation}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Info size={12} color="#6b7280" />
                            <MoreHorizontal size={12} color="#6b7280" />
                          </div>
                        </div>

                        <h4 style={{
                          fontWeight: '600',
                          color: '#111827',
                          margin: '0 0 6px 0',
                          fontSize: '13px'
                        }}>
                          {session.title}
                        </h4>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}>
                          <span style={{
                            fontSize: '11px',
                            color: getStatusColor(session.status),
                            fontWeight: '500'
                          }}>
                            {getSessionDisplayStatus(session.status)}
                          </span>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '6px',
                            fontSize: '9px',
                            fontWeight: '500',
                            backgroundColor: sessionColor === 'yellow' ? '#fef3c7' :
                              sessionColor === 'blue' ? '#dbeafe' :
                                sessionColor === 'pink' ? '#fce7f3' :
                                  sessionColor === 'green' ? '#dcfce7' : '#f3f4f6',
                            color: sessionColor === 'yellow' ? '#92400e' :
                              sessionColor === 'blue' ? '#1e40af' :
                                sessionColor === 'pink' ? '#be185d' :
                                  sessionColor === 'green' ? '#166534' : '#6b7280'
                          }}>
                            {session.progress}%
                          </span>
                        </div>

                        <div style={{ marginBottom: '8px' }}>
                          <div style={{
                            width: '100%',
                            height: '3px',
                            backgroundColor: '#e5e7eb',
                            borderRadius: '2px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${session.progress}%`,
                              height: '100%',
                              backgroundColor: getProgressColor(session.progress),
                              borderRadius: '2px',
                              transition: 'width 0.3s ease'
                            }} />
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div style={{ display: 'flex' }}>
                            {session.participants.slice(0, 2).map((participant, index) => (
                              <div key={index} style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                border: '2px solid white',
                                marginLeft: index > 0 ? '-4px' : '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '8px',
                                fontWeight: '600',
                                backgroundColor: index === 0 ? '#fb923c' : '#60a5fa',
                                color: 'white',
                                zIndex: session.participants.length - index,
                                title: `${participant.nom} ${participant.prenom}`
                              }}>
                                {getInitials(participant.nom, participant.prenom)}
                              </div>
                            ))}
                            {session.participants.length > 2 && (
                              <div style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                border: '2px solid white',
                                marginLeft: '-4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '8px',
                                backgroundColor: '#e5e7eb',
                                color: '#6b7280'
                              }}>
                                +{session.participants.length - 2}
                              </div>
                            )}
                          </div>
                          <span style={{ fontSize: '9px', color: '#6b7280', fontWeight: '500' }}>
                            {session.daysLeft}j
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredSessions.length === 0 && (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#6b7280'
                  }}>
                    <Search size={48} color="#d1d5db" style={{ marginBottom: '16px' }} />
                    <p style={{ margin: 0, fontSize: '16px' }}>Aucune session trouvée</p>
                    <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                      Essayez de modifier vos critères de recherche
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Session Details Modal */}
        {selectedSession && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }} onClick={() => setSelectedSession(null)}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }} onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div style={{
                padding: '24px 24px 16px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: getSessionColor(selectedSession) === 'yellow' ? '#fefce8' :
                      getSessionColor(selectedSession) === 'blue' ? '#eff6ff' :
                        getSessionColor(selectedSession) === 'pink' ? '#fdf2f8' :
                          getSessionColor(selectedSession) === 'green' ? '#f0fdf4' : '#f9fafb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    📚
                  </div>
                  <div>
                    <h2 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#111827',
                      margin: '0 0 4px 0'
                    }}>
                      {selectedSession.title}
                    </h2>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {selectedSession.code_session}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSession(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '8px',
                    color: '#6b7280',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div style={{
                padding: '24px',
                overflowY: 'auto',
                maxHeight: 'calc(90vh - 200px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                {/* Session Description */}
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#111827',
                    margin: '0 0 12px 0'
                  }}>
                    Description
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {selectedSession.description}
                  </p>
                </div>

                {/* Session Details Form */}
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#111827',
                    margin: '0 0 16px 0'
                  }}>
                    Détails de la session
                  </h3>
                 
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                    marginBottom: '16px'
                  }}>
                    {/* Date de début */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        color: '#6b7280',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        fontWeight: '500'
                      }}>
                        <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        Date de début
                      </label>
                      <input
                        type="datetime-local"
                        value={sessionData.startDate}
                        onChange={(e) => setSessionData(prev => ({ ...prev, startDate: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          backgroundColor: '#fff'
                        }}
                      />
                    </div>

                    {/* Date de fin */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        color: '#6b7280',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        fontWeight: '500'
                      }}>
                        <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        Date de fin
                      </label>
                      <input
                        type="datetime-local"
                        value={sessionData.endDate}
                        onChange={(e) => setSessionData(prev => ({ ...prev, endDate: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          backgroundColor: '#fff'
                        }}
                      />
                    </div>

                    {/* Lieu */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        color: '#6b7280',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        fontWeight: '500'
                      }}>
                        <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        Lieu
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Salle de conférence A"
                        value={sessionData.lieu}
                        onChange={(e) => setSessionData(prev => ({ ...prev, lieu: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          backgroundColor: '#fff'
                        }}
                      />
                    </div>

                    {/* Ville */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        color: '#6b7280',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        fontWeight: '500'
                      }}>
                        <Building size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        Ville
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Abidjan"
                        value={sessionData.ville}
                        onChange={(e) => setSessionData(prev => ({ ...prev, ville: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          backgroundColor: '#fff'
                        }}
                      />
                    </div>
                  </div>

                  {/* Statut - Affiché uniquement si des participants sont ajoutés et dates renseignées */}
                  {selectedSession.participants.length > 0 && sessionData.startDate && sessionData.endDate && (
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        color: '#6b7280',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        fontWeight: '500'
                      }}>
                        <CheckCircle size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        Statut de la session
                      </label>
                      <select
                        value={sessionData.status}
                        onChange={(e) => setSessionData(prev => ({ ...prev, status: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          backgroundColor: '#fff'
                        }}
                      >
                        <option value="">Sélectionner un statut</option>
                        {options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Participants Section */}
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#111827',
                      margin: 0
                    }}>
                      Participants ({selectedSession.participants.length})
                    </h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={loadParticipants}
                        disabled={loadingParticipants}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: loadingParticipants ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          opacity: loadingParticipants ? 0.7 : 1
                        }}
                      >
                        {loadingParticipants ? (
                          <>
                            <div style={{
                              width: '12px',
                              height: '12px',
                              border: '2px solid transparent',
                              borderTop: '2px solid white',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite'
                            }}></div>
                            Chargement...
                          </>
                        ) : (
                          <>
                            <Upload size={14} />
                            Charger participants
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setShowAddMember(!showAddMember)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Plus size={14} />
                        Ajouter
                      </button>
                    </div>
                  </div>

                  {/* Add Participant Form */}
                  {showAddMember && (
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '8px',
                      marginBottom: '16px',
                      border: '1px solid #bae6fd'
                    }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827',
                        margin: '0 0 12px 0'
                      }}>
                        Ajouter un participant
                      </h4>
                     
                      {/* Barre de recherche pour participants */}
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ position: 'relative' }}>
                          <Search size={16} color="#6b7280" style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)'
                          }} />
                          <input
                            type="text"
                            placeholder="Rechercher par nom, prénom, email ou matricule..."
                            value={participantSearch}
                            onChange={(e) => setParticipantSearch(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '8px 12px 8px 36px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '12px',
                              backgroundColor: 'white'
                            }}
                          />
                        </div>
                      </div>

                      {/* Liste des participants disponibles */}
                      <div style={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        backgroundColor: 'white'
                      }}>
                        {filteredParticipants.slice(0, showAllParticipants ? filteredParticipants.length : 10).map((participant, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              addParticipantToSession(selectedSession.id, participant);
                              setParticipantSearch('');
                            }}
                            style={{
                              padding: '8px 12px',
                              borderBottom: index < filteredParticipants.length - 1 ? '1px solid #f3f4f6' : 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#f9fafb';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'white';
                            }}
                          >
                            <div style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              backgroundColor: '#3b82f6',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '10px',
                              fontWeight: '600'
                            }}>
                              {getInitials(participant.nom, participant.prenom)}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '12px', fontWeight: '500', color: '#111827' }}>
                                {participant.nom} {participant.prenom}
                              </div>
                              <div style={{ fontSize: '10px', color: '#6b7280' }}>
                                {participant.email} • {participant.fonction}
                              </div>
                            </div>
                          </div>
                        ))}
                       
                        {filteredParticipants.length > 10 && !showAllParticipants && (
                          <div
                            onClick={() => setShowAllParticipants(true)}
                            style={{
                              padding: '8px 12px',
                              textAlign: 'center',
                              cursor: 'pointer',
                              backgroundColor: '#f9fafb',
                              fontSize: '12px',
                              color: '#3b82f6',
                              fontWeight: '500'
                            }}
                          >
                            <ChevronDown size={14} style={{ display: 'inline', marginRight: '4px' }} />
                            Voir {filteredParticipants.length - 10} participants de plus
                          </div>
                        )}
                       
                        {showAllParticipants && filteredParticipants.length > 10 && (
                          <div
                            onClick={() => setShowAllParticipants(false)}
                            style={{
                              padding: '8px 12px',
                              textAlign: 'center',
                              cursor: 'pointer',
                              backgroundColor: '#f9fafb',
                              fontSize: '12px',
                              color: '#3b82f6',
                              fontWeight: '500'
                            }}
                          >
                            <ChevronUp size={14} style={{ display: 'inline', marginRight: '4px' }} />
                            Réduire la liste
                          </div>
                        )}
                       
                        {filteredParticipants.length === 0 && (
                          <div style={{
                            padding: '20px',
                            textAlign: 'center',
                            color: '#6b7280',
                            fontSize: '12px'
                          }}>
                            Aucun participant trouvé
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                        <button
                          onClick={() => {
                            setShowAddMember(false);
                            setParticipantSearch('');
                            setShowAllParticipants(false);
                          }}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#f3f4f6',
                            color: '#6b7280',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          Fermer
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Participants List */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    maxHeight: '300px',
                    overflowY: 'auto'
                  }}>
                    {selectedSession.participants.map((participant, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: index % 4 === 0 ? '#fb923c' :
                            index % 4 === 1 ? '#60a5fa' :
                              index % 4 === 2 ? '#34d399' : '#f59e0b',
                          color: 'white'
                        }}>
                          {getInitials(participant.nom, participant.prenom)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#111827',
                            margin: '0 0 2px 0'
                          }}>
                            {participant.nom} {participant.prenom}
                          </p>
                          <p style={{
                            fontSize: '11px',
                            color: '#6b7280',
                            margin: '0 0 1px 0'
                          }}>
                            {participant.email}
                          </p>
                          <p style={{
                            fontSize: '10px',
                            color: '#9ca3af',
                            margin: 0
                          }}>
                            Matricule: {participant.matricule}
                          </p>
                        </div>
                        <button
                          onClick={() => removeParticipantFromSession(selectedSession.id, index)}
                          style={{
                            padding: '6px',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            border: '1px solid #fecaca',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Supprimer ce participant"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {selectedSession.participants.length === 0 && (
                    <div style={{
                      textAlign: 'center',
                      padding: '32px 16px',
                      color: '#6b7280'
                    }}>
                      <Users size={32} color="#d1d5db" style={{ marginBottom: '12px' }} />
                      <p style={{ margin: 0, fontSize: '14px' }}>Aucun participant assigné</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                        Cliquez sur "Ajouter" pour assigner des participants à cette session
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '16px',
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={() => setSelectedSession(null)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={saveSession}
                    disabled={saving}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: saving ? '#9ca3af' : '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: saving ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {saving ? (
                      <>
                        <div style={{
                          width: '14px',
                          height: '14px',
                          border: '2px solid transparent',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        Enregistrer
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
       
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
       
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
       
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProfileDashboard;