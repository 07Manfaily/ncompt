import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrainingEvaluationDashboard = () => {
  const [selectedSession, setSelectedSession] = useState('all');
  const [selectedParticipant, setSelectedParticipant] = useState('all');

  // Données factices pour les graphiques circulaires
  const satisfactionData = [
    { label: "Satisfaction générale", percentage: 95, color: "#10B981" },
    { label: "Atteinte des objectifs de la formation", percentage: 100, color: "#10B981" },
    { label: "Durée et rythme de la formation", percentage: 85, color: "#FDE047" },
    { label: "Cadre et environnement de formation", percentage: 100, color: "#10B981" },
    { label: "Pause café et de restauration", percentage: 90, color: "#10B981" }
  ];

  const methodsData = [
    { label: "Prestation du formateur", percentage: 100, color: "#10B981" },
    { label: "Méthodes pédagogiques du formateur", percentage: 100, color: "#10B981" },
    { label: "Équilibre entre théorie et pratique", percentage: 85, color: "#FDE047" },
    { label: "Supports de formation utilisés afin réels", percentage: 90, color: "#10B981" },
    { label: "Échanges entre participants et formateur", percentage: 100, color: "#10B981" }
  ];

  // Données pour le word cloud
  const wordCloudData = [
    { text: "Excellent", size: 48, color: "#10B981" },
    { text: "Formateur", size: 36, color: "#3B82F6" },
    { text: "Pratique", size: 32, color: "#8B5CF6" },
    { text: "Utile", size: 28, color: "#F59E0B" },
    { text: "Intéressant", size: 26, color: "#EF4444" },
    { text: "Clair", size: 24, color: "#10B981" },
    { text: "Dynamique", size: 22, color: "#3B82F6" },
    { text: "Enrichissant", size: 20, color: "#8B5CF6" },
    { text: "Complet", size: 18, color: "#F59E0B" },
    { text: "Motivant", size: 16, color: "#EF4444" },
    { text: "Pédagogique", size: 14, color: "#10B981" },
    { text: "Adapté", size: 12, color: "#3B82F6" }
  ];

  const CircularProgress = ({ percentage, color, label }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minHeight: '180px',
        justifyContent: 'center'
      }}>
        <div style={{ position: 'relative', width: '100px', height: '100px', marginBottom: '12px' }}>
          <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#f3f4f6"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            {percentage}%
          </div>
        </div>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '12px', 
          color: '#6b7280', 
          margin: 0,
          fontWeight: '500',
          lineHeight: '1.4'
        }}>
          {label}
        </p>
      </div>
    );
  };

  const WordCloud = () => {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginTop: '0px',
        minHeight: '200px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
      }}>
        <h3 style={{ 
          width: '100%', 
          textAlign: 'center', 
          margin: '0 0 20px 0',
          color: '#1f2937',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          💬 Mots-clés des commentaires
        </h3>
        {wordCloudData.map((word, index) => (
          <span
            key={index}
            style={{
              fontSize: `${word.size}px`,
              color: word.color,
              fontWeight: '600',
              margin: '5px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              userSelect: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            {word.text}
          </span>
        ))}
      </div>
    );
  };

  const FilterPanel = () => {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        height: 'fit-content'
      }}>
        <h3 style={{
          margin: '0 0 20px 0',
          color: '#1f2937',
          fontSize: '16px',
          fontWeight: '600',
          borderBottom: '2px solid #f3f4f6',
          paddingBottom: '10px'
        }}>
          🔍 Filtres
        </h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#374151',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            📅 Session
          </label>
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: '#ffffff',
              color: '#374151',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          >
            <option value="all">Toutes les sessions</option>
            <option value="session1">Session 1 - Avril 2024</option>
            <option value="session2">Session 2 - Mai 2024</option>
            <option value="session3">Session 3 - Juin 2024</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#374151',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            👥 Participants
          </label>
          <select
            value={selectedParticipant}
            onChange={(e) => setSelectedParticipant(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: '#ffffff',
              color: '#374151',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          >
            <option value="all">Tous les participants</option>
            <option value="group1">Groupe A (15 participants)</option>
            <option value="group2">Groupe B (12 participants)</option>
            <option value="group3">Groupe C (18 participants)</option>
          </select>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ 
            margin: '0 0 10px 0', 
            color: '#475569',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            📈 Statistiques rapides
          </h4>
          <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>
            <div>👥 Total participants: 45</div>
            <div>🎯 Sessions actives: 3</div>
            <div>⭐ Taux de satisfaction moyen: 93%</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh', 
      padding: '20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* En-tête */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '30px',
        marginBottom: '25px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderLeft: '4px solid #3b82f6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ flex: 1, minWidth: '400px' }}>
          <h1 style={{ 
            margin: 0, 
            color: '#1f2937',
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '10px'
          }}>
            📊 ANALYSE DES ÉVALUATIONS À CHAUD DES FORMATIONS
          </h1>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginTop: '15px'
          }}>
            <div>
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>📚 Module de formation:</span>
              <div style={{ fontSize: '16px', color: '#1f2937', fontWeight: '600' }}>Programme de Leadership</div>
            </div>
            <div>
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>📍 Lieu de formation:</span>
              <div style={{ fontSize: '16px', color: '#1f2937', fontWeight: '600' }}>Abidjan</div>
            </div>
            <div>
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>📅 Date de formation:</span>
              <div style={{ fontSize: '16px', color: '#1f2937', fontWeight: '600' }}>Avril - Octobre 2024</div>
            </div>
          </div>
        </div>

        {/* Score global */}
        <div style={{
          backgroundColor: '#1e40af',
          borderRadius: '16px',
          padding: '25px',
          textAlign: 'center',
          minWidth: '180px',
          boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)',
          border: '3px solid #3b82f6'
        }}>
          <div style={{
            fontSize: '48px',
            fontWeight: '900',
            color: '#ffffff',
            lineHeight: '1',
            marginBottom: '5px'
          }}>
            4,6
          </div>
          <div style={{
            fontSize: '14px',
            color: '#bfdbfe',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            SCORE GLOBAL
          </div>
          <div style={{ fontSize: '24px' }}>😊</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '25px' }}>
        {/* Contenu principal */}
        <div style={{ flex: 1 }}>
          {/* Légende des couleurs */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '25px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              display: 'flex', 
              gap: '25px', 
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>😍</span>
                <div style={{ width: '16px', height: '16px', backgroundColor: '#10B981', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>5 - Très satisfait</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>😊</span>
                <div style={{ width: '16px', height: '16px', backgroundColor: '#10B981', borderRadius: '4px', opacity: 0.8 }}></div>
                <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>4 - Satisfait</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>😐</span>
                <div style={{ width: '16px', height: '16px', backgroundColor: '#FDE047', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>3 - Plus ou moins satisfait</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>😞</span>
                <div style={{ width: '16px', height: '16px', backgroundColor: '#FB923C', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>2 - Insatisfait</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>😡</span>
                <div style={{ width: '16px', height: '16px', backgroundColor: '#EF4444', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>1 - Très insatisfait</span>
              </div>
            </div>
          </div>

          {/* Première ligne de graphiques */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px',
            marginBottom: '25px'
          }}>
            {satisfactionData.map((item, index) => (
              <CircularProgress 
                key={index}
                percentage={item.percentage} 
                color={item.color} 
                label={item.label}
              />
            ))}
          </div>

          {/* Deuxième ligne de graphiques */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px',
            marginBottom: '25px'
          }}>
            {methodsData.map((item, index) => (
              <CircularProgress 
                key={index}
                percentage={item.percentage} 
                color={item.color} 
                label={item.label}
              />
            ))}
          </div>
        </div>

        {/* Panneau de filtres à droite */}
        <div style={{ width: '300px', flexShrink: 0 }}>
          <FilterPanel />
        </div>
      </div>

      {/* Word Cloud en pleine largeur */}
      <WordCloud />
    </div>
  );
};

export default TrainingEvaluationDashboard;