import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
  TextField,
  InputAdornment,
  LinearProgress,
  Chip,
  Grid,
  Paper
} from '@mui/material';
import {
  CloudUpload,
  Folder,
  Computer,
  Share,
  Schedule,
  Star,
  Delete,
  Backup,
  Search,
  Settings,
  Help,
  GridView,
  Info,
  Menu,
  Description,
  PictureAsPdf,
  Image,
  MoreVert,
  ChevronRight
} from '@mui/icons-material';

const drawerWidth = 260;

export default function GoogleDriveUI() {
  const [selectedFile, setSelectedFile] = useState(null);

  const sidebarItems = [
    { text: 'My drive', icon: <Folder />, active: true },
    { text: 'Computers', icon: <Computer /> },
    { text: 'Shared with me', icon: <Share /> },
    { text: 'Recent', icon: <Schedule /> },
    { text: 'Starred', icon: <Star /> },
    { text: 'Trash', icon: <Delete /> },
    { text: 'Backups', icon: <Backup /> }
  ];

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
      {/* AppBar */}
      <AppBar position="fixed" sx={{boxShadow: 'none', bgcolor: 'white', color: '#5f6368', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton aria-label="menu">
              <Menu />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box 
                sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: '#4285f4', 
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Folder sx={{ color: 'white', fontSize: 16 }} />
              </Box>
              <Typography variant="h6" sx={{ color: '#5f6368', fontWeight: 400 }}>
                Google Drive
              </Typography>
            </Box>
          </Box>
          <TextField
            placeholder="Search Drive"
            variant="outlined"
            size="small"
            sx={{ 
              width: { xs: 120, sm: 250, md: 400, lg: 600 },
              '& .MuiOutlinedInput-root': {
                bgcolor: '#f1f3f4',
                borderRadius: '24px',
                '& fieldset': { border: 'none' }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#5f6368' }} />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton aria-label="help">
              <Help sx={{ color: '#5f6368' }} />
            </IconButton>
            <IconButton aria-label="settings">
              <Settings sx={{ color: '#5f6368' }} />
            </IconButton>
            <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>J</Avatar>
            <IconButton aria-label="menu options">
              <Menu sx={{ color: '#5f6368' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Drawer (Sidebar) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#020235',
            borderRight: '1px solid #e0e0e0',
            borderTopRightRadius: '60px',
            mt: 8,
         
            // PAS de mt, pt, ou paddingTop ici !
          },
        }}
      >
        <Toolbar sx={{ minHeight: 64 }} />
        {/* <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            startIcon={<CloudUpload />}
            sx={{
              width: '100%',
              borderRadius: '24px',
              textTransform: 'none',
              bgcolor: '#1976d2',
              '&:hover': { bgcolor: '#1565c0' }
            }}
          >
            Upload New File
          </Button>
        </Box>*/}

        <List sx={{ px: 1 ,mt:2}}>
          {sidebarItems.map((item, index) => (
            <ListItem
              key={item.text}
              sx={{
                borderRadius: '0 24px 24px 0',
                bgcolor: item.active ? '#e3f2fd' : 'transparent',
                color: item.active ? '#1976d2' : '#5f6368',
                mb: 0.5,
                '&:hover': { bgcolor: item.active ? '#e3f2fd' : '#f5f5f5' }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{ fontSize: '14px' }}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 2 }}>
          <Typography variant="caption" sx={{ color: '#5f6368', mb: 1, display: 'block' }}>
            STORAGE DETAILS
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Folder sx={{ color: '#5f6368', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#202124' }}>Storage</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={60} 
              sx={{ 
                height: 4, 
                borderRadius: 2,
                bgcolor: '#e8eaed',
                '& .MuiLinearProgress-bar': { bgcolor: '#1976d2' }
              }} 
            />
            <Typography variant="caption" sx={{ color: '#5f6368', mt: 0.5, display: 'block' }}>
              60.8 GB of 1 TB used
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Image sx={{ color: '#5f6368', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#202124' }}>Photos</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={15} 
              sx={{ 
                height: 4, 
                borderRadius: 2,
                bgcolor: '#e8eaed',
                '& .MuiLinearProgress-bar': { bgcolor: '#34a853' }
              }} 
            />
            <Typography variant="caption" sx={{ color: '#5f6368', mt: 0.5, display: 'block' }}>
              10.3 GB of 1 TB used
            </Typography>
          </Box>

          <Button
            variant="text"
            sx={{ 
              textTransform: 'none',
              color: '#1976d2',
              fontSize: '13px',
              p: 0
            }}
          >
            Upgrade Storage ↗
          </Button>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'white' }}>
        <Toolbar sx={{ minHeight: 64 }} />
        
        {/* Header */}
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