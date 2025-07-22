import React, { useState } from 'react';
import { Plus, Trash2, User, GraduationCap, Calendar, MapPin, Eye, Users } from 'lucide-react';

const formations = [
  { id: 'all', name: 'Toutes les formations', color: '#6c5ce7' },
  { id: 'react', name: 'React Avancé', color: '#00b894' },
  { id: 'javascript', name: 'JavaScript ES6+', color: '#fdcb6e' },
  { id: 'nodejs', name: 'Node.js Backend', color: '#e84393' },
  { id: 'devops', name: 'DevOps Basics', color: '#fd79a8' },
  { id: 'design', name: 'UX/UI Design', color: '#74b9ff' },
  { id: 'python', name: 'Python Django', color: '#55a3ff' },
  { id: 'ml', name: 'Machine Learning', color: '#00cec9' },
  { id: 'security', name: 'Cybersécurité', color: '#e17055' }
];

const levels = ['Débutant', 'Intermédiaire', 'Avancé'];
const avatars = ['👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓', '👨‍🔧', '👩‍🔧', '👩‍🎨', '👨‍🎨'];

const getFormationColor = (formationName) => {
  const formation = formations.find(f => f.name === formationName);
  return formation ? formation.color : '#6c5ce7';
};

const getLevelColor = (level) => {
  switch (level) {
    case 'Débutant': return '#fab1a0';
    case 'Intermédiaire': return '#fdcb6e';
    case 'Avancé': return '#00b894';
    default: return '#b2bec3';
  }
};

const initialData = {
  people: {
    'person-1': { id: 'person-1', name: "Marie Dubois", email: "marie.dubois@email.com", formation: 'React Avancé', avatar: '👩‍💼', progress: 75, level: 'Avancé' },
    'person-2': { id: 'person-2', name: "Jean Martin", email: "jean.martin@email.com", formation: 'JavaScript ES6+', avatar: '👨‍💻', progress: 25, level: 'Débutant' },
    'person-3': { id: 'person-3', name: "Sophie Laurent", email: "sophie.laurent@email.com", formation: 'Node.js Backend', avatar: '👩‍🎓', progress: 90, level: 'Avancé' },
    'person-4': { id: 'person-4', name: "Pierre Moreau", email: "pierre.moreau@email.com", formation: 'React Avancé', avatar: '👨‍🔧', progress: 60, level: 'Intermédiaire' },
    'person-5': { id: 'person-5', name: "Emma Garcia", email: "emma.garcia@email.com", formation: 'UX/UI Design', avatar: '👩‍🎨', progress: 85, level: 'Avancé' }
  },
  columns: {
    'column-1': { id: 'column-1', title: 'En Attente', subtitle: 'Personnes à inscrire', color: '#f39c12', icon: '⏳', personIds: ['person-1', 'person-2'] },
    'column-2': { id: 'column-2', title: 'En Formation', subtitle: 'Formation en cours', color: '#3498db', icon: '📚', personIds: ['person-3', 'person-4'] },
    'column-3': { id: 'column-3', title: 'Certifiés', subtitle: 'Formation terminée', color: '#2ecc71', icon: '🎓', personIds: ['person-5'] },
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
};

const PersonCard = ({ person, onDelete, columnId, onDragStart, onViewDetails }) => (
  <div draggable onDragStart={(e) => onDragStart(e, person.id, columnId)} style={{ background: '#764ba2', borderRadius: 12, padding: 16, marginBottom: 12, color: '#fff', cursor: 'move', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${getFormationColor(person.formation)} 0%, ${getFormationColor(person.formation)} ${person.progress}%, rgba(255,255,255,0.3) ${person.progress}%)` }} />
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: '2rem' }}>{person.avatar}</div>
        <div>
          <strong>{person.name}</strong>
          <p style={{ margin: 0 }}>{person.email}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        <button onClick={() => onViewDetails(person)} title="Voir les détails"><Eye size={14} /></button>
        <button onClick={() => onDelete(person.id, columnId)} title="Supprimer"><Trash2 size={14} /></button>
      </div>
    </div>
    <div style={{ marginTop: 8 }}>
      <div><GraduationCap size={16} /> {person.formation}</div>
      <div><span style={{ background: getFormationColor(person.formation), padding: '2px 6px', borderRadius: 8 }}>{person.formation}</span> <span>{person.progress}%</span></div>
    </div>
  </div>
);

const PeopleTrainingKanban = () => {
  const [data, setData] = useState(initialData);
  const [showAddForm, setShowAddForm] = useState(null);
  const [newPerson, setNewPerson] = useState({ name: '', email: '', formation: formations[1].name, avatar: avatars[0], progress: 0, level: levels[0] });
  const [draggedPerson, setDraggedPerson] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState('all');

  const handleDragStart = (e, personId, columnId) => {
    setDraggedPerson(personId);
    setDraggedFrom(columnId);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    if (!draggedPerson || !draggedFrom || targetColumnId === draggedFrom) return;
    const newSource = data.columns[draggedFrom].personIds.filter(id => id !== draggedPerson);
    const newTarget = [...data.columns[targetColumnId].personIds, draggedPerson];
    setData(prev => ({
      ...prev,
      columns: {
        ...prev.columns,
        [draggedFrom]: { ...prev.columns[draggedFrom], personIds: newSource },
        [targetColumnId]: { ...prev.columns[targetColumnId], personIds: newTarget }
      }
    }));
    setDraggedPerson(null);
    setDraggedFrom(null);
  };

  const addPerson = (columnId) => {
    if (!newPerson.name.trim() || !newPerson.email.trim()) return;
    const id = `person-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const person = { ...newPerson, id, avatar: avatars[Math.floor(Math.random() * avatars.length)] };
    setData(prev => ({
      ...prev,
      people: { ...prev.people, [id]: person },
      columns: { ...prev.columns, [columnId]: { ...prev.columns[columnId], personIds: [...prev.columns[columnId].personIds, id] } }
    }));
    setNewPerson({ name: '', email: '', formation: formations[1].name, avatar: avatars[0], progress: 0, level: levels[0] });
    setShowAddForm(null);
  };

  const deletePerson = (personId, columnId) => {
    const updatedPeople = { ...data.people };
    delete updatedPeople[personId];
    const updatedIds = data.columns[columnId].personIds.filter(id => id !== personId);
    setData(prev => ({
      ...prev,
      people: updatedPeople,
      columns: { ...prev.columns, [columnId]: { ...prev.columns[columnId], personIds: updatedIds } }
    }));
  };

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ textAlign: 'center' }}>🎓 Formation Management System</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <select value={selectedFormation} onChange={e => setSelectedFormation(e.target.value)}>
          {formations.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        {data.columnOrder.map(colId => {
          const col = data.columns[colId];
          const people = col.personIds.map(id => data.people[id]).filter(p => selectedFormation === 'all' || p.formation === formations.find(f => f.id === selectedFormation)?.name);
          return (
            <div key={colId} onDragOver={e => e.preventDefault()} onDrop={e => handleDrop(e, colId)} style={{ background: '#f4f4f4', borderRadius: 12, padding: 16, flex: 1 }}>
              <h2>{col.icon} {col.title}</h2>
              {people.map(p => <PersonCard key={p.id} person={p} onDelete={deletePerson} columnId={colId} onDragStart={handleDragStart} onViewDetails={setSelectedPerson} />)}
              {showAddForm === colId ? (
                <div>
                  <input value={newPerson.name} onChange={e => setNewPerson({ ...newPerson, name: e.target.value })} placeholder="Nom" />
                  <input value={newPerson.email} onChange={e => setNewPerson({ ...newPerson, email: e.target.value })} placeholder="Email" />
                  <select value={newPerson.formation} onChange={e => setNewPerson({ ...newPerson, formation: e.target.value })}>{formations.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}</select>
                  <select value={newPerson.level} onChange={e => setNewPerson({ ...newPerson, level: e.target.value })}>{levels.map(l => <option key={l} value={l}>{l}</option>)}</select>
                  <button onClick={() => addPerson(colId)}>Ajouter</button>
                  <button onClick={() => setShowAddForm(null)}>Annuler</button>
                </div>
              ) : <button onClick={() => setShowAddForm(colId)}><Plus /> Ajouter une personne</button>}
            </div>
          );
        })}
      </div>
      {selectedPerson && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setSelectedPerson(null)}>
          <div style={{ background: '#fff', padding: 32, borderRadius: 12 }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem' }}>{selectedPerson.avatar}</div>
              <h2>{selectedPerson.name}</h2>
              <p>{selectedPerson.email}</p>
              <p><strong>Formation:</strong> {selectedPerson.formation}</p>
              <p><strong>Niveau:</strong> <span style={{ background: getLevelColor(selectedPerson.level), color: '#fff', padding: '2px 6px', borderRadius: 8 }}>{selectedPerson.level}</span></p>
              <p><strong>Progression:</strong> {selectedPerson.progress}%</p>
              <div style={{ background: '#eee', height: 10, borderRadius: 5 }}>
                <div style={{ background: '#764ba2', width: `${selectedPerson.progress}%`, height: '100%', borderRadius: 5 }}></div>
              </div>
              <button onClick={() => setSelectedPerson(null)} style={{ marginTop: 16 }}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleTrainingKanban;
