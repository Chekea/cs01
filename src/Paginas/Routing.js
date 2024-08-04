import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery, CircularProgress, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Principal from "./Principal";

// Lazy loading components
const Nacional = lazy(() => import("./Nacional"));
const Exterior = lazy(() => import("./Exterior"));
const DetallesCompra = lazy(() => import("./DetallesCompra"));
const Publicar = lazy(() => import("./Publicar"));
const Search = lazy(() => import("./Search"));
const EditarPost = lazy(() => import("./EditarPost"));
const Contabilidad = lazy(() => import("./Contabilidad"));

// Loader component for suspense fallback
const Loader = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

// Routing component with memoization
export const Routing = React.memo(({ email, logout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Principal email={email} logout={logout} />} />
        <Route path="/Publicar" element={<Publicar />} />
        <Route path="/Nacional" element={<Nacional email={email} />} />
        <Route path="/Contabilidad" element={<Contabilidad />} />
        <Route path="/Exterior" element={<Exterior />} />
        <Route path="/Buscar" element={<Search />} />
        <Route
          path="/Buscar/Editar/:codigo/:contexto"
          element={<EditarPost />}
        />
        <Route
          path="/:categoria/Detalles/:codigo/:contexto"
          element={<DetallesCompra />}
        />
      </Routes>
    </Suspense>
  );
});
