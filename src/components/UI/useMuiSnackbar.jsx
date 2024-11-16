import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackbarContext = createContext();

export const useMuiSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const showSnackbar = (message, severity = 'success') => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success':
        return '#4caf50'; // Green color for success
      case 'error':
        return '#f44336'; // Red color for error
      default:
        return '#4caf50'; // Default to green for success
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Stick to top-right corner
      >
        <MuiAlert
          onClose={handleClose}
          severity={severity}
          sx={{
            width: '100%',
            justifyContent: 'center',
            backgroundColor: getSeverityColor(severity),
          }} // Center align the text and set background color dynamically
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
