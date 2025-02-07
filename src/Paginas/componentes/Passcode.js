import React, { useState } from "react";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const Passcode = ({ open, onClose, codigo, enviardatos }) => {
  const [passcode, setPasscode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (codigo === passcode) {
      // Handle the passcode (e.g., send to a backend, validate)
      alert(`Passcode entered:${codigo} ${passcode}`);
      await enviardatos();

      setPasscode("");
      navigate(`/Pagos/Success`);
    } else {
      alert(`Contrasexa Incorrecta`);
    }
    onClose(); // Close the modal after submission
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Introduzca su contrasexa
        </Typography>
        <TextField
          type="password" // Mask the input
          label="Contrasexa"
          variant="outlined"
          fullWidth
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          CONFIRMAR
        </Button>
      </Box>
    </Modal>
  );
};

export default Passcode;
