import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Succes = () => {
  useEffect(() => {
    // Send data to WebView when the page loads
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ message: "Compra realizada con éxito", amount: 1995.4 })
    );
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
      }}
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "green", mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Compra Realizada!
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Gracias por confiar en Chekea
      </Typography>
    </Box>
  );
};

export default Succes;
