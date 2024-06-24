import React from "react";
import { Routes, Route } from "react-router-dom";
import Nacional from "./Nacional";

import Exterior from "./Exterior";
import DetallesCompra from "./DetallesCompra";
import Publicar from "./Publicar";

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Publicar />} />
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
