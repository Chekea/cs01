import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "../../Servicios/firebases";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading state

  const auth = getAuth(app);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    try {
      // Attempt to sign in with email and password
      let dato;
      switch (email) {
        case "chekeagroup" || "Chekeagroup":
          dato = "chekeagroup@gmail.com";
          break;
        case "eibybielo" || "Eibybielo":
          dato = "eibybielo@gmail.com";
          break;
        case "nawetin" || "Nawetin":
          dato = "nawetin@gmail.com";
          break;
        default:
          throw new Error("Correo inexistente");
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        dato,
        password
      );
      const user = userCredential.user;

      console.log("Login successful for user:", user.email);

      // If keepLoggedIn is true, you might want to use Firebase's persistence

      // Handle successful login (e.g., redirect to dashboard)
      // You might want to use React Router or your preferred navigation method here
      // history.push('/dashboard');
    } catch (error) {
      setError(error.message);

      switch (error.code) {
        case "auth/invalid-email":
          setError("Correo Invalido");

          break;
        case "auth/user-disabled":
          setError("Correo Bloqueado");

          break;
        case "auth/user-not-found":
          setError("Correo Inexistente");

          break;
        case "auth/wrong-password":
          setError("Contrasexa equivocada");
          break;
        case "auth/network-request-failed":
          setError("Error de Network");
          break;
        default:
          setError("Error ");
      }
      // Handle login errors (e.g., display error message to user)
      // You might want to set an error state and display it in your component
      // setError(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Bienvenido
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading} // Disable button while loading
          >
            Entrar
          </Button>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
          <Typography component="h1" color={"red"} variant="h5">
            {error}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
