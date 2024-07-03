import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Checkbox,
  FormControlLabel,
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
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const auth = getAuth(app);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Attempt to sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("Login successful for user:", user.email);

      // If keepLoggedIn is true, you might want to use Firebase's persistence
      // This is optional and depends on your app's requirements
      if (keepLoggedIn) {
        await auth.setPersistence(auth.Auth.Persistence.LOCAL);
      } else {
        await auth.setPersistence(auth.Auth.Persistence.SESSION);
      }

      // Handle successful login (e.g., redirect to dashboard)
      // You might want to use React Router or your preferred navigation method here
      // history.push('/dashboard');
    } catch (error) {
      console.error("Error signing in:", error.message);
      // Handle login errors (e.g., display error message to user)
      // You might want to set an error state and display it in your component
      // setError(error.message);
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
            label="Correo Electronico"
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
            label="Contrasexa"
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
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
