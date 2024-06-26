import React from "react";
import { Routes, Route } from "react-router-dom";
import Nacional from "./Nacional";

import Exterior from "./Exterior";
import DetallesCompra from "./DetallesCompra";
import Publicar from "./Publicar";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const Routing = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Routes>
        {!isMobile ? (
          <Route path="/" element={<Publicar />} />
        ) : (
          <Route path="/" element={<Nacional />} />
        )}
        <Route path="/Nacional" element={<Nacional />} />

        <Route path="/Exterior" element={<Exterior />} />

        <Route
          path="/Exterior/Detalles/:codigo/:contexto"
          element={<DetallesCompra />}
        />
      </Routes>
    </>
  );
};
