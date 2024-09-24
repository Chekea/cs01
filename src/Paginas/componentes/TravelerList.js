import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function TravelerList({ travelers }) {
  const [open, setOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState({
    itemName: "",
    itemWeight: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Item Details:", itemDetails);
    handleClose();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Viajeros Disponibles
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {travelers.map((traveler, index) => (
          <Card key={index} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                {traveler.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Salida: {traveler.departure}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Destino: {traveler.destination}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha: {traveler.date}
              </Typography>
              {traveler.acceptsSmallDevices ? (
                <Typography variant="body2" color="text.secondary">
                  Acepta solo dispositivos pequeños
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Espacio Disponible: {traveler.availableSpace} kg
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                Precio: {traveler.price} XFAS{" "}
                {traveler.acceptsSmallDevices ? "por dispositivo" : "por kg"}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleOpen}
              >
                Aplicar
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      {/* Modal for item details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Detalles del Artículo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Artículo"
            name="itemName"
            fullWidth
            value={itemDetails.itemName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Peso del Artículo (kg)"
            name="itemWeight"
            type="number"
            fullWidth
            value={itemDetails.itemWeight}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TravelerList;
