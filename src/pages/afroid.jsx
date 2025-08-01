import React, { useState, useEffect } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography, Radio, RadioGroup, FormControlLabel,
  FormLabel, Select, MenuItem, Chip, IconButton, Paper, Stack, Divider
} from '@mui/material';
import { Save, Close as CloseIcon, Add, Edit, Delete, Label } from '@mui/icons-material';

const mockAPI = {
  getQuizzes: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        quiz: 'Mathématiques niveau 1',
        type: 'qcm',
        obligatoire: 'oui',
        modalites: ['En ligne', 'Temps limité', 'Questions aléatoires']
      },
      {
        id: 2,
        quiz: 'Histoire de France',
        type: 'qcu',
        obligatoire: 'non',
        modalites: ['Présentiel', 'Livre ouvert']
      },
      {
        id: 3,
        quiz: 'Sciences physiques',
        type: 'qcm',
        obligatoire: 'oui',
        modalites: ['Laboratoire', 'Expérimentation pratique', 'Rapport écrit']
      }
    ];
  },
  createQuiz: async (quizData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { id: Date.now(), ...quizData };
  },
  updateQuiz: async (id, quizData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { id, ...quizData };
  },
  deleteQuiz: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  }
};

const QuizManager = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    quiz: '',
    type: 'qcm',
    obligatoire: 'non',
    modalites: []
  });
  const [currentModalite, setCurrentModalite] = useState('');

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    setLoading(true);
    try {
      const data = await mockAPI.getQuizzes();
      setQuizzes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (quiz = null) => {
    if (quiz) {
      setEditingQuiz(quiz);
      setFormData({ ...quiz });
    } else {
      setEditingQuiz(null);
      setFormData({ quiz: '', type: 'qcm', obligatoire: 'non', modalites: [] });
    }
    setCurrentModalite('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingQuiz(null);
    setFormData({ quiz: '', type: 'qcm', obligatoire: 'non', modalites: [] });
    setCurrentModalite('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModaliteKeyPress = (e) => {
    if (e.key === 'Enter' && currentModalite.trim()) {
      e.preventDefault();
      if (!formData.modalites.includes(currentModalite.trim())) {
        setFormData(prev => ({
          ...prev,
          modalites: [...prev.modalites, currentModalite.trim()]
        }));
        setCurrentModalite('');
      }
    }
  };

  const removeModalite = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      modalites: prev.modalites.filter((_, i) => i !== indexToRemove)
    }));
  };

  const handleSubmit = async () => {
    if (!formData.quiz.trim()) return;

    try {
      if (editingQuiz) {
        const updated = await mockAPI.updateQuiz(editingQuiz.id, formData);
        setQuizzes(prev => prev.map(q => q.id === editingQuiz.id ? updated : q));
      } else {
        const created = await mockAPI.createQuiz(formData);
        setQuizzes(prev => [...prev, created]);
      }
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce quiz ?')) {
      await mockAPI.deleteQuiz(id);
      setQuizzes(prev => prev.filter(q => q.id !== id));
      if (editingQuiz?.id === id) closeModal();
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Gestionnaire de Quiz</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => openModal()}
        >
          Nouveau Quiz
        </Button>
      </Box>

      <Stack spacing={2}>
        {loading ? (
          <Typography>Chargement...</Typography>
        ) : quizzes.length === 0 ? (
          <Typography>Aucun quiz pour le moment.</Typography>
        ) : (
          quizzes.map((quiz) => (
            <Paper
              key={quiz.id}
              elevation={3}
              sx={{
                p: 2,
                borderLeft: quiz.obligatoire === 'oui' ? '5px solid green' : '5px solid grey',
                position: 'relative'
              }}
              onClick={() => openModal(quiz)}
            >
              <Typography variant="h6">{quiz.quiz}</Typography>
              <Typography variant="body2">
                Type : {quiz.type.toUpperCase()} | Obligatoire : {quiz.obligatoire} | Modalités : {quiz.modalites.length}
              </Typography>

              <Box sx={{ position: 'absolute', right: 10, top: 10 }}>
                <IconButton onClick={(e) => { e.stopPropagation(); openModal(quiz); }}><Edit color="primary" /></IconButton>
                <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(quiz.id); }}><Delete color="error" /></IconButton>
              </Box>
            </Paper>
          ))
        )}
      </Stack>

      {/* Modal de création / édition */}
      <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingQuiz ? 'Modifier le Quiz' : 'Nouveau Quiz'}
          <IconButton onClick={closeModal} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} mt={1}>
            <TextField
              label="Nom du Quiz"
              name="quiz"
              value={formData.quiz}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <Select
              fullWidth
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              label="Type de Quiz"
            >
              <MenuItem value="qcm">QCM</MenuItem>
              <MenuItem value="qcu">QCU</MenuItem>
            </Select>

            <Box>
              <FormLabel>Obligatoire</FormLabel>
              <RadioGroup
                row
                name="obligatoire"
                value={formData.obligatoire}
                onChange={handleInputChange}
              >
                <FormControlLabel value="non" control={<Radio />} label="Non" />
                <FormControlLabel value="oui" control={<Radio />} label="Oui" />
              </RadioGroup>
            </Box>

            <Box>
              <TextField
                label="Ajoutez une modalité (Entrée)"
                fullWidth
                value={currentModalite}
                onChange={(e) => setCurrentModalite(e.target.value)}
                onKeyDown={handleModaliteKeyPress}
              />
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.modalites.map((mod, i) => (
                  <Chip
                    key={i}
                    icon={<Label />}
                    label={mod}
                    onDelete={() => removeModalite(i)}
                    color="secondary"
                  />
                ))}
              </Box>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Annuler</Button>
          <Button variant="contained" onClick={handleSubmit} startIcon={<Save />}>
            {editingQuiz ? 'Modifier' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuizManager;
