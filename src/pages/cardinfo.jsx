import React, { useState } from "react";
import { Camera } from "lucide-react";

const FloatingButtonExample = ({ title, fullTitle, code, img }) => {
    const [profileImage, setProfileImage] = useState(null);
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
            padding: '32px',
            maxWidth: '1000px',
            margin: '0 auto',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
        }}>
            <div style={{
                display: 'flex',
                gap: '32px',
                alignItems: 'stretch',
                minHeight: '500px'
            }}>
                {/* Section principale */}
                <div style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                }}>
                    {/* Avatar et informations principales */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px'
                    }}>
                        <div style={{
                            width: '130px',
                            height: '130px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                            fontWeight: '700',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 12px 32px rgba(255, 107, 53, 0.25), 0 4px 12px rgba(255, 107, 53, 0.15)',
                            position: 'relative',
                            border: '4px solid rgba(255, 255, 255, 0.3)'
                        }}>
                            <div>
                                {title ? title.substring(0, 2).toUpperCase() : "XX"}
                                <div style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    marginTop: '4px',
                                    opacity: '0.9'
                                }}>
                                    {code}
                                </div>
                            </div>
                        </div>
                        
                        <div style={{
                            flex: '1'
                        }}>
                            <h1 style={{
                                fontSize: '28px',
                                fontWeight: '700',
                                color: '#1a202c',
                                margin: '0 0 8px 0',
                                lineHeight: '1.2'
                            }}>
                                {fullTitle}
                            </h1>
                            
                            <div style={{
                                height: '4px',
                                width: '80px',
                                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                                borderRadius: '2px',
                                marginBottom: '12px'
                            }}></div>
                            
                            <span style={{
                                color: '#64748b',
                                fontSize: '14px',
                                fontWeight: '500',
                                backgroundColor: '#f1f5f9',
                                padding: '4px 12px',
                                borderRadius: '20px'
                            }}>
                                Donné provisoire
                            </span>
                        </div>
                    </div>

                    {/* Statistiques */}
                    <div style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px',
                        padding: '20px',
                        borderLeftWidth: '4px',
                        borderLeftColor: '#667eea'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '16px'
                        }}>
                            <div>
                                <div style={{
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    color: '#1a202c',
                                    marginBottom: '4px'
                                }}>89</div>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#64748b',
                                    fontWeight: '500'
                                }}>Total participants</div>
                            </div>
                            <div>
                                <div style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#1a202c',
                                    marginBottom: '4px'
                                }}>02/10/2024 - 07/06/2025</div>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#64748b',
                                    fontWeight: '500'
                                }}>Période de formation</div>
                            </div>
                        </div>
                    </div>

                    {/* Actions et dossiers */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                    }}>
                        {/* Tags */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            flex: '1'
                        }}>
                            {['value 1', 'value 2', 'value 3', 'value 4', 'value 5'].map((value, index) => (
                                <span key={index} style={{
                                    backgroundColor: '#e0e7ff',
                                    color: '#3730a3',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    border: '1px solid #c7d2fe',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer'
                                }}>
                                    {value}
                                </span>
                            ))}
                        </div>
                        
                        {/* Actions rapides */}
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center'
                        }}>
                            {[
                                { icon: '📁', label: 'Dossiers', color: '#fbbf24' },
                                { icon: '📊', label: 'Rapports', color: '#10b981' },
                                { icon: '⚙️', label: 'Paramètres', color: '#6b7280' }
                            ].map((action, index) => (
                                <div key={index} style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    backgroundColor: `${action.color}15`,
                                    border: `2px solid ${action.color}30`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    transition: 'all 0.2s ease',
                                    title: action.label
                                }}>
                                    {action.icon}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section droite - Image principale */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    minHeight: '100%'
                }}>
                    <div style={{
                        position: 'relative',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)',
                        transform: 'perspective(1000px) rotateY(-5deg)',
                        transition: 'all 0.3s ease',
                        width: '320px',
                        height: '100%',
                        minHeight: '500px'
                    }}>
                        <img
                            src={img || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=320&h=500&fit=crop&crop=center'}
                            alt="Icone de formation"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '24px'
                            }}
                        />
                        
                        {/* Overlay gradient */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                            borderRadius: '24px'
                        }}></div>
                        
                        {/* Bouton camera flottant */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            backdropFilter: 'blur(15px)',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                        }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    opacity: 0,
                                    cursor: 'pointer'
                                }}
                            />
                            <Camera size={22} color="white" />
                        </div>
                        
                        {/* Indicateur de statut */}
                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            backgroundColor: 'rgba(34, 197, 94, 0.9)',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            En cours
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatingButtonExample;