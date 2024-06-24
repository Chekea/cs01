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
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { get, ref, getDatabase, push, set, update } from "firebase/database";
import { analizar } from "../ayuda";
import app from "./../Servicios/firebases";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const ImagePreview = ({ file, onRemove, index }) => {
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setSrc(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [file]);

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      {file ? (
        <>
          <img
            src={src}
            alt="Preview"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
          <IconButton
            color="error"
            size="small"
            onClick={() => onRemove(file)}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            &times;
          </IconButton>
        </>
      ) : (
        <Box
          sx={{
            width: "100px",
            height: "100px",
            border: "1px dashed gray",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "gray",
          }}
        >
          {index + 1}
        </Box>
      )}
    </Box>
  );
};

const Publicar = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [dimension, setDimension] = useState("");
  const [espacio, setEspacio] = useState("");

  const [cantidad, setCantidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]);
  const [selectedChip, setSelectedChip] = useState("Aerea");
  const [selectedChip1, setSelectedChip1] = useState(null);
  const [selectedChip2, setSelectedChip2] = useState(null);
  const [chipData, setChipData] = useState([]);
  const [showbox, setShowBox] = useState(true);

  const [chipscolor, setChipscolor] = useState([]);
  const [chipOptions, setchipOptions] = useState([]);
  const [chipOptionscat, setchipOptionscat] = useState([]);

  const [chips, setChips] = useState([]);
  const [prices, setPrices] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [inputValues, setInputValues] = useState("");
  const [view, setView] = useState("");
  const database = getDatabase(app);
  const storage = getStorage(app);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleDimension = (e) => setDimension(e.target.value);
  const handleEspacio = (e) => setEspacio(e.target.value);

  const handleCantidad = (e) => setCantidad(e.target.value);

  const handleUbicacion = (e) => setUbicacion(e.target.value);

  const handleDetailsChange = (e) => setDetails(e.target.value);

  const uploadImage = async (file) => {
    const imageRef = storageRef(storage, `Imagenes/Nuevo/${Date.now()}.jpeg`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const compressedFiles = await Promise.all(
      files.map(async (file) => {
        const compressedFile = await compressImage(file);
        return compressedFile;
      })
    );

    if (compressedFiles.length + images.length <= 5) {
      setImages([...images, ...compressedFiles]);
    } else {
      alert("You can upload up to 5 images only.");
    }
  };

  const compressImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1200; // Set the desired maximum width
          const MAX_HEIGHT = 900;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const compressedFile = canvas.toDataURL("image/jpeg", 0.9); // Adjust the quality value (0.7 in this example)
          resolve(dataURItoBlob(compressedFile));
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  const getCurrentTimeInMilliseconds = () => {
    return Date.now();
  };

  const handleSubmit = async (e) => {
    if (selectedChip1 !== null && selectedChip2 !== null) {
      e.preventDefault();
      setLoading(true); // Start loading

      let fecha = getCurrentTimeInMilliseconds();

      try {
        // Upload the first image and get its URL
        const firstImageURL = await uploadImage(images[0]);

        // Generate new references and keys for the data
        const newItemRef = push(ref(database, `GE/${view}/Prod`));
        const codigo = newItemRef.key;

        // Create the main data object
        let data;
        let vendedor =
          view === "Exterior"
            ? "C0y1aQsV5NZNLBuvprio3vXy2LR2"
            : "kbJogy4k8gN7nSK2QUFXwMpXSXz1";
        if (view === "Exterior") {
          let espace = espacio !== "" ? espacio * 0.000001 : "";
          data = {
            Titulo: title,
            Condicion: "Nuevo",
            Categoria: selectedChip1,
            Subcategoria: selectedChip2,
            Codigo: codigo,
            Precio: parseInt(price),
            Envio: selectedChip,
            Stock: true,
            Descuento: 0,
            Peso: dimension !== "" ? parseFloat(dimension) : 0,
            Dimension: parseFloat(espace.toFixed(4)),
            Ubicacion: ubicacion,
            Pais: "China",
            Detalles: details,
            Imagen: firstImageURL,
            Vistos: 0,
            Duracion: "20-35 dias",
            Vendedor: vendedor,
            Compras: 0,
            Fecha: fecha,
          };
        } else {
          data = {
            Titulo: title,
            Condicion: "Nuevo",
            Categoria: selectedChip1,
            Cantidad: 0,
            Subcategoria: selectedChip2,
            Codigo: codigo,
            Peso: dimension !== "" ? parseFloat(dimension) : 0,
            Precio: parseInt(price),
            Stock: false,
            Descuento: 0,
            Ubicacion: ubicacion,
            Pais: "Guinea Ecuatorial",
            Detalles: details,
            Imagen: firstImageURL,
            Vistos: 0,
            Vendedor: vendedor,
            Compras: 0,
            Fecha: fecha,
          };
        }

        // Initialize the updates object
        let updates = {};
        updates[`GE/${view}/Prod/${codigo}`] = data;
        updates[`GE/Filtros/${view}/${selectedChip1}/${codigo}`] = data;
        updates[`GE/Prod/${vendedor}/${codigo}`] = data;
        await update(ref(database), updates);

        // Add colors to the updates
        for (const color of chipscolor) {
          const colorRefKey = push(
            ref(database, `GE/${view}/Prod/${codigo}/Color`)
          ).key;
          const colorPath = `GE/${view}/Prod/${codigo}/Color/${colorRefKey}`;
          await set(ref(database, colorPath), {
            label: color,
            codigo: colorRefKey,
          });
        }

        // Add prices to the updates
        for (const chip in prices) {
          if (prices.hasOwnProperty(chip)) {
            const priceRefKey = push(
              ref(database, `GE/${view}/Prod/${codigo}/Talla`)
            ).key;
            const pricePath = `GE/${view}/Prod/${codigo}/Talla/${priceRefKey}`;
            await set(ref(database, pricePath), {
              label: chip,
              precio: parseInt(prices[chip] === "" ? price : prices[chip]),
              codigo: priceRefKey,
            });
          }
        }

        // Add additional images to the updates
        for (let i = 0; i < images.length; i++) {
          if (i === 0) {
            const url = `GE/${view}/Prod/${codigo}/Imagenes/${codigo}`;
            await set(ref(database, url), {
              Imagen: firstImageURL,
              codigo: codigo,
            });
          } else {
            const uploadedImageUrl = await uploadImage(images[i]);

            const imageRefKey = push(
              ref(database, `GE/${view}/Prod/${codigo}/Imagenes`)
            ).key;
            const url = `GE/${view}/Prod/${codigo}/Imagenes/${imageRefKey}`;
            await set(ref(database, url), {
              Imagen: uploadedImageUrl,
              codigo: imageRefKey,
            });
          }
        }

        // Perform the batch update
        setTitle("");
        setPrice("");
        setDetails("");
        setImages([]);
        setSelectedChip(null);
        setSelectedChip1(null);
        setSelectedChip2(null);

        setPrices({});
        setChips([]);
        setEspacio("");
        setDimension("");

        setCantidad("");
        setUbicacion("");
        setChipscolor([]);
        setInputValue("");
        setInputValues("");

        console.log("Publishing item:", data);
      } catch (error) {
        alert("ERROR INESPERADO");

        console.error("Transaction failed: ", error);
      } finally {
        setLoading(false);
      }
    }
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
      if (inputValues.trim()) {
        setChips([...chips, inputValues.trim()]);
        setPrices({ ...prices, [inputValues.trim()]: "" });
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
  const handleChipClick1 = (chipValue) => {
    if (chipValue !== selectedChip1) {
      setSelectedChip2(null);
      setSelectedChip1(chipValue);

      fetchData(chipValue);
    }
  };
  const handleChipClick2 = (chipValue) => {
    setSelectedChip2(chipValue);
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
    if (view !== "") {
      const fetchData = (codigo, estado) => {
        const databaseRef = ref(database, `GE/Categorias/${view}`);

        get(databaseRef)
          .then((snapshot) => {
            const newData = [];
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              if (childData && !analizar(childData.Codigo, chipOptions)) {
                console.log(childData.Estado, "an");

                newData.push(childData);
              }
            });

            console.log(newData, "wettin");

            setchipOptions(newData);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };

      fetchData();
    }
    // Cleanup function to unsubscribe when component unmounts
    return () => {
      // Unsubscribe from database
    };
  }, [view]);
  const fetchData = (selected) => {
    console.log(selected, "es");
    const databaseRef = ref(database, `GE/Secciones/${selected}`);

    get(databaseRef)
      .then((snapshot) => {
        const newData = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          newData.push(childData);
        });

        console.log(newData, "wettin");

        setchipOptionscat(newData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <Box>
      {showbox && (
        <Box sx={{ display: "flex", gap: 2, m: 4 }}>
          <Button
            variant="contained"
            onClick={() => handleButtonClick("Nacional")}
          >
            Nacional
          </Button>
          <Button
            variant="contained"
            onClick={() => handleButtonClick("Exterior")}
          >
            Exterior
          </Button>
        </Box>
      )}

      {view !== "" && (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, padding: 2 }}
        >
          {view === "Exterior" && (
            <div style={{ margin: 10 }}>
              {chipOptions1.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  style={{ margin: 3 }}
                  clickable
                  onClick={() => handleChipClick(option.label)}
                  color={selectedChip === option.label ? "primary" : "default"}
                />
              ))}
            </div>
          )}
          {chipOptions.length > 0 && <Typography>Categorias</Typography>}
          <div style={{ margin: 10 }}>
            {chipOptions.map((option) => (
              <Chip
                key={option.icono}
                label={option.seccion}
                style={{ margin: 3 }}
                clickable
                onClick={() => handleChipClick1(option.seccion)}
                color={selectedChip1 === option.seccion ? "primary" : "default"}
              />
            ))}
          </div>

          {chipOptionscat.length > 0 && <Typography>SubCategorias</Typography>}
          <div style={{ margin: 10 }}>
            {chipOptionscat.map((option) => (
              <Chip
                key={option.icono}
                label={option.seccion}
                style={{ margin: 3 }}
                clickable
                onClick={() => handleChipClick2(option.seccion)}
                color={selectedChip2 === option.seccion ? "primary" : "default"}
              />
            ))}
          </div>

          <Grid container spacing={2}>
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
            {view === "Nacional" || selectedChip === "Aerea" ? (
              <Grid item xs={12}>
                <TextField
                  label={`Introduzca los Kg`}
                  variant="outlined"
                  type="number"
                  value={dimension}
                  onChange={handleDimension}
                  required
                  fullWidth
                />
              </Grid>
            ) : null}

            {view !== "Nacional" && (
              <Grid item xs={12}>
                <TextField
                  label={`Introduzca los Cm3`}
                  variant="outlined"
                  type="number"
                  value={espacio}
                  onChange={handleEspacio}
                  required
                  fullWidth
                />
              </Grid>
            )}
            {/* 
            {view === "Nacional" && (
              <Grid item xs={12}>
                <TextField
                  label={`Cantidad en Stock `}
                  variant="outlined"
                  type="number"
                  value={cantidad}
                  onChange={handleCantidad}
                  required
                  type="number"
                  fullWidth
                />
              </Grid>
            )} */}
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
                <Box key={index} display="flex" alignItems="center" marginY={1}>
                  <Chip
                    label={chip}
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

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Images (up to 5)
              </Typography>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                required
                startAdornment={
                  <IconButton
                    color="primary"
                    aria-label="upload pictures"
                    component="label"
                  >
                    <AddAPhotoIcon />
                  </IconButton>
                }
              />
              <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
                {images.map((file, index) => (
                  <ImagePreview
                    key={index}
                    file={file}
                    onRemove={() => handleRemoveImage(index)}
                    index={index}
                  />
                ))}
              </Box>
            </Grid>
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
      )}
    </Box>
  );
};

export default Publicar;
