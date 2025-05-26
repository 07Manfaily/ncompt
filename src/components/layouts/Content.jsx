import React from 'react';
import './content.css';

const Content = () => {
  return (
    <div className="content">
      <div className="content-wrapper">
        <h1 className="page-title">Bienvenue sur le Dashboard</h1>
        <p className="welcome-text">Ceci est la page d'accueil de votre tableau de bord. Sélectionnez un menu à gauche pour afficher son contenu.</p>
      </div>
    </div>
  );
};

export default Content;