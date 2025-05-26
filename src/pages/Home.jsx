import React, { useState } from 'react';
import {
  Box,
  Toolbar,
  Typography,
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Grid,
  Paper
} from '@mui/material';
import {
  Folder,
  Computer,
  Share,
  Schedule,
  Star,
  Delete,
  Backup,
  GridView,
  Info,
  Description,
  PictureAsPdf,
  Image,
  MoreVert,
  ChevronRight
} from '@mui/icons-material';


export default function GoogleDriveUI() {
  const [selectedFile, setSelectedFile] = useState(null);



  const quickAccessFolders = [
    {
      title: 'SHARED WITH',
      subtitle: 'folder',
      avatars: ['#4285f4', '#ea4335', '#fbbc04', '#34a853', '#ff6d01'],
      color: '#1976d2'
    },
    {
      title: 'FOLDER',
      subtitle: 'Google Photos',
      avatars: ['#ea4335', '#4285f4', '#34a853'],
      color: '#f5f5f5'
    },
    {
      title: 'FOLDER',
      subtitle: 'Training Materials',
      avatars: ['#34a853', '#4285f4', '#ea4335', '#fbbc04'],
      color: '#f5f5f5'
    }
  ];

  const files = [
    {
      name: 'Weekly Reports.docx',
      type: 'document',
      icon: <Description color="primary" />,
      owner: 'You',
      lastModified: 'Sept 6, 2019 • 12:43 AM',
      size: '26 MB'
    },
    {
      name: 'Design Checklist.xlsx',
      type: 'spreadsheet',
      icon: <Description style={{ color: '#0f9d58' }} />,
      owner: 'You',
      lastModified: 'Sept 2, 2019 • 10:43 PM',
      size: '1.4 GB'
    },
    {
      name: 'Weekly Reports.pdf',
      type: 'pdf',
      icon: <PictureAsPdf style={{ color: '#ea4335' }} />,
      owner: 'You',
      lastModified: 'Jul 30, 2019 • 08:42 AM',
      size: '26 MB'
    },
    {
      name: 'Wedding Planner List.docx',
      type: 'document',
      icon: <Description color="primary" />,
      owner: 'You',
      lastModified: 'Jul 19, 2019 • 12:43 AM',
      size: '26 MB'
    },
    {
      name: 'Team JB Picture.jpg',
      type: 'image',
      icon: <Image style={{ color: '#ff9800' }} />,
      owner: 'You',
      lastModified: 'Jul 16, 2019 • 08:43 AM',
      size: '1.4 MB'
    },
    {
      name: 'Team Best Picture.jpg',
      type: 'image',
      icon: <Image style={{ color: '#ff9800' }} />,
      owner: 'You',
      lastModified: 'Jul 16, 2019 • 08:40 AM',
      size: '1.4 MB'
    }
  ];

  return (
    <Box sx={{ display: 'flex', bgcolor: 'white', minHeight: '100vh' }}>
 

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'white' }}>
        <Toolbar sx={{ minHeight: 64 }} />
      
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5" sx={{ color: '#202124', fontWeight: 400 }}>
              My Drive
            </Typography>
            <Chip 
              label="folder" 
              size="small" 
              sx={{ 
                bgcolor: '#1976d2', 
                color: 'white',
                height: 20,
                fontSize: '11px'
              }} 
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton>
              <GridView />
            </IconButton>
            <IconButton>
              <Info />
            </IconButton>
          </Box>
        </Box>

        {/* Quick Access */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#5f6368', fontSize: '11px', fontWeight: 500 }}>
              QUICK ACCESS
            </Typography>
            <IconButton size="small">
              <ChevronRight />
            </IconButton>
          </Box>
          
          <Grid container spacing={2}>
            {quickAccessFolders.map((folder, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    bgcolor: folder.color,
                    color: folder.color === '#1976d2' ? 'white' : '#202124',
                    '&:hover': { boxShadow: 3 }
                  }}
                >
                  <CardContent sx={{ pb: '16px !important' }}>
                    <Typography variant="caption" sx={{ fontWeight: 500, opacity: 0.8 }}>
                      {folder.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {folder.subtitle}
                    </Typography>
                    <AvatarGroup 
                      max={5} 
                      sx={{ 
                        '& .MuiAvatar-root': { 
                          width: 24, 
                          height: 24,
                          fontSize: '10px'
                        }
                      }}
                    >
                      {folder.avatars.map((color, i) => (
                        <Avatar key={i} sx={{ bgcolor: color, width: 24, height: 24 }}>
                          {String.fromCharCode(65 + i)}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ bgcolor: 'white', minHeight: 120, display: 'flex', alignItems: 'center' }}>
                <CardContent>
                  <Description sx={{ color: '#1976d2', mb: 1 }} />
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Project Summary for English Class
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5f6368' }}>
                    LAST MODIFIED
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5f6368', display: 'block' }}>
                    Sept 6, 2019 • 04:30 AM
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Files Table */}
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#5f6368', fontSize: '11px', fontWeight: 500, mb: 2 }}>
            ALL FILES
          </Typography>
          
          <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#5f6368', fontSize: '12px', fontWeight: 500 }}>NAME</TableCell>
                  <TableCell sx={{ color: '#5f6368', fontSize: '12px', fontWeight: 500 }}>OWNER</TableCell>
                  <TableCell sx={{ color: '#5f6368', fontSize: '12px', fontWeight: 500 }}>LAST MODIFIED</TableCell>
                  <TableCell sx={{ color: '#5f6368', fontSize: '12px', fontWeight: 500 }}>FILE SIZE</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((file, index) => (
                  <TableRow 
                    key={index}
                    sx={{ 
                      '&:hover': { bgcolor: '#f8f9fa' },
                      cursor: 'pointer'
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {file.icon}
                        <Typography variant="body2">{file.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 20, height: 20 }} alt={file.owner === 'You' ? 'Votre avatar' : file.owner}>
                          {file.owner === 'You' ? 'Y' : file.owner[0]}
                        </Avatar>
                        <Typography variant="body2" sx={{ color: '#5f6368' }}>
                          {file.owner}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#5f6368' }}>
                        {file.lastModified}
      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#5f6368' }}>
                        {file.size}
      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" aria-label="more options">
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
  </Box>
);
}