<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formation Details Modal - Optimisé</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        }

        @keyframes fadeIn {
            to { opacity: 1; }
        }

        .modal-container {
            width: 95%;
            max-width: 1300px;
            max-height: 95vh;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            transform: scale(0.9);
            animation: scaleIn 0.3s ease forwards;
        }

        @keyframes scaleIn {
            to { transform: scale(1); }
        }

        .modal-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 24px 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
        }

        .modal-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
        }

        .header-content {
            display: flex;
            align-items: center;
            gap: 16px;
            position: relative;
            z-index: 1;
        }

        .header-icon {
            padding: 12px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .header-icon svg {
            width: 28px;
            height: 28px;
            fill: currentColor;
        }

        .header-text h1 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .header-text p {
            opacity: 0.9;
            font-size: 14px;
        }

        .close-button {
            background: rgba(255, 255, 255, 0.15);
            border: none;
            border-radius: 8px;
            padding: 8px;
            color: white;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            z-index: 1;
        }

        .close-button:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: scale(1.05);
        }

        .close-button svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .modal-content {
            padding: 32px;
            max-height: calc(95vh - 180px);
            overflow-y: auto;
        }

        .sections-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 24px;
            margin-bottom: 32px;
        }

        .bottom-sections {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 24px;
        }

        .section-card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.05);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .section-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid #f0f0f0;
        }

        .section-icon {
            padding: 8px;
            border-radius: 12px;
            margin-right: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .section-icon svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #2d3748;
        }

        .field-container {
            background: #f8fafc;
            border-radius: 12px;
            padding: 16px;
            border: 1px solid #e2e8f0;
            margin-bottom: 16px;
            transition: all 0.2s ease;
        }

        .field-container:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
        }

        .field-label {
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }

        .field-value {
            color: #2d3748;
            font-weight: 500;
            word-break: break-word;
        }

        .field-input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            background: white;
            font-size: 14px;
            transition: all 0.2s ease;
        }

        .field-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .field-select {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            background: white;
            font-size: 14px;
        }

        .field-textarea {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            background: white;
            font-size: 14px;
            resize: vertical;
            min-height: 60px;
        }

        .switches-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-top: 16px;
        }

        .switch-field {
            background: #f8fafc;
            border-radius: 12px;
            padding: 16px;
            border: 1px solid #e2e8f0;
            text-align: center;
        }

        .switch-label {
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }

        .switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 24px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }

        input:checked + .slider {
            background-color: #10b981;
        }

        input:checked + .slider:before {
            transform: translateX(26px);
        }

        .status-icon {
            width: 28px;
            height: 28px;
            fill: currentColor;
        }

        .status-icon.success {
            color: #10b981;
        }

        .status-icon.warning {
            color: #f59e0b;
        }

        .modal-footer {
            padding: 24px 32px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .footer-status {
            color: #64748b;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .footer-buttons {
            display: flex;
            gap: 16px;
        }

        .btn {
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            display: flex;
            align-items: center;
            gap: 8px;
            text-transform: none;
        }

        .btn-outline {
            background: white;
            border: 1px solid #d1d5db;
            color: #6b7280;
        }

        .btn-outline:hover {
            border-color: #9ca3af;
            background: #f9fafb;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(103, 126, 234, 0.3);
        }

        .btn-primary:hover {
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
            box-shadow: 0 6px 20px rgba(103, 126, 234, 0.4);
            transform: translateY(-1px);
        }

        .btn-success {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .btn-success:hover {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
            transform: translateY(-1px);
        }

        .btn svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
        }

        /* Couleurs des sections */
        .section-general .section-icon { background: rgba(103, 126, 234, 0.1); color: #667eea; }
        .section-organization .section-icon { background: rgba(118, 75, 162, 0.1); color: #764ba2; }
        .section-dates .section-icon { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .section-costs .section-icon { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .section-status .section-icon { background: rgba(168, 85, 247, 0.1); color: #a855f7; }

        /* Responsive */
        @media (max-width: 768px) {
            .modal-container {
                width: 98%;
                max-height: 98vh;
            }

            .modal-header {
                padding: 16px 20px;
            }

            .modal-content {
                padding: 20px;
            }

            .sections-grid {
                grid-template-columns: 1fr;
                gap: 16px;
            }

            .bottom-sections {
                grid-template-columns: 1fr;
                gap: 16px;
            }

            .switches-container {
                grid-template-columns: 1fr;
            }

            .header-content {
                gap: 12px;
            }

            .header-text h1 {
                font-size: 20px;
            }

            .section-card {
                padding: 16px;
            }
        }

        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div class="modal-overlay" id="modalOverlay">
        <div class="modal-container">
            <!-- Header -->
            <div class="modal-header">
                <div class="header-content">
                    <div class="header-icon">
                        <svg viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                    </div>
                    <div class="header-text">
                        <h1>Formation Details</h1>
                        <p>Gestion et suivi des formations</p>
                    </div>
                </div>
                <button class="close-button" onclick="closeModal()">
                    <svg viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>

            <!-- Content -->
            <div class="modal-content">
                <!-- Sections principales -->
                <div class="sections-grid">
                    <!-- Section Général -->
                    <div class="section-card section-general">
                        <div class="section-header">
                            <div class="section-icon">
                                <svg viewBox="0 0 24 24">
                                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                                </svg>
                            </div>
                            <div class="section-title">Informations générales</div>
                        </div>
                        <div class="fields-container" id="generalFields"></div>
                    </div>

                    <!-- Section Organisation -->
                    <div class="section-card section-organization">
                        <div class="section-header">
                            <div class="section-icon">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                                </svg>
                            </div>
                            <div class="section-title">Organisation</div>
                        </div>
                        <div class="fields-container" id="organizationFields"></div>
                    </div>

                    <!-- Section Dates -->
                    <div class="section-card section-dates">
                        <div class="section-header">
                            <div class="section-icon">
                                <svg viewBox="0 0 24 24">
                                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                                </svg>
                            </div>
                            <div class="section-title">Dates & Durées</div>
                        </div>
                        <div class="fields-container" id="datesFields"></div>
                    </div>
                </div>

                <!-- Sections du bas -->
                <div class="bottom-sections">
                    <!-- Section Coûts -->
                    <div class="section-card section-costs">
                        <div class="section-header">
                            <div class="section-icon">
                                <svg viewBox="0 0 24 24">
                                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                                </svg>
                            </div>
                            <div class="section-title">Coûts</div>
                        </div>
                        <div class="fields-container" id="costsFields"></div>
                    </div>

                    <!-- Section Statut -->
                    <div class="section-card section-status">
                        <div class="section-header">
                            <div class="section-icon">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                </svg>
                            </div>
                            <div class="section-title">Statut & avis</div>
                        </div>
                        <div class="fields-container" id="statusFields"></div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer">
                <div class="footer-status">
                    <span id="modeIndicator">👁️ Mode lecture seule</span>
                </div>
                <div class="footer-buttons">
                    <button class="btn btn-outline hidden" id="cancelBtn" onclick="cancelEdit()">
                        Annuler
                    </button>
                    <button class="btn btn-success hidden" id="saveBtn" onclick="saveChanges()">
                        <svg viewBox="0 0 24 24">
                            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                        </svg>
                        Enregistrer
                    </button>
                    <button class="btn btn-primary" id="editBtn" onclick="toggleEdit()">
                        <svg viewBox="0 0 24 24">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Configuration des données
        const CONFIG = {
            directions: ['Direction A', 'Direction B', 'Direction C'],
            priorites: ['Haute', 'Moyenne', 'Basse'],
            modes: ['Présentiel', 'Distanciel', 'Hybride'],
            types: ['Technique', 'Management', 'Soft Skills'],
            statuts: ['En cours', 'Terminé', 'Annulé', 'Planifié']
        };

        // Définition des sections
        const SECTIONS = {
            general: [
                { key: 'code_formation', label: 'Code formation', type: 'text' },
                { key: 'intitule_formation', label: 'Intitulé', type: 'text' },
                { key: 'objectif_formation', label: 'Objectif', type: 'text' },
                { key: 'ogf', label: 'OGF', type: 'text' },
                { key: 'thematique', label: 'Thématique', type: 'text' }
            ],
            organization: [
                { key: 'type_de_programme', label: 'Type de programme', type: 'text' },
                { key: 'origine_de_la_demande', label: 'Origine demande', type: 'text' },
                { key: 'direction', label: 'Direction', type: 'select', options: 'directions' },
                { key: 'profil_cible', label: 'Profil cible', type: 'text' },
                { key: 'priorite', label: 'Priorité', type: 'select', options: 'priorites' },
                { key: 'mode_diffusion', label: 'Mode diffusion', type: 'select', options: 'modes' },
                { key: 'type', label: 'Type', type: 'select', options: 'types' },
                { key: 'formateur', label: 'Formateur', type: 'text' },
                { key: 'nbr_session', label: 'Nb sessions', type: 'number' },
                { key: 'effectif', label: 'Effectif', type: 'number' }
            ],
            dates: [
                { key: 'date_de_debut', label: 'Date début', type: 'date' },
                { key: 'date_de_fin', label: 'Date fin', type: 'date' },
                { key: 'duree_jours', label: 'Durée (jours)', type: 'number' },
                { key: 'duree_heures', label: 'Durée (heures)', type: 'number' }
            ],
            costs: [
                { key: 'periode_couts', label: 'Période coûts', type: 'text' },
                { key: 'conception_animation', label: 'Conception/Animation', type: 'number', suffix: ' €' },
                { key: 'couts_logistique', label: 'Logistique', type: 'number', suffix: ' €' },
                { key: 'couts_total', label: 'Coût total', type: 'number', suffix: ' €' }
            ],
            status: [
                { key: 'statut', label: 'Statut', type: 'select', options: 'statuts' },
                { key: 'avis_drh', label: 'Avis DRH', type: 'textarea' }
            ]
        };

        // Données de démonstration
        const demoData = {
            code_formation: 'FORM2024-001',
            intitule_formation: 'Formation React Avancé',
            objectif_formation: 'Maîtriser React et ses écosystèmes',
            ogf: 'OGF-DEV',
            thematique: 'Développement Web',
            type_de_programme: 'Technique',
            origine_de_la_demande: 'Direction IT',
            direction: 'Direction A',
            profil_cible: 'Développeurs Senior',
            priorite: 'Haute',
            mode_diffusion: 'Hybride',
            type: 'Technique',
            formateur: 'Expert React',
            nbr_session: 5,
            effectif: 12,
            date_de_debut: '2024-03-01',
            date_de_fin: '2024-03-15',
            duree_jours: 10,
            duree_heures: 70,
            periode_couts: '2024',
            conception_animation: 15000,
            couts_logistique: 3000,
            couts_total: 18000,
            statut: 'En cours',
            avis_drh: 'Formation recommandée pour l\'équipe',
            formation_obligatoire: true,
            formation_diplomante: false
        };

        let isEditMode = false;
        let originalData = { ...demoData };

        // Initialisation
        document.addEventListener('DOMContentLoaded', function() {
            renderAllSections();
        });

        // Rendu de toutes les sections
        function renderAllSections() {
            renderSection('general', 'generalFields');
            renderSection('organization', 'organizationFields');
            renderSection('dates', 'datesFields');
            renderSection('costs', 'costsFields');
            renderStatusSection();
        }

        // Rendu d'une section
        function renderSection(sectionKey, containerId) {
            const container = document.getElementById(containerId);
            const fields = SECTIONS[sectionKey];
            
            container.innerHTML = fields.map(field => {
                const value = demoData[field.key];
                const displayValue = value ? value + (field.suffix || '') : 'Non défini';
                
                return `
                    <div class="field-container">
                        <div class="field-label">${field.label}</div>
                        <div class="field-value" id="${field.key}_display">${displayValue}</div>
                        <div class="field-edit hidden" id="${field.key}_edit">
                            ${renderFieldInput(field)}
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Rendu de la section statut avec switches
        function renderStatusSection() {
            const container = document.getElementById('statusFields');
            const fields = SECTIONS.status;
            
            const fieldsHtml = fields.map(field => {
                const value = demoData[field.key];
                const displayValue = value || 'Non défini';
                
                return `
                    <div class="field-container">
                        <div class="field-label">${field.label}</div>
                        <div class="field-value" id="${field.key}_display">${displayValue}</div>
                        <div class="field-edit hidden" id="${field.key}_edit">
                            ${renderFieldInput(field)}
                        </div>
                    </div>
                `;
            }).join('');

            const switchesHtml = `
                <div class="switches-container">
                    <div class="switch-field">
                        <div class="switch-label">Obligatoire</div>
                        <div id="formation_obligatoire_display">
                            ${demoData.formation_obligatoire ? 
                                '<svg class="status-icon success" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' :
                                '<svg class="status-icon warning" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>'
                            }
                        </div>
                        <div class="field-edit hidden" id="formation_obligatoire_edit">
                            <label class="switch">
                                <input type="checkbox" id="formation_obligatoire_input" ${demoData.formation_obligatoire ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                    <div class="switch-field">
                        <div class="switch-label">Diplômante</div>
                        <div id="formation_diplomante_display">
                            ${demoData.formation_diplomante ? 
                                '<svg class="status-icon success" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' :
                                '<svg class="status-icon warning" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>'
                            }
                        </div>
                        <div class="field-edit hidden" id="formation_diplomante_edit">
                            <label class="switch">
                                <input type="checkbox" id="formation_diplomante_input" ${demoData.formation_diplomante ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML = fieldsHtml + switchesHtml;
        }

        // Rendu d'un champ d'input
        function renderFieldInput(field) {
            const value = demoData[field.key] || '';
            
            switch (field.type) {
                case 'select':
                    const options = CONFIG[field.options] || [];
                    return `
                        <select class="field-select" id="${field.key}_input">
                            ${options.map(option => 
                                `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`
                            ).join('')}
                        </select>
                    `;
                case 'textarea':
                    return `<textarea class="field-textarea" id="${field.key}_input">${value}</textarea>`;
                case 'number':
                    return `<input type="number" class="field-input" id="${field.key}_input" value="${value}">`;
                case 'date':
                    return `<input type="date" class="field-input" id="${field.key}_input" value="${value}">`;
                default:
                    return `<input type="text" class="field-input" id="${field.key}_input" value="${value}">`;
            }
        }

        // Toggle edit mode
        function toggleEdit() {
            isEditMode = !isEditMode;
            updateUI();
        }

        // Cancel edit
        function cancelEdit() {
            isEditMode = false;
            demoData = { ...originalData };
            renderAllSections();
            updateUI();
        }

        // Save changes
        function saveChanges() {
            // Collecte des données depuis les inputs
            Object.keys(SECTIONS).forEach(sectionKey => {
                SECTIONS[sectionKey].forEach(field => {
                    const input = document.getElementById(`${field.key}_input`);
                    if (input) {
                        demoData[field.key] = input.value;
                    }
                });
            });

            // Collecte des switches
            const obligatoireInput = document.getElementById('formation_obligatoire_input');
            const diplomanteInput = document.getElementById('formation_diplomante_input');
            
            if (obligatoireInput) demoData.formation_obligatoire = obligatoireInput.checked;
            if (diplomanteInput) demoData.formation_diplomante = diplomanteInput.checked;

            originalData = { ...demoData };
            isEditMode = false;
            renderAllSections();
            updateUI();
            
            // Animation de confirmation
            showNotification('Modifications enregistrées avec succès!');
        }

        // Update UI based on mode
        function updateUI() {
            const modeIndicator = document.getElementById('modeIndicator');
            const editBtn = document.getElementById('editBtn');
            const saveBtn = document.getElementById('saveBtn');
            const cancelBtn = document.getElementById('cancelBtn');

            if (isEditMode) {
                modeIndicator.textContent = '✏️ Mode édition activé';
                editBtn.classList.add('hidden');
                saveBtn.classList.remove('hidden');
                cancelBtn.classList.remove('hidden');
                
                // Show edit fields, hide display fields
                document.querySelectorAll('.field-edit').forEach(el => el.classList.remove('hidden'));
                document.querySelectorAll('.field-value').forEach(el => el.classList.add('hidden'));
                document.querySelectorAll('[id$="_display"]').forEach(el => {
                    if (el.id.includes('formation_')) {
                        el.classList.add('hidden');
                    }
                });
            } else {
                modeIndicator.textContent = '👁️ Mode lecture seule';
                editBtn.classList.remove('hidden');
                saveBtn.classList.add('hidden');
                cancelBtn.classList.add('hidden');
                
                // Show display fields, hide edit fields
                document.querySelectorAll('.field-edit').forEach(el => el.classList.add('hidden'));
                document.querySelectorAll('.field-value').forEach(el => el.classList.remove('hidden'));
                document.querySelectorAll('[id$="_display"]').forEach(el => {
                    if (el.id.includes('formation_')) {
                        el.classList.remove('hidden');
                    }
                });
            }
        }

        // Close modal
        function closeModal() {
            const overlay = document.getElementById('modalOverlay');
            overlay.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                // En mode démo, on ne ferme pas vraiment
                overlay.style.animation = 'fadeIn 0.3s ease forwards';
            }, 300);
        }

        // Show notification
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
                z-index: 10000;
                animation: slideIn 0.3s ease forwards;
                font-weight: 600;
            `;
            notification.textContent = message;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            
            if (!document.querySelector('#notification-styles')) {
                style.id = 'notification-styles';
                document.head.appendChild(style);
            }
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }

        // Gestion du clavier
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (isEditMode) {
                    cancelEdit();
                } else {
                    closeModal();
                }
            }
            
            if (e.key === 'Enter' && e.ctrlKey && isEditMode) {
                saveChanges();
            }
        });

        // Animation d'entrée pour les cartes
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.section-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.animation = `cardSlideIn 0.6s ease forwards ${index * 0.1}s`;
            });
            
            const cardAnimationStyle = document.createElement('style');
            cardAnimationStyle.textContent = `
                @keyframes cardSlideIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(cardAnimationStyle);
        });

        // Amélioration de l'expérience utilisateur
        function addFieldValidation() {
            const inputs = document.querySelectorAll('.field-input, .field-select, .field-textarea');
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    this.style.borderColor = this.value.trim() ? '#10b981' : '#d1d5db';
                });
            });
        }

        // Auto-sauvegarde (optionnel)
        let autoSaveTimeout;
        function enableAutoSave() {
            const inputs = document.querySelectorAll('.field-input, .field-select, .field-textarea');
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    clearTimeout(autoSaveTimeout);
                    autoSaveTimeout = setTimeout(() => {
                        if (isEditMode) {
                            // Auto-save logic here
                            console.log('Auto-saving...');
                        }
                    }, 2000);
                });
            });
        }

        // Initialisation des améliorations UX
        setTimeout(() => {
            addFieldValidation();
            // enableAutoSave(); // Décommentez pour activer l'auto-sauvegarde
        }, 100);
    </script>
</body>
</html>