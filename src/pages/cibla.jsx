import React, { useState, useEffect } from 'react';
import { Plus, Trash2, User, GraduationCap, Calendar, MapPin, Eye, Users, RefreshCw } from 'lucide-react';

const API_BASE_URL = 'https://your-api-base-url.com'; // Remplacez par votre URL d'API

const getLevelColor = (level) => {
  switch (level) {
    case 'Avancé': return '#e74c3c';
    case 'Intermédiaire': return '#f39c12';
    case 'Débutant': return '#27ae60';
    default: return '#95a5a6';
  }
};

const PersonCard = ({ person, onDelete, columnId, onDragStart, onViewDetails }) => (
  <div
    className="person-card"
    draggable
    onDragStart={(e) => onDragStart(e, person.id, columnId)}
    style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '12px',
      color: 'white',
      cursor: 'move',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    }}
  >
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      height: '4px', 
      background: `linear-gradient(90deg, #00c9ff 0%, ${getLevelColor(person.level || 'Débutant')} 50%, rgba(255,255,255,0.3) 100%)` 
    }}></div>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          fontSize: '2rem', 
          background: 'rgba(255,255,255,0.2)', 
          borderRadius: '50%', 
          width: '50px', 
          height: '50px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          👤
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>
            {person.prenom} {person.nom}
          </h3>
          <p style={{ margin: '2px 0', fontSize: '0.85rem', opacity: 0.8 }}>
            {person.email}
          </p>
          <p style={{ margin: '2px 0', fontSize: '0.8rem', opacity: 0.7 }}>
            Mat: {person.matricule}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '4px' }}>
        <button
          onClick={() => onViewDetails(person)}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '6px',
            padding: '6px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Eye size={14} />
        </button>
        <button
          onClick={() => onDelete(person.id, columnId)}
          style={{
            background: 'rgba(231, 76, 60, 0.8)',
            border: 'none',
            borderRadius: '6px',
            padding: '6px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>

    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
        <GraduationCap size={16} />
        <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Formation Active</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          background: person.statut ? '#27ae60' : '#e74c3c',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: '500'
        }}>
          {person.statut || 'Inactif'}
        </span>
      </div>
    </div>
  </div>
);

const TrainingKanbanWithAPI = () => {
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState('');
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [draggedPerson, setDraggedPerson] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [showAddForm, setShowAddForm] = useState(null);
  const [newPerson, setNewPerson] = useState({
    nom: '',
    prenom: '',
    email: '',
    matricule: '',
    statut: 'Actif'
  });

  // Colonnes du Kanban
  const [columns] = useState({
    'waiting': {
      id: 'waiting',
      title: 'En Attente',
      subtitle: 'Participants inscrits',
      color: '#f39c12',
      icon: '⏳',
    },
    'active': {
      id: 'active',
      title: 'En Formation',
      subtitle: 'Formation en cours',
      color: '#3498db',
      icon: '📚',
    },
    'completed': {
      id: 'completed',
      title: 'Certifiés',
      subtitle: 'Formation terminée',
      color: '#2ecc71',
      icon: '🎓',
    },
  });

  const [participantsByColumn, setParticipantsByColumn] = useState({
    waiting: [],
    active: [],
    completed: []
  });

  // Simuler l'appel API pour récupérer les formations
  const fetchFormations = async () => {
    setLoading(true);
    try {
      // Remplacez par votre vrai appel API
      // const response = await fetch(`${API_BASE_URL}/formations`);
      // const data = await response.json();
      
      // Données simulées basées sur votre API
      const mockFormations = [
        { code_formation: 'P25039', intitule_formation: 'Formation React Avancé' },
        { code_formation: 'P25040', intitule_formation: 'Formation JavaScript ES6+' },
        { code_formation: 'P25041', intitule_formation: 'Formation Node.js Backend' }
      ];
      
      setFormations(mockFormations);
    } catch (error) {
      console.error('Erreur lors du chargement des formations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Simuler l'appel API pour récupérer les sessions d'une formation
  const fetchSessions = async (codeFormation) => {
    if (!codeFormation) return;
    
    setLoading(true);
    try {
      // Remplacez par votre vrai appel API
      // const response = await fetch(`${API_BASE_URL}/formations/${codeFormation}/sessions`);
      // const data = await response.json();
      
      // Données simulées
      const mockSessions = [
        { 
          code_session: 'P2503951', 
          code_formation: codeFormation,
          date_debut: '2024-01-15',
          date_fin: '2024-03-15',
          duree_heures: 40,
          formateur: 'M. Dupont'
        },
        { 
          code_session: 'P2503952', 
          code_formation: codeFormation,
          date_debut: '2024-02-01',
          date_fin: '2024-04-01',
          duree_heures: 40,
          formateur: 'Mme Martin'
        }
      ];
      
      setSessions(mockSessions);
      setSelectedSession('');
      setParticipants([]);
    } catch (error) {
      console.error('Erreur lors du chargement des sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Simuler l'appel API pour récupérer les participants d'une session
  const fetchParticipants = async (codeSession) => {
    if (!codeSession) return;
    
    setLoading(true);
    try {
      // Remplacez par votre vrai appel API
      // const response = await fetch(`${API_BASE_URL}/sessions/${codeSession}/participants`);
      // const data = await response.json();
      
      // Données simulées basées sur votre API
      const mockParticipants = [
        {
          id: 1,
          email: "mianpauletie@live.fr",
          matricule: "5063",
          nom: "NIAN",
          prenom: "PAUL ELIE",
          statut: "Actif"
        },
        {
          id: 2,
          email: "marie.dubois@email.com",
          matricule: "5064",
          nom: "DUBOIS",
          prenom: "MARIE",
          statut: "Actif"
        },
        {
          id: 3,
          email: "jean.martin@email.com",
          matricule: "5065",
          nom: "MARTIN",
          prenom: "JEAN",
          statut: "Inactif"
        }
      ];
      
      setParticipants(mockParticipants);
      
      // Répartir les participants dans les colonnes (logique exemple)
      const waiting = mockParticipants.filter((_, index) => index % 3 === 0);
      const active = mockParticipants.filter((_, index) => index % 3 === 1);
      const completed = mockParticipants.filter((_, index) => index % 3 === 2);
      
      setParticipantsByColumn({
        waiting,
        active,
        completed
      });
      
    } catch (error) {
      console.error('Erreur lors du chargement des participants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormations();
  }, []);

  useEffect(() => {
    if (selectedFormation) {
      fetchSessions(selectedFormation);
    }
  }, [selectedFormation]);

  useEffect(() => {
    if (selectedSession) {
      fetchParticipants(selectedSession);
    }
  }, [selectedSession]);

  const handleDragStart = (e, personId, columnId) => {
    setDraggedPerson(personId);
    setDraggedFrom(columnId);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();

    if (!draggedPerson || !draggedFrom || targetColumnId === draggedFrom) return;

    const sourceColumn = participantsByColumn[draggedFrom];
    const targetColumn = participantsByColumn[targetColumnId];
    const person = sourceColumn.find(p => p.id === draggedPerson);

    if (person) {
      setParticipantsByColumn(prev => ({
        ...prev,
        [draggedFrom]: prev[draggedFrom].filter(p => p.id !== draggedPerson),
        [targetColumnId]: [...prev[targetColumnId], person]
      }));
    }

    setDraggedPerson(null);
    setDraggedFrom(null);
  };

  const deletePerson = (personId, columnId) => {
    setParticipantsByColumn(prev => ({
      ...prev,
      [columnId]: prev[columnId].filter(p => p.id !== personId)
    }));
  };

  const addPerson = (columnId) => {
    if (!newPerson.nom.trim() || !newPerson.prenom.trim() || !newPerson.email.trim() || !newPerson.matricule.trim()) return;
    
    const newPersonId = Date.now();
    const personToAdd = { 
      ...newPerson, 
      id: newPersonId
    };

    setParticipantsByColumn(prev => ({
      ...prev,
      [columnId]: [...prev[columnId], personToAdd]
    }));

    // Ajouter aussi à la liste principale des participants
    setParticipants(prev => [...prev, personToAdd]);

    setNewPerson({ nom: '', prenom: '', email: '', matricule: '', statut: 'Actif' });
    setShowAddForm(null);
  };

  const totalParticipants = participants.length;
  const totalActive = participantsByColumn.active.length;
  const totalCompleted = participantsByColumn.completed.length;

  return (
    <div style={{ padding: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px', color: 'white' }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 8px 0', fontWeight: '700' }}>
            🎓 Formation Management System
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0 }}>
            Gérez vos apprenants et leurs parcours de formation
          </p>
        </div>

        {/* Sélecteurs */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '16px', 
          marginBottom: '32px' 
        }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)', 
            borderRadius: '12px', 
            padding: '20px' 
          }}>
            <label style={{ color: 'white', fontSize: '1rem', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
              Sélectionner une formation
            </label>
            <select
              value={selectedFormation}
              onChange={(e) => setSelectedFormation(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                background: 'white'
              }}
              disabled={loading}
            >
              <option value="">-- Choisir une formation --</option>
              {formations.map(formation => (
                <option key={formation.code_formation} value={formation.code_formation}>
                  {formation.code_formation} - {formation.intitule_formation}
                </option>
              ))}
            </select>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)', 
            borderRadius: '12px', 
            padding: '20px' 
          }}>
            <label style={{ color: 'white', fontSize: '1rem', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
              Sélectionner une session
            </label>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                background: 'white'
              }}
              disabled={loading || !selectedFormation}
            >
              <option value="">-- Choisir une session --</option>
              {sessions.map(session => (
                <option key={session.code_session} value={session.code_session}>
                  {session.code_session} - {session.formateur} ({session.date_debut})
                </option>
              ))}
            </select>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)', 
            borderRadius: '12px', 
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => {
                if (selectedSession) {
                  fetchParticipants(selectedSession);
                }
              }}
              disabled={loading || !selectedSession}
              style={{
                padding: '12px 24px',
                background: loading ? '#95a5a6' : 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RefreshCw size={16} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
              {loading ? 'Chargement...' : 'Actualiser'}
            </button>
          </div>
        </div>

        {/* Stats */}
        {selectedSession && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px', 
            marginBottom: '32px' 
          }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(10px)', 
              borderRadius: '12px', 
              padding: '20px', 
              textAlign: 'center', 
              color: 'white' 
            }}>
              <Users size={32} style={{ marginBottom: '8px' }} />
              <h3 style={{ margin: '0 0 4px 0', fontSize: '2rem' }}>{totalParticipants}</h3>
              <p style={{ margin: 0, opacity: 0.8 }}>Total Participants</p>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(10px)', 
              borderRadius: '12px', 
              padding: '20px', 
              textAlign: 'center', 
              color: 'white' 
            }}>
              <Calendar size={32} style={{ marginBottom: '8px' }} />
              <h3 style={{ margin: '0 0 4px 0', fontSize: '2rem' }}>{totalActive}</h3>
              <p style={{ margin: 0, opacity: 0.8 }}>En Formation</p>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(10px)', 
              borderRadius: '12px', 
              padding: '20px', 
              textAlign: 'center', 
              color: 'white' 
            }}>
              <span style={{ fontSize: '2rem', marginBottom: '8px', display: 'block' }}>🏆</span>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '2rem' }}>{totalCompleted}</h3>
              <p style={{ margin: 0, opacity: 0.8 }}>Certifiés</p>
            </div>
          </div>
        )}

        {/* Message si aucune session sélectionnée */}
        {!selectedSession && (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            color: 'white',
            marginBottom: '32px'
          }}>
            <GraduationCap size={64} style={{ marginBottom: '16px', opacity: 0.6 }} />
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.5rem' }}>
              Sélectionnez une formation et une session
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Choisissez une formation puis une session pour voir les participants
            </p>
          </div>
        )}

        {/* Kanban Board */}
        {selectedSession && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {Object.values(columns).map(column => {
              const people = participantsByColumn[column.id] || [];

              return (
                <div
                  key={column.id}
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '16px',
                    padding: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    minHeight: '500px'
                  }}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => handleDrop(e, column.id)}
                >
                  {/* Column Header */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    marginBottom: '20px',
                    padding: '12px',
                    background: column.color,
                    borderRadius: '12px',
                    color: 'white'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.5rem' }}>{column.icon}</span>
                      <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>{column.title}</h2>
                        <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>{column.subtitle}</p>
                      </div>
                    </div>
                    <div style={{
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: '20px',
                      padding: '4px 12px',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      {people.length}
                    </div>
                  </div>

                  {/* People Cards */}
                  <div style={{ marginBottom: '16px' }}>
                    {people.map(person => (
                      <PersonCard
                        key={person.id}
                        person={person}
                        columnId={column.id}
                        onDelete={deletePerson}
                        onDragStart={handleDragStart}
                        onViewDetails={setSelectedPerson}
                      />
                    ))}
                  </div>

                  {/* Add Form */}
                  {showAddForm === column.id ? (
                    <div style={{ 
                      background: 'rgba(108, 92, 231, 0.1)', 
                      borderRadius: '12px', 
                      padding: '16px',
                      border: '2px dashed rgba(108, 92, 231, 0.3)',
                      marginBottom: '16px'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          placeholder="Nom"
                          value={newPerson.nom}
                          onChange={(e) => setNewPerson({...newPerson, nom: e.target.value})}
                          style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '1rem'
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Prénom"
                          value={newPerson.prenom}
                          onChange={(e) => setNewPerson({...newPerson, prenom: e.target.value})}
                          style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={newPerson.email}
                        onChange={(e) => setNewPerson({...newPerson, email: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '12px',
                          marginBottom: '8px',
                          borderRadius: '8px',
                          border: '1px solid #ddd',
                          fontSize: '1rem'
                        }}
                      />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          placeholder="Matricule"
                          value={newPerson.matricule}
                          onChange={(e) => setNewPerson({...newPerson, matricule: e.target.value})}
                          style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '1rem'
                          }}
                        />
                        <select
                          value={newPerson.statut}
                          onChange={(e) => setNewPerson({...newPerson, statut: e.target.value})}
                          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        >
                          <option value="Actif">Actif</option>
                          <option value="Inactif">Inactif</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                        <button
                          onClick={() => addPerson(column.id)}
                          style={{
                            flex: 1,
                            padding: '12px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          ✅ Ajouter
                        </button>
                        <button
                          onClick={() => setShowAddForm(null)}
                          style={{
                            flex: 1,
                            padding: '12px',
                            background: '#f8f9fa',
                            color: '#333',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          ❌ Annuler
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAddForm(column.id)}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: 'rgba(108, 92, 231, 0.1)',
                        border: '2px dashed rgba(108, 92, 231, 0.3)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: '#6c5ce7',
                        fontSize: '1rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        marginBottom: '16px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(108, 92, 231, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(108, 92, 231, 0.1)';
                      }}
                    >
                      <Plus size={20} />
                      Ajouter une personne
                    </button>
                  )}

                  {people.length === 0 && showAddForm !== column.id && (
                    <div style={{
                      textAlign: 'center',
                      padding: '40px 20px',
                      color: '#999',
                      fontSize: '0.9rem'
                    }}>
                      Aucun participant dans cette catégorie
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Modal de détails */}
        {selectedPerson && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }} onClick={() => setSelectedPerson(null)}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }} onClick={e => e.stopPropagation()}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '12px' }}>👤</div>
                <h2 style={{ margin: '0 0 8px 0', color: '#333' }}>
                  {selectedPerson.prenom} {selectedPerson.nom}
                </h2>
                <p style={{ margin: 0, color: '#666' }}>{selectedPerson.email}</p>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Matricule:</strong> {selectedPerson.matricule}
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Statut:</strong> <span style={{ 
                    background: selectedPerson.statut === 'Actif' ? '#2ecc71' : '#e74c3c',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.9rem'
                  }}>{selectedPerson.statut}</span>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Formation:</strong> {selectedFormation}
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Session:</strong> {selectedSession}
                </div>
              </div>
              
              <button
                onClick={() => setSelectedPerson(null)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TrainingKanbanWithAPI;