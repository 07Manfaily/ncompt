import React, { useState, useEffect, useRef } from 'react';
import ReactWordcloud from 'react-wordcloud';
import ReactApexChart from 'react-apexcharts';

// Suppression globale et définitive des erreurs ResizeObserver
const suppressResizeObserverErrors = (() => {
  let isInitialized = false;
  
  return () => {
    if (isInitialized) return;
    isInitialized = true;

    // Méthode 1: Suppression au niveau window.onerror
    const originalWindowError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
      if (typeof message === 'string' && 
          (message.includes('ResizeObserver') || 
           message.includes('Non-passive event listener'))) {
        return true; // Supprime l'erreur
      }
      if (originalWindowError) {
        return originalWindowError.apply(this, arguments);
      }
      return false;
    };

    // Méthode 2: Suppression au niveau console
    const originalConsoleError = console.error;
    console.error = function(...args) {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('ResizeObserver') || 
           message.includes('Non-passive event listener'))) {
        return; // Ne pas afficher l'erreur
      }
      originalConsoleError.apply(console, args);
    };

    // Méthode 3: Gestion des promesses rejetées
    const originalUnhandledRejection = window.onunhandledrejection;
    window.onunhandledrejection = function(event) {
      if (event.reason && 
          event.reason.message && 
          event.reason.message.includes('ResizeObserver')) {
        event.preventDefault();
        return;
      }
      if (originalUnhandledRejection) {
        originalUnhandledRejection.call(this, event);
      }
    };

    // Méthode 4: Intercepter les erreurs d'événements
    window.addEventListener('error', function(event) {
      if (event.message && event.message.includes('ResizeObserver')) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return false;
      }
    }, true);

    // Méthode 5: Patch du ResizeObserver natif
    if (typeof window.ResizeObserver !== 'undefined') {
      const OriginalResizeObserver = window.ResizeObserver;
      window.ResizeObserver = class extends OriginalResizeObserver {
        constructor(callback) {
          super((entries, observer) => {
            try {
              requestAnimationFrame(() => {
                try {
                  callback(entries, observer);
                } catch (e) {
                  // Ignore silencieusement les erreurs ResizeObserver
                }
              });
            } catch (e) {
              // Ignore silencieusement les erreurs ResizeObserver
            }
          });
        }
      };
    }
  };
})();

// Composant ApexCharts Pie Chart avec gestion optimisée
const ApexPieChart = ({ title, data, color = '#475569', chartKey = 0 }) => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const total = Object.values(data || {}).reduce((sum, val) => sum + val, 0);
  
  // Observer d'intersection pour optimiser le rendu
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  
  // Si pas de données, afficher un chart vide
  if (total === 0 || !data || Object.keys(data).length === 0) {
    return (
      <div ref={containerRef} style={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
          borderRadius: '24px 24px 0 0'
        }}></div>
        
        <h3 style={{
          margin: '0 0 20px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#1e293b',
          textAlign: 'center',
          fontFamily: '"Inter", sans-serif',
          lineHeight: '1.3',
          position: 'absolute',
          top: '24px',
          left: '24px',
          right: '24px'
        }}
        title={title}>
          {title.length <= 25 ? title : title.substring(0, 25) + '...'}
        </h3>
        
        <div style={{ 
          color: '#64748b', 
          fontSize: '14px', 
          textAlign: 'center',
          fontStyle: 'italic'
        }}>
          Aucune donnée disponible
        </div>
      </div>
    );
  }

  const chartData = Object.entries(data).map(([label, value]) => value);
  const chartLabels = Object.keys(data);
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const options = {
    chart: {
      type: 'pie',
      width: 280,
      height: 280,
      animations: {
        enabled: false, // Complètement désactivé
      },
      toolbar: {
        show: false
      },
      events: {
        mounted: () => {
          // Rien - évite les callbacks problématiques
        },
        updated: () => {
          // Rien - évite les callbacks problématiques
        }
      }
    },
    labels: chartLabels,
    colors: colors.slice(0, chartLabels.length),
    legend: {
      show: false
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + "%";
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',
        colors: ['#fff']
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        opacity: 0.8
      }
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '0%'
        }
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#fff']
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function(val, opts) {
          const percentage = ((val / total) * 100).toFixed(1);
          return `${val} (${percentage}%)`;
        }
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      }
    }
  };

  return (
    <div ref={containerRef} style={{
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '24px',
      boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '400px'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
        borderRadius: '24px 24px 0 0'
      }}></div>
      
      <h3 style={{
        margin: '0 0 20px 0',
        fontSize: '16px',
        fontWeight: '600',
        color: '#1e293b',
        textAlign: 'center',
        fontFamily: '"Inter", sans-serif',
        lineHeight: '1.3'
      }}
      title={title}>
        {title.length <= 25 ? title : title.substring(0, 25) + '...'}
      </h3>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: '20px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}>
        {isVisible && (
          <div ref={chartRef} key={`chart-${chartKey}`}>
            <ReactApexChart 
              options={options}
              series={chartData}
              type="pie"
              width={280}
              height={280}
            />
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {Object.entries(data).map(([label, value], index) => {
          const percentage = ((value / total) * 100).toFixed(1);
          return (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '8px',
              fontSize: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: colors[index % colors.length],
                  borderRadius: '50%'
                }}></div>
                <span style={{ color: '#334155', fontWeight: '500' }}>
                  {value} {label}
                </span>
              </div>
              <span style={{ color: '#64748b', fontWeight: '600' }}>
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function FormationEvaluationDashboard() {
  const [filters, setFilters] = useState({
    formation: '',
    username: '',
    sessions: ''
  });
  const [formationSearch, setFormationSearch] = useState('');
  const [sessionsSearch, setSessionsSearch] = useState('');
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wordCloudKey, setWordCloudKey] = useState(0);
  const [chartKeys, setChartKeys] = useState({});

  // Initialiser la suppression des erreurs ResizeObserver
  useEffect(() => {
    suppressResizeObserverErrors();
  }, []);

  // Fonction pour faire l'appel API
  const fetchData = async () => {
    if (!filters.sessions) return;
    
    setLoading(true);
    try {
      // Délai artificiel pour éviter les appels trop rapides
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockResponse = {
        data: [
          {
            "La formation a-t-elle répondu à vos attentes ? Va-t-elle vous servir dans votre travail ?": "Oui, parfaitement",
            "Les objectifs annoncés de la formation ont-ils été entièrement atteints ?": "Oui, parfaitement",
            "Quelles suggestions faites-vous pour les prochaines formations ?": "Plus de cas pratiques",
            "full_name": "XXXXXXXX XXXXXXXX",
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
            "full_name": "YYYYYYYY YYYYYYYY",
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
            "La formation a-t-elle répondu à vos attentes ? Va-t-elle vous servir dans votre travail ?": "Oui, parfaitement",
            "Les objectifs annoncés de la formation ont-ils été entièrement atteints ?": "Oui, parfaitement",
            "Quelles suggestions faites-vous pour les prochaines formations ?": "Améliorer les supports",
            "full_name": "ZZZZZZZZ ZZZZZZZZ",
            "matricule": "9761",
            "score": 4.5,
            "Êtes-vous satisfaits de la durée et du rythme de la formation ?": "Très satisfait",
            "Êtes-vous satisfaits de l'animation de la formation et de la prestation du formateur ?": "Très satisfait",
            "Êtes-vous satisfaits de l'équilibre entre théorie et pratique lors de la formation ?": "Très satisfait",
            "Êtes-vous satisfaits des méthodes et moyens utilisés par le formateur ?": "Très satisfait",
            "Êtes-vous satisfaits des services de pause-café et de restauration ?": "Très satisfait",
            "Êtes-vous satisfaits des supports utilisés (documents, vidéos, etc.) ?": "Très satisfait",
            "Êtes-vous satisfaits des échanges entre participants et des réponses du formateur ?": "Très satisfait",
            "Êtes-vous satisfaits du cadre de formation (salle, matériel, etc.) ?": "Très satisfait"
          }
        ],
        ok: true,
        prepared_text_for_word_cloud: "Faire Revenir Excellent Formateur Formateur Excellent",
        quiz: {
          "La formation a-t-elle répondu à vos attentes ? Va-t-elle vous servir dans votre travail ?": {
            "Oui, parfaitement": 3
          },
          "Les objectifs annoncés de la formation ont-ils été entièrement atteints ?": {
            "Oui, parfaitement": 3
          },
          "Êtes-vous satisfaits de la durée et du rythme de la formation ?": {
            "Satisfait": 1,
            "Très satisfait": 2
          },
          "Êtes-vous satisfaits de l'animation de la formation et de la prestation du formateur ?": {
            "Très satisfait": 3
          },
          "Êtes-vous satisfaits de l'équilibre entre théorie et pratique lors de la formation ?": {
            "Très satisfait": 3
          },
          "Êtes-vous satisfaits des méthodes et moyens utilisés par le formateur ?": {
            "Très satisfait": 3
          },
          "Êtes-vous satisfaits des services de pause-café et de restauration ?": {
            "Satisfait": 2,
            "Très satisfait": 1
          },
          "Êtes-vous satisfaits des supports utilisés (documents, vidéos, etc.) ?": {
            "Très satisfait": 3
          },
          "Êtes-vous satisfaits des échanges entre participants et des réponses du formateur ?": {
            "Très satisfait": 3
          },
          "Êtes-vous satisfaits du cadre de formation (salle, matériel, etc.) ?": {
            "Très satisfait": 3
          }
        }
      };
      
      setApiData(mockResponse);
    } catch (error) {
      console.warn('Erreur lors du fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters.sessions]);

  // Gestion des re-renders des graphiques avec debounce
  useEffect(() => {
    if (apiData?.quiz) {
      const timer = setTimeout(() => {
        const newChartKeys = {};
        Object.keys(apiData.quiz).forEach((question, index) => {
          newChartKeys[index] = Date.now() + Math.random();
        });
        setChartKeys(newChartKeys);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [apiData]);

  // Re-render périodique pour le WordCloud avec debounce
  useEffect(() => {
    if (apiData?.prepared_text_for_word_cloud) {
      const timer = setTimeout(() => {
        setWordCloudKey(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [apiData]);

  // Composant Word Cloud avec gestion d'erreurs et lazy loading
  const ModernWordCloud = () => {
    const [wordCloudError, setWordCloudError] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(container);
      return () => observer.disconnect();
    }, []);
    
    if (!apiData?.prepared_text_for_word_cloud) return null;

    const words = apiData.prepared_text_for_word_cloud
      .split(' ')
      .filter(word => word.length > 2)
      .map((word, index) => ({
        text: word,
        value: 30 + (index % 3) * 10 // Valeurs fixes pour éviter les recalculs
      }));

    const options = {
      colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'],
      enableTooltip: false,
      deterministic: true,
      fontFamily: 'Inter, sans-serif',
      fontSizes: [18, 40],
      fontStyle: 'normal',
      fontWeight: 'normal',
      padding: 4,
      rotations: 0,
      rotationAngles: [0],
      scale: 'linear',
      spiral: 'archimedean',
      transitionDuration: 0,
      enableOptimizations: true
    };

    const WordCloudWrapper = () => {
      if (!isVisible) return null;
      
      try {
        return (
          <div key={`wordcloud-${wordCloudKey}`} style={{ 
            width: '100%', 
            height: '100%',
            position: 'relative'
          }}>
            <ReactWordcloud
              words={words}
              options={options}
            />
          </div>
        );
      } catch (error) {
        setWordCloudError(true);
        return null;
      }
    };

    return (
      <div ref={containerRef} style={{
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        minHeight: '320px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h3 style={{
          margin: '0 0 28px 0',
          fontSize: '20px',
          fontWeight: '700',
          color: '#1e293b',
          textAlign: 'center',
          fontFamily: '"Inter", sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '24px' }}>💬</span>
          Commentaires et Suggestions
        </h3>
        
        <div style={{ 
          height: '250px', 
          width: '100%',
          position: 'relative'
        }}>
          {wordCloudError ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#64748b',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>💭</div>
              <div>Visualisation des commentaires temporairement indisponible</div>
              <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
                Mots clés: {words.map(w => w.text).join(', ')}
              </div>
            </div>
          ) : (
            <WordCloudWrapper />
          )}
        </div>
      </div>
    );
  };

  // Composant Filtres moderne
  const ModernFiltersPanel = () => {
    const [showFormationDropdown, setShowFormationDropdown] = useState(false);
    const [showSessionsDropdown, setShowSessionsDropdown] = useState(false);
    const [showParticipantsDropdown, setShowParticipantsDropdown] = useState(false);

    const formations = [
      'Programme de Management Avancé',
      'Formation Leadership & Innovation',
      'Gestion de Projet Agile',
      'Communication Interpersonnelle',
      'Développement Commercial Digital'
    ];

    const sessions = [
      'Session Avril 2023',
      'Session Mai 2023', 
      'Session Juin 2023',
      'Session Septembre 2023',
      'Session Octobre 2023'
    ];

    const participants = apiData?.data ? apiData.data.map(item => ({
      name: item.full_name,
      matricule: item.matricule
    })) : [];

    const filteredFormations = formations.filter(formation => 
      formation.toLowerCase().includes(formationSearch.toLowerCase())
    );

    const filteredSessions = sessions.filter(session => 
      session.toLowerCase().includes(sessionsSearch.toLowerCase())
    );

    const filteredParticipants = participants.filter(participant => 
      participant.name.toLowerCase().includes((filters.username?.name || '').toLowerCase()) ||
      participant.matricule.toLowerCase().includes((filters.username?.matricule || '').toLowerCase())
    );

    const AutoCompleteSelect = ({ title, icon, options, value, onChange, placeholder, searchValue, setSearchValue, showDropdown, setShowDropdown, displayKey = null }) => (
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        transition: 'all 0.3s ease',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px'
        }}>
          <span style={{ fontSize: '18px' }}>{icon}</span>
          <label style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#334155',
            fontFamily: '"Inter", sans-serif'
          }}>
            {title}
          </label>
        </div>
        
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              padding: '12px 40px 12px 16px',
              borderRadius: '12px',
              border: '2px solid rgba(148, 163, 184, 0.3)',
              fontSize: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              fontFamily: '"Inter", sans-serif',
              transition: 'all 0.3s ease',
              outline: 'none',
              cursor: 'pointer',
              boxSizing: 'border-box'
            }}
          />
          <span style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#64748b',
            fontSize: '12px',
            pointerEvents: 'none'
          }}>
            ▼
          </span>

          {showDropdown && options.length > 0 && (
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                maxHeight: '200px',
                overflowY: 'auto',
                border: '2px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                marginTop: '4px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                zIndex: 1000,
                backdropFilter: 'blur(20px)'
              }}>
              {options.map((option, index) => {
                const displayValue = displayKey ? option[displayKey] : option;
                const isSelected = value === (displayKey ? option : option);
                
                return (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(displayKey ? option : option);
                      setSearchValue('');
                      setShowDropdown(false);
                    }}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      borderBottom: index < options.length - 1 ? '1px solid rgba(148, 163, 184, 0.1)' : 'none',
                      fontSize: '13px',
                      backgroundColor: isSelected ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                      fontFamily: '"Inter", sans-serif',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.15)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = isSelected ? 'rgba(16, 185, 129, 0.1)' : 'transparent'}
                  >
                    <span>{displayKey ? `${option.name} (${option.matricule})` : option}</span>
                    {isSelected && <span style={{ color: '#10b981', fontSize: '14px' }}>✓</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {value && (
          <div style={{
            marginTop: '12px',
            padding: '10px 14px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '10px',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{displayKey ? `${value.name} (${value.matricule})` : value}</span>
            <button
              onClick={() => onChange('')}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '10px'
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>
    );

    // Filtre les données en fonction des sélections
    const getFilteredData = () => {
      if (!apiData?.data) return [];
      
      let filtered = apiData.data;
      
      if (filters.username) {
        filtered = filtered.filter(item => 
          item.full_name === filters.username.name || 
          item.matricule === filters.username.matricule
        );
      }
      
      return filtered;
    };

    const filteredData = getFilteredData();
    const participantCount = filteredData.length;
    const totalParticipants = apiData?.data ? apiData.data.length : 0;

    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '28px',
        position: 'sticky',
        top: '20px',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.08)'
      }}>
        <h3 style={{
          margin: '0 0 28px 0',
          fontSize: '20px',
          fontWeight: '700',
          color: '#1e293b',
          textAlign: 'center',
          fontFamily: '"Inter", sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '24px' }}>🔍</span>
          Filtres Intelligents
        </h3>
        
        <AutoCompleteSelect
          title="Formation"
          icon="📚"
          options={filteredFormations}
          value={filters.formation}
          onChange={(value) => setFilters({...filters, formation: value})}
          placeholder="Sélectionner une formation..."
          searchValue={formationSearch}
          setSearchValue={setFormationSearch}
          showDropdown={showFormationDropdown}
          setShowDropdown={setShowFormationDropdown}
        />

        <AutoCompleteSelect
          title="Sessions"
          icon="📅"
          options={filteredSessions}
          value={filters.sessions}
          onChange={(value) => setFilters({...filters, sessions: value})}
          placeholder="Sélectionner une session..."
          searchValue={sessionsSearch}
          setSearchValue={setSessionsSearch}
          showDropdown={showSessionsDropdown}
          setShowDropdown={setShowSessionsDropdown}
        />

        <AutoCompleteSelect
          title="Participants"
          icon="👤"
          options={filteredParticipants}
          value={filters.username}
          onChange={(value) => setFilters({...filters, username: value})}
          placeholder="Sélectionner un participant..."
          searchValue=""
          setSearchValue={() => {}}
          showDropdown={showParticipantsDropdown}
          setShowDropdown={setShowParticipantsDropdown}
          displayKey="name"
        />

        <div style={{
          background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
          color: '#ffffff',
          padding: '16px',
          borderRadius: '16px',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: '700',
          fontFamily: '"Inter", sans-serif',
          boxShadow: '0 4px 16px rgba(51, 65, 85, 0.3)',
          marginTop: '20px'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>
            {participantCount} / {totalParticipants}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8, fontWeight: '500' }}>
            Participants affichés
          </div>
        </div>

        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            color: '#64748b',
            fontStyle: 'italic'
          }}>
            Chargement des données...
          </div>
        )}
      </div>
    );
  };

  // Calculer la moyenne générale depuis les données API
  const calculateAverageScore = () => {
    if (!apiData?.data || apiData.data.length === 0) return '4.6';
    const average = apiData.data.reduce((sum, item) => sum + item.score, 0) / apiData.data.length;
    return average.toFixed(1);
  };

  // Fonction pour calculer le total des réponses par catégorie
  const getTotalByAnswerType = (answerType) => {
    if (!apiData?.quiz) return 0;
    
    let total = 0;
    Object.values(apiData.quiz).forEach(questionData => {
      if (questionData[answerType]) {
        total += questionData[answerType];
      }
    });
    
    return total;
  };

  return (
    <div style={{
      fontFamily: '"Inter", sans-serif',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.15) 1px, transparent 0)',
        backgroundSize: '20px 20px',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: '32px',
        padding: '32px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Main Content */}
        <div>
          {/* Header */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            color: '#1e293b',
            padding: '32px',
            borderRadius: '24px',
            marginBottom: '32px',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h1 style={{
              margin: '0',
              fontSize: '28px',
              fontWeight: '800',
              textAlign: 'center',
              letterSpacing: '-0.02em',
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px'
            }}>
              <span style={{ fontSize: '32px' }}>📊</span>
              ANALYSE DES ÉVALUATIONS À CHAUD
            </h1>
            <p style={{
              margin: '12px 0 0 0',
              fontSize: '16px',
              textAlign: 'center',
              opacity: 0.7,
              position: 'relative',
              zIndex: 2,
              fontWeight: '500'
            }}>
              Tableau de bord interactif des formations
            </p>
          </div>

          {/* Module Info */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '28px',
            marginBottom: '32px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '28px',
            alignItems: 'center'
          }}>
            <div style={{ color: '#1e293b' }}>
              <div style={{ marginBottom: '12px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
                <span style={{ fontSize: '18px' }}>📚</span> <strong>Module:</strong> Programme de Management Avancé
              </div>
              <div style={{ marginBottom: '12px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
                <span style={{ fontSize: '18px' }}>🏢</span> <strong>Cabinet:</strong> ESSEC Executive School
              </div>
              <div style={{ marginBottom: '12px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
                <span style={{ fontSize: '18px' }}>📍</span> <strong>Lieu:</strong> Abidjan
              </div>
              <div style={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
                <span style={{ fontSize: '18px' }}>📅</span> <strong>Période:</strong> Avril - Octobre 2023
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              padding: '28px 36px',
              borderRadius: '20px',
              textAlign: 'center',
              color: 'white',
              boxShadow: '0 8px 32px rgba(30, 41, 59, 0.3)',
              minWidth: '150px'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '6px', fontWeight: '500' }}>Moyenne générale</div>
              <div style={{ fontSize: '40px', fontWeight: '800', lineHeight: '1' }}>{calculateAverageScore()}</div>
              <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px', fontWeight: '500' }}>/ 5</div>
            </div>
          </div>

          {/* Legend - Dynamic from API Data */}
          {apiData?.quiz && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(16px)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px',
              boxShadow: '0 6px 32px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.4)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
                flexWrap: 'wrap'
              }}>
                {(() => {
                  // Extraire tous les types de réponses uniques
                  const allAnswers = new Set();
                  Object.values(apiData.quiz).forEach(questionData => {
                    Object.keys(questionData).forEach(answer => allAnswers.add(answer));
                  });
                  
                  // Mapper les réponses aux couleurs et icônes
                  const answerMap = {
                    'Très satisfait': { color: '#10b981', icon: '😍' },
                    'Satisfait': { color: '#3b82f6', icon: '😊' },
                    'Oui, parfaitement': { color: '#10b981', icon: '✅' },
                    'Oui': { color: '#3b82f6', icon: '👍' },
                    'Neutre': { color: '#f59e0b', icon: '😐' },
                    'Insatisfait': { color: '#ef4444', icon: '😕' },
                    'Très insatisfait': { color: '#64748b', icon: '😞' },
                    'Non': { color: '#ef4444', icon: '👎' }
                  };
                  
                  return Array.from(allAnswers).map((answer, index) => {
                    const config = answerMap[answer] || { color: '#94a3b8', icon: '🔘' };
                    const total = getTotalByAnswerType(answer);
                    return (
                      <div key={index} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        background: 'rgba(255, 255, 255, 0.8)',
                        padding: '10px 18px',
                        borderRadius: '14px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                      }}>
                        <span style={{ fontSize: '16px' }}>{config.icon}</span>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: config.color,
                          borderRadius: '50%',
                          boxShadow: `0 2px 8px ${config.color}40`
                        }}></div>
                        <span style={{ fontSize: '12px', color: '#334155', fontWeight: '500' }}>
                          {total} {answer}
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          )}

          {/* Pie Charts Grid */}
          {apiData?.quiz && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {Object.entries(apiData.quiz).map(([question, answers], index) => (
                <ApexPieChart 
                  key={`${index}-${JSON.stringify(answers)}`}
                  title={question}
                  data={answers}
                  color={['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'][index % 6]}
                  chartKey={chartKeys[index] || 0}
                />
              ))}
            </div>
          )}

          {/* Word Cloud */}
          {apiData?.prepared_text_for_word_cloud && (
            <ModernWordCloud />
          )}
        </div>

        {/* Filters Panel */}
        <ModernFiltersPanel />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(148, 163, 184, 0.1);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }
        
        /* Suppression des erreurs ResizeObserver dans les outils de développement */
        .react-wordcloud {
          overflow: hidden !important;
        }
        
        /* Stabilisation des graphiques ApexCharts */
        .apexcharts-canvas {
          overflow: hidden !important;
        }
        
        .apexcharts-tooltip {
          pointer-events: none !important;
        }
      `}</style>
    </div>
  );
};