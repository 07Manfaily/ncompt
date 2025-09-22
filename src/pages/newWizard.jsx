import React, { useState, useEffect } from 'react';

const FormationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  const [formData, setFormData] = useState({
    year: '',
    title: '',
    objectif_formation: '',
    ogf: '',
    thematique: '',
    type_de_programme: '',
    origine_de_la_demande: '',
    formation_obligatoire: false,
    formation_diplomante: false,
    priorite: '',
    mode_diffusion: '',
    type: '',
    formateur: '',
    effectifTotal: '',
    duree_heures: '',
    date_de_debut: '',
    date_de_fin: '',
    periode: '',
    conception_animation: '',
    couts_logistique: '',
    statut: '',
    eligible: 1,
    directions: [],
    objectives: []
  });

  const [newDirection, setNewDirection] = useState('');
  const [newObjective, setNewObjective] = useState('');

  const steps = [
    { id: 1, title: 'Informations Générales', icon: '📋', color: '#6366f1' },
    { id: 2, title: 'Configuration', icon: '⚙️', color: '#8b5cf6' },
    { id: 3, title: 'Planification', icon: '📅', color: '#06b6d4' },
    { id: 4, title: 'Budget & Coûts', icon: '💰', color: '#10b981' },
    { id: 5, title: 'Équipes & Objectifs', icon: '🎯', color: '#f59e0b' },
    { id: 6, title: 'Finalisation', icon: '✨', color: '#ef4444' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setCompletedSteps([...completedSteps, currentStep]);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const goToStep = (stepNumber) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(stepNumber);
      setIsAnimating(false);
    }, 300);
  };

  const addDirection = () => {
    if (newDirection.trim()) {
      setFormData(prev => ({
        ...prev,
        directions: [...prev.directions, newDirection.trim()]
      }));
      setNewDirection('');
    }
  };

  const removeDirection = (index) => {
    setFormData(prev => ({
      ...prev,
      directions: prev.directions.filter((_, i) => i !== index)
    }));
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      setFormData(prev => ({
        ...prev,
        objectives: [...prev.objectives, newObjective.trim()]
      }));
      setNewObjective('');
    }
  };

  const removeObjective = (index) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    const dataToSend = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key !== 'directions' && key !== 'objectives') {
        dataToSend.append(key, formData[key]);
      }
    });

    dataToSend.append('prevision_department_repartition', JSON.stringify(formData.directions));
    dataToSend.append('objectives', JSON.stringify(formData.objectives));

    console.log('🚀 Données prêtes pour l\'API:', Object.fromEntries(dataToSend));
    alert('✅ Formation créée avec succès ! Vérifiez la console pour les détails.');
  };

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  };

  const wizardContainerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    overflow: 'hidden'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    padding: '32px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const progressBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    position: 'relative'
  };

  const progressLineStyle = {
    position: 'absolute',
    top: '20px',
    left: '0',
    right: '0',
    height: '3px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
    borderRadius: '2px',
    zIndex: 1
  };

  const progressFillStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
    borderRadius: '2px',
    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
    zIndex: 2
  };

  const stepIndicatorStyle = (step) => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 3,
    position: 'relative',
    background: step.id === currentStep 
      ? `linear-gradient(135deg, ${step.color} 0%, ${step.color}dd 100%)` 
      : completedSteps.includes(step.id)
      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      : 'rgba(255, 255, 255, 0.2)',
    color: step.id === currentStep || completedSteps.includes(step.id) ? 'white' : 'rgba(255,255,255,0.7)',
    transform: step.id === currentStep ? 'scale(1.1)' : 'scale(1)',
    boxShadow: step.id === currentStep 
      ? `0 8px 25px ${step.color}40` 
      : completedSteps.includes(step.id)
      ? '0 4px 15px rgba(16, 185, 129, 0.3)'
      : 'none'
  });

  const contentStyle = {
    padding: '48px',
    minHeight: '500px',
    transform: isAnimating ? 'translateX(20px)' : 'translateX(0)',
    opacity: isAnimating ? 0 : 1,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    border: '2px solid transparent',
    borderRadius: '12px',
    fontSize: '16px',
    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '12px',
    fontWeight: '600',
    color: '#1f2937',
    fontSize: '15px',
    letterSpacing: '0.025em'
  };

  const buttonStyle = (variant = 'primary') => ({
    padding: '14px 28px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: variant === 'primary' 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'rgba(107, 114, 128, 0.1)',
    color: variant === 'primary' ? 'white' : '#374151',
    boxShadow: variant === 'primary' 
      ? '0 4px 15px rgba(102, 126, 234, 0.4)'
      : 'none',
    transform: 'translateY(0)',
    backdropFilter: 'blur(10px)'
  });

  const tagStyle = {
    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    margin: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>📋</div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                Informations Générales
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Commençons par les informations de base de votre formation
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              marginBottom: '32px'
            }}>
              <div>
                <label style={labelStyle}>Année de formation *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="2024"
                />
              </div>
              
              <div>
                <label style={labelStyle}>Titre de la formation *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Ex: Formation Management d'équipe"
                />
              </div>
              
              <div>
                <label style={labelStyle}>Code OGF</label>
                <input
                  type="text"
                  name="ogf"
                  value={formData.ogf}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Code organisationnel"
                />
              </div>
              
              <div>
                <label style={labelStyle}>Thématique</label>
                <select
                  name="thematique"
                  value={formData.thematique}
                  onChange={handleInputChange}
                  style={{...inputStyle, cursor: 'pointer'}}
                >
                  <option value="">Choisir une thématique...</option>
                  <option value="management">🎯 Management</option>
                  <option value="technique">⚙️ Technique</option>
                  <option value="commercial">💼 Commercial</option>
                  <option value="rh">👥 Ressources Humaines</option>
                  <option value="finance">💰 Finance</option>
                  <option value="juridique">⚖️ Juridique</option>
                </select>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '24px',
              marginTop: '32px'
            }}>
              <div>
                <label style={labelStyle}>Objectif principal de la formation</label>
                <textarea
                  name="objectif_formation"
                  value={formData.objectif_formation}
                  onChange={handleInputChange}
                  style={{
                    ...inputStyle,
                    minHeight: '120px',
                    resize: 'vertical'
                  }}
                  placeholder="Décrivez en détail les objectifs et les compétences que cette formation vise à développer..."
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>⚙️</div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                Configuration du Programme
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Définissez les paramètres et modalités de votre formation
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              marginBottom: '32px'
            }}>
              <div>
                <label style={labelStyle}>Type de programme</label>
                <select
                  name="type_de_programme"
                  value={formData.type_de_programme}
                  onChange={handleInputChange}
                  style={{...inputStyle, cursor: 'pointer'}}
                >
                  <option value="">Sélectionner le type...</option>
                  <option value="interne">🏢 Formation Interne</option>
                  <option value="externe">🌐 Formation Externe</option>
                  <option value="mixte">🔄 Formation Mixte</option>
                </select>
              </div>
              
              <div>
                <label style={labelStyle}>Origine de la demande</label>
                <select
                  name="origine_de_la_demande"
                  value={formData.origine_de_la_demande}
                  onChange={handleInputChange}
                  style={{...inputStyle, cursor: 'pointer'}}
                >
                  <option value="">Sélectionner l'origine...</option>
                  <option value="direction">👔 Direction</option>
                  <option value="employe">👤 Employé</option>
                  <option value="rh">👥 Ressources Humaines</option>
                  <option value="reglementaire">📋 Réglementaire</option>
                </select>
              </div>
              
              <div>
                <label style={labelStyle}>Niveau de priorité</label>
                <select
                  name="priorite"
                  value={formData.priorite}
                  onChange={handleInputChange}
                  style={{...inputStyle, cursor: 'pointer'}}
                >
                  <option value="">Définir la priorité...</option>
                  <option value="haute">🔴 Priorité Haute</option>
                  <option value="moyenne">🟡 Priorité Moyenne</option>
                  <option value="basse">🟢 Priorité Basse</option>
                </select>
              </div>
              
              <div>
                <label style={labelStyle}>Mode de diffusion</label>
                <select
                  name="mode_diffusion"
                  value={formData.mode_diffusion}
                  onChange={handleInputChange}
                  style={{...inputStyle, cursor: 'pointer'}}
                >
                  <option value="">Choisir le mode...</option>
                  <option value="presentiel">🏫 Présentiel</option>
                  <option value="distanciel">💻 Distanciel</option>
                  <option value="hybride">🔄 Hybride</option>
                </select>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '16px',
                border: '2px solid rgba(102, 126, 234, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleInputChange({target: {name: 'formation_obligatoire', type: 'checkbox', checked: !formData.formation_obligatoire}})}>
                <input
                  type="checkbox"
                  name="formation_obligatoire"
                  checked={formData.formation_obligatoire}
                  onChange={handleInputChange}
                  style={{ 
                    transform: 'scale(1.3)',
                    accentColor: '#667eea'
                  }}
                />
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px', color: '#1f2937' }}>
                    Formation obligatoire
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Participation requise pour tous
                  </div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '16px',
                border: '2px solid rgba(102, 126, 234, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleInputChange({target: {name: 'formation_diplomante', type: 'checkbox', checked: !formData.formation_diplomante}})}>
                <input
                  type="checkbox"
                  name="formation_diplomante"
                  checked={formData.formation_diplomante}
                  onChange={handleInputChange}
                  style={{ 
                    transform: 'scale(1.3)',
                    accentColor: '#667eea'
                  }}
                />
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px', color: '#1f2937' }}>
                    Formation diplomante
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Délivre un certificat/diplôme
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>📅</div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                Planification & Détails
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Organisez les aspects logistiques de votre formation
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '24px'
            }}>
              <div>
                <label style={labelStyle}>Type de formation</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Ex: Séminaire, Workshop..."
                />
              </div>
              
              <div>
                <label style={labelStyle}>Formateur principal</label>
                <input
                  type="text"
                  name="formateur"
                  value={formData.formateur}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Nom du formateur"
                />
              </div>
              
              <div>
                <label style={labelStyle}>Effectif total prévu</label>
                <input
                  type="number"
                  name="effectifTotal"
                  value={formData.effectifTotal}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Nombre de participants"
                />
              </div>
              
              <div>
                <label style={labelStyle}>Durée (en heures)</label>
                <input
                  type="number"
                  name="duree_heures"
                  value={formData.duree_heures}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Ex: 14"
                />
              </div>
              
              <div>
                <label style={labelStyle}>Date de début</label>
                <input
                  type="date"
                  name="date_de_debut"
                  value={formData.date_de_debut}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={labelStyle}>Date de fin</label>
                <input
                  type="date"
                  name="date_de_fin"
                  value={formData.date_de_fin}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={labelStyle}>Période</label>
                <select
                  name="periode"
                  value={formData.periode}
                  onChange={handleInputChange}
                  style={{...inputStyle, cursor: 'pointer'}}
                >
                  <option value="">Sélectionner...</option>
                  <option value="T1">📅 Trimestre 1</option>
                  <option value="T2">📅 Trimestre 2</option>
                  <option value="T3">📅 Trimestre 3</option>
                  <option value="T4">📅 Trimestre 4</option>
                </select>
              </div>
              
              <div>
                <label style={labelStyle}>Statut actuel</label>
                <select
                  name="statut"
                  value={formData.statut}
                  onChange={handleInputChange}
                  style={{...inputStyle, cursor: 'pointer'}}
                >
                  <option value="">Définir le statut...</option>
                  <option value="planifie">📋 Planifié</option>
                  <option value="en_cours">⏳ En cours</option>
                  <option value="termine">✅ Terminé</option>
                  <option value="annule">❌ Annulé</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>💰</div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                Budget & Coûts
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Définissez le budget alloué à cette formation
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <div style={{
                padding: '32px',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                borderRadius: '20px',
                border: '2px solid rgba(16, 185, 129, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '16px'
                }}>🎨</div>
                <label style={{...labelStyle, textAlign: 'center', fontSize: '16px', fontWeight: '700'}}>
                  Coût Conception & Animation
                </label>
                <input
                  type="number"
                  name="conception_animation"
                  value={formData.conception_animation}
                  onChange={handleInputChange}
                  style={{
                    ...inputStyle,
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: '600',
                    marginTop: '8px'
                  }}
                  placeholder="0,00 €"
                  step="0.01"
                />
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginTop: '12px',
                  lineHeight: '1.5'
                }}>
                  Frais de préparation, développement du contenu et animation
                </p>
              </div>
              
              <div style={{
                padding: '32px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '20px',
                border: '2px solid rgba(59, 130, 246, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '16px'
                }}>🚚</div>
                <label style={{...labelStyle, textAlign: 'center', fontSize: '16px', fontWeight: '700'}}>
                  Coûts Logistique
                </label>
                <input
                  type="number"
                  name="couts_logistique"
                  value={formData.couts_logistique}
                  onChange={handleInputChange}
                  style={{
                    ...inputStyle,
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: '600',
                    marginTop: '8px'
                  }}
                  placeholder="0,00 €"
                  step="0.01"
                />
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginTop: '12px',
                  lineHeight: '1.5'
                }}>
                  Salle, matériel, restauration, déplacements
                </p>
              </div>
            </div>

            <div style={{
              marginTop: '40px',
              padding: '24px',
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '16px',
              border: '2px solid rgba(102, 126, 234, 0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                💡 Coût Total Estimé
              </h3>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {((parseFloat(formData.conception_animation) || 0) + (parseFloat(formData.couts_logistique) || 0)).toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>🎯</div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                Équipes & Objectifs
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Définissez les directions concernées et les objectifs spécifiques
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px'
            }}>
              {/* Directions */}
              <div style={{
                padding: '32px',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '20px',
                border: '2px solid rgba(245, 158, 11, 0.3)'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#92400e',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  🏢 Directions Concernées
                </h3>
                
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <input
                    type="text"
                    value={newDirection}
                    onChange={(e) => setNewDirection(e.target.value)}
                    style={{
                      ...inputStyle,
                      flex: 1,
                      background: 'white'
                    }}
                    placeholder="Ex: Direction Commerciale"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDirection())}
                  />
                  <button
                    type="button"
                    onClick={addDirection}
                    style={{
                      ...buttonStyle('primary'),
                      minWidth: 'auto',
                      padding: '16px 20px',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
                    }}
                  >
                    ➕
                  </button>
                </div>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  minHeight: '100px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '12px',
                  border: '1px solid rgba(245, 158, 11, 0.2)'
                }}>
                  {formData.directions.length === 0 ? (
                    <div style={{
                      width: '100%',
                      textAlign: 'center',
                      color: '#92400e',
                      fontSize: '14px',
                      fontStyle: 'italic',
                      padding: '20px'
                    }}>
                      Aucune direction ajoutée
                    </div>
                  ) : (
                    formData.directions.map((direction, index) => (
                      <div key={index} style={{
                        ...tagStyle,
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                        color: 'white',
                        fontWeight: '500'
                      }}>
                        {direction}
                        <button
                          type="button"
                          onClick={() => removeDirection(index)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '18px',
                            padding: 0,
                            fontWeight: 'bold'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Objectifs */}
              <div style={{
                padding: '32px',
                background: 'linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)',
                borderRadius: '20px',
                border: '2px solid rgba(139, 92, 246, 0.3)'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#5b21b6',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  🎯 Objectifs Spécifiques
                </h3>
                
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <input
                    type="text"
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    style={{
                      ...inputStyle,
                      flex: 1,
                      background: 'white'
                    }}
                    placeholder="Ex: Améliorer la communication"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                  />
                  <button
                    type="button"
                    onClick={addObjective}
                    style={{
                      ...buttonStyle('primary'),
                      minWidth: 'auto',
                      padding: '16px 20px',
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
                    }}
                  >
                    ➕
                  </button>
                </div>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  minHeight: '100px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '12px',
                  border: '1px solid rgba(139, 92, 246, 0.2)'
                }}>
                  {formData.objectives.length === 0 ? (
                    <div style={{
                      width: '100%',
                      textAlign: 'center',
                      color: '#5b21b6',
                      fontSize: '14px',
                      fontStyle: 'italic',
                      padding: '20px'
                    }}>
                      Aucun objectif défini
                    </div>
                  ) : (
                    formData.objectives.map((objective, index) => (
                      <div key={index} style={{
                        ...tagStyle,
                        background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
                        color: 'white',
                        fontWeight: '500'
                      }}>
                        {objective}
                        <button
                          type="button"
                          onClick={() => removeObjective(index)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '18px',
                            padding: 0,
                            fontWeight: 'bold'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>✨</div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                Récapitulatif & Finalisation
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Vérifiez les informations avant de créer votre plan de formation
              </p>
            </div>

            <div style={{
              display: 'grid',
              gap: '24px'
            }}>
              {/* Résumé des informations */}
              <div style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '16px',
                border: '2px solid rgba(102, 126, 234, 0.1)'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '16px'
                }}>
                  📋 Informations Principales
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px'
                }}>
                  <div><strong>Titre:</strong> {formData.title || 'Non défini'}</div>
                  <div><strong>Année:</strong> {formData.year || 'Non définie'}</div>
                  <div><strong>Thématique:</strong> {formData.thematique || 'Non définie'}</div>
                  <div><strong>Type:</strong> {formData.type_de_programme || 'Non défini'}</div>
                  <div><strong>Priorité:</strong> {formData.priorite || 'Non définie'}</div>
                  <div><strong>Mode:</strong> {formData.mode_diffusion || 'Non défini'}</div>
                </div>
              </div>

              {/* Planning */}
              <div style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                borderRadius: '16px',
                border: '2px solid rgba(16, 185, 129, 0.2)'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#065f46',
                  marginBottom: '16px'
                }}>
                  📅 Planning & Logistique
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px'
                }}>
                  <div><strong>Formateur:</strong> {formData.formateur || 'Non défini'}</div>
                  <div><strong>Effectif:</strong> {formData.effectifTotal || 'Non défini'}</div>
                  <div><strong>Durée:</strong> {formData.duree_heures ? `${formData.duree_heures}h` : 'Non définie'}</div>
                  <div><strong>Période:</strong> {formData.periode || 'Non définie'}</div>
                  <div><strong>Début:</strong> {formData.date_de_debut || 'Non définie'}</div>
                  <div><strong>Fin:</strong> {formData.date_de_fin || 'Non définie'}</div>
                </div>
              </div>

              {/* Budget */}
              <div style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                borderRadius: '16px',
                border: '2px solid rgba(245, 158, 11, 0.2)'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#92400e',
                  marginBottom: '16px'
                }}>
                  💰 Budget
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '16px'
                }}>
                  <div><strong>Conception/Animation:</strong> {formData.conception_animation ? `${parseFloat(formData.conception_animation).toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}` : '0 €'}</div>
                  <div><strong>Logistique:</strong> {formData.couts_logistique ? `${parseFloat(formData.couts_logistique).toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}` : '0 €'}</div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#92400e'
                  }}>
                    <strong>Total:</strong> {((parseFloat(formData.conception_animation) || 0) + (parseFloat(formData.couts_logistique) || 0)).toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}
                  </div>
                </div>
              </div>

              {/* Directions et Objectifs */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px'
              }}>
                <div style={{
                  padding: '24px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '16px',
                  border: '2px solid rgba(245, 158, 11, 0.2)'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#92400e',
                    marginBottom: '16px'
                  }}>
                    🏢 Directions ({formData.directions.length})
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {formData.directions.length === 0 ? (
                      <span style={{ color: '#6b7280', fontStyle: 'italic' }}>Aucune direction</span>
                    ) : (
                      formData.directions.map((direction, index) => (
                        <span key={index} style={{
                          background: 'rgba(245, 158, 11, 0.2)',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: '#92400e',
                          fontWeight: '500'
                        }}>
                          {direction}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <div style={{
                  padding: '24px',
                  background: 'linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)',
                  borderRadius: '16px',
                  border: '2px solid rgba(139, 92, 246, 0.2)'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#5b21b6',
                    marginBottom: '16px'
                  }}>
                    🎯 Objectifs ({formData.objectives.length})
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {formData.objectives.length === 0 ? (
                      <span style={{ color: '#6b7280', fontStyle: 'italic' }}>Aucun objectif</span>
                    ) : (
                      formData.objectives.map((objective, index) => (
                        <span key={index} style={{
                          background: 'rgba(139, 92, 246, 0.2)',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: '#5b21b6',
                          fontWeight: '500'
                        }}>
                          {objective}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Bouton de finalisation */}
              <div style={{
                textAlign: 'center',
                marginTop: '32px'
              }}>
                <button
                  type="button"
                  onClick={handleSubmit}
                  style={{
                    ...buttonStyle('primary'),
                    fontSize: '20px',
                    padding: '20px 60px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    boxShadow: '0 8px 25px rgba(239, 68, 68, 0.4)',
                    transform: 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.05) translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(239, 68, 68, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1) translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.4)';
                  }}
                >
                  🚀 Créer le Plan de Formation
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={wizardContainerStyle}>
        {/* Header avec progress */}
        <div style={headerStyle}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '32px',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            🎓 Assistant de Création de Formation
          </h1>
          
          <div style={progressBarStyle}>
            <div style={progressLineStyle}>
              <div style={progressFillStyle}></div>
            </div>
            
            {steps.map((step) => (
              <div
                key={step.id}
                style={stepIndicatorStyle(step)}
                onClick={() => goToStep(step.id)}
                title={step.title}
              >
                {completedSteps.includes(step.id) ? '✓' : step.icon}
              </div>
            ))}
          </div>
          
          <div style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Étape {currentStep} sur {steps.length} • {steps[currentStep - 1].title}
          </div>
        </div>

        {/* Contenu */}
        <div style={contentStyle}>
          {renderStep()}
        </div>

        {/* Navigation */}
        <div style={{
          padding: '32px 48px',
          borderTop: '1px solid rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
        }}>
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            style={{
              ...buttonStyle('secondary'),
              opacity: currentStep === 1 ? 0.5 : 1,
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            ← Précédent
          </button>
          
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            {Math.round((currentStep / steps.length) * 100)}% terminé
          </div>
          
          {currentStep < steps.length && (
            <button
              onClick={nextStep}
              style={buttonStyle('primary')}
            >
              Suivant →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormationWizard;