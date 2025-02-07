import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PublicarComentario, UpdateDb } from "../../Servicios/DBservices";
import CustomText from "./CustomText";

function Feedback() {
  const [inputValue, setInputValue] = useState("");
  const [receivedData, setReceivedData] = useState({});
  const [publico, setpublico] = useState(false);

  const [loading, setloading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    // Send data to WebView when the page loads
    if (publico) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          message: "Comentario realizado con éxito",
          notificacion: false,
        })
      );
    }
  }, [publico]);

  const subirComentario = async () => {
    console.log(receivedData, inputValue);
    setloading(true);

    try {
      await PublicarComentario(
        receivedData.Codigo,
        receivedData.Producto,
        receivedData.contexto,
        {
          comentario: inputValue,
          usuario: receivedData.Nombre,
          id: receivedData.Comprador,
        }
      );

      setTimeout(() => {
        alert(
          "Su comentario ha sido publicado con éxito.\nGracias por ayudarnos a mejorar"
        );

        // Your code to be executed after 1.5 seconds
        setloading(false);
        setpublico(true);
      }, 1500);

      UpdateDb(
        { comentario: true },
        `GE/Comprador/${receivedData.Comprador}/MisCompras/${receivedData.Codigo}`
      );
    } catch (error) {
      alert("Error... Ha ocurrido un error inesperado");

      console.error("Error publishing comment:", error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };
  const handleButtonClick = () => {
    alert(`Input Value: ${inputValue}`);
    setInputValue("");
  };

  useEffect(() => {
    // Define a global function to receive data from WebView
    window.receiveData = (data) => {
      console.log("Received Data: ", data);

      // Parse the incoming data (assuming JSON format)
      try {
        const parsedData = JSON.parse(data);
        setReceivedData(parsedData);
      } catch (error) {
        console.error("Invalid JSON data received", error);
      }
    };

    // Cleanup to remove the global function when the component unmounts
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
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </div>
      ) : null}
      <TextField
        label="Deje su Comentario..."
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        multiline
        rows={4}
        sx={{ width: "90%", mb: 2 }}
      />

      {!publico ? (
        <Button
          variant="contained"
          color="warning"
          onClick={subirComentario}
          disabled={!inputValue}
          sx={{
            fontFamily: "CustomFont, Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          Publicar
        </Button>
      ) : null}
    </Box>
  );
}

export default Feedback;
