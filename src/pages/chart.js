import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Settings, 
  Filter, 
  Heart, 
  Mail, 
  Phone, 
  MessageCircle, 
  Video, 
  Edit, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  User,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  X,
  Info
} from 'lucide-react';

const ProfileDashboard = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(2);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const previousMonth = () => {
    setCurrentMonthIndex((prev) => (prev - 1 + 12) % 12);
  };

  const nextMonth = () => {
    setCurrentMonthIndex((prev) => (prev + 1) % 12);
  };

  const handleDayClick = (day) => {
    if (day) {
      setSelectedDay(day);
    }
  };

  const projects = [
    {
      id: 1,
      title: "Web Designing",
      date: "March 05, 2024",
      phase: "Prototyping",
      progress: 90,
      color: "yellow",
      daysLeft: 2,
      team: ["👨", "👩", "👨"],
      description: "Création d'une interface web moderne avec React et Material-UI",
      budget: "$15,000",
      priority: "High",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Mobile App",
      date: "March 08, 2024",
      phase: "Design",
      progress: 50,
      color: "blue",
      daysLeft: 5,
      team: ["👨", "👩", "👨"],
      description: "Développement d'une application mobile native pour iOS et Android",
      budget: "$25,000",
      priority: "Medium",
      status: "Planning"
    },
    {
      id: 3,
      title: "Dashboard",
      date: "March 12, 2024",
      phase: "Wireframe",
      progress: 70,
      color: "pink",
      daysLeft: 8,
      team: ["👨", "👩", "👨"],
      description: "Conception d'un tableau de bord analytique pour la gestion des données",
      budget: "$20,000",
      priority: "High",
      status: "In Progress"
    },
    {
      id: 4,
      title: "E-commerce Platform",
      date: "March 15, 2024",
      phase: "Development",
      progress: 30,
      color: "green",
      daysLeft: 12,
      team: ["👨", "👩", "👨"],
      description: "Plateforme e-commerce complète avec système de paiement intégré",
      budget: "$35,000",
      priority: "High",
      status: "Development"
    },
    {
      id: 5,
      title: "API Integration",
      date: "March 18, 2024",
      phase: "Testing",
      progress: 85,
      color: "purple",
      daysLeft: 3,
      team: ["👨", "👩", "👨"],
      description: "Intégration d'APIs tierces pour synchronisation des données",
      budget: "$12,000",
      priority: "Medium",
      status: "Testing"
    }
  ];

  const messages = [
    {
      id: 1,
      name: "Web Designing",
      avatar: "👩",
      avatarColor: "blue",
      message: "Hey let me know progress of project? Waiting for your response",
      isDark: false
    },
    {
      id: 2,
      name: "Stephanie",
      avatar: "👨",
      avatarColor: "yellow",
      message: "I got your first assignment. It was quite good 👍",
      isDark: true
    },
    {
      id: 3,
      name: "William",
      avatar: "👨",
      avatarColor: "green",
      message: "I want some changes in previous work you receive. Waiting for your reply.",
      isDark: false
    }
  ];

  const calendarDays = [
    null, null, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28
  ];

  const getDayHighlight = (day) => {
    if (day === 5) return 'highlight-red';
    if (day === 7 || day === 25) return 'highlight-dark';
    if (day === 12) return 'highlight-blue';
    if (day === 20) return 'highlight-green';
    if (day === 23) return 'highlight-yellow';
    if (day === 27) return 'highlight-purple';
    return '';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10b981';
    if (progress >= 60) return '#f59e0b';
    if (progress >= 40) return '#3b82f6';
    return '#ef4444';
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '24px', 
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '32px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ArrowLeft size={24} color="#6b7280" style={{ cursor: 'pointer' }} />
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: '600', 
              color: '#111827',
              margin: 0
            }}>
              My Profile
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              padding: '6px 12px',
              backgroundColor: '#e5e7eb',
              color: '#6b7280',
              borderRadius: '20px',
              fontSize: '14px'
            }}>
              Pending
            </span>
            <span style={{ color: '#6b7280', fontSize: '16px' }}>
              March, 2024
            </span>
            <Calendar size={20} color="#6b7280" />
          </div>
        </div>

        {/* Main Grid - 2 Columns */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '24px',
          marginBottom: '24px'
        }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Profile Card */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '24px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  marginBottom: '24px' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #fb923c, #ea580c)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px'
                    }}>
                      👨‍💼
                    </div>
                    <div>
                      <h2 style={{ 
                        fontSize: '20px', 
                        fontWeight: '600', 
                        color: '#111827', 
                        margin: '0 0 4px 0' 
                      }}>
                        Robert Smith
                      </h2>
                      <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
                        Product Designer
                      </p>
                    </div>
                  </div>
                  <MoreHorizontal size={20} color="#6b7280" style={{ cursor: 'pointer' }} />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <button style={{
                    width: '48px',
                    height: '48px',
                    border: 'none',
                    borderRadius: '50%',
                    backgroundColor: '#111827',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}>
                    <Mail size={16} />
                  </button>
                  <button style={{
                    width: '48px',
                    height: '48px',
                    border: 'none',
                    borderRadius: '50%',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}>
                    <Phone size={16} />
                  </button>
                  <button style={{
                    width: '48px',
                    height: '48px',
                    border: 'none',
                    borderRadius: '50%',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}>
                    <MessageCircle size={16} />
                  </button>
                  <button style={{
                    width: '48px',
                    height: '48px',
                    border: 'none',
                    borderRadius: '50%',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}>
                    <Video size={16} />
                  </button>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '12px' 
                  }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                      Time Slots
                    </h3>
                    <Edit size={16} color="#6b7280" />
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <span>April, 2024</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Meetings</span>
                      <span style={{
                        backgroundColor: '#111827',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        3
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '24px 24px 16px' }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#111827',
                  margin: 0
                }}>
                  Detailed Information
                </h3>
              </div>
              <div style={{ padding: '0 24px 24px' }}>
                {[
                  { label: 'Full Name', value: 'Robert Smith', status: 'online', icon: <User size={16} /> },
                  { label: 'Email Address', value: 'robertsmith84@gmail.com', status: 'offline', icon: <Mail size={16} /> },
                  { label: 'Contact Number', value: '(555) 555-5674', status: 'offline', icon: <Phone size={16} /> },
                  { label: 'Designation', value: 'Product Designer', status: 'offline', icon: <User size={16} /> },
                  { label: 'Availability', value: 'Schedule the time slot', status: 'offline', icon: <Clock size={16} /> }
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: index < 4 ? '1px solid #f3f4f6' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: item.status === 'online' ? '#10b981' : '#d1d5db'
                      }} />
                      <div>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 2px 0' }}>
                          {item.label}
                        </p>
                        <p style={{ color: '#111827', fontWeight: '500', margin: 0 }}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                    {item.status === 'online' ? (
                      <span style={{
                        backgroundColor: '#d1fae5',
                        color: '#065f46',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        Online
                      </span>
                    ) : (
                      <div style={{ color: '#6b7280' }}>
                        {item.icon}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Calendar */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '24px 24px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#111827',
                    margin: 0
                  }}>
                    Calendar
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Calendar size={20} color="#6b7280" />
                    <MoreHorizontal size={20} color="#6b7280" style={{ cursor: 'pointer' }} />
                  </div>
                </div>
              </div>
              <div style={{ padding: '0 24px 24px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '24px' 
                }}>
                  <button 
                    onClick={previousMonth}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <ChevronLeft size={20} color="#6b7280" />
                  </button>
                  <h4 style={{ 
                    fontWeight: '600', 
                    color: '#111827',
                    margin: 0
                  }}>
                    {months[currentMonthIndex]}
                  </h4>
                  <button 
                    onClick={nextMonth}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <ChevronRight size={20} color="#6b7280" />
                  </button>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(7, 1fr)', 
                  gap: '4px', 
                  textAlign: 'center' 
                }}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} style={{
                      padding: '8px',
                      fontSize: '14px',
                      color: '#6b7280',
                      fontWeight: '500'
                    }}>
                      {day}
                    </div>
                  ))}
                  
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      onClick={() => handleDayClick(day)}
                      style={{
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        cursor: day ? 'pointer' : 'default',
                        fontSize: '14px',
                        transition: 'background-color 0.2s',
                        backgroundColor: day && getDayHighlight(day) === 'highlight-red' ? '#ef4444' :
                                       day && getDayHighlight(day) === 'highlight-dark' ? '#1f2937' :
                                       day && getDayHighlight(day) === 'highlight-blue' ? '#93c5fd' :
                                       day && getDayHighlight(day) === 'highlight-green' ? '#16a34a' :
                                       day && getDayHighlight(day) === 'highlight-yellow' ? '#facc15' :
                                       day && getDayHighlight(day) === 'highlight-purple' ? '#a855f7' : 'transparent',
                        color: day && (getDayHighlight(day).includes('red') || 
                                      getDayHighlight(day).includes('dark') || 
                                      getDayHighlight(day).includes('blue') || 
                                      getDayHighlight(day).includes('green') || 
                                      getDayHighlight(day).includes('purple')) ? 'white' : 'inherit'
                      }}
                      onMouseEnter={(e) => {
                        if (day) {
                          e.target.style.backgroundColor = '#f3f4f6';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (day && !getDayHighlight(day)) {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ongoing Projects - Horizontal Scroll */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginBottom: '24px'
        }}>
          <div style={{ padding: '24px 24px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#111827',
                margin: 0
              }}>
                Ongoing Projects
              </h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Settings size={20} color="#6b7280" />
                <Filter size={20} color="#6b7280" />
                <Heart size={20} color="#6b7280" />
              </div>
            </div>
          </div>
          <div style={{ 
            padding: '0 24px 24px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            <div style={{ 
              display: 'flex', 
              gap: '16px',
              minWidth: 'max-content',
              paddingBottom: '8px'
            }}>
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  onClick={() => setSelectedProject(project)}
                  style={{
                    minWidth: '320px',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid',
                    backgroundColor: project.color === 'yellow' ? '#fefce8' : 
                                   project.color === 'blue' ? '#eff6ff' : 
                                   project.color === 'pink' ? '#fdf2f8' :
                                   project.color === 'green' ? '#f0fdf4' : '#faf5ff',
                    borderColor: project.color === 'yellow' ? '#fde047' : 
                                project.color === 'blue' ? '#93c5fd' : 
                                project.color === 'pink' ? '#f9a8d4' :
                                project.color === 'green' ? '#86efac' : '#c084fc',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '12px' 
                  }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {project.date}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Info size={16} color="#6b7280" />
                      <MoreHorizontal size={16} color="#6b7280" />
                    </div>
                  </div>
                  
                  <h4 style={{ 
                    fontWeight: '600', 
                    color: '#111827', 
                    margin: '0 0 8px 0',
                    fontSize: '16px'
                  }}>
                    {project.title}
                  </h4>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '16px' 
                  }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {project.phase}
                    </span>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: project.color === 'yellow' ? '#fef3c7' : 
                                     project.color === 'blue' ? '#dbeafe' : 
                                     project.color === 'pink' ? '#fce7f3' :
                                     project.color === 'green' ? '#dcfce7' : '#f3e8ff',
                      color: project.color === 'yellow' ? '#92400e' : 
                             project.color === 'blue' ? '#1e40af' : 
                             project.color === 'pink' ? '#be185d' :
                             project.color === 'green' ? '#166534' : '#7c3aed'
                    }}>
                      {project.progress}% Progress
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${project.progress}%`,
                        height: '100%',
                        backgroundColor: getProgressColor(project.progress),
                        borderRadius: '3px',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <div style={{ display: 'flex' }}>
                      {project.team.map((member, index) => (
                        <div key={index} style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: '2px solid white',
                          marginLeft: index > 0 ? '-8px' : '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          backgroundColor: index === 0 ? '#fb923c' : 
                                         index === 1 ? '#60a5fa' : '#34d399',
                          zIndex: project.team.length - index
                        }}>
                          {member}
                        </div>
                      ))}
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: '2px solid white',
                        marginLeft: '-8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        backgroundColor: '#e5e7eb',
                        color: '#6b7280'
                      }}>
                        +
                      </div>
                    </div>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                      {project.daysLeft} Days Left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inbox Section - Bottom */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px 24px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#111827',
                  margin: 0
                }}>
                  Inbox
                </h3>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#6b7280',
                  borderRadius: '50%'
                }} />
              </div>
              <MoreHorizontal size={20} color="#6b7280" style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <div style={{ padding: '0 24px 24px' }}>
            {messages.map((message) => (
              <div key={message.id} style={{
                display: 'flex',
                gap: '12px',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '16px',
                transition: 'all 0.3s ease',
                backgroundColor: message.isDark ? '#1f2937' : 'transparent',
                color: message.isDark ? 'white' : 'inherit',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = message.isDark ? '#374151' : '#f9fafb';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = message.isDark ? '#1f2937' : 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0,
                  background: message.avatarColor === 'blue' ? 'linear-gradient(135deg, #60a5fa, #2563eb)' :
                             message.avatarColor === 'yellow' ? 'linear-gradient(135deg, #facc15, #f59e0b)' :
                             'linear-gradient(135deg, #34d399, #10b981)'
                }}>
                  {message.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    marginBottom: '6px' 
                  }}>
                    <h4 style={{ 
                      fontWeight: '600', 
                      color: message.isDark ? 'white' : '#111827',
                      margin: 0,
                      fontSize: '16px'
                    }}>
                      {message.name}
                    </h4>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: message.isDark ? '#34d399' : '#10b981',
                      borderRadius: '50%'
                    }} />
                  </div>
                  <p style={{ 
                    fontSize: '14px', 
                    color: message.isDark ? '#d1d5db' : '#6b7280', 
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }} onClick={() => setSelectedProject(null)}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }} onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div style={{
                padding: '24px 24px 16px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: selectedProject.color === 'yellow' ? '#fefce8' : 
                                   selectedProject.color === 'blue' ? '#eff6ff' : 
                                   selectedProject.color === 'pink' ? '#fdf2f8' :
                                   selectedProject.color === 'green' ? '#f0fdf4' : '#faf5ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    📋
                  </div>
                  <div>
                    <h2 style={{ 
                      fontSize: '20px', 
                      fontWeight: '600', 
                      color: '#111827',
                      margin: '0 0 4px 0'
                    }}>
                      {selectedProject.title}
                    </h2>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {selectedProject.date}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '8px',
                    color: '#6b7280',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div style={{ padding: '24px', overflowY: 'auto', maxHeight: 'calc(90vh - 120px)' }}>
                {/* Project Description */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#111827',
                    margin: '0 0 12px 0'
                  }}>
                    Description
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6b7280', 
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {selectedProject.description}
                  </p>
                </div>

                {/* Project Details Grid */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px'
                  }}>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#6b7280', 
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      fontWeight: '500'
                    }}>
                      Status
                    </p>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#111827', 
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {selectedProject.status}
                    </p>
                  </div>

                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px'
                  }}>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#6b7280', 
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      fontWeight: '500'
                    }}>
                      Priority
                    </p>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#111827', 
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {selectedProject.priority}
                    </p>
                  </div>

                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px'
                  }}>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#6b7280', 
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      fontWeight: '500'
                    }}>
                      Budget
                    </p>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#111827', 
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {selectedProject.budget}
                    </p>
                  </div>

                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px'
                  }}>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#6b7280', 
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      fontWeight: '500'
                    }}>
                      Phase
                    </p>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#111827', 
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {selectedProject.phase}
                    </p>
                  </div>
                </div>

                {/* Progress Section */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      color: '#111827',
                      margin: 0
                    }}>
                      Progress
                    </h3>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: getProgressColor(selectedProject.progress)
                    }}>
                      {selectedProject.progress}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${selectedProject.progress}%`,
                      height: '100%',
                      backgroundColor: getProgressColor(selectedProject.progress),
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                {/* Team Section */}
                <div>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#111827',
                    margin: '0 0 16px 0'
                  }}>
                    Team Members
                  </h3>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {selectedProject.team.map((member, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          backgroundColor: index === 0 ? '#fb923c' : 
                                         index === 1 ? '#60a5fa' : '#34d399'
                        }}>
                          {member}
                        </div>
                        <span style={{
                          fontSize: '12px',
                          color: '#6b7280',
                          textAlign: 'center'
                        }}>
                          Member {index + 1}
                        </span>
                      </div>
                    ))}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        backgroundColor: '#e5e7eb',
                        color: '#6b7280',
                        cursor: 'pointer',
                        border: '2px dashed #d1d5db'
                      }}>
                        +
                      </div>
                      <span style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        textAlign: 'center'
                      }}>
                        Add Member
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProfileDashboard;