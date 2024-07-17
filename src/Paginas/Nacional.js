import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import CajaItem from "./componentes/CajaItem";
import Chip from "@mui/material/Chip";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  limitToLast,
  get,
  endAt,
} from "firebase/database";
import CircularProgress from "@mui/material/CircularProgress";

import app from "./../Servicios/firebases";
import useNotificationListener, { analizar } from "../ayuda";
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import Cabezal from "./componentes/Cabezal";

const MemoizedCajaItem = memo(CajaItem);

function Nacional({ email }) {
  const [selectedChip, setSelectedChip] = useState("Comprado");
  const [loading, setLoading] = useState(true);
  const [endloading, setendloading] = useState(true);
  const [data, setData] = useState([]);
  const divRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const database = getDatabase(app);

  const handleChipClick = useCallback(
    (chipValue) => {
      setData([]);
      setLoading(true);

      if (selectedChip !== chipValue) {
        setSelectedChip(chipValue);
        fetchData("", chipValue);
      }
    },
    [selectedChip]
  );

  const fetchData = (codigo, estado) => {
    const databaseRef = ref(database, "GE/Compras/Nacional");

    let queryRef;

    if (data.length !== 0) {
      if (email === "nawetin@gmail.com") {
        queryRef = query(
          databaseRef,
          orderByChild("Estado"),
          equalTo("Enviado")
        );
      } else {
        queryRef = query(
          databaseRef,
          orderByChild("Codigo"),
          endAt(codigo),
          limitToLast(6)
        );
      }
    } else {
      queryRef = query(databaseRef, limitToLast(16));
    }

    get(queryRef)
      .then((snapshot) => {
        const newData = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          if (childData && !analizar(childData.Codigo, data)) {
            if (childData.Estado === estado) {
              newData.unshift(childData);
            }
          }
        });
        if (data.length !== 0) {
          setData((old) => [...old, ...newData]);
        } else {
          setData(newData);
        }
        setLoading(false);

        if (newData.length === 0) {
          setendloading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleScroll = useCallback(() => {
    let valor = data.slice(-1)[0];

    if (
      divRef.current.scrollTop + divRef.current.clientHeight >=
      divRef.current.scrollHeight
    ) {
      fetchData(valor.Codigo, selectedChip);
    }
  }, [data.length]);

  useEffect(() => {
    divRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchData("", selectedChip);

    return () => {
      // Unsubscribe from database
    };
  }, []);

  return (
    <div
      style={{
        padding: 8,
        overflowY: "auto",
        height: "95vh",
        marginTop: isMobile ? 65 : 5,
        scrollBehavior: "smooth", // Added for smooth scroll
        paddingTop: "10px",
      }}
      ref={divRef}
    >
      <Cabezal texto={"Nacional"} />

      {email !== "nawetin@gmail.com" && (
        <div>
          <Chip
            label="Comprado"
            style={{ marginRight: "8px" }}
            clickable
            onClick={() => handleChipClick("Comprado")}
            color={selectedChip === "Comprado" ? "primary" : "default"}
          />
          <Chip
            label="Enviado"
            clickable
            style={{ marginRight: "8px" }}
            onClick={() => handleChipClick("Enviado")}
            color={selectedChip === "Enviado" ? "primary" : "default"}
          />
          <Chip
            label="Retirado"
            clickable
            style={{ marginRight: "8px" }}
            onClick={() => handleChipClick("Retirado")}
            color={selectedChip === "Retirado" ? "primary" : "default"}
          />
        </div>
      )}

      <div>
        {loading ? (
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
        ) : data.length > 0 ? (
          <MemoizedCajaItem dats={data} venta={false} valor="Nacional" />
        ) : (
          <Typography variant="subtitle1" gutterBottom>
            SIN DATOS
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Nacional;
