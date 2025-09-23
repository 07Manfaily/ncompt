import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [name, setName] = useState('Athan Wong');
  const [email, setEmail] = useState('athanwong@gmail.com');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('yourweb.com');
  const [address, setAddress] = useState('Austin, TX - United States');
  const [gender, setGender] = useState('Female');
  const [isTablet, setIsTablet] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth > 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fonction pour gérer le changement d'image de fond
  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Données pour le graphique
  const wordUsageData = [
    { date: '10 Mar', usage: 500 },
    { date: '11 Mar', usage: 580 },
    { date: '12 Mar', usage: 620 },
    { date: '13 Mar', usage: 380 },
    { date: '14 Mar', usage: 390, highlight: true, words: 390 },
    { date: '15 Mar', usage: 700 },
    { date: '16 Mar', usage: 650 },
    { date: '17 Mar', usage: 520 },
    { date: '18 Mar', usage: 380 },
    { date: '19 Mar', usage: 780 },
  ];

  const maxUsage = Math.max(...wordUsageData.map(item => item.usage));

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isTablet ? '20px 40px' : '20px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <h1 style={{
          fontSize: isTablet ? '28px' : '24px',
          fontWeight: 'bold',
          color: '#1e293b',
          margin: 0,
        }}>
          Profile Page
        </h1>
        <button style={{
          color: '#3b82f6',
          fontSize: '16px',
          fontWeight: '500',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}>
          What's new
        </button>
      </div>

      {/* Hero Section avec carte de profil qui chevauche */}
      <div style={{
        height: isTablet ? '200px' : '150px',
        background: backgroundImage 
          ? `url(${backgroundImage}) center/cover no-repeat`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'visible',
        marginBottom: '60px',
      }}>
        {/* Input caché pour changer l'image de fond */}
        <input
          type="file"
          id="background-upload"
          accept="image/*"
          onChange={handleBackgroundImageChange}
          style={{ display: 'none' }}
        />
        
        {/* Icône de caméra pour changer l'image de fond */}
        <button
          onClick={() => document.getElementById('background-upload').click()}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            zIndex: 20,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          📷
        </button>

        {/* Background animé simulé avec des formes (seulement si pas d'image personnalisée) */}
        {!backgroundImage && (
          <>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '30px',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }} />
            <div style={{
              position: 'absolute',
              top: '50px',
              left: '20px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
            }} />
          </>
        )}
        
        {/* Overlay pour améliorer la lisibilité si image personnalisée */}
        {backgroundImage && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1,
          }} />
        )}
        
        {/* Carte du profil qui chevauche */}
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          left: isTablet ? '40px' : '20px',
          right: isTablet ? '40px' : '20px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: isTablet ? 'row' : 'column',
          alignItems: isTablet ? 'center' : 'flex-start',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          gap: '20px',
          zIndex: 10,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            flex: isTablet ? 'none' : '1',
            width: isTablet ? 'auto' : '100%',
          }}>
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b000?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
              alt="Profile"
              style={{
                width: isTablet ? '80px' : '70px',
                height: isTablet ? '80px' : '70px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px',
                gap: '5px',
              }}>
                <span style={{ fontSize: '12px' }}>🇺🇸</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>United States</span>
              </div>
              <h2 style={{
                fontSize: isTablet ? '24px' : '20px',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: '0 0 5px 0',
              }}>
                Athan Wong
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: 0,
              }}>
                Software Engineering | athanwong@gmail.com
              </p>
            </div>
          </div>
          
          {/* Section Subscription */}
          <div style={{
            flex: isTablet ? '1' : 'none',
            textAlign: isTablet ? 'right' : 'left',
            width: isTablet ? 'auto' : '100%',
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '8px',
              margin: '0 0 8px 0',
            }}>
              Subscription
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: '0 0 4px 0',
            }}>
              Your workspace was created on May 10, 2023.
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isTablet ? 'flex-end' : 'flex-start',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
              <span style={{
                fontSize: '14px',
                color: '#6b7280',
              }}>
                You are currently on the monthly Premium Plan.
              </span>
              <button style={{
                color: '#3b82f6',
                fontSize: '14px',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}>
                Edit Payment →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div style={{
        marginTop: '20px',
        padding: isTablet ? '0 40px 30px' : '0 20px 30px',
      }}>

        {/* Sections Contact et Word Usage côte à côte */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          alignItems: 'flex-start',
          flexWrap: 'nowrap',
        }}>
          {/* Informations de Contact */}
          <div style={{
            flex: '1',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            minWidth: '0',
            boxSizing: 'border-box',
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '20px',
              margin: '0 0 20px 0',
            }}>
              Contact information
            </h3>

            {/* Champ Nom */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px',
              }}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  fontSize: '16px',
                  color: '#1e293b',
                  padding: '8px 0',
                  border: 'none',
                  borderBottom: '1px solid #e2e8f0',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Champ Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px',
              }}>
                Your email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  fontSize: '16px',
                  color: '#1e293b',
                  padding: '8px 0',
                  border: 'none',
                  borderBottom: '1px solid #e2e8f0',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Champ Téléphone */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px',
              }}>
                Phone number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter number"
                style={{
                  width: '100%',
                  fontSize: '16px',
                  color: phone ? '#1e293b' : '#9ca3af',
                  padding: '8px 0',
                  border: 'none',
                  borderBottom: '1px solid #e2e8f0',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Champ Website */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px',
              }}>
                Your website
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={{
                  width: '100%',
                  fontSize: '16px',
                  color: '#1e293b',
                  padding: '8px 0',
                  border: 'none',
                  borderBottom: '1px solid #e2e8f0',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Champ Adresse */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px',
              }}>
                Your address
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>🇺🇸</span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    flex: '1',
                    fontSize: '16px',
                    color: '#1e293b',
                    padding: '8px 0',
                    border: 'none',
                    borderBottom: '1px solid #e2e8f0',
                    backgroundColor: 'transparent',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Champ Genre */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px',
              }}>
                Gender
              </label>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #e2e8f0',
                cursor: 'pointer',
              }}>
                <span style={{
                  fontSize: '16px',
                  color: '#1e293b',
                }}>
                  {gender}
                </span>
                <span style={{
                  fontSize: '16px',
                  color: '#6b7280',
                }}>
                  ⌄
                </span>
              </div>
            </div>

            {/* Bouton Sauvegarder */}
            <button style={{
              width: '100%',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5856eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6366f1'}
            >
              Save Profile
            </button>
          </div>

          {/* Section Utilisation des Mots */}
          <div style={{
            flex: '1',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            minWidth: '0',
            boxSizing: 'border-box',
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '20px',
              margin: '0 0 20px 0',
            }}>
              Word Usage
            </h3>

            {/* Graphique en barres */}
            <div style={{
              height: '200px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: '0 10px',
              position: 'relative',
            }}>
              {wordUsageData.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: '1',
                  margin: '0 2px',
                  position: 'relative',
                }}>
                  <div style={{
                    width: '80%',
                    height: `${(item.usage / maxUsage) * 150}px`,
                    backgroundColor: item.highlight ? '#6366f1' : '#a5b4fc',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                  }}>
                    {item.highlight && (
                      <div style={{
                        position: 'absolute',
                        top: '-45px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#1e293b',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        minWidth: '80px',
                        textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        zIndex: '10',
                      }}>
                        <div style={{
                          color: '#ffffff',
                          fontSize: '10px',
                          fontWeight: '500',
                          marginBottom: '2px',
                        }}>
                          14 Mar 2022
                        </div>
                        <div style={{
                          color: '#ffffff',
                          fontSize: '10px',
                          fontWeight: 'bold',
                        }}>
                          Word Used: {item.words}
                        </div>
                        <div style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '0',
                          height: '0',
                          borderLeft: '5px solid transparent',
                          borderRight: '5px solid transparent',
                          borderTop: '4px solid #1e293b',
                        }} />
                      </div>
                    )}
                  </div>
                  <span style={{
                    fontSize: '10px',
                    color: '#6b7280',
                    transform: 'rotate(-45deg)',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.date}
                  </span>
                </div>
              ))}
            </div>

            {/* Description du graphique */}
            <p style={{
              fontSize: '12px',
              color: '#9ca3af',
              marginBottom: '16px',
              textAlign: 'center',
              margin: '0 0 16px 0',
            }}>
              Data as per UTC. Usage means total content/characters processed & generated by ChatGPT.
            </p>

            {/* Barre de progression */}
            <div style={{
              backgroundColor: '#e5e7eb',
              height: '8px',
              borderRadius: '4px',
              marginBottom: '12px',
              overflow: 'hidden',
            }}>
              <div style={{
                backgroundColor: '#6366f1',
                height: '100%',
                width: '40%',
                borderRadius: '4px',
                transition: 'width 0.3s ease',
              }} />
            </div>

            {/* Statistiques d'utilisation */}
            <p style={{
              fontSize: '14px',
              color: '#1e293b',
              fontWeight: '600',
              margin: '0',
            }}>
              Word used this month:{' '}
              <span style={{ fontWeight: 'normal' }}>20,000 / 50,000 Words</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;