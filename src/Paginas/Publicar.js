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
import { analizar, capitalizeFirstLetter, compressImage } from "../ayuda";
import app from "./../Servicios/firebases";

import Cabezal from "./componentes/Cabezal";
import { subircompra, uploadImage } from "../Servicios/DBservices";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  getDownloadURL,
  getStorage,
  ref as storageref,
  uploadBytes,
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
  const [chips, setChips] = useState([]);
  const [showbox, setShowBox] = useState(true);
  const [imgs, setimgs] = useState(null);
  let categ = "Otros";
  // const [chips, setChips] = useState([
  //   "iPhone 11",
  //   "iPhone 11 Pro",
  //   "iPhone 11 Pro Max",
  //   "iPhone 12",
  //   "iPhone 12 Mini",
  //   "iPhone 12 Pro",
  //   "iPhone 12 Pro Max",
  //   "iPhone 13",
  //   "iPhone 13 Mini",
  //   "iPhone 13 Pro",
  //   "iPhone 13 Pro Max",
  //   "iPhone 14",
  //   "iPhone 14 Plus",
  //   "iPhone 14 Pro",
  //   "iPhone 14 Pro Max",
  //   "iPhone 15",
  //   "iPhone 15 Plus",
  //   "iPhone 15 Pro",
  //   "iPhone 15 Pro Max",
  //   "iPhone 16",
  //   "iPhone 16 Plus",
  //   "iPhone 16 Pro",
  //   "iPhone 16 Pro Max",
  // ]);
  const [chipOptions, setchipOptions] = useState([]);
  const [chipOptionscat, setchipOptionscat] = useState([]);

  const [chipscolor, setChipscolor] = useState([]);
  const [prices, setPrices] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [inputValues, setInputValues] = useState("");
  const [view, setView] = useState("");
  const database = getDatabase(app);
  const storage = getStorage(app);
  const pesin = 0.6;

  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState([]); // State para almacenar los datos JSON
  const [columns, setColumns] = useState([]); // State para almacenar las columnas

  const handleTitleChange = (e) =>
    setTitle(capitalizeFirstLetter(e.target.value));
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleDimension = (e) => setDimension(e.target.value);
  const handleEspacio = (e) => setEspacio(e.target.value);

  const handleCantidad = (e) => setCantidad(e.target.value);

  const handleUbicacion = (e) => setUbicacion(e.target.value);

  const handleDetailsChange = (e) => setDetails(e.target.value);
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    if (files.length + images.length <= 9) {
      files.forEach((file) => {
        console.log(
          `File: ${file.name}, Size: ${(file.size / 1024).toFixed(2)} KB`
        );
      });

      setImages([...images, ...files]);
    } else {
      alert("You can upload up to 9 images only.");
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  const getCurrentTimeInMilliseconds = () => {
    return Date.now();
  };
  // Main Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    let fecha = getCurrentTimeInMilliseconds();

    try {
      // Generate new references and keys for the data
      const newItemRef = push(ref(database, `GE/Exterior/Prod`));
      const codigo = newItemRef.key;

      // Prepare common data object
      const commonData = await prepareCommonData(codigo, fecha);

      // // Upload images to Firebase and get their URLs
      console.log(images, "kiee");
      const imageUrls = await uploadImagesToStorage(images);

      console.log(imageUrls[0]);

      // // Store first image in 'IMAGEN' field and organize images in the 'imagenes' subnode
      commonData.Imagen = imageUrls[0];
      commonData.Imagenes = await createImagesNode(codigo, imageUrls);

      // // Organize color and size in their respective subnodes
      commonData.Color = await createColorsNode(codigo);
      if (chips.length > 0) {
        commonData.Talla = await createSizesNode(codigo);
      }

      // // Submit data to 'prod' node
      if (commonData["0"]) {
        commonData = commonData["0"]; // Extrae el subobjeto si se generó incorrectamente
      }
      await set(newItemRef, commonData);

      // // Store data in 'filtros' node
      await storeInFiltrosNode(codigo, commonData);

      setLoading(false);
      setImages([]);
      setChipscolor([]);
      setChips([]);

      setTitle("");
      setDetails("");
      setPrice("");
      alert("Data submitted successfully!");
    } catch (error) {
      setLoading(false);
      alert("ERROR INESPERADO");
      console.error("Transaction failed: ", error);
    }
  };

  // Prepare the common data object with the provided information
  const prepareCommonData = async (codigo, fecha) => {
    // const vendedor =
    //   view === "Exterior"
    //     ? "C0y1aQsV5NZNLBuvprio3vXy2LR2"
    //     : "kbJogy4k8gN7nSK2QUFXwMpXSXz1";
    let espace = 0.085;

    return {
      Titulo: title,
      Categoria: categ,
      Subcategoria: "Otros",
      Codigo: codigo,
      Precio: parseInt(price),
      Peso: pesin,
      Detalles: details,
      Vistos: 0,
      Vendedor: "C0y1aQsV5NZNLBuvprio3vXy2LR2",
      Compras: 0,
      Fecha: fecha,
      Descuento: 0,
      Envio: "Aerea",
      Stock: true,
      // Bateria: true,

      Dimension: espace,
      Pais: "China",
    };
  };

  // Upload images to Firebase Storage and get their URLs
  const uploadImagesToStorage = async (imageFiles) => {
    const imageUrls = [];
    try {
      for (let i = 0; i < imageFiles.length; i++) {
        const imageFile = imageFiles[i];

        // Log image file properties to make sure it's a valid Blob
        console.log(imageFile, imageFile.type);

        // Generate a unique reference for the image in Firebase Storage
        const imageRef = storageref(
          storage,
          `Imagenes/Productos/${getCurrentTimeInMilliseconds()}.jpeg`
        );

        // Upload the image (Blob) to Firebase Storage
        await uploadBytes(imageRef, imageFile);

        // Get the download URL for the uploaded image
        const imageUrl = await getDownloadURL(imageRef);

        // Push the URL to the imageUrls array
        imageUrls.push(imageUrl);
      }
    } catch (error) {
      console.error("Error uploading images: ", error);
    }
    return imageUrls;
  };

  // Create the 'imagenes' node with push IDs and URLs
  const createImagesNode = async (codigo, imageUrls) => {
    const imagesNode = {};
    imageUrls.forEach((url) => {
      const imageRef = push(
        ref(database, `GE/Exterior/Prod/${codigo}/imagenes`)
      );
      imagesNode[imageRef.key] = {
        Codigo: imageRef.key, // Store the push ID as Codigo
        Imagen: url, // Store the image URL
      };
    });
    return imagesNode;
  };

  // Create the 'colores' node with selected colors
  const createColorsNode = async (codigo) => {
    const colorsNode = {};
    chipscolor.forEach((color) => {
      const colorRef = push(ref(database, `GE/Exterior/Prod/${codigo}/Color`));
      colorsNode[colorRef.key] = {
        Codigo: colorRef.key, // Store the push ID as Codigo
        label: color, // Store the color name
      };
    });
    return colorsNode;
  };

  // Create the 'tamano' node with selected sizes
  const createSizesNode = async (codigo) => {
    const sizesNode = {};

    chips.forEach((size) => {
      const sizeRef = push(ref(database, `GE/Exterior/Prod/${codigo}/Talla`));

      // Get the price for the size from the prices object
      const price = parseInt(prices[size]) || 0; // Use an empty string if there's no price

      sizesNode[sizeRef.key] = {
        Codigo: sizeRef.key, // Store the push ID as Codigo
        label: size, // Store the size name (chip name)
        precio: price, // Store the price
      };
    });

    return sizesNode;
  };

  // Store data in the 'filtros' node
  const storeInFiltrosNode = async (codigo, commonData) => {
    const filtrosRef = ref(database, `GE/Filtros/Exterior/${categ}/${codigo}`);
    await set(filtrosRef, {
      Categoria: commonData.Categoria,
      Subcategoria: commonData.Subcategoria,
      Precio: commonData.Precio,
      Stock: commonData.Stock,
      Imagen: commonData.Imagen,

      Titulo: commonData.Titulo,
      Codigo: commonData.Codigo,
    });

    // Optionally, store the images URLs in the 'filtros' node as well if needed
  };

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleInputChangeStilo = (e) => setInputValues(e.target.value);

  const handleAddChip = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        setChipscolor([
          ...chipscolor,
          capitalizeFirstLetter(inputValue.trim()),
        ]);
        setInputValue("");
      }
    }
  };
  const handleAddChips = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValues.trim()) {
        setChips([...chips, capitalizeFirstLetter(inputValues.trim())]);
        setPrices({
          ...prices,
          [capitalizeFirstLetter(inputValues.trim())]: "",
        });
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
  const handleDownloadAndLoad = async () => {
    try {
      const response = await fetch(
        "https://m.media-amazon.com/images/I/51eVrRhcpWL._AC_SY395_.jpg"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob(); // Convert response to a Blob
      const url = URL.createObjectURL(blob); // Create a temporary URL for the Blob

      // Add the URL to the state (load it into imgs)
      setimgs(url);
      console.log(url);

      // Optionally download the image
      // up (Optional: revokeObjectURL after ensuring it's no longer needed)
      // URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading or loading the image:", error);
    }
  };

  const handleButtonClick = async (view) => {
    // handleDownloadAndLoad();

    setShowBox(false);
    setView(view);
    // Perform any additional actions based on the selected view
    console.log(`Selected view: Exterior`);
  };
  const chipOptions1 = [
    { label: "Aerea", value: "Aerea" },
    { label: "Maritima", value: "Maritima" },
  ];

  useEffect(() => {
    if (view !== "") {
      async function getUniqueSubcategories() {
        const databaseRef = ref(
          database,
          `GE/Filtros/Exterior/Belleza & Accesorios`
        );
        const subcategoriesSet = new Set();

        try {
          const snapshot = await get(databaseRef);
          if (snapshot.exists()) {
            const products = snapshot.val();
            for (const productId in products) {
              if (products.hasOwnProperty(productId)) {
                const product = products[productId];
                if (product.Subcategoria) {
                  subcategoriesSet.add(product.Subcategoria);
                }
              }
            }
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }

        return Array.from(subcategoriesSet);
      }
      const fetchDatas = async (codigo, estado) => {
        try {
          // Include estado as a parameter in the request
          const response = await axios.get(
            `http://localhost:3000/fetchWithPagination`,
            {
              params: {
                path: `GE/Categorias/Exterior`,
              },
            }
          );

          console.log("Response status:", response.status);
          console.log("Response data:", response.data);

          const fetchedData = response.data; // Get data from response

          // Update state with the new data
          setchipOptions(fetchedData);
        } catch (error) {
          console.error("Error fetching data:", error);
          if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
          }
        }
      };

      // fetchDatas();
    }
    // Cleanup function to unsubscribe when component unmounts
    return () => {
      // Unsubscribe from database
    };
  }, [view]);
  const fetchData = async (selected) => {
    try {
      // Include estado as a parameter in the request
      const response = await axios.get(
        `http://localhost:3000/fetchWithPagination`,
        {
          params: {
            path: `GE/Secciones/Exterior/${selected}`,
          },
        }
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      const fetchedData = response.data; // Get data from response

      // Update state with the new data
      setchipOptionscat(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
    }
  };

  // Función para leer el archivo Excel y convertirlo en JSON
  const [data, setData] = useState([]); // Estado para guardar los datos procesados

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Leer el archivo Excel
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Obtener el nombre de la primera hoja
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convertir la hoja a JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Procesar los datos y descargar las imágenes
        const processedData = await Promise.all(
          jsonData.map(async (item) => {
            let imageUrl = null;

            if (item.url) {
              try {
                const response = await fetch(item.url);
                const blob = await response.blob();
                imageUrl = URL.createObjectURL(blob); // Crear URL temporal para la imagen
              } catch (error) {
                console.error("Error al descargar la imagen:", error);
              }
            }

            // Agregar nuevos campos al objeto
            return {
              ...item,
              url: imageUrl || null, // URL de la imagen descargada (o null si falla)
              vendedor: "Desconocido", // Valor predeterminado
              compras: Math.floor(Math.random() * 100), // Número aleatorio como ejemplo
            };
          })
        );

        // Actualizar el estado con los datos procesados
        setData(processedData);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Por favor, selecciona un archivo primero");
    }
  };

  return (
    <Box>
      <Cabezal texto={"Publicar Prod"} />
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      {showbox && (
        <Box sx={{ display: "flex", gap: 5, m: 10 }}>
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
          sx={{ padding: 2, paddingTop: 8 }}
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
          <p>
            {pesin}
            {categ}
          </p>

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
                label="Price"
                variant="outlined"
                type="number"
                value={price}
                onChange={handlePriceChange}
                required
                fullWidth
              />
            </Grid>

            {/* {view === "Nacional" || selectedChip === "Aerea" ? (
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
            )} */}
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
            <img
              src={imgs}
              alt="Image"
              style={{
                width: "100%",
                height: "50%",
                objectFit: "contain",
                backgroundColor: "red",
              }}
            />

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
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button type="submit" variant="contained" color="primary">
                {loading ? (
                  <CircularProgress color="warning" size={24} />
                ) : (
                  "PUBLICAR"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Publicar;
