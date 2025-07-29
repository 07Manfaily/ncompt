import React, { useState } from 'react';
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
  ChevronLeft,
  ChevronRight,
  User,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  X,
  Info,
  Search,
  Plus,
  Trash2
} from 'lucide-react';

const ProfileDashboard = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(2);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const previousMonth = () => {
    setCurrentMonthIndex((prev) => (prev - 1 + 12) % 12);
  };

  const nextMonth = () => {
    setCurrentMonthIndex((prev) => (prev + 1) % 12);
  };

  const handleDayClick = (day) => {
    if (day) {
      setSelectedDay(day);
    }
  };

  // Avatars et noms prédéfinis pour les membres
  const memberPool = [
    { avatar: '👨‍💻', name: 'John Doe' },
    { avatar: '👩‍💼', name: 'Sarah Smith' },
    { avatar: '👨‍🎨', name: 'Mike Johnson' },
    { avatar: '👩‍🔬', name: 'Lisa Chen' },
    { avatar: '👨‍⚖️', name: 'David Brown' },
    { avatar: '👩‍🎓', name: 'Emma Wilson' },
    { avatar: '👨‍🏫', name: 'Alex Garcia' },
    { avatar: '👩‍⚕️', name: 'Maria Rodriguez' }
  ];

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Web Designing",
      date: "March 05, 2024",
      phase: "Prototyping",
      progress: 90,
      color: "yellow",
      daysLeft: 2,
      team: [
        { avatar: '👨‍💻', name: 'John Doe' },
        { avatar: '👩‍💼', name: 'Sarah Smith' },
        { avatar: '👨‍🎨', name: 'Mike Johnson' }
      ],
      description: "Création d'une interface web moderne avec React et Material-UI",
      budget: "$15,000",
      priority: "High",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Mobile App",
      date: "March 08, 2024",
      phase: "Design",
      progress: 50,
      color: "blue",
      daysLeft: 5,
      team: [
        { avatar: '👩‍🔬', name: 'Lisa Chen' },
        { avatar: '👨‍⚖️', name: 'David Brown' }
      ],
      description: "Développement d'une application mobile native pour iOS et Android",
      budget: "$25,000",
      priority: "Medium",
      status: "Planning"
    },
    {
      id: 3,
      title: "Dashboard",
      date: "March 12, 2024",
      phase: "Wireframe",
      progress: 70,
      color: "pink",
      daysLeft: 8,
      team: [
        { avatar: '👩‍🎓', name: 'Emma Wilson' },
        { avatar: '👨‍🏫', name: 'Alex Garcia' },
        { avatar: '👩‍⚕️', name: 'Maria Rodriguez' }
      ],
      description: "Conception d'un tableau de bord analytique pour la gestion des données",
      budget: "$20,000",
      priority: "High",
      status: "In Progress"
    },
    {
      id: 4,
      title: "E-commerce Platform",
      date: "March 15, 2024",
      phase: "Development",
      progress: 30,
      color: "green",
      daysLeft: 12,
      team: [
        { avatar: '👨‍💻', name: 'John Doe' },
        { avatar: '👩‍💼', name: 'Sarah Smith' }
      ],
      description: "Plateforme e-commerce complète avec système de paiement intégré",
      budget: "$35,000",
      priority: "High",
      status: "Development"
    },
    {
      id: 5,
      title: "API Integration",
      date: "March 18, 2024",
      phase: "Testing",
      progress: 85,
      color: "purple",
      daysLeft: 3,
      team: [
        { avatar: '👩‍🔬', name: 'Lisa Chen' }
      ],
      description: "Intégration d'APIs tierces pour synchronisation des données",
      budget: "$12,000",
      priority: "Medium",
      status: "Testing"
    },
    {
      id: 6,
      title: "CRM System",
      date: "March 20, 2024",
      phase: "Planning",
      progress: 15,
      color: "blue",
      daysLeft: 20,
      team: [
        { avatar: '👨‍🎨', name: 'Mike Johnson' },
        { avatar: '👩‍🎓', name: 'Emma Wilson' }
      ],
      description: "Système de gestion de la relation client complet",
      budget: "$40,000",
      priority: "Medium",
      status: "Planning"
    },
    {
      id: 7,
      title: "Marketing Site",
      date: "March 22, 2024",
      phase: "Design",
      progress: 25,
      color: "yellow",
      daysLeft: 15,
      team: [
        { avatar: '👨‍🏫', name: 'Alex Garcia' }
      ],
      description: "Site web marketing pour promouvoir nos services",
      budget: "$8,000",
      priority: "Low",
      status: "Design"
    },
    {
      id: 8,
      title: "Analytics Tool",
      date: "March 25, 2024",
      phase: "Research",
      progress: 5,
      color: "green",
      daysLeft: 30,
      team: [
        { avatar: '👩‍⚕️', name: 'Maria Rodriguez' },
        { avatar: '👨‍💻', name: 'John Doe' }
      ],
      description: "Outil d'analyse avancée pour les données métier",
      budget: "$22,000",
      priority: "Medium",
      status: "Research"
    }
  ]);

  // Fonction pour filtrer les projets
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
                         project.phase.toLowerCase().includes(searchFilter.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         project.status.toLowerCase().replace(' ', '').includes(statusFilter.toLowerCase());
    
    return matchesSearch && matchesStatus;
  });

  // Fonction pour ajouter un membre à un projet
  const addMemberToProject = (projectId, member) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const isAlreadyMember = project.team.some(teamMember => teamMember.name === member.name);
        if (!isAlreadyMember) {
          return { ...project, team: [...project.team, member] };
        }
      }
      return project;
    }));
    
    // Mettre à jour le projet sélectionné aussi
    if (selectedProject && selectedProject.id === projectId) {
      const updatedProject = projects.find(p => p.id === projectId);
      if (updatedProject) {
        const isAlreadyMember = updatedProject.team.some(teamMember => teamMember.name === member.name);
        if (!isAlreadyMember) {
          setSelectedProject({ ...updatedProject, team: [...updatedProject.team, member] });
        }
      }
    }
  };

  // Fonction pour supprimer un membre d'un projet
  const removeMemberFromProject = (projectId, memberIndex) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const newTeam = project.team.filter((_, index) => index !== memberIndex);
        return { ...project, team: newTeam };
      }
      return project;
    }));
    
    // Mettre à jour le projet sélectionné aussi
    if (selectedProject && selectedProject.id === projectId) {
      const newTeam = selectedProject.team.filter((_, index) => index !== memberIndex);
      setSelectedProject({ ...selectedProject, team: newTeam });
    }
  };

  const messages = [
    {
      id: 1,
      name: "Web Designing",
      avatar: "👩",
      avatarColor: "blue",
      message: "Hey let me know progress of project? Waiting for your response",
      isDark: false
    },
    {
      id: 2,
      name: "Stephanie",
      avatar: "👨",
      avatarColor: "yellow",
      message: "I got your first assignment. It was quite good 👍",
      isDark: true
    },
    {
      id: 3,
      name: "William",
      avatar: "👨",
      avatarColor: "green",
      message: "I want some changes in previous work you receive. Waiting for your reply.",
      isDark: false
    }
  ];

  const calendarDays = [
    null, null, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28
  ];

  const getDayHighlight = (day) => {
    if (day === 5) return 'highlight-red';
    if (day === 7 || day === 25) return 'highlight-dark';
    if (day === 12) return 'highlight-blue';
    if (day === 20) return 'highlight-green';
    if (day === 23) return 'highlight-yellow';
    if (day === 27) return 'highlight-purple';
    return '';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10b981';
    if (progress >= 60) return '#f59e0b';
    if (progress >= 40) return '#3b82f6';
    return '#ef4444';
  };

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
              My Profile
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
              Pending
            </span>
            <span style={{ color: '#6b7280', fontSize: '16px' }}>
              March, 2024
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
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '24px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  marginBottom: '24px' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #fb923c, #ea580c)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px'
                    }}>
                      👨‍💼
                    </div>
                    <div>
                      <h2 style={{ 
                        fontSize: '20px', 
                        fontWeight: '600', 
                        color: '#111827', 
                        margin: '0 0 4px 0' 
                      }}>
                        Robert Smith
                      </h2>
                      <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
                        Product Designer
                      </p>
                    </div>
                  </div>
                  <MoreHorizontal size={20} color="#6b7280" style={{ cursor: 'pointer' }} />
                </div>

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

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '12px' 
                  }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                      Time Slots
                    </h3>
                    <Edit size={16} color="#6b7280" />
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <span>April, 2024</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Meetings</span>
                      <span style={{
                        backgroundColor: '#111827',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        3
                      </span>
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
                  🔥 Formulaire Chaud
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
                      <option>Critique - Immédiat</option>
                      <option>Urgent - Sous 1h</option>
                      <option>Important - Sous 4h</option>
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
                      placeholder="Décrivez l'urgence..."
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
                  ❄️ Formulaire Froid
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
                      Priorité
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
                      <option>Basse - Quand possible</option>
                      <option>Normale - Cette semaine</option>
                      <option>Élevée - Dans 2-3 jours</option>
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
                      Catégorie
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
                      <option>Amélioration</option>
                      <option>Nouvelle fonctionnalité</option>
                      <option>Documentation</option>
                      <option>Formation</option>
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

                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#374151', 
                      marginBottom: '6px' 
                    }}>
                      Date limite souhaitée
                    </label>
                    <input 
                      type="date"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #3b82f6',
                        borderRadius: '8px',
                        fontSize: '14px',
                        backgroundColor: '#eff6ff',
                        color: '#1d4ed8'
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
                      Planifier
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
            {/* Ongoing Projects */}
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
                    Ongoing Projects
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
                      placeholder="Rechercher des projets..."
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
                      minWidth: '120px'
                    }}
                  >
                    <option value="all">Tous statuts</option>
                    <option value="inprogress">En cours</option>
                    <option value="planning">Planification</option>
                    <option value="development">Développement</option>
                    <option value="testing">Test</option>
                    <option value="design">Design</option>
                    <option value="research">Recherche</option>
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
                  {filteredProjects.map((project) => (
                    <div 
                      key={project.id} 
                      onClick={() => setSelectedProject(project)}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid',
                        backgroundColor: project.color === 'yellow' ? '#fefce8' : 
                                       project.color === 'blue' ? '#eff6ff' : 
                                       project.color === 'pink' ? '#fdf2f8' :
                                       project.color === 'green' ? '#f0fdf4' : '#faf5ff',
                        borderColor: project.color === 'yellow' ? '#fde047' : 
                                    project.color === 'blue' ? '#93c5fd' : 
                                    project.color === 'pink' ? '#f9a8d4' :
                                    project.color === 'green' ? '#86efac' : '#c084fc',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative'
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
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginBottom: '8px' 
                      }}>
                        <span style={{ fontSize: '11px', color: '#6b7280' }}>
                          {project.date}
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
                        {project.title}
                      </h4>
                      
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginBottom: '8px' 
                      }}>
                        <span style={{ fontSize: '11px', color: '#6b7280' }}>
                          {project.phase}
                        </span>
                        <span style={{
                          padding: '2px 6px',
                          borderRadius: '6px',
                          fontSize: '9px',
                          fontWeight: '500',
                          backgroundColor: project.color === 'yellow' ? '#fef3c7' : 
                                         project.color === 'blue' ? '#dbeafe' : 
                                         project.color === 'pink' ? '#fce7f3' :
                                         project.color === 'green' ? '#dcfce7' : '#f3e8ff',
                          color: project.color === 'yellow' ? '#92400e' : 
                                 project.color === 'blue' ? '#1e40af' : 
                                 project.color === 'pink' ? '#be185d' :
                                 project.color === 'green' ? '#166534' : '#7c3aed'
                        }}>
                          {project.progress}%
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
                            width: `${project.progress}%`,
                            height: '100%',
                            backgroundColor: getProgressColor(project.progress),
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
                          {project.team.slice(0, 2).map((member, index) => (
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
                              backgroundColor: index === 0 ? '#fb923c' : '#60a5fa',
                              zIndex: project.team.length - index,
                              title: member.name
                            }}>
                              {member.avatar}
                            </div>
                          ))}
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
                            +
                          </div>
                        </div>
                        <span style={{ fontSize: '9px', color: '#6b7280', fontWeight: '500' }}>
                          {project.daysLeft}d
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredProjects.length === 0 && (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#6b7280'
                  }}>
                    <Search size={48} color="#d1d5db" style={{ marginBottom: '16px' }} />
                    <p style={{ margin: 0, fontSize: '16px' }}>Aucun projet trouvé</p>
                    <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                      Essayez de modifier vos critères de recherche
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
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
          }} onClick={() => setSelectedProject(null)}>
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
                    backgroundColor: selectedProject.color === 'yellow' ? '#fefce8' : 
                                   selectedProject.color === 'blue' ? '#eff6ff' : 
                                   selectedProject.color === 'pink' ? '#fdf2f8' :
                                   selectedProject.color === 'green' ? '#f0fdf4' : '#faf5ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    📋
                  </div>
                  <div>
                    <h2 style={{ 
                      fontSize: '20px', 
                      fontWeight: '600', 
                      color: '#111827',
                      margin: '0 0 4px 0'
                    }}>
                      {selectedProject.title}
                    </h2>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {selectedProject.date}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
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
                {/* Project Description */}
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
                    {selectedProject.description}
                  </p>
                </div>

                {/* Project Details Grid */}
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
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#111827', 
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {selectedProject.status}
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
                      Priority
                    </p>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#111827', 
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {selectedProject.priority}
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
                      Budget
                    </p>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#111827', 
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {selectedProject.budget}
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
                      Phase
                    </p>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#111827', 
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {selectedProject.phase}
                    </p>
                  </div>
                </div>

                {/* Progress Section */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      color: '#111827',
                      margin: 0
                    }}>
                      Progress
                    </h3>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: getProgressColor(selectedProject.progress)
                    }}>
                      {selectedProject.progress}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${selectedProject.progress}%`,
                      height: '100%',
                      backgroundColor: getProgressColor(selectedProject.progress),
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                {/* Team Section */}
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
                      Team Members ({selectedProject.team.length})
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

                  {/* Add Member Form */}
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
                        Ajouter un membre
                      </h4>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {memberPool.filter(member => 
                          !selectedProject.team.some(teamMember => teamMember.name === member.name)
                        ).map((member, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              addMemberToProject(selectedProject.id, member);
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
                            <span style={{ fontSize: '16px' }}>{member.avatar}</span>
                            {member.name}
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

                  {/* Team Members List */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {selectedProject.team.map((member, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
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
                          fontSize: '16px',
                          backgroundColor: index === 0 ? '#fb923c' : 
                                         index === 1 ? '#60a5fa' : 
                                         index === 2 ? '#34d399' : '#f59e0b'
                        }}>
                          {member.avatar}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{
                            fontSize: '13px',
                            fontWeight: '500',
                            color: '#111827',
                            margin: 0
                          }}>
                            {member.name}
                          </p>
                          <p style={{
                            fontSize: '11px',
                            color: '#6b7280',
                            margin: 0
                          }}>
                            Membre #{index + 1}
                          </p>
                        </div>
                        <button
                          onClick={() => removeMemberFromProject(selectedProject.id, index)}
                          style={{
                            padding: '4px',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            border: '1px solid #fecaca',
                            borderRadius: '4px',
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
                          title="Supprimer ce membre"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {selectedProject.team.length === 0 && (
                    <div style={{
                      textAlign: 'center',
                      padding: '32px 16px',
                      color: '#6b7280'
                    }}>
                      <Users size={32} color="#d1d5db" style={{ marginBottom: '12px' }} />
                      <p style={{ margin: 0, fontSize: '14px' }}>Aucun membre assigné</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                        Cliquez sur "Ajouter" pour assigner des membres à ce projet
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
      `}</style>
    </div>
  );
};

export default ProfileDashboard;