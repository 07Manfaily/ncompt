// Liste d'utilisateurs de test pour le composant de sélection
export const testUsers = [
    {
      id: 1,
      nom: "Dupont",
      prenom: "Marie",
      email: "marie.dupont@entreprise.com",
      poste: "Développeur Frontend",
      departement: "Informatique",
      statut: "actif"
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Pierre",
      email: "pierre.martin@entreprise.com",
      poste: "Chef de Projet",
      departement: "Informatique",
      statut: "actif"
    },
    {
      id: 3,
      nom: "Bernard",
      prenom: "Sophie",
      email: "sophie.bernard@entreprise.com",
      poste: "Analyste Financier",
      departement: "Finance",
      statut: "actif"
    },
    {
      id: 4,
      nom: "Durand",
      prenom: "Thomas",
      email: "thomas.durand@entreprise.com",
      poste: "Développeur Backend",
      departement: "Informatique",
      statut: "actif"
    },
    {
      id: 5,
      nom: "Moreau",
      prenom: "Julie",
      email: "julie.moreau@entreprise.com",
      poste: "Responsable RH",
      departement: "Ressources Humaines",
      statut: "actif"
    },
    {
      id: 6,
      nom: "Petit",
      prenom: "Alexandre",
      email: "alexandre.petit@entreprise.com",
      poste: "Designer UX/UI",
      departement: "Design",
      statut: "actif"
    },
    {
      id: 7,
      nom: "Robert",
      prenom: "Camille",
      email: "camille.robert@entreprise.com",
      poste: "Responsable Marketing",
      departement: "Marketing",
      statut: "actif"
    },
    {
      id: 8,
      nom: "Richard",
      prenom: "Nicolas",
      email: "nicolas.richard@entreprise.com",
      poste: "DevOps Engineer",
      departement: "Informatique",
      statut: "actif"
    },
    {
      id: 9,
      nom: "Dubois",
      prenom: "Emma",
      email: "emma.dubois@entreprise.com",
      poste: "Comptable",
      departement: "Finance",
      statut: "actif"
    },
    {
      id: 10,
      nom: "Leroy",
      prenom: "Maxime",
      email: "maxime.leroy@entreprise.com",
      poste: "Commercial",
      departement: "Ventes",
      statut: "actif"
    },
    {
      id: 11,
      nom: "Moreau",
      prenom: "Léa",
      email: "lea.moreau@entreprise.com",
      poste: "Assistante RH",
      departement: "Ressources Humaines",
      statut: "actif"
    },
    {
      id: 12,
      nom: "Simon",
      prenom: "Baptiste",
      email: "baptiste.simon@entreprise.com",
      poste: "Architecte Logiciel",
      departement: "Informatique",
      statut: "actif"
    },
    {
      id: 13,
      nom: "Michel",
      prenom: "Clara",
      email: "clara.michel@entreprise.com",
      poste: "Chargée de Communication",
      departement: "Marketing",
      statut: "actif"
    },
    {
      id: 14,
      nom: "Garcia",
      prenom: "Lucas",
      email: "lucas.garcia@entreprise.com",
      poste: "Analyste de Données",
      departement: "Informatique",
      statut: "actif"
    },
    {
      id: 15,
      nom: "Martinez",
      prenom: "Sarah",
      email: "sarah.martinez@entreprise.com",
      poste: "Directeur Financier",
      departement: "Finance",
      statut: "actif"
    },
    {
      id: 16,
      nom: "Lopez",
      prenom: "Hugo",
      email: "hugo.lopez@entreprise.com",
      poste: "Testeur QA",
      departement: "Informatique",
      statut: "actif"
    },
    {
      id: 17,
      nom: "Gonzalez",
      prenom: "Manon",
      email: "manon.gonzalez@entreprise.com",
      poste: "Graphiste",
      departement: "Design",
      statut: "actif"
    },
    {
      id: 18,
      nom: "Wilson",
      prenom: "Antoine",
      email: "antoine.wilson@entreprise.com",
      poste: "Responsable Ventes",
      departement: "Ventes",
      statut: "actif"
    },
    {
      id: 19,
      nom: "Anderson",
      prenom: "Chloé",
      email: "chloe.anderson@entreprise.com",
      poste: "Spécialiste SEO",
      departement: "Marketing",
      statut: "actif"
    },
    {
      id: 20,
      nom: "Taylor",
      prenom: "Julien",
      email: "julien.taylor@entreprise.com",
      poste: "Administrateur Système",
      departement: "Informatique",
      statut: "actif"
    },
    {
      id: 21,
      nom: "Brown",
      prenom: "Océane",
      email: "oceane.brown@entreprise.com",
      poste: "Juriste",
      departement: "Juridique",
      statut: "actif"
    },
    {
      id: 22,
      nom: "Davis",
      prenom: "Romain",
      email: "romain.davis@entreprise.com",
      poste: "Chef de Produit",
      departement: "Produit",
      statut: "actif"
    },
    {
      id: 23,
      nom: "Miller",
      prenom: "Inès",
      email: "ines.miller@entreprise.com",
      poste: "Responsable Qualité",
      departement: "Qualité",
      statut: "actif"
    },
    {
      id: 24,
      nom: "Moore",
      prenom: "Théo",
      email: "theo.moore@entreprise.com",
      poste: "Consultant",
      departement: "Conseil",
      statut: "actif"
    },
    {
      id: 25,
      nom: "Johnson",
      prenom: "Valentine",
      email: "valentine.johnson@entreprise.com",
      poste: "Assistante de Direction",
      departement: "Direction",
      statut: "actif"
    }
  ];
  
  // Mock API fonction pour simuler l'appel API
  export const mockApiCall = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: testUsers });
      }, 800); // Simule un délai de chargement
    });
  };
  
  // Fonction pour utiliser les données de test dans votre composant
  export const useMockUsers = () => {
    // Remplacez votre appel axios par :
    // const response = await mockApiCall();
    // setUsers(response.data);
    
    return testUsers;
  };
  
  // Statistiques des données de test
  export const testDataStats = {
    totalUsers: testUsers.length,
    departments: [...new Set(testUsers.map(user => user.departement))],
    postes: [...new Set(testUsers.map(user => user.poste))],
    departmentCounts: testUsers.reduce((acc, user) => {
      acc[user.departement] = (acc[user.departement] || 0) + 1;
      return acc;
    }, {})
  };
  
  console.log("Statistiques des données de test :", testDataStats);