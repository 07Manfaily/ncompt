import React from 'react';

// Simulation du package react-table-component
// En pratique, vous importeriez : import { Table } from 'react-table-component';
const Table = ({ data, columns, style }) => {
  return (
    <div style={{ overflowX: 'auto', ...style }}>
      <table style={{ width: '100%', border: '1px solid #d1d5db', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f9fafb' }}>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  borderBottom: '1px solid #d1d5db'
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              style={{ backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f9fafb' }}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: '#111827',
                    borderBottom: '1px solid #e5e7eb'
                  }}
                >
                  {column.render ? column.render(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ReactTablesComponent = () => {
  const [selectedPiece, setSelectedPiece] = React.useState(null);
  const [showPopup, setShowPopup] = React.useState(false);

  const showPieceDetails = (pieceData) => {
    setSelectedPiece(pieceData);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedPiece(null);
  };
  // Premier tableau - Données regroupées par catégories
  const dataColumns = [
    { 
      header: 'Info Client', 
      accessor: 'info_client',
      render: (row) => (
        <div style={{ lineHeight: '1.4' }}>
          <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{row.nom} {row.prenom}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Mat: {row.matricule}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Compte: {row.numero_compte}</div>
        </div>
      )
    },
    { 
      header: 'Hébergement', 
      accessor: 'hebergement',
      render: (row) => (
        <div style={{ lineHeight: '1.4' }}>
          <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{row.accommodation_mode}</div>
          {row.hotel_name && <div style={{ fontSize: '12px', color: '#6b7280' }}>{row.hotel_name}</div>}
          <div style={{ fontSize: '12px', color: '#059669' }}>
            {row.number_of_nights} nuit(s) × {row.nightly_cost}€
          </div>
        </div>
      )
    },
    { 
      header: 'Transport', 
      accessor: 'transport',
      render: (row) => (
        <div style={{ lineHeight: '1.4' }}>
          <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{row.type_transport}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Distance: {row.distance}km</div>
          <div style={{ fontSize: '12px', color: '#dc2626' }}>Péage: {row.toll_cost}€</div>
          <div style={{ fontSize: '12px', color: '#dc2626' }}>Taxi: {row.cab_cost}€</div>
        </div>
      )
    },
    { 
      header: 'Période Mission', 
      accessor: 'periode',
      render: (row) => (
        <div style={{ lineHeight: '1.4' }}>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Du: {row.arrival_date}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Au: {row.return_date}</div>
          <div style={{ fontWeight: 'bold', color: '#7c3aed' }}>{row.duration_in_days} jour(s)</div>
        </div>
      )
    },
    { 
      header: 'Coûts Hébergement', 
      accessor: 'couts_hebergement',
      render: (row) => (
        <div style={{ lineHeight: '1.4' }}>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Allocation: {row.accommodation_allowance}€</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Total logement: {row.total_accommodation}€</div>
          <div style={{ fontWeight: 'bold', color: '#059669' }}>+ Perdiem: {row.total_accommodation_and_perdiem}€</div>
        </div>
      )
    },
    { 
      header: 'Coûts Transport', 
      accessor: 'couts_transport',
      render: (row) => (
        <div style={{ lineHeight: '1.4' }}>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Allocation: {row.transport_allowance}€</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>A/R: {row.cost_of_round_trip_transport}€</div>
          <div style={{ fontWeight: 'bold', color: '#dc2626' }}>Total: {row.total_transport}€</div>
        </div>
      )
    },
    { 
      header: 'Total Remboursement', 
      accessor: 'total_amount_to_be_reimbursed',
      render: (row) => (
        <div style={{ 
          textAlign: 'center', 
          fontSize: '16px', 
          fontWeight: 'bold', 
          color: '#ffffff',
          backgroundColor: '#059669',
          padding: '8px',
          borderRadius: '6px'
        }}>
          {row.total_amount_to_be_reimbursed}€
        </div>
      )
    }
  ];

  const dataTableData = [
    {
      matricule: 'EMP001',
      nom: 'Dupont',
      prenom: 'Jean',
      numero_compte: '123456789',
      accommodation_mode: 'Hôtel',
      hotel_name: 'Hôtel Central',
      number_of_nights: 3,
      nightly_cost: 120,
      type_transport: 'Voiture',
      toll_cost: 25,
      cost_of_round_trip_transport: 150,
      arrival_date: '2024-01-15',
      return_date: '2024-01-18',
      duration_in_days: 3,
      accommodation_allowance: 300,
      total_accommodation: 360,
      total_accommodation_and_perdiem: 450,
      distance: 250,
      transport_allowance: 100,
      cab_cost: 30,
      total_transport: 180,
      total_amount_to_be_reimbursed: 630
    },
    {
      matricule: 'EMP002',
      nom: 'Martin',
      prenom: 'Marie',
      numero_compte: '987654321',
      accommodation_mode: 'Hébergement privé',
      hotel_name: '',
      number_of_nights: 2,
      nightly_cost: 0,
      type_transport: 'Train',
      toll_cost: 0,
      cost_of_round_trip_transport: 180,
      arrival_date: '2024-01-20',
      return_date: '2024-01-22',
      duration_in_days: 2,
      accommodation_allowance: 200,
      total_accommodation: 200,
      total_accommodation_and_perdiem: 280,
      distance: 300,
      transport_allowance: 120,
      cab_cost: 20,
      total_transport: 200,
      total_amount_to_be_reimbursed: 480
    }
  ];

  // Deuxième tableau - Pièce comptable regroupée
  const pieceComptableColumns = [
    { 
      header: 'Info Opération', 
      accessor: 'info_operation',
      render: (row) => (
        <div style={{ lineHeight: '1.4' }}>
          <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Mat: {row.matricule}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>{row.libelle_complementaire}</div>
          <div style={{ fontSize: '12px', color: '#7c3aed' }}>Fournisseur: {row.fournisseur}</div>
        </div>
      )
    },
    { 
      header: 'Écriture Débit', 
      accessor: 'ecriture_debit',
      render: (row) => (
        <div style={{ lineHeight: '1.4' }}>
          <div style={{ fontWeight: 'bold', color: '#dc2626' }}>Code AG: {row.code_ag_debit}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Compte: {row.compte_de_charges}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Sens: {row.sens_au_debit}</div>
          <div style={{ fontWeight: 'bold', color: '#dc2626' }}>Montant: {row.montant_au_debit}€</div>
        </div>
      )
    },
    { 
      header: 'Écriture Crédit', 
      accessor: 'ecriture_credit',
      render: (row) => (
        <div style={{ lineHeight: '1.4' }}>
          <div style={{ fontWeight: 'bold', color: '#059669' }}>Code AG: {row.code_ag_credit}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Compte: {row.compte_contrepartie}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Sens: {row.sens_au_credit}</div>
          <div style={{ fontWeight: 'bold', color: '#059669' }}>Montant: {row.montant_au_credit}€</div>
        </div>
      )
    },
    { 
      header: 'Équilibre', 
      accessor: 'equilibre',
      render: (row) => {
        const isEquilibre = row.montant_au_debit === row.montant_au_credit;
        return (
          <div style={{ 
            textAlign: 'center', 
            padding: '8px',
            borderRadius: '6px',
            backgroundColor: isEquilibre ? '#10b981' : '#ef4444',
            color: '#ffffff',
            fontWeight: 'bold'
          }}>
            {isEquilibre ? '✓ Équilibré' : '✗ Déséquilibré'}
          </div>
        );
      }
    },
    { 
      header: 'Visualiser', 
      accessor: 'visualiser',
      render: (row) => (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => showPieceDetails(row)}
            style={{
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            📄 Voir Pièce
          </button>
        </div>
      )
    }
  ];

  const pieceComptableData = [
    {
      code_ag_debit: 'AG001',
      compte_de_charges: '6251000',
      sens_au_debit: 'D',
      montant_au_debit: 630,
      matricule: 'EMP001',
      libelle_complementaire: 'Frais mission Jean Dupont',
      code_ag_credit: 'AG001',
      sens_au_credit: 'C',
      montant_au_credit: 630,
      fournisseur: 'TRESORERIE',
      compte_contrepartie: '5312000'
    },
    {
      code_ag_debit: 'AG002',
      compte_de_charges: '6251000',
      sens_au_debit: 'D',
      montant_au_debit: 480,
      matricule: 'EMP002',
      libelle_complementaire: 'Frais mission Marie Martin',
      code_ag_credit: 'AG002',
      sens_au_credit: 'C',
      montant_au_credit: 480,
      fournisseur: 'TRESORERIE',
      compte_contrepartie: '5312000'
    }
  ];

  return (
    <div style={{ 
      padding: '24px', 
      backgroundColor: '#f3f4f6', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        color: '#1f2937', 
        textAlign: 'center', 
        marginBottom: '32px' 
      }}>
        Tableaux de Synthèse - Version Optimisée
      </h1>

      {/* Premier tableau - Données regroupées */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '8px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          color: '#374151', 
          marginBottom: '16px',
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '8px'
        }}>
          📊 Tableau de Données - Frais de Mission (Optimisé)
        </h2>
        <div style={{ 
          marginBottom: '16px', 
          fontSize: '14px', 
          color: '#6b7280' 
        }}>
          Tableau regroupé par catégories pour une meilleure lisibilité
        </div>
        <Table 
          data={dataTableData} 
          columns={dataColumns}
          style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}
        />
      </div>

      {/* Deuxième tableau - Pièce comptable regroupée */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '8px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          color: '#374151', 
          marginBottom: '16px',
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '8px'
        }}>
          💰 Tableau Pièce Comptable (Optimisé)
        </h2>
        <div style={{ 
          marginBottom: '16px', 
          fontSize: '14px', 
          color: '#6b7280' 
        }}>
          Écritures comptables regroupées par type d'opération
        </div>
        <Table 
          data={pieceComptableData} 
          columns={pieceComptableColumns}
          style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}
        />
      </div>

      {/* Résumé */}
      <div style={{ 
        backgroundColor: '#eff6ff', 
        borderRadius: '8px', 
        padding: '24px',
        borderLeft: '4px solid #3b82f6'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#1e40af', 
          marginBottom: '8px' 
        }}>
          📋 Avantages de l'optimisation
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '16px', 
          fontSize: '14px' 
        }}>
          <div style={{ 
            backgroundColor: '#ffffff', 
            padding: '12px', 
            borderRadius: '6px', 
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ fontWeight: 'bold', color: '#059669', marginBottom: '4px' }}>✓ Colonnes réduites</div>
            <div style={{ color: '#374151' }}>De 22 à 7 colonnes pour le tableau principal</div>
          </div>
          <div style={{ 
            backgroundColor: '#ffffff', 
            padding: '12px', 
            borderRadius: '6px', 
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ fontWeight: 'bold', color: '#059669', marginBottom: '4px' }}>✓ Informations groupées</div>
            <div style={{ color: '#374151' }}>Données logiquement organisées par catégorie</div>
          </div>
          <div style={{ 
            backgroundColor: '#ffffff', 
            padding: '12px', 
            borderRadius: '6px', 
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ fontWeight: 'bold', color: '#059669', marginBottom: '4px' }}>✓ Lisibilité améliorée</div>
            <div style={{ color: '#374151' }}>Format multi-lignes avec codes couleur</div>
          </div>
          <div style={{ 
            backgroundColor: '#ffffff', 
            padding: '12px', 
            borderRadius: '6px', 
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ fontWeight: 'bold', color: '#059669', marginBottom: '4px' }}>✓ Validation automatique</div>
            <div style={{ color: '#374151' }}>Vérification de l'équilibre comptable</div>
          </div>
        </div>
      </div>

      {/* Popup pour afficher la pièce comptable */}
      {showPopup && selectedPiece && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80%',
            overflow: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            position: 'relative'
          }}>
            {/* Header de la popup */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '16px'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: 0
              }}>
                📄 Pièce Comptable - {selectedPiece.matricule}
              </h3>
              <button
                onClick={closePopup}
                style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* Contenu de la pièce comptable */}
            <div style={{ lineHeight: '1.6' }}>
              {/* Informations générales */}
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#374151', fontSize: '18px' }}>
                  ℹ️ Informations Générales
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <strong>Matricule:</strong> {selectedPiece.matricule}
                  </div>
                  <div>
                    <strong>Fournisseur:</strong> {selectedPiece.fournisseur}
                  </div>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <strong>Libellé:</strong> {selectedPiece.libelle_complementaire}
                </div>
              </div>

              {/* Écriture au débit */}
              <div style={{
                backgroundColor: '#fef2f2',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '16px',
                border: '1px solid #fecaca'
              }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#dc2626', fontSize: '18px' }}>
                  📉 Écriture au Débit
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <strong>Code AG:</strong> {selectedPiece.code_ag_debit}
                  </div>
                  <div>
                    <strong>Sens:</strong> {selectedPiece.sens_au_debit}
                  </div>
                  <div>
                    <strong>Compte de charges:</strong> {selectedPiece.compte_de_charges}
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#dc2626'
                  }}>
                    <strong>Montant:</strong> {selectedPiece.montant_au_debit}€
                  </div>
                </div>
              </div>

              {/* Écriture au crédit */}
              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '16px',
                border: '1px solid #bbf7d0'
              }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#059669', fontSize: '18px' }}>
                  📈 Écriture au Crédit
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <strong>Code AG:</strong> {selectedPiece.code_ag_credit}
                  </div>
                  <div>
                    <strong>Sens:</strong> {selectedPiece.sens_au_credit}
                  </div>
                  <div>
                    <strong>Compte contrepartie:</strong> {selectedPiece.compte_contrepartie}
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#059669'
                  }}>
                    <strong>Montant:</strong> {selectedPiece.montant_au_credit}€
                  </div>
                </div>
              </div>

              {/* Vérification d'équilibre */}
              <div style={{
                backgroundColor: selectedPiece.montant_au_debit === selectedPiece.montant_au_credit ? '#f0fdf4' : '#fef2f2',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center',
                border: selectedPiece.montant_au_debit === selectedPiece.montant_au_credit ? '1px solid #bbf7d0' : '1px solid #fecaca'
              }}>
                <h4 style={{
                  margin: '0 0 8px 0',
                  color: selectedPiece.montant_au_debit === selectedPiece.montant_au_credit ? '#059669' : '#dc2626',
                  fontSize: '18px'
                }}>
                  {selectedPiece.montant_au_debit === selectedPiece.montant_au_credit ? '✅ Équilibre Vérifié' : '❌ Déséquilibre Détecté'}
                </h4>
                <div style={{
                  fontSize: '16px',
                  color: '#6b7280'
                }}>
                  Débit: {selectedPiece.montant_au_debit}€ | Crédit: {selectedPiece.montant_au_credit}€
                </div>
              </div>
            </div>

            {/* Footer avec actions */}
            <div style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid #e5e7eb',
              textAlign: 'right'
            }}>
              <button
                onClick={closePopup}
                style={{
                  backgroundColor: '#6b7280',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginRight: '12px'
                }}
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  // Ici vous pourriez ajouter une fonction d'impression ou d'export
                  alert('Fonction d\'impression à implémenter');
                }}
                style={{
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                🖨️ Imprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactTablesComponent;