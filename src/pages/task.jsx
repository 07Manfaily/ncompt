import React, { useState } from 'react';

const Task = () => {
  const [tasks] = useState([
    {
      id: 1,
      title: 'High priority mobile app design health',
      description: 'High priority work will be done on health',
      category: 'Design',
      progress: 2,
      total: 10,
      comments: 12,
      attachments: 10,
      date: 'Nov',
      assignees: [
        { initials: 'PN', priority: 'High', color: '#ff5722' },
        { initials: 'YM', priority: 'High', color: '#2196f3' },
        { initials: 'AB', priority: 'Medium', color: '#4caf50' },
        { initials: 'CD', priority: 'High', color: '#9c27b0' },
        { initials: 'EF', priority: 'Low', color: '#ff9800' },
        { initials: 'GH', priority: 'High', color: '#607d8b' },
        { initials: 'IJ', priority: 'Medium', color: '#795548' }
      ],
      status: 'Not started'
    },
    {
      id: 2,
      title: 'High priority mobile app design health',
      description: 'High priority work will be done on health',
      category: 'Content',
      progress: 2,
      total: 10,
      comments: 12,
      attachments: 10,
      date: 'Nov',
      assignees: [
        { initials: 'AB', priority: 'Urgent', color: '#ff9800' },
        { initials: 'CD', priority: 'Urgent', color: '#4caf50' }
      ],
      status: 'Started'
    },
    {
      id: 3,
      title: 'High priority mobile app design health',
      description: 'High priority work will be done on health',
      category: 'Research',
      progress: 2,
      total: 10,
      comments: 12,
      attachments: 10,
      date: 'Nov',
      assignees: [
        { initials: 'EF', priority: 'Medium', color: '#9c27b0' },
        { initials: 'GH', priority: 'Medium', color: '#607d8b' }
      ],
      status: 'In Progress'
    },
    {
      id: 4,
      title: 'High priority mobile app design health',
      description: 'High priority work will be done on health',
      category: 'Planning',
      progress: 2,
      total: 10,
      comments: 12,
      attachments: 10,
      date: 'Nov',
      assignees: [
        { initials: 'IJ', priority: 'Urgent', color: '#795548' },
        { initials: 'KL', priority: 'Urgent', color: '#e91e63' }
      ],
      status: 'Completed'
    },
    {
      id: 5,
      title: 'High priority mobile app design health',
      description: 'High priority work will be done on health',
      category: 'Design',
      progress: 2,
      total: 10,
      comments: 12,
      attachments: 10,
      date: 'Nov',
      assignees: [
        { initials: 'MN', priority: 'High', color: '#ff5722' },
        { initials: 'OP', priority: 'High', color: '#2196f3' }
      ],
      status: 'Not started'
    },
    {
      id: 6,
      title: 'High priority mobile app design health',
      description: 'High priority work will be done on health',
      category: 'Content',
      progress: 2,
      total: 10,
      comments: 12,
      attachments: 10,
      date: 'Nov',
      assignees: [
        { initials: 'QR', priority: 'Urgent', color: '#ff9800' },
        { initials: 'ST', priority: 'Urgent', color: '#4caf50' }
      ],
      status: 'Started'
    },
    {
      id: 7,
      title: 'High priority mobile app design health',
      description: 'High priority work will be done on health',
      category: 'Research',
      progress: 2,
      total: 10,
      comments: 12,
      attachments: 10,
      date: 'Nov',
      assignees: [
        { initials: 'UV', priority: 'Medium', color: '#9c27b0' },
        { initials: 'WX', priority: 'Medium', color: '#607d8b' }
      ],
      status: 'In Progress'
    },
    {
      id: 8,
      title: 'High priority mobile app design health',
      description: 'High priority work will be done on health',
      category: 'Planning',
      progress: 2,
      total: 10,
      comments: 12,
      attachments: 10,
      date: 'Nov',
      assignees: [
        { initials: 'YZ', priority: 'Urgent', color: '#795548' },
        { initials: 'AA', priority: 'Urgent', color: '#e91e63' }
      ],
      status: 'Completed'
    }
  ]);

  const columns = [
    { id: 'Not started', title: 'Not started', count: 0 },
    { id: 'Started', title: 'Started', count: 0 },
    { id: 'In Progress', title: 'In Progress', count: 0 },
    { id: 'Completed', title: 'Completed', count: 0 }
  ];

  // Count tasks for each column
  columns.forEach(column => {
    column.count = tasks.filter(task => task.status === column.id).length;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Design': '#00bcd4',
      'Content': '#ff9800',
      'Research': '#2196f3',
      'Planning': '#9c27b0'
    };
    return colors[category] || '#666';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': '#f44336',
      'Medium': '#ff9800',
      'Urgent': '#ff5722',
      'Low': '#4caf50'
    };
    return colors[priority] || '#666';
  };

  return (
    <div style={{ 
      padding: '24px', 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh',
      fontFamily: 'Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px' 
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '600', 
          color: '#333',
          margin: 0
        }}>
          Tasks
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <span style={{ fontSize: '18px', color: '#666' }}>🔍</span>
          </div>
          <button style={{
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <span>+</span>
            Add Tasks
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '24px',
        height: 'calc(100vh - 140px)'
      }}>
        {columns.map(column => (
          <div key={column.id} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Column Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              padding: '0 8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: '500', 
                  color: '#333',
                  margin: 0
                }}>
                  {column.title}
                </h3>
                <span style={{
                  backgroundColor: '#e0e0e0',
                  color: '#666',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {column.count}
                </span>
              </div>
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                fontSize: '18px',
                padding: '4px'
              }}>
                ⋯
              </button>
            </div>

            {/* Tasks */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px',
              overflowY: 'auto'
            }}>
              {tasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <div key={task.id} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, boxShadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                  }}>
                    {/* Category Badge */}
                    <div style={{
                      backgroundColor: getCategoryColor(task.category),
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      display: 'inline-block',
                      marginBottom: '12px'
                    }}>
                      {task.category}
                    </div>

                    {/* Title */}
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#333',
                      margin: '0 0 8px 0',
                      lineHeight: '1.4'
                    }}>
                      {task.title}
                    </h4>

                    {/* Description */}
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: '0 0 16px 0',
                      lineHeight: '1.4'
                    }}>
                      {task.description}
                    </p>

                    {/* Progress */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                          Progress
                        </span>
                        <span style={{ fontSize: '14px', color: '#666' }}>
                          {task.progress}/{task.total}
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '2px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${(task.progress / task.total) * 100}%`,
                          height: '100%',
                          backgroundColor: '#ff5722',
                          borderRadius: '2px'
                        }} />
                      </div>
                    </div>

                    {/* Bottom Info */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      {/* Stats */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '16px' }}>💬</span>
                          <span style={{ fontSize: '14px', color: '#666' }}>{task.comments}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '16px' }}>📎</span>
                          <span style={{ fontSize: '14px', color: '#666' }}>{task.attachments}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '16px' }}>📅</span>
                          <span style={{ fontSize: '14px', color: '#666' }}>{task.date}</span>
                        </div>
                      </div>

                      {/* Assignees */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', marginRight: '8px' }}>
                          {task.assignees.slice(0, 3).map((assignee, index) => (
                            <div key={index} style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: assignee.color,
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: '600',
                              marginLeft: index > 0 ? '-8px' : '0',
                              border: '2px solid white',
                              zIndex: task.assignees.length - index,
                              cursor: 'pointer'
                            }}
                            title={`${assignee.initials} - ${assignee.priority}`}>
                              {assignee.initials}
                            </div>
                          ))}
                          {task.assignees.length > 3 && (
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: '#666',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              fontWeight: '600',
                              marginLeft: '-8px',
                              border: '2px solid white',
                              cursor: 'pointer',
                              zIndex: 1
                            }}
                            title={`+${task.assignees.length - 3} autres personnes assignées`}>
                              +{task.assignees.length - 3}
                            </div>
                          )}
                        </div>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          color: getPriorityColor(task.assignees[0]?.priority),
                          backgroundColor: `${getPriorityColor(task.assignees[0]?.priority)}15`,
                          padding: '4px 8px',
                          borderRadius: '12px'
                        }}>
                          {task.assignees[0]?.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;