import React, { useState } from 'react';

const SwaggerForm = () => {
  const [formData, setFormData] = useState({
    matricule: '',
    agent_actione: '',
    code_section: '',
    grade_indice_comment: '',
    corps_fedm: '',
    numero_table: '',
    cool_scale: '',
    La_fini: '',
    type_transport: '',
    cool_peage: '',
    cool_transport_aller_retour: '',
    ticket_aller: '',
    ticket_retour: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Données soumises:', formData);
    alert('Données soumises avec succès !');
  };

  const handleReset = () => {
    setFormData({
      matricule: '',
      agent_actione: '',
      code_section: '',
      grade_indice_comment: '',
      corps_fedm: '',
      numero_table: '',
      cool_scale: '',
      La_fini: '',
      type_transport: '',
      cool_peage: '',
      cool_transport_aller_retour: '',
      ticket_aller: '',
      ticket_retour: ''
    });
  };

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fc'
  };

  const headerStyle = {
    backgroundColor: '#2d3436',
    color: 'white',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center',
    marginBottom: '30px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
  };

  const titleStyle = {
    margin: '0 0 10px 0',
    fontSize: '28px',
    fontWeight: 'bold'
  };

  const subtitleStyle = {
    margin: '0',
    fontSize: '16px',
    opacity: '0.8',
    fontWeight: 'normal'
  };

  const sectionStyle = {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    marginBottom: '25px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e9ecef'
  };

  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #74b9ff'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px'
  };

  const fieldGroupStyle = {
    marginBottom: '0'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#2d3436',
    fontSize: '14px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backgroundColor: '#fff'
  };

  const inputFocusStyle = {
    borderColor: '#74b9ff',
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(116, 185, 255, 0.1)',
    backgroundColor: '#fff'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '30px',
    padding: '25px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  };

  const buttonStyle = (variant = 'primary') => ({
    padding: '14px 35px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: variant === 'primary' ? '#74b9ff' : '#636e72',
    color: 'white',
    minWidth: '120px'
  });

  const progressStyle = {
    width: '100%',
    height: '6px',
    backgroundColor: '#e9ecef',
    borderRadius: '3px',
    marginBottom: '20px',
    overflow: 'hidden'
  };

  const progressBarStyle = {
    height: '100%',
    backgroundColor: '#00b894',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
    width: `${(Object.values(formData).filter(value => value.trim() !== '').length / Object.keys(formData).length) * 100}%`
  };

  const personalFields = [
    { key: 'matricule', label: 'Matricule', type: 'text', placeholder: 'Ex: MAT001' },
    { key: 'agent_actione', label: 'Agent Action', type: 'text', placeholder: 'Action de l\'agent' },
    { key: 'code_section', label: 'Code Section', type: 'text', placeholder: 'Code de la section' }
  ];

  const gradeFields = [
    { key: 'grade_indice_comment', label: 'Grade Indice Comment', type: 'textarea', placeholder: 'Commentaires sur le grade et l\'indice...' },
    { key: 'corps_fedm', label: 'Corps FEDM', type: 'text', placeholder: 'Corps FEDM' },
    { key: 'numero_table', label: 'Numéro Table', type: 'number', placeholder: 'Numéro de table' },
    { key: 'cool_scale', label: 'Cool Scale', type: 'text', placeholder: 'Échelle cool' }
  ];

  const transportFields = [
    { key: 'La_fini', label: 'La Fini', type: 'text', placeholder: 'Information La Fini' },
    { key: 'type_transport', label: 'Type Transport', type: 'select', options: ['Voiture', 'Train', 'Avion', 'Bus', 'Métro', 'Taxi'] },
    { key: 'cool_peage', label: 'Cool Péage', type: 'text', placeholder: 'Informations péage' },
    { key: 'cool_transport_aller_retour', label: 'Transport Aller-Retour', type: 'text', placeholder: 'Détails transport aller-retour' },
    { key: 'ticket_aller', label: 'Ticket Aller', type: 'text', placeholder: 'Référence ticket aller' },
    { key: 'ticket_retour', label: 'Ticket Retour', type: 'text', placeholder: 'Référence ticket retour' }
  ];

  const renderField = (field) => {
    const commonProps = {
      id: field.key,
      value: formData[field.key],
      onChange: (e) => handleInputChange(field.key, e.target.value),
      style: inputStyle,
      onFocus: (e) => Object.assign(e.target.style, inputFocusStyle),
      onBlur: (e) => Object.assign(e.target.style, inputStyle),
      placeholder: field.placeholder
    };

    return (
      <div key={field.key} style={fieldGroupStyle}>
        <label htmlFor={field.key} style={labelStyle}>
          {field.label}
        </label>
        {field.type === 'textarea' ? (
          <textarea
            {...commonProps}
            rows="3"
          />
        ) : field.type === 'select' ? (
          <select {...commonProps}>
            <option value="">-- Sélectionner --</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            {...commonProps}
            type={field.type}
          />
        )}
      </div>
    );
  };

  const completedFields = Object.values(formData).filter(value => value.trim() !== '').length;
  const totalFields = Object.keys(formData).length;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Formulaire de Gestion</h1>
        <p style={subtitleStyle}>Système de saisie des données administratives</p>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '25px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2d3436' }}>
            Progression: {completedFields}/{totalFields} champs remplis
          </span>
          <span style={{ fontSize: '14px', color: '#00b894', fontWeight: 'bold' }}>
            {Math.round((completedFields / totalFields) * 100)}%
          </span>
        </div>
        <div style={progressStyle}>
          <div style={progressBarStyle}></div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>📋 Informations Personnelles</h2>
        <div style={gridStyle}>
          {personalFields.map(renderField)}
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>🏅 Grade & Classification</h2>
        <div style={gridStyle}>
          {gradeFields.map(renderField)}
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>🚗 Transport & Déplacements</h2>
        <div style={gridStyle}>
          {transportFields.map(renderField)}
        </div>
      </div>

      <div style={buttonContainerStyle}>
        <button
          type="button"
          style={buttonStyle('secondary')}
          onClick={handleReset}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#2d3436';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#636e72';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          🔄 Réinitialiser
        </button>
        <button
          type="button"
          style={buttonStyle('primary')}
          onClick={handleSubmit}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0984e3';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#74b9ff';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          ✅ Enregistrer
        </button>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f1f2f6',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <details style={{ cursor: 'pointer' }}>
          <summary style={{ fontSize: '14px', fontWeight: 'bold', color: '#2d3436', marginBottom: '10px' }}>
            📊 Aperçu des données saisies
          </summary>
          <pre style={{ 
            marginTop: '15px', 
            fontSize: '12px', 
            overflow: 'auto',
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default SwaggerForm;