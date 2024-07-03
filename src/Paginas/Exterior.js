import React, { useEffect, useState } from "react";
import CajaItem from "./componentes/CajaItem";
import Chip from "@mui/material/Chip";
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  limitToLast,
  update,
  runTransaction,
  get,
  endAt,
  startAt,
} from "firebase/database";
import CircularProgress from "@mui/material/CircularProgress";

import app from "./../Servicios/firebases";
import { analizar } from "../ayuda";
function Exterior() {
  const [selectedChip, setSelectedChip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const database = getDatabase(app);

  const handleChipClick = (chipValue) => {
    setSelectedChip(chipValue === selectedChip ? null : chipValue);
  };
  const fetchData = (codigo, estado) => {
    const databaseRef = ref(database, "GE/Compras/Exterior");
    let queryRef;

    if (data.length !== 0) {
      console.log("volvio 0");

      queryRef = query(
        databaseRef,
        orderByChild("Codigo"),
        endAt(codigo),
        limitToLast(6)
      );
    } else {
      console.log("volvio 1");

      queryRef = query(databaseRef, limitToLast(16));
    }

    get(queryRef)
      .then((snapshot) => {
        const newData = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          console.log(childData.Codigo);
          if (childData && !analizar(childData.Codigo, data)) {
            newData.unshift(childData);
          }
        });
        if (data.length !== 0) {
          console.log("mantenimiento");
          setData((old) => [...old, ...newData]);
        } else {
          setData(newData);
        }
        setLoading(false);

        if (newData.length === 0) {
          console.log("no existe");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      // Unsubscribe from database
    };
  }, []); // Empty dependency array means this effect runs once after the component mounts

  return (
    <div style={{ padding: 8 }}>
      <div style={{ paddingTop: 50 }}>
        {loading ? ( // Display CircularProgress if loading is true
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
        ) : (
          <CajaItem dats={data} venta={false} />
        )}
      </div>
    </div>
  );
}

export default Exterior;
