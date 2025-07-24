import React, { useState, useRef } from 'react';
import { Plus, Trash2, User, GraduationCap, Calendar, MapPin, Eye, Users } from 'lucide-react';
import {
Grid
} from "@mui/material";
const initialData = {
  people: {
    'person-1': { 
      id: 'person-1', 
      name: "Marie Dubois", 
      email: "marie.dubois@email.com",
      formation: 'React Avancé',
      level: 'Intermédiaire',
      avatar: '👩‍💼',
      progress: 75
    },
    'person-2': { 
      id: 'person-2', 
      name: "Jean Martin", 
      email: "jean.martin@email.com",
      formation: 'JavaScript ES6+',
      level: 'Débutant',
      avatar: '👨‍💻',
      progress: 25
    },
    'person-3': { 
      id: 'person-3', 
      name: "Sophie Laurent", 
      email: "sophie.laurent@email.com",
      formation: 'Node.js Backend',
      level: 'Avancé',
      avatar: '👩‍🎓',
      progress: 90
    },
    'person-4': { 
      id: 'person-4', 
      name: "Pierre Moreau", 
      email: "pierre.moreau@email.com",
      formation: 'DevOps Basics',
      level: 'Intermédiaire',
      avatar: '👨‍🔧',
      progress: 60
    },
    'person-5': { 
      id: 'person-5', 
      name: "Emma Garcia", 
      email: "emma.garcia@email.com",
      formation: 'UX/UI Design',
      level: 'Avancé',
      avatar: '👩‍🎨',
      progress: 85
    }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'En Attente',
      subtitle: 'Personnes à inscrire',
      color: '#f39c12',
      icon: '⏳',
      personIds: ['person-1', 'person-2']
    },
    'column-2': {
      id: 'column-2',
      title: 'En Formation',
      subtitle: 'Formation en cours',
      color: '#3498db',
      icon: '📚',
      personIds: ['person-3', 'person-4']
    },
    'column-3': {
      id: 'column-3',
      title: 'Certifiés',
      subtitle: 'Formation terminée',
      color: '#2ecc71',
      icon: '🎓',
      personIds: ['person-5']
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const formations = [
  'React Avancé', 'JavaScript ES6+', 'Node.js Backend', 'DevOps Basics', 
  'UX/UI Design', 'Python Django', 'Machine Learning', 'Cybersécurité'
];

const levels = ['Débutant', 'Intermédiaire', 'Avancé'];
const avatars = ['👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓', '👨‍🔧', '👩‍🔧', '👩‍🎨', '👨‍🎨'];

const getLevelColor = (level) => {
  switch (level) {
    case 'Avancé': return '#e74c3c';
    case 'Intermédiaire': return '#f39c12';
    case 'Débutant': return '#27ae60';
    default: return '#95a5a6';
  }
};

const PersonCard = ({ person, onDelete, columnId, onDragStart, onViewDetails }) => (
  <Grid
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
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    }}
  >
    <Grid style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, #00c9ff 0%, ${getLevelColor(person.level)} ${person.progress}%, rgba(255,255,255,0.3) ${person.progress}%)` }}></Grid>
    
    <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
      <Grid style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Grid style={{ fontSize: '2rem', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {person.avatar}
        </Grid>
        <Grid>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{person.name}</h3>
          <p style={{ margin: '2px 0', fontSize: '0.85rem', opacity: 0.8 }}>{person.email}</p>
        </Grid>
      </Grid>
      <Grid style={{ display: 'flex', gap: '4px' }}>
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
      </Grid>
    </Grid>

    <Grid style={{ marginBottom: '12px' }}>
      <Grid style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
        <GraduationCap size={16} />
        <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{person.formation}</span>
      </Grid>
      <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          background: getLevelColor(person.level),
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: '500'
        }}>
          {person.level}
        </span>
        <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>
          Progression: {person.progress}%
        </span>
      </Grid>
    </Grid>
  </Grid>
);

const PeopleTrainingKanban = () => {
  const [data, setData] = useState(initialData);
  const [showAddForm, setShowAddForm] = useState(null);
  const [newPerson, setNewPerson] = useState({
    name: '',
    email: '',
    formation: formations[0],
    level: levels[0],
    avatar: avatars[0],
    progress: 0
  });
  const [draggedPerson, setDraggedPerson] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [stats, setStats] = useState(true);

  const handleDragStart = (e, personId, columnId) => {
    setDraggedPerson(personId);
    setDraggedFrom(columnId);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();

    if (!draggedPerson || !draggedFrom || targetColumnId === draggedFrom) return;

    const sourcePersonIds = data.columns[draggedFrom].personIds.filter(id => id !== draggedPerson);
    const targetPersonIds = [...data.columns[targetColumnId].personIds, draggedPerson];

    setData(prev => ({
      ...prev,
      columns: {
        ...prev.columns,
        [draggedFrom]: {
          ...prev.columns[draggedFrom],
          personIds: sourcePersonIds
        },
        [targetColumnId]: {
          ...prev.columns[targetColumnId],
          personIds: targetPersonIds
        }
      }
    }));

    setDraggedPerson(null);
    setDraggedFrom(null);
  };

  const addPerson = (columnId) => {
    if (!newPerson.name.trim() || !newPerson.email.trim()) return;
    
    const newPersonId = `person-${Date.now()}`;
    const personToAdd = { 
      ...newPerson, 
      id: newPersonId,
      avatar: avatars[Math.floor(Math.random() * avatars.length)]
    };

    setData(prev => ({
      ...prev,
      people: { ...prev.people, [newPersonId]: personToAdd },
      columns: {
        ...prev.columns,
        [columnId]: {
          ...prev.columns[columnId],
          personIds: [...prev.columns[columnId].personIds, newPersonId]
        }
      }
    }));

    setNewPerson({ name: '', email: '', formation: formations[0], level: levels[0], avatar: avatars[0], progress: 0 });
    setShowAddForm(null);
  };

  const deletePerson = (personId, columnId) => {
    const newPeople = { ...data.people };
    delete newPeople[personId];

    const newPersonIds = data.columns[columnId].personIds.filter(id => id !== personId);

    setData(prev => ({
      ...prev,
      people: newPeople,
      columns: {
        ...prev.columns,
        [columnId]: {
          ...prev.columns[columnId],
          personIds: newPersonIds
        }
      }
    }));
  };

  const totalPeople = Object.keys(data.people).length;
  const totalFormations = new Set(Object.values(data.people).map(p => p.formation)).size;

  return (
    <Grid style={{ padding: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <Grid style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <Grid style={{ textAlign: 'center', marginBottom: '32px', color: 'white' }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 8px 0', fontWeight: '700' }}>
            🎓 Formation Management System
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0 }}>
            Gérez vos apprenants et leurs parcours de formation
          </p>
        </Grid>

        {/* Stats */}
        {stats && (
          <Grid style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px', 
            marginBottom: '32px' 
          }}>
            <Grid style={{ 
              background: 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(10px)', 
              borderRadius: '12px', 
              padding: '20px', 
              textAlign: 'center', 
              color: 'white' 
            }}>
              <Users size={32} style={{ marginBottom: '8px' }} />
              <h3 style={{ margin: '0 0 4px 0', fontSize: '2rem' }}>{totalPeople}</h3>
              <p style={{ margin: 0, opacity: 0.8 }}>Total Apprenants</p>
            </Grid>
            <Grid style={{ 
              background: 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(10px)', 
              borderRadius: '12px', 
              padding: '20px', 
              textAlign: 'center', 
              color: 'white' 
            }}>
              <GraduationCap size={32} style={{ marginBottom: '8px' }} />
              <h3 style={{ margin: '0 0 4px 0', fontSize: '2rem' }}>{totalFormations}</h3>
              <p style={{ margin: 0, opacity: 0.8 }}>Formations Actives</p>
            </Grid>
            <Grid style={{ 
              background: 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(10px)', 
              borderRadius: '12px', 
              padding: '20px', 
              textAlign: 'center', 
              color: 'white' 
            }}>
              <Calendar size={32} style={{ marginBottom: '8px' }} />
              <h3 style={{ margin: '0 0 4px 0', fontSize: '2rem' }}>{data.columns['column-2'].personIds.length}</h3>
              <p style={{ margin: 0, opacity: 0.8 }}>En Formation</p>
            </Grid>
            <Grid style={{ 
              background: 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(10px)', 
              borderRadius: '12px', 
              padding: '20px', 
              textAlign: 'center', 
              color: 'white' 
            }}>
              <span style={{ fontSize: '2rem', marginBottom: '8px', display: 'block' }}>🏆</span>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '2rem' }}>{data.columns['column-3'].personIds.length}</h3>
              <p style={{ margin: 0, opacity: 0.8 }}>Certifiés</p>
            </Grid>
          </Grid>
        )}

        {/* Kanban Board */}
        <Grid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          {data.columnOrder.map(columnId => {
            const column = data.columns[columnId];
            const people = column.personIds.map(personId => data.people[personId]);

            return (
              <Grid
                key={columnId}
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '16px',
                  padding: '20px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  minHeight: '500px'
                }}
                onDragOver={e => e.preventDefault()}
                onDrop={e => handleDrop(e, columnId)}
              >
                {/* Column Header */}
                <Grid style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginBottom: '20px',
                  padding: '12px',
                  background: column.color,
                  borderRadius: '12px',
                  color: 'white'
                }}>
                  <Grid style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{column.icon}</span>
                    <Grid>
                      <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>{column.title}</h2>
                      <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>{column.subtitle}</p>
                    </Grid>
                  </Grid>
                  <Grid style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {people.length}
                  </Grid>
                </Grid>

                {/* People Cards */}
                <Grid style={{ marginBottom: '16px' }}>
                  {people.map(person => (
                    <PersonCard
                      key={person.id}
                      person={person}
                      columnId={columnId}
                      onDelete={deletePerson}
                      onDragStart={handleDragStart}
                      onViewDetails={setSelectedPerson}
                    />
                  ))}
                </Grid>

                {/* Add Form */}
                {showAddForm === columnId ? (
                  <Grid style={{ 
                    background: 'rgba(108, 92, 231, 0.1)', 
                    borderRadius: '12px', 
                    padding: '16px',
                    border: '2px dashed rgba(108, 92, 231, 0.3)'
                  }}>
                    <input
                      type="text"
                      placeholder="Nom complet"
                      value={newPerson.name}
                      onChange={(e) => setNewPerson({...newPerson, name: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        marginBottom: '8px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        fontSize: '1rem'
                      }}
                    />
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
                    <Grid style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                      <select
                        value={newPerson.formation}
                        onChange={(e) => setNewPerson({...newPerson, formation: e.target.value})}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                      >
                        {formations.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                      <select
                        value={newPerson.level}
                        onChange={(e) => setNewPerson({...newPerson, level: e.target.value})}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                      >
                        {levels.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </Grid>
                    <Grid style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                      <button
                        onClick={() => addPerson(columnId)}
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
                    </Grid>
                  </Grid>
                ) : (
                  <button
                    onClick={() => setShowAddForm(columnId)}
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
                      transition: 'all 0.3s ease'
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
              </Grid>
            );
          })}
        </Grid>

        {/* Modal de détails */}
        {selectedPerson && (
          <Grid style={{
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
            <Grid style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }} onClick={e => e.stopPropagation()}>
              <Grid style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Grid style={{ fontSize: '4rem', marginBottom: '12px' }}>{selectedPerson.avatar}</Grid>
                <h2 style={{ margin: '0 0 8px 0', color: '#333' }}>{selectedPerson.name}</h2>
                <p style={{ margin: 0, color: '#666' }}>{selectedPerson.email}</p>
              </Grid>
              
              <Grid style={{ marginBottom: '24px' }}>
                <Grid style={{ marginBottom: '16px' }}>
                  <strong>Formation:</strong> {selectedPerson.formation}
                </Grid>
                <Grid style={{ marginBottom: '16px' }}>
                  <strong>Niveau:</strong> <span style={{ 
                    background: getLevelColor(selectedPerson.level),
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.9rem'
                  }}>{selectedPerson.level}</span>
                </Grid>
                <Grid style={{ marginBottom: '16px' }}>
                  <strong>Progression:</strong>
                  <Grid style={{ 
                    background: '#f0f0f0',
                    height: '10px',
                    borderRadius: '5px',
                    margin: '8px 0',
                    overflow: 'hidden'
                  }}>
                    <Grid style={{
                      background: `linear-gradient(90deg, #667eea 0%, #764ba2 100%)`,
                      height: '100%',
                      width: `${selectedPerson.progress}%`,
                      borderRadius: '5px',
                      transition: 'width 0.3s ease'
                    }}></Grid>
                  </Grid>
                  <span>{selectedPerson.progress}% complété</span>
                </Grid>
              </Grid>
              
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
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default PeopleTrainingKanban;