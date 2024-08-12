// src/App.js
import React from 'react';
import Button from '@mui/material/Button';
import Icon from '@mui/icons-material/AccountCircle';

function Habit() {
  return (
    <div style={{ padding: 20 }}>
      <Button variant="contained" color="primary">
        <Icon style={{ marginRight: 8 }} />
        Click Me
      </Button>
    </div>
  );
}

export default Habit;
