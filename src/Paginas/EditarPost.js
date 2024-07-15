import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Chip,
  Input,
  TextField,
  Typography,
  Button,
  Grid,
  CircularProgress,
  FormControlLabel,
  Switch,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  get,
  ref,
  getDatabase,
  push,
  set,
  update,
  onValue,
  query,
} from "firebase/database";
import { analizar } from "../ayuda";
import app from "./../Servicios/firebases";
import { useParams } from "react-router";
import Cabezal from "./componentes/Cabezal";

const EditarPost = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [dimension, setDimension] = useState("");
  const [espacio, setEspacio] = useState("");
  const [data, setData] = useState(null);

  const [cantidad, setCantidad] = useState("");
  const [stock, setStock] = useState(false);

  const [ubicacion, setUbicacion] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]);
  const [selectedChip, setSelectedChip] = useState("Aerea");
  const [chipData, setChipData] = useState([]);
  const [showbox, setShowBox] = useState(true);

  const [chipscolor, setChipscolor] = useState([]);
  const [chipscoloradd, setChipscoloradd] = useState([]);

  const [chips, setChips] = useState([]);
  const [prices, setPrices] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [inputValues, setInputValues] = useState("");
  const [view, setView] = useState("");
  const database = getDatabase(app);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { codigo, contexto } = useParams(); // Access the URL parameter

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleDimension = (e) => setDimension(e.target.value);
  const handleEspacio = (e) => setEspacio(e.target.value);

  const handleCantidad = (e) => setCantidad(e.target.value);

  const handleUbicacion = (e) => setUbicacion(e.target.value);

  const handleDetailsChange = (e) => setDetails(e.target.value);

  const getCurrentTimeInMilliseconds = () => {
    return Date.now();
  };

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleInputChangeStilo = (e) => setInputValues(e.target.value);

  const handleAddChip = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        setChipscolor([...chipscolor, inputValue.trim()]);

        setInputValue("");
      }
    }
  };
  const handleAddChips = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      console.log(inputValues, "k es");
      if (inputValues.trim()) {
        setChips([...chips, { label: inputValues.trim() }]);
        setPrices({ ...prices, [inputValues.trim()]: "" });

        console.log("wetiin", prices);
        setInputValues("");
      }
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    setChipscolor(chipscolor.filter((chip) => chip !== chipToDelete));
  };

  const handleChipClick = (chipValue) => {
    console.log(chipValue);
    if (chipValue !== selectedChip) {
      setSelectedChip(chipValue);

      // fetchData(chipValue);
    }
  };

  const handleDeleteChips = (chipToDelete) => {
    console.log("wettin");
    setChips(chips.filter((chip) => chip !== chipToDelete));
    const updatedPrices = { ...prices };
    delete updatedPrices[chipToDelete];
    setPrices(updatedPrices);
  };

  const handlePriceChanges = (e, chipName) => {
    setPrices({ ...prices, [chipName]: e.target.value });
  };
  const handleButtonClick = (view) => {
    setShowBox(false);
    setView(view);
    // Perform any additional actions based on the selected view
    console.log(`Selected view: ${view}`);
  };
  const chipOptions1 = [
    { label: "Aerea", value: "Aerea" },
    { label: "Maritima", value: "Maritima" },
  ];

  useEffect(() => {
    const fetchData = () => {
      let colores = [];
      let talles = [];

      const databaseRef = ref(database, `GE/${contexto}/Prod/${codigo}`);
      onValue(databaseRef, (snapshot) => {
        let snap = snapshot.val();
        setData(snap);

        setTitle(snap.Titulo);
        setUbicacion(snap.Ubicacion);
        setPrice(snap.Precio);
        setDimension(snap.Peso);
        setEspacio(snap.Espacio);

        setDetails(snap.Detalles);
        setCantidad(snap.Cantidad);
        setStock(snap.Stock);

        const colors = snap.Color;
        const tallas = snap.Talla;
        console.log(colors);

        if (colors) {
          Object.values(colors).forEach((color) => {
            colores.push(color);
            console.log(`Color Code: ${color.Codigo}, Label: ${color.label}`);
          });

          setChipscolor(colores);
        }

        if (tallas) {
          Object.values(tallas).forEach((talla) => {
            talles.push(talla);
          });
          setChips(talles);
        }
      });
    };

    fetchData();

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      // Unsubscribe from database
    };
  }, []);
  const handleToggleChange = (event) => {
    setStock(event.target.checked);
  };
  const ValueExistinDb = async (colorCode) => {
    const snapshot = await database
      .ref(`GE/${contexto}/Prod/${codigo}/Color`)
      .orderByChild("label")
      .equalTo(colorCode)
      .once("value");
    return snapshot.exists();
    // return snapshot.exists();
  };
  const pushColorToDatabase = async (colorNode) => {
    return database.ref("colors").push(colorNode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true); // Start loading
    //CUando toca eliminar agregar se guardan los nombres y se hace un map iterando todo
    // para asi conseguir codigo
    //verificar el error en tallas
    const updatedObject = {
      ...data,
      Titulo: title,
      Ubicacion: ubicacion,
      Precio: parseFloat(price),
      Detalles: details,
      Stock: contexto === "Nacional" ? stock : data.Stock,
      ...(stock === false && {
        Color: chipscolor.reduce((acc, chip) => {
          acc[chip.Codigo] = chip;
          return acc;
        }, {}),
        // Talla: chips.reduce((acc, chip) => {
        //   acc[chip.Codigo] = chip;
        //   return acc;
        // }, {}),
      }),
      Espacio: contexto === "Exterior" ? parseFloat(espacio) : undefined,
      Dimension: dimension !== "" ? parseFloat(dimension) : parseFloat(1.5),
    };

    console.log(updatedObject, data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, padding: 2 }}>
      <Cabezal texto={"Editar"} />
      <Grid container spacing={2} marginTop={isMobile ? 5 : 0}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Ubicacion"
            variant="outlined"
            value={ubicacion}
            onChange={handleUbicacion}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            value={price}
            onChange={handlePriceChange}
            required
            fullWidth
          />
        </Grid>
        {contexto === "Nacional" && (
          <Box display="flex" alignItems="flex-end" marginY={1} margin={1}>
            <TextField
              label="Cantidad"
              type="number"
              value={cantidad}
              onChange={handleCantidad}
              style={{ marginLeft: "8px" }}
            />
            <div style={{ margin: 10, marginLeft: 30 }}>
              <FormControlLabel
                control={
                  <Switch checked={stock} onChange={handleToggleChange} />
                }
                label="Stock"
              />
            </div>
          </Box>
        )}

        {contexto === "Exterior" && (
          <Grid item xs={12}>
            <TextField
              label={`Introduzca los Cm3`}
              variant="outlined"
              type="number"
              value={espacio}
              onChange={handleEspacio}
              fullWidth
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <TextField
            label={`Introduzca los Kg`}
            variant="outlined"
            type="number"
            value={dimension}
            onChange={handleDimension}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Details"
            variant="outlined"
            multiline
            rows={4}
            value={details}
            onChange={handleDetailsChange}
            required
            fullWidth
          />
        </Grid>
        <div style={{ margin: 10 }}>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleAddChip}
            placeholder="Introduzca Color"
          />
          {chipscolor.map((chip, index) => (
            <Chip
              key={index}
              label={chip.label}
              style={{ margin: 3 }}
              onDelete={() => handleDeleteChip(chip)}
            />
          ))}
        </div>
        <div style={{ margin: 10 }}>
          <Input
            value={inputValues}
            onChange={handleInputChangeStilo}
            onKeyDown={handleAddChips}
            placeholder="Introduzca Estilo"
          />
          {chips.map((chip, index) => (
            <Box key={index} display="flex" alignItems="center" marginY={1}>
              <Chip
                label={chip.label}
                style={{ margin: 3 }}
                onDelete={() => handleDeleteChips(chip)}
              />
              <TextField
                label="Price"
                type="number"
                value={prices[chip] || ""}
                onChange={(e) => handlePriceChanges(e, chip)}
                style={{ marginLeft: "8px" }}
              />
            </Box>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            {loading ? (
              <CircularProgress color="warning" size={24} />
            ) : (
              "PUBLICAR"
            )}
          </Button>
        </div>
      </Grid>
    </Box>
  );
};

export default EditarPost;
