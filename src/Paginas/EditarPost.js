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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  get,
  ref,
  remove,
  getDatabase,
  push,
  set,
  update,
  onValue,
  query,
  equalTo,
  orderByChild,
} from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { getAuth } from "firebase/auth";

import app from "./../Servicios/firebases";
import { useNavigate, useParams } from "react-router";
import Cabezal from "./componentes/Cabezal";
import Alert from "./componentes/Alert";

const AlertComponent = ({ isOpen, onClose, onConfirm }) => {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    if (inputValue < 90) {
      onConfirm(inputValue);
    } else {
      alert("Ha ocurido un error");
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Introduzca Descuento</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Descuento en %"
          type="number"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
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
  const [chipsnew, setChipsnew] = useState([]);

  const [prices, setPrices] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [inputValues, setInputValues] = useState("");
  const [view, setView] = useState("");
  const database = getDatabase(app);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { codigo, contexto } = useParams(); // Access the URL parameter
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [tovalue, setToValue] = useState(false);
  const [todelete, setToDelete] = useState("");
  const navigate = useNavigate();
  console.log(codigo);
  const [number, setNumber] = useState(null);
  const handleOpenAlert = () => {
    setIsAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleConfirmAlert = (value) => {
    setNumber(value);
    ActualizarDescuento(value);
    console.log("Confirmed value:", value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloses = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    ValueExistinDb(todelete, tovalue, "Eliminar");
    handleCloses();
  };

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
  //nuevo abajo

  const lugar = (pais) => {
    // Implement your `lugar` function logic here
    // Example:
    return pais === "Guinea Ecuatorial" ? "Nacional" : "Exterior";
  };
  const ActualizarDescuento = async (dato) => {
    let valor = parseInt(dato);
    let context = lugar(data.Pais);

    const dbRef = ref(database, `GE/${context}/Prod/${codigo}`);

    try {
      // Update the discount value
      console.log(dato, "existe");
      await update(dbRef, { Descuento: valor });

      if (valor > 0) {
        // If valor is not 0, update the Rebajas node
        const rebajasRef = ref(database, `GE/Rebajas/${codigo}`);
        const rebajasRef1 = ref(
          database,
          `GE/Filtros/${context}/${data.Categoria}/${codigo}`
        );
        const rebajasRef2 = ref(database, `GE/${context}/Prod/${codigo}`);

        // await update(rebajasRef, diccionario1);
        await update(rebajasRef1, { Descuento: valor });
      } else {
        // If valor is 0, remove the Rebajas node
        const rebajasRef = ref(database, `GE/Rebajas/${codigo}`);
        const rebajasRef1 = ref(
          database,
          `Filtros/${context}/${data.Categoria}/${codigo}`
        );
        await update(rebajasRef1, { Descuento: valor });

        await remove(rebajasRef);
      }

      console.log("Data updated successfully");

      // Simulate dismissing a loading indicator and enabling user interaction
      // Implement your actual UI update logic here
      // For example, using React state:
      // setLoading(false);
      // setUserInteractionEnabled(true);
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };
  const quitardelsistema = async () => {
    const dbRef = ref(database, `GE/Otros/${codigo}`);
    const storage = getStorage(app);

    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const childSnaps = snapshot.val();

        for (const key in childSnaps) {
          const dict = childSnaps[key];
          const imagen = dict.Imagen;

          if (imagen) {
            const imageRef = storageRef(storage, imagen);

            await deleteObject(imageRef);
            console.log(`Deleted image: ${imagen}`);
          }
        }

        borrarDB();
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const borrarDB = async () => {
    try {
      const refBase = ref(database, "GE");

      // Remove nodes from the database
      await remove(ref(refBase, `Otros/${codigo}`));
      await remove(ref(refBase, `Detalles/${codigo}`));
      // await remove(ref(refBase, `Prod/${userId}/${codigo}`));

      if (data.Categoria !== "Moda & Accesorios") {
        await remove(
          ref(
            refBase,
            `Filtros/${lugar(data.Pais)}/${data.Categoria}/${codigo}`
          )
        );
      } else {
        await remove(
          ref(
            refBase,
            `Filtros/${lugar(data.Pais)}/${data.Categoria}/${
              data.Genero
            }/${codigo}`
          )
        );
      }

      await remove(ref(refBase, `${lugar(data.Pais)}/Prod/${codigo}`));

      console.log("Data removed successfully");

      // Handle post-removal actions (e.g., navigation, UI updates)
      // For example, if using React Router:
      // navigate("/some-route");
    } catch (error) {
      console.error("Error removing data: ", error);
    }
  };

  //nuevo arriba
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
        setChipsnew([...chipsnew, inputValues.trim()]);
        setPrices({ ...prices, [inputValues.trim()]: "" });

        console.log("wetiin", prices);
        setInputValues("");
      }
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    setToDelete(chipToDelete);
    setToValue("Color");
    setOpen(true);

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
    setOpen(true);
    const parts = chipToDelete.split(":");
    setToDelete(parts[0]);
    setToValue("Talla");
    setChips(chips.filter((chip) => chip !== chipToDelete));
  };
  const handleDeleteChips2 = (chipToDelete) => {
    console.log("wettin");
    setChipsnew(chipsnew.filter((chip) => chip !== chipToDelete));
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
        setDimension(snap.Dimension);
        setEspacio(snap.Espacio);

        setDetails(snap.Detalles);
        setCantidad(snap.Cantidad);
        setStock(snap.Stock);

        const colors = snap.Color;
        const tallas = snap.Talla;
        console.log(colors);

        if (colors) {
          Object.values(colors).forEach((color) => {
            colores.push(color.label);
            console.log(`Color Code: ${color.Codigo}, Label: ${color.label}`);
          });

          setChipscolor(colores);
        }

        if (tallas) {
          Object.values(tallas).forEach((talla) => {
            talles.push(`${talla.label}:${talla.precio}`);
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
  const ValueExistinDb = async (colorCode, value, value2) => {
    const databaseRef = query(
      ref(database, `GE/${contexto}/Prod/${codigo}/${value}`),
      orderByChild("label"),
      equalTo(colorCode)
    );
    if (value2 === "Eliminar") {
      const snapshot = await get(databaseRef);

      if (snapshot.exists()) {
        let data;
        let key;
        snapshot.forEach((childSnapshot) => {
          key = childSnapshot.key;
        });
        console.log("Key:", key);

        // Delete the node
        const nodeRef = ref(
          database,
          `GE/${contexto}/Prod/${codigo}/${value}/${key}`
        );
        await remove(nodeRef);
        console.log("Node deleted successfully.");
      }
    } else {
      try {
        const snapshot = await get(databaseRef);
        if (!snapshot.exists()) {
          console.log("ENTRAMOS", colorCode, value);
          pushColorToDatabase(colorCode, value);
        }
      } catch (error) {
        console.error("Error checking value existence in the database:", error);
        return false;
      }
    }
  };
  const pushColorToDatabase = async (nodeData, value) => {
    let pais = lugar(data.Pais);
    const colorRefKey = push(
      ref(database, `GE/${pais}/Prod/${codigo}/${value}`)
    ).key;
    const colorPath = `GE/${pais}/Prod/${codigo}/${value}/${colorRefKey}`;
    if (value === "Color") {
      await set(ref(database, colorPath), {
        label: nodeData,
        codigo: colorRefKey,
      });
      console.log({
        label: nodeData,
        codigo: colorRefKey,
      });
    } else {
      console.log({
        label: nodeData,
        precio: parseInt(prices[nodeData] === "" ? price : prices[nodeData]),
        codigo: colorRefKey,
      });
      const priceToSet = parseInt(
        prices[nodeData] === "" ? price : prices[nodeData],
        10
      );

      await set(ref(database, colorRefKey), {
        label: nodeData,
        precio: priceToSet,
        codigo: colorRefKey,
      });
    }
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
      Cantidad: parseInt(cantidad),

      Detalles: details,
      Stock: contexto === "Nacional" ? stock : data.Stock,
      Espacio: contexto === "Exterior" ? parseFloat(espacio) : 0,
      Dimension:
        dimension !== undefined ? parseFloat(dimension) : parseFloat(1.5),
    };
    const databaseRef = ref(database, `GE/${contexto}/Prod/${codigo}`);
    const databaseRef2 = ref(
      database,
      `GE/Filtros/${contexto}/${data.Categoria}/${codigo}`
    );

    // try {
    // //   // Update the node
    await update(databaseRef, updatedObject);
    await update(databaseRef2, updatedObject);

    for (const color of chipscolor) {
      ValueExistinDb(color, "Color", "");
      // console.log(color);
    }

    // Add prices to the updates
    for (const chip in prices) {
      if (prices.hasOwnProperty(chip)) {
        // console.log(chip);
        ValueExistinDb(chip, "Talla", "");
      }
    }
    // //   console.log("Data updated successfully");
    // } catch (error) {
    //   console.error("Error updating data: ", error);

    console.log(updatedObject.Categoria, data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, padding: 2 }}>
      <Cabezal texto={"Editar"} />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginTop: isMobile ? 40 : 0,
        }}
      >
        <Button variant="contained" color="info" onClick={handleOpenAlert}>
          APLICAR DESCUENTO
        </Button>
        <Button
          variant="contained"
          color="error"
          style={{ marginLeft: 25 }}
          onClick={quitardelsistema}
        >
          ELIMINAR PRODUCTOR
        </Button>
      </div>

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
              label={chip}
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
            <Chip
              label={chip}
              style={{ margin: 3 }}
              onDelete={() => handleDeleteChips(chip)}
            />
          ))}
          {chipsnew.length > 0 && <Typography>Nuevos</Typography>}
        </div>
        {chipsnew.map((chip, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            marginY={isMobile ? 1 : 5}
          >
            <Chip
              label={chip}
              style={{ margin: 3 }}
              onDelete={() => handleDeleteChips2(chip)}
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
      {number && <p>Entered number: {number}</p>}
      <AlertComponent
        isOpen={isAlertOpen}
        onClose={handleCloseAlert}
        onConfirm={handleConfirmAlert}
      />
      <Alert
        open={open}
        message={"Seguro que desea borrar este valor?"}
        onClose={handleCloses}
        onConfirm={handleConfirm}
      />
    </Box>
  );
};

export default EditarPost;
