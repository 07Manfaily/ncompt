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
  Trash2,Camera
} from 'lucide-react';

const ProfileDashboard = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddMember, setShowAddMember] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
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
  // Simulation des données API basées sur vos images
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
      daysLeft: 15
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
      daysLeft: 8
    },
    {
      id: 49,
      city: null,
      code_formation: "P25029",
      code_session: "P2502953",
      duration_hours: null,
      end_datetime: null,
      participants: [
        {
          email: "innovation@live.fr",
          matricule: "789",
          nom: "SMITH",
          prenom: "JOHN"
        }
      ],
      place: null,
      start_datetime: null,
      status: "session validé",
      teacher: null,
      type: null,
      title: "Innovation Workshop",
      description: "Atelier sur les méthodes d'innovation en entreprise",
      progress: 100,
      color: "green",
      daysLeft: 0
    }
  ];

  const mockParticipantsData = [
    {
      activite: "",
      departement: "",
      direction: "Innovation",
      email: "innovation@live.fr",
      entite: "",
      fonction: "Data Analyst",
      matricule: "789",
      nom: "MIAN",
      nom_manager: "MANAGER1",
      prenom: "PAULELIE",
      service: "Data"
    },
    {
      activite: "",
      departement: "",
      direction: "DCPP",
      email: "dcpp@live.fr",
      entite: "",
      fonction: "Gestionnaire",
      matricule: "101112",
      nom: "YAO",
      nom_manager: "DJENEBA",
      prenom: "LUCIEN",
      service: ""
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
      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSessions(mockSessionsData);
      setParticipants(mockParticipantsData);
      setLoading(false);
    };

    loadData();
  }, []);

  // Fonction pour filtrer les sessions
  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      session.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      session.code_formation.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus = statusFilter === 'all' ||
      session.status.toLowerCase().replace(' ', '').includes(statusFilter.toLowerCase().replace(' ', ''));

    return matchesSearch && matchesStatus;
  });

  // Fonction pour mettre à jour le statut d'une session
  const updateSessionStatus = (sessionId, newStatus) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        let newProgress = session.progress;
        let newColor = session.color;

        switch (newStatus) {
          case "session validé":
            newProgress = 100;
            newColor = "green";
            break;
          case "en cours":
            newProgress = Math.max(session.progress, 50);
            newColor = "yellow";
            break;
          case "terminé":
            newProgress = 100;
            newColor = "pink";
            break;
          case "non démarré":
            newProgress = 0;
            newColor = "blue";
            break;
          default:
            // Si statut null ou autre, garde l'apparence par défaut
            newProgress = 0;
            newColor = "gray";
            break;
        }

        return { ...session, status: newStatus, progress: newProgress, color: newColor };
      }
      return session;
    }));

    // Mettre à jour la session sélectionnée aussi
    if (selectedSession && selectedSession.id === sessionId) {
      let newProgress = selectedSession.progress;
      let newColor = selectedSession.color;

      switch (newStatus) {
        case "session validé":
          newProgress = 100;
          newColor = "green";
          break;
        case "en cours":
          newProgress = Math.max(selectedSession.progress, 50);
          newColor = "yellow";
          break;
        case "terminé":
          newProgress = 100;
          newColor = "pink";
          break;
        case "non démarré":
          newProgress = 0;
          newColor = "blue";
          break;
        default:
          newProgress = 0;
          newColor = "gray";
          break;
      }

      setSelectedSession({ ...selectedSession, status: newStatus, progress: newProgress, color: newColor });
    }
  };

  // Fonction pour ajouter un participant à une session
  const addParticipantToSession = (sessionId, participant) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        const isAlreadyParticipant = session.participants.some(p => p.matricule === participant.matricule);
        if (!isAlreadyParticipant) {
          return { ...session, participants: [...session.participants, participant] };
        }
      }
      return session;
    }));

    if (selectedSession && selectedSession.id === sessionId) {
      const updatedSession = sessions.find(s => s.id === sessionId);
      if (updatedSession) {
        const isAlreadyParticipant = updatedSession.participants.some(p => p.matricule === participant.matricule);
        if (!isAlreadyParticipant) {
          setSelectedSession({ ...updatedSession, participants: [...updatedSession.participants, participant] });
        }
      }
    }
  };

  // Fonction pour supprimer un participant d'une session
  const removeParticipantFromSession = (sessionId, participantIndex) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        const newParticipants = session.participants.filter((_, index) => index !== participantIndex);
        return { ...session, participants: newParticipants };
      }
      return session;
    }));

    if (selectedSession && selectedSession.id === sessionId) {
      const newParticipants = selectedSession.participants.filter((_, index) => index !== participantIndex);
      setSelectedSession({ ...selectedSession, participants: newParticipants });
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10b981';
    if (progress >= 60) return '#f59e0b';
    if (progress >= 40) return '#3b82f6';
    return '#ef4444';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "session validé": return '#10b981';
      case "en cours": return '#f59e0b';
      case "terminé": return '#8b5cf6';
      case "non démarré": return '#6b7280';
      case null:
      default: return '#9ca3af';
    }
  };

  const isSessionActive = (session) => {
    return session.status === "session validé";
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
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
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

        {/* Main Grid - 2 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '24px'
        }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Profile Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Cover Image */}
              <div style={{
                height: '120px',
                background: profileImage
                  ? `linear-gradient(rgba(102, 126, 234, 0.7), rgba(118, 75, 162, 0.7)), url(${profileImage})`
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                {/* Profile Image Container */}
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

                {/* Camera Button */}
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
                {/* Profile Info */}
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

                  {/* Stats */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    textAlign: 'center',
                    marginBottom: '24px'
                  }}>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>
                        430
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        Posts
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>
                        2.32K
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        Following
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>
                        21.7K
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        Followers
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <button style={{
                      width: '48px',
                      height: '48px',
                      border: 'none',
                      borderRadius: '50%',
                      backgroundColor: '#111827',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}>
                      <Mail size={16} />
                    </button>
                    <button style={{
                      width: '48px',
                      height: '48px',
                      border: 'none',
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}>
                      <Phone size={16} />
                    </button>
                    <button style={{
                      width: '48px',
                      height: '48px',
                      border: 'none',
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}>
                      <MessageCircle size={16} />
                    </button>
                    <button style={{
                      width: '48px',
                      height: '48px',
                      border: 'none',
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}>
                      <Video size={16} />
                    </button>
                  </div>

                  {/* Sessions Statistics */}
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

            {/* Formulaire Chaud */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '24px 24px 16px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  🔥 Demande Urgente
                </h3>
              </div>
              <div style={{ padding: '0 24px 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '6px'
                    }}>
                      Urgence
                    </label>
                    <select style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ef4444',
                      borderRadius: '8px',
                      fontSize: '14px',
                      backgroundColor: '#fef2f2',
                      color: '#dc2626',
                      fontWeight: '500'
                    }}>
                      <option>Critique - Session bloquée</option>
                      <option>Urgent - Problème technique</option>
                      <option>Important - Modification requise</option>
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '6px'
                    }}>
                      Description Rapide
                    </label>
                    <textarea
                      placeholder="Décrivez le problème urgent..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #ef4444',
                        borderRadius: '8px',
                        fontSize: '14px',
                        backgroundColor: '#fef2f2',
                        resize: 'vertical',
                        minHeight: '80px'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                      flex: 1,
                      padding: '12px 20px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                      <AlertCircle size={16} />
                      Envoyer Urgent
                    </button>
                    <button style={{
                      padding: '12px',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}>
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire Froid */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '24px 24px 16px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  ❄️ Demande Standard
                </h3>
              </div>
              <div style={{ padding: '0 24px 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '6px'
                    }}>
                      Type de demande
                    </label>
                    <select style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #3b82f6',
                      borderRadius: '8px',
                      fontSize: '14px',
                      backgroundColor: '#eff6ff',
                      color: '#1d4ed8'
                    }}>
                      <option>Nouvelle session</option>
                      <option>Modification planning</option>
                      <option>Ajout participants</option>
                      <option>Support technique</option>
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '6px'
                    }}>
                      Description Détaillée
                    </label>
                    <textarea
                      placeholder="Décrivez votre demande en détail..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #3b82f6',
                        borderRadius: '8px',
                        fontSize: '14px',
                        backgroundColor: '#eff6ff',
                        resize: 'vertical',
                        minHeight: '100px'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                      flex: 1,
                      padding: '12px 20px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                      <CheckCircle size={16} />
                      Envoyer
                    </button>
                    <button style={{
                      padding: '12px 20px',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}>
                      Brouillon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Sessions de Formation */}
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

                {/* Barre de recherche et filtres */}
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
                    <option value="sessionvalide">Session validé</option>
                    <option value="encours">En cours</option>
                    <option value="termine">Terminé</option>
                    <option value="nondémarre">Non démarré</option>
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
                  {filteredSessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => setSelectedSession(session)}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid',
                        backgroundColor: session.color === 'yellow' ? '#fefce8' :
                          session.color === 'blue' ? '#eff6ff' :
                            session.color === 'pink' ? '#fdf2f8' :
                              session.color === 'green' ? '#f0fdf4' :
                                session.color === 'gray' ? '#f9fafb' : '#faf5ff',
                        borderColor: session.color === 'yellow' ? '#fde047' :
                          session.color === 'blue' ? '#93c5fd' :
                            session.color === 'pink' ? '#f9a8d4' :
                              session.color === 'green' ? '#86efac' :
                                session.color === 'gray' ? '#d1d5db' : '#c084fc',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        opacity: isSessionActive(session) ? 1 : 0.8
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
                      {!isSessionActive(session) && (
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
                          backgroundColor: session.color === 'yellow' ? '#fef3c7' :
                            session.color === 'blue' ? '#dbeafe' :
                              session.color === 'pink' ? '#fce7f3' :
                                session.color === 'green' ? '#dcfce7' :
                                  session.color === 'gray' ? '#f3f4f6' : '#f3e8ff',
                          color: session.color === 'yellow' ? '#92400e' :
                            session.color === 'blue' ? '#1e40af' :
                              session.color === 'pink' ? '#be185d' :
                                session.color === 'green' ? '#166534' :
                                  session.color === 'gray' ? '#6b7280' : '#7c3aed'
                        }}>
                          {session.progress}%
                        </span>
                      </div>

                      {/* Progress Bar */}
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
                  ))}
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
              maxWidth: '700px',
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
                    backgroundColor: selectedSession.color === 'yellow' ? '#fefce8' :
                      selectedSession.color === 'blue' ? '#eff6ff' :
                        selectedSession.color === 'pink' ? '#fdf2f8' :
                          selectedSession.color === 'green' ? '#f0fdf4' : '#faf5ff',
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
              <div style={{ padding: '24px', overflowY: 'auto', maxHeight: 'calc(90vh - 120px)' }}>
                {/* Session Description */}
                <div style={{ marginBottom: '24px' }}>
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

                {/* Session Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px'
                  }}>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      fontWeight: '500'
                    }}>
                      Status
                    </p>
                    <input
                      type="text"
                      value={selectedSession.status || ''}
                      onChange={(e) => updateSessionStatus(selectedSession.id, e.target.value)}
                      style={{
                        width: '100%',
                        fontSize: '14px',
                        color: getStatusColor(selectedSession.status),
                        fontWeight: '600',
                        border: 'none',
                        backgroundColor: 'transparent',
                        padding: '4px 0',
                        outline: 'none'
                      }}
                      placeholder="Tapez: session validé, en cours, terminé, non démarré"
                    />
                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
                      <strong>Options disponibles:</strong><br />
                      • session validé (pour activer la session)<br />
                      • en cours, terminé, non démarré
                    </div>
                  </div>

                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px'
                  }}>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      fontWeight: '500'
                    }}>
                      Code Formation
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#111827',
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {selectedSession.code_formation}
                    </p>
                  </div>

                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px'
                  }}>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      fontWeight: '500'
                    }}>
                      Progression
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#111827',
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {selectedSession.progress}%
                    </p>
                  </div>
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
                        gap: '6px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#2563eb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#3b82f6';
                      }}
                    >
                      <Plus size={14} />
                      Ajouter
                    </button>
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
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {participants.filter(participant =>
                          !selectedSession.participants.some(p => p.matricule === participant.matricule)
                        ).map((participant, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              addParticipantToSession(selectedSession.id, participant);
                              setShowAddMember(false);
                            }}
                            style={{
                              padding: '8px 12px',
                              backgroundColor: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#f3f4f6';
                              e.currentTarget.style.borderColor = '#9ca3af';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'white';
                              e.currentTarget.style.borderColor = '#d1d5db';
                            }}
                          >
                            <div style={{
                              width: '20px',
                              height: '20px',
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
                            {participant.nom} {participant.prenom}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setShowAddMember(false)}
                        style={{
                          marginTop: '12px',
                          padding: '6px 12px',
                          backgroundColor: '#f3f4f6',
                          color: '#6b7280',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Annuler
                      </button>
                    </div>
                  )}

                  {/* Participants List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px',
                          fontWeight: '600',
                          backgroundColor: index === 0 ? '#fb923c' :
                            index === 1 ? '#60a5fa' :
                              index === 2 ? '#34d399' : '#f59e0b',
                          color: 'white'
                        }}>
                          {getInitials(participant.nom, participant.prenom)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#111827',
                            margin: '0 0 4px 0'
                          }}>
                            {participant.nom} {participant.prenom}
                          </p>
                          <p style={{
                            fontSize: '12px',
                            color: '#6b7280',
                            margin: '0 0 2px 0'
                          }}>
                            {participant.email}
                          </p>
                          <p style={{
                            fontSize: '11px',
                            color: '#9ca3af',
                            margin: 0
                          }}>
                            Matricule: {participant.matricule}
                          </p>
                        </div>
                        <button
                          onClick={() => removeParticipantFromSession(selectedSession.id, index)}
                          style={{
                            padding: '8px',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            border: '1px solid #fecaca',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#fee2e2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#fef2f2';
                          }}
                          title="Supprimer ce participant"
                        >
                          <Trash2 size={14} />
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