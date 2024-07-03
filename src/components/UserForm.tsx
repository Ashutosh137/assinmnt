import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const UserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && phone && email) {
      localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
      navigate('/second-page');
    }
  };

  return (
    <Container>
      <Typography variant="h4" textAlign={"center"} my={10}>User Details</Typography>
      <TextField label="Name" value={name}  onChange={(e) => setName(e.target.value)} fullWidth />
      <TextField sx={{my:5}} label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
      <TextField  label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <Button sx={{my:5}} variant='contained' onClick={handleSubmit}>Submit</Button>
    </Container>
  );
};

export default UserForm;
