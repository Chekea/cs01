import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  customStyle: {
    fontFamily: "CustomFont, Arial, sans-serif",
    fontWeight: "bold",
  },
});
function Feedback() {
  const [inputValue, setInputValue] = useState("");
  const [receivedData, setReceivedData] = useState({});

  const classes = useStyles();
  // Mock function to simulate WebView's injectJavaScript

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    alert(`Input Value: ${inputValue}`);
    setInputValue("");
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Typography variant="h6" align="center" className={classes.customStyle}>
        NAWETIN: {receivedData.Titulo}
      </Typography>
      <h2>
        Titulo: {receivedData.Titulo}, Precio: {receivedData.Precio} Producto:{" "}
        {receivedData.Producto}
      </h2>
      <TextField
        label="Deje su Comentario..."
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        multiline
        rows={4}
        sx={{ width: "90%", mb: 2 }}
      />

      <Button
        variant="contained"
        color="warning"
        onClick={handleButtonClick}
        disabled={!inputValue}
        sx={{
          fontFamily: "CustomFont, Arial, sans-serif",
          fontWeight: "bold",
        }}
      >
        Publicar
      </Button>
    </Box>
  );
}

export default Feedback;
