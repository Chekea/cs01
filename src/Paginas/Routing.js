import React, { Suspense, lazy } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import { useMediaQuery, CircularProgress, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Principal from "./Principal";
import FeedBack from "./componentes/FeedBack";

// Lazy loading components
const Nacional = lazy(() => import("./Nacional"));
const Exterior = lazy(() => import("./Exterior"));
const DetallesCompra = lazy(() => import("./DetallesCompra"));
const Publicar = lazy(() => import("./Publicar"));
const Search = lazy(() => import("./Search"));
const EditarPost = lazy(() => import("./EditarPost"));
const Contabilidad = lazy(() => import("./Contabilidad"));
const Pharmacies = lazy(() => import("././componentes/Pharmacies"));
const Travel = lazy(() => import("./TravelDetailsForm"));

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

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

// Main routing component
export const Routing = React.memo(({ email, logout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        {/* Single BrowserRouter for the entire app */}
        <BrowserRouter basename="/Prueba">
          <Routes>
            <Route path="/" element={<Layout email={email} logout={logout} />}>
              <Route
                index
                element={<Principal email={email} logout={logout} />}
              />
              <Route path="Publicar" element={<Publicar />} />
              <Route path="Nacional" element={<Nacional email={email} />} />
              <Route path="Contabilidad" element={<Travel />} />
              <Route path="Farmacias" element={<Pharmacies />} />
              <Route path="Exterior" element={<Exterior />} />
              <Route path="FeedBack" element={<FeedBack />} />
              <Route path="Buscar" element={<Search />} />
              <Route
                path="Buscar/Editar/:codigo/:contexto"
                element={<EditarPost />}
              />
              <Route
                path=":contexto/Detalles/:codigo"
                element={<DetallesCompra />}
              />
              <Route path="*" element={<Navigate to="/" />} />{" "}
              {/* Redirect unknown routes */}
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
});

// Layout component to hold common layout and nested routes
const Layout = ({ email, logout }) => (
  <div>
    {/* Common layout components like header, footer, etc. */}
    <Outlet /> {/* This renders the nested routes */}
  </div>
);
