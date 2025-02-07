import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import ProductosCard from "./componentes/ProductosCard";
import Cabezal from "./componentes/Cabezal";
import { capitalizeFirstLetter } from "../ayuda";
import axios from "axios";

const Search = () => {
  const [buscar, setBuscar] = useState("");
  const [results, setResults] = useState([]);
  const [carddata, setcarddata] = useState([]);
  const [chipscolor, setChipscolor] = useState(["Nacional", "Exterior"]);
  const [selectedChip1, setSelectedChip1] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    // Retrieve state from sessionStorage
    const savedBuscar = sessionStorage.getItem("buscar");
    const savedSelectedChip1 = sessionStorage.getItem("selectedChip1");
    const savedCarddata = sessionStorage.getItem("carddata");
    const savedResults = sessionStorage.getItem("results");

    if (savedBuscar) setBuscar(savedBuscar);
    if (savedSelectedChip1) setSelectedChip1(savedSelectedChip1);
    if (savedCarddata) setcarddata(JSON.parse(savedCarddata));
    if (savedResults) setResults(JSON.parse(savedResults));
  }, []);

  useEffect(() => {
    // Save state to sessionStorage
    sessionStorage.setItem("buscar", buscar);
  }, [buscar]);

  useEffect(() => {
    // Save state to sessionStorage
    sessionStorage.setItem("selectedChip1", selectedChip1);
  }, [selectedChip1]);

  useEffect(() => {
    // Save state to sessionStorage
    sessionStorage.setItem("carddata", JSON.stringify(carddata));
  }, [carddata]);

  useEffect(() => {
    // Save state to sessionStorage
    sessionStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  const handleSearch = async () => {
    setcarddata([]);

    if (selectedChip1 && buscar !== "") {
      fetchData(
        capitalizeFirstLetter(buscar),
        `${capitalizeFirstLetter(buscar)}\uf8ff`
      );
    } else {
      alert("Seleccion lugar de busqueda");
    }
  };

  const handleChipClick1 = (chipValue) => {
    setcarddata([]);
    if (chipValue !== selectedChip1) {
      setSelectedChip1(chipValue);
    }
  };

  const fetchData = async (startString, endString) => {
    try {
      // Include estado as a parameter in the request
      const response = await axios.get(`http://localhost:3000/search`, {
        params: {
          path: `GE/${selectedChip1}/Prod/`,
          childkey: "Titulo",
          startString: capitalizeFirstLetter(buscar),
          endString: capitalizeFirstLetter(buscar),
        },
      });

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      const fetchedData = response.data; // Get data from response
      setcarddata(fetchedData);
      setResults(fetchedData); // Update results state

      // Update state with the new data
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
    }
  };

  return (
    <Container style={{ marginTop: isMobile ? 65 : 10 }}>
      <Cabezal texto={"Buscar"} />
      <Box>
        {chipscolor.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            style={{ margin: 3 }}
            onClick={() => handleChipClick1(chip)}
            color={selectedChip1 === chip ? "primary" : "default"}
          />
        ))}
        <TextField
          label="Nombre del Producto"
          variant="outlined"
          fullWidth
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ marginBottom: 2 }}
        >
          Buscar
        </Button>
        {carddata.length > 0 && (
          <Typography variant="h5" component="h2" gutterBottom>
            Resultados
          </Typography>
        )}
        <ProductosCard
          data={carddata}
          enviado={() => console.log("Eiby")}
          isBuscar={true}
        />
      </Box>
    </Container>
  );
};

export default Search;
