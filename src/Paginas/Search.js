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
import {
  endAt,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
  startAt,
} from "firebase/database";
import app from "../Servicios/firebases";
import ProductosCard from "./componentes/ProductosCard";
import Cabezal from "./componentes/Cabezal";

const Search = () => {
  const [buscar, setBuscar] = useState("");
  const [results, setResults] = useState([]);
  const [carddata, setcarddata] = useState([]);
  const [chipscolor, setChipscolor] = useState(["Nacional", "Exterior"]);
  const [selectedChip1, setSelectedChip1] = useState(null);
  const database = getDatabase(app);

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

  const capitalizeFirstLetter = (str) => {
    if (typeof str !== "string" || str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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

  const fetchData = (startString, endString) => {
    const databaseRef = query(
      ref(database, `GE/${selectedChip1}/Prod/`),
      orderByChild("Titulo"),
      startAt(startString),
      endAt(endString)
    );

    get(databaseRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = [];
          snapshot.forEach((childSnapshot) => {
            data.push(childSnapshot.val());
          });
          setcarddata((prevData) => [...prevData, ...data]);
          setResults((prevData) => [...prevData, ...data]); // Update results state
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
          label="Enter your search query"
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
        <Typography variant="h5" component="h2" gutterBottom>
          Resultados
        </Typography>
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
