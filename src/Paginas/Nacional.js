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
import axios from "axios"; // Import Axios

const MemoizedCajaItem = memo(CajaItem);

function Nacional({ email }) {
  const [selectedChip, setSelectedChip] = useState(() => {
    return localStorage.getItem("selectedChip");
  });
  const [loading, setLoading] = useState(true);
  const [endloading, setendloading] = useState(true);
  const [data, setData] = useState([]);
  const divRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChipClick = useCallback(
    (chipValue) => {
      setData([]);
      setLoading(true);
      localStorage.setItem("selectedChip", chipValue);

      if (selectedChip !== chipValue) {
        setSelectedChip(chipValue);
        fetchData("", chipValue);
      }
    },
    [selectedChip]
  );
  const fetchData = async (codigo, estado) => {
    try {
      // Include estado as a parameter in the request
      const response = await axios.get(
        `http://localhost:3000/fetchWithPagination`,
        {
          params: {
            path: `GE/Compras/Nacional`, // Adjust path if needed
            estado: estado, // Add estado as a parameter
            type: "collection", // Use type if needed
          },
        }
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      const fetchedData = response.data; // Get data from response

      // Update state with the new data
      setData(fetchedData);
      console.log(fetchedData);

      setLoading(false);

      if (fetchedData.length === 0) {
        setendloading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
      setLoading(false);
    }
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
    fetchData("", selectedChip); // Initial fetch

    return () => {
      // Unsubscribe from database if necessary
    };
  }, [selectedChip]);

  return (
    <div
      style={{
        padding: 8,
        overflowY: "auto",
        height: "95vh",
        marginTop: isMobile ? 65 : 5,
        scrollBehavior: "smooth",
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
