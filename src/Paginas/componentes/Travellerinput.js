import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Chip,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";

function TravelerInput() {
  const [traveler, setTraveler] = useState({
    name: "",
    departure: "",
    destination: "",
    departureDate: "",
    arrivalDate: "",
    availableSpace: "",
    acceptsSmallDevices: false,
    price: "",
    phoneNumber: "", // Added phoneNumber field
  });

  const [selectedPrice, setSelectedPrice] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTraveler({
      ...traveler,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleChipClick = (price) => {
    setSelectedPrice(price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit traveler info to the server or state management
    console.log(
      "Información del viajero enviada:",
      traveler,
      "Precio seleccionado:",
      selectedPrice
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Salida"
        variant="outlined"
        name="departure"
        value={traveler.departure}
        onChange={handleChange}
        required
      />
      <TextField
        label="Destino"
        variant="outlined"
        name="destination"
        value={traveler.destination}
        onChange={handleChange}
        required
      />
      <TextField
        label="Fecha de salida"
        type="date"
        variant="outlined"
        name="departureDate"
        value={traveler.departureDate}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <TextField
        label="Fecha de llegada"
        type="date"
        variant="outlined"
        name="arrivalDate"
        value={traveler.arrivalDate}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <TextField
        label="Número de teléfono"
        variant="outlined"
        name="phoneNumber"
        value={traveler.phoneNumber}
        onChange={handleChange}
        helperText="El contacto es imprescindible para notificarle sobre posibles clientes y este debe estar activo en WhatsApp"
        required
      />
      <FormControlLabel
        control={
          <Switch
            checked={traveler.acceptsSmallDevices}
            onChange={handleChange}
            name="acceptsSmallDevices"
          />
        }
        label="Acepta solo dispositivos pequeños (por ejemplo, teléfonos móviles, AirPods)"
      />

      {!traveler.acceptsSmallDevices && (
        <TextField
          label="Espacio disponible"
          variant="outlined"
          name="availableSpace"
          value={traveler.availableSpace}
          onChange={handleChange}
          required
        />
      )}
      <Typography variant="body1" component="div">
        {traveler.acceptsSmallDevices
          ? "Elija su precio por dispositivo"
          : "Elija su precio por kg"}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {[10000, 15000, 20000].map((price) => (
          <Chip
            key={price}
            label={`${price} XFAS`}
            onClick={() => handleChipClick(price)}
            color={selectedPrice === price ? "primary" : "default"}
            variant={selectedPrice === price ? "filled" : "outlined"}
          />
        ))}
      </Box>

      <Button variant="contained" type="submit">
        Publicar
      </Button>
    </Box>
  );
}

export default TravelerInput;
