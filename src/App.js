import React, { useState, useEffect } from "react";
import "./App.css";
import Cabezal from "./Paginas/componentes/Cabezal";
import { Routing } from "./Paginas/Routing";
import Login from "./Paginas/componentes/Login";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "./Servicios/firebases";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user, "nawao ");
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    // You can return a loading spinner or null here
    return null;
  }

  return (
    <div>
      {user ? (
        <>
          <Cabezal email={user.email} />
          <Routing email={user.email} />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
