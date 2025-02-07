import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CustomText from "./CustomText";

const Succes = () => {
  useEffect(() => {
    // Send data to WebView when the page loads
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        message: "Compra realizada con éxito",
        notificacion: true,
      })
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
      <CustomText text={"Compra Realizada!"} size={"h4"} />

      <CustomText
        text={"Gracias por confiar en Chekea"}
        colores={"textSecondary"}
      />

    
    </Box>
  );
};

export default Succes;
