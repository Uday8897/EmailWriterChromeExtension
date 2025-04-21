import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Button,
  CircularProgress
} from '@mui/material';

const App = () => {
  const [email, setEmail] = useState('');
  const [tone, setTone] = useState('');
  const [generated, setGenerated] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/ai', {
        emailContent: email,
        tone: tone
      });
      setGenerated(response.data);
    } catch (err) {
      setGenerated('Error generating email: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Tone (Optional)</InputLabel>
        <Select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          label="Tone (Optional)"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
          <MenuItem value="casual">Casual</MenuItem>
          <MenuItem value="friendly">Friendly</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Reply'}
      </Button>

      {generated && (
        <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="h6">Generated Email:</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {generated}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default App;
