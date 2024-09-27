import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  RadioGroup,
  FormControl,
  FormControlLabel,
  IconButton,
  Collapse,
  Radio,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { makeStyles } from "@mui/styles";
import Passcode from "./Passcode";
import CustomText from "./CustomText";

const Pagos = () => {
  const [imageUri, setImageUri] = useState(null);
  const [receivedData, setReceivedData] = useState({ name: "", surname: "" });
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleButtonClick = () => {
    const passcode = prompt("Introduzca su contrasexa:");
    if (passcode) {
      alert(`Passcode entered: ${passcode}`);
    }
  };
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  const [paymentType, setPaymentType] = useState("Nacional");

  const handleChange = (event) => {
    console.log(event.target.value);
    setPaymentType(event.target.value);
  };
  useEffect(() => {
    // Define a global function to receive data
    window.receiveData = (data) => {
      console.log(data);

      setReceivedData(data);
    };

    // Cleanup function to remove the global function
    return () => {
      delete window.receiveData;
    };
  }, []);

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        overflow: "hidden",
        // display: { xs: "block", sm: "none" }, // Show only on mobile (xs)
      }}
    >
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        {receivedData.contexto === "Nacional" ? (
          <CustomText text={receivedData.contexto} />
        ) : null}
        <CustomText text={"User2 18171337454"} />

        {receivedData.contexto !== "Nacional" ? (
          <RadioGroup value={paymentType} onChange={handleChange} row>
            <FormControlLabel
              value="A Domicilio"
              control={<Radio />}
              label="A Domicilio"
            />
            <FormControlLabel
              value="Retiro Presencial"
              control={<Radio />}
              label="Retiro Presencial"
            />
          </RadioGroup>
        ) : null}
        {1 == 0 ? (
          <div>
            Horas favorables para entrega
            <RadioGroup value={paymentType} onChange={handleChange} row>
              <FormControlLabel
                value="14-16"
                control={<Radio />}
                label="20-21"
              />
              <FormControlLabel
                value="18-20"
                control={<Radio />}
                label="20-21"
              />
              <FormControlLabel
                value="20-21"
                control={<Radio />}
                label="20-21"
              />
            </RadioGroup>
          </div>
        ) : null}
      </Paper>

      <Divider sx={{ marginY: 2 }} />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <CustomText text={"Detalles"} />

        <Grid container justifyContent="space-between">
          <CustomText text={"1 Producto(s)"} />
          <CustomText text={"50.000xfa"} />
        </Grid>
        <Grid container justifyContent="space-between">
          <CustomText text={"Coste de Envio(s)"} />
          <CustomText text={"10.000xfa"} />
        </Grid>

        <Grid container justifyContent="space-between">
          <CustomText text={"TOTAL"} />
          <CustomText text={"60.000xfa"} />
        </Grid>
      </Paper>
      <Divider sx={{ marginY: 2 }} />
      {receivedData.Lugar !== "Malabo" ? (
        <Paper sx={{ padding: 2, marginBottom: 12 }}>
          <CustomText text={"Realizar Pago"} />

          <RadioGroup value={paymentType} onChange={handleChange} row>
            <FormControlLabel
              value="Nacional"
              control={<Radio />}
              label="Nacional"
            />
            <FormControlLabel
              value="Exterior"
              control={<Radio />}
              label="Exterior"
            />
          </RadioGroup>
          <Grid container justifyContent="space-between">
            <CustomText text={"Coste de Envio(s)"} />
            <CustomText text={"10.000xfa"} />
          </Grid>
          <Grid container justifyContent="space-between">
            <CustomText text={"Coste de Envio(s)"} />
            <CustomText text={"10.000xfa"} />
          </Grid>
          <Grid container justifyContent="space-between">
            <CustomText text={"Coste de Envio(s)"} />
            <CustomText text={"10.000xfa"} />
          </Grid>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            Ver Pasos
            <IconButton
              onClick={handleToggle}
              size="small"
              sx={{ marginLeft: 1 }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Typography>
          <Collapse in={open}>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Here is the additional data that can be shown or hidden.
            </Typography>
          </Collapse>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Suba la imagen de la factura
          </Typography>
          <Grid item xs={3}>
            {imageUri ? (
              <img
                src={imageUri}
                alt="Selected"
                style={{ width: "100%", borderRadius: 8 }}
              />
            ) : (
              <IconButton sx={{ width: "100%", height: "100%" }}>
                <PhotoCameraIcon style={{ fontSize: "150px", color: "#ccc" }} />
              </IconButton>
            )}
          </Grid>
        </Paper>
      ) : (
        <CustomText
          text={"Los pagos en malabo se realizan a la entrega del producto"}
        />
      )}

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          padding: 2,
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box>
          <CustomText text={"User2 18171337454"} />
        </Box>
        <Button
          sx={{
            fontFamily: "CustomFont, Arial, sans-serif",
            fontWeight: "bold",
          }}
          variant="contained"
          color="warning"
          onClick={openModal}
        >
          CONFIRMAR
        </Button>
      </Box>
      <Passcode open={modalOpen} onClose={closeModal} />
    </Box>
  );
};

export default Pagos;
