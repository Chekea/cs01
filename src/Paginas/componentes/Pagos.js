import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  RadioGroup,
  FormControl,
  FormControlLabel,
  IconButton,
  Collapse,
  Radio,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Passcode from "./Passcode";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../../Servicios/firebases";
import { compressImage, puntodecimal } from "../../ayuda";
import CircularProgress from "@mui/material/CircularProgress";
import CustomText from "./CustomText";
import { makeStyles } from "@mui/styles";
import ImageUploading from "react-images-uploading";
import { subircompra } from "../../Servicios/DBservices";

const useStyles = makeStyles({
  customStyle: {
    fontFamily: "CustomFont, Arial, sans-serif",
    fontWeight: "regular",
  },
});
const Pagos = () => {
  const [valores, setValores] = useState(null);
  const [dataReceived, setDataReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const maxNumber = 1; // Only allow one image

  const dataURLToFile = (dataUrl, filename) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
  // const onChange = (imageList) => {
  //   setImages(imageList);
  // };
  // Handle image compression and uploading
  const handleImageUpload = async (imageList) => {
    const compressedFiles = await Promise.all(
      imageList.map(async (image) => {
        // Convert image data URL to a File object or use the image file directly if available
        const file = image.file || dataURLToFile(image.data_url, "image.jpg");
        const compressedFile = await compressImage(file);
        return {
          ...image,
          file: compressedFile,
        };
      })
    );

    // Add the compressed file to the state, ensuring only 1 image is allowed
    if (compressedFiles.length <= maxNumber) {
      setImages(compressedFiles);
    } else {
      alert("You can upload only 1 image.");
    }
  };

  const [receivedData, setReceivedData] = useState({
    data: "hi",
    contexto: "hi",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [ciudad, setciudad] = useState([]);
  const [pagos, setpagos] = useState([]);
  const [delivery, setdelivery] = useState([]);
  const [intervalos, setintervalos] = useState([]);
  const [pasos, setpasos] = useState([]);

  const [pag, setPag] = useState(null);
  const [dev, setDev] = useState("Retiro presencial ");
  const [horas, setHoras] = useState("14-16h");

  const handleChangePag = (event) => {
    console.log(event.target.value);
    setPag(event.target.value);
  };
  const handleChangedeliv = (event) => {
    console.log(event.target.value);
    setDev(event.target.value);
  };
  const handleChangeHoras = (event) => {
    console.log(event.target.value);
    setHoras(event.target.value);
  };
  const database = getDatabase(app);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const enviardatos = useCallback(async () => {
    try {
      const compraData = {
        Nombre: dataReceived.data.nombre,
        Contacto: dataReceived.data.con,
        RetiroLugar: ciudad,
        Intervalo: horas,
        Contexto: dataReceived.data.contexto,
        Barrio: dataReceived.data.Ubicacion,
        Vendedor: dataReceived.data.val[0].Vendedor,
        Estado:
          dataReceived.data.contexto === "Nacional"
            ? "Comprado"
            : "Verificando...",
        Comprador: dataReceived.data.Id,
        ...(dataReceived.data.contexto === "Exterior" && {
          Pago: pag,
          Via: dataReceived.data.Lugar === "Maritima" ? "Maritima" : "Aerea",
          Tipo: dev,
        }),
      };

      alert(compraData);

      // await subircompra(
      //   dataReceived.val,
      //   compraData,
      //   `GE/Compras/${dataReceived.data.contexto}`,
      //   images,
      //   0
      // );
    } catch (error) {
      console.log(error);
    }
  }, [ciudad, horas, pag, dev, images]);

  useEffect(() => {
    if (dataReceived) {
      const fetchData = () => {
        const databaseRef = ref(database, `GE/Info`);
        onValue(databaseRef, (snapshot) => {
          console.log(snapshot.val(), "existe");
          const infoData = snapshot.val();

          if (infoData) {
            setValores(infoData);
            setIsLoading(false);

            console.log(infoData.Malabo.Ciudad);
            if (receivedData.data.contexto === "Exterior") {
              delivery.push(...Object.values(infoData.Delivery));

              // Sort alphabetically (assuming the values are strings)
              delivery
                .sort((a, b) => String(a).localeCompare(String(b)))
                .reverse();

              console.log(delivery, "wo");
              setdelivery(delivery);
            }

            pagos.push(...Object.values(infoData.Pagos));

            setpagos(pagos);

            pasos.push(...Object.values(infoData.Pasos));
            setpasos(pasos);

            ciudad.push(
              ...Object.values(infoData.Ciudad).filter(
                (estado) =>
                  receivedData.contexto !== "Exterior" ||
                  estado.label === "Malabo"
              )
            );
            setTimeout(() => {
              setciudad(ciudad);
            }, 1200);

            intervalos.push(...Object.values(infoData.Intervalos));

            console.log(infoData.Intervalos);

            setintervalos(intervalos);
          }
        });
      };

      fetchData();
    }
    // Cleanup function to unsubscribe when component unmounts
    return () => {
      // Unsubscribe from database
    };
  }, [dataReceived]); // Add dataReceived as a dependency

  const handleTotal = () => {
    if (
      !receivedData.data.Peso ||
      !receivedData.data.PrecioEnvio ||
      !receivedData.data.precio
    ) {
      return 0;
    }
    let calculoValor =
      receivedData.data.Peso >= 5
        ? 1500 * receivedData.data.Peso
        : 2000 * receivedData.data.Peso;
    let total =
      dev === "A domicilio"
        ? receivedData.data.PrecioEnvio +
          receivedData.data.precio +
          calculoValor
        : receivedData.data.PrecioEnvio + receivedData.data.precio;

    return total;
  };

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // Define a global function to receive data
    window.receiveData = (data) => {
      console.log(data);
      console.log("Received Data: ", data);

      // Parse the incoming data (assuming JSON format)
      try {
        const parsedData = JSON.parse(data);
        alert(parsedData);

        setReceivedData(parsedData);
        setDataReceived(true);
      } catch (error) {
        console.error("Invalid JSON data received", error);
      }

      // Set this to true when data is received
    };

    // Cleanup function to remove the global function
    return () => {
      delete window.receiveData;
    };
  }, []);
  const classes = useStyles();

  function Payment() {
    return (
      <div>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          className={classes.customStyle}
          fontSize="1.2rem"
        >
          Ver Pasos
          <IconButton
            onClick={handleToggle}
            size="small"
            sx={{ marginLeft: 1 }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Typography>
        <Collapse in={open}>
          {pasos.map((item) => (
            <Typography
              sx={{ display: "flex", textAlign: "justify" }}
              className={classes.customStyle}
              variant="body1"
            >
              {item.pasos}
            </Typography>
          ))}
        </Collapse>

        <Grid item xs={3}>
          <div>
            <ImageUploading
              multiple={false} // Disable multiple selection for a single image
              value={images}
              onChange={handleImageUpload}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                <div className="upload__image-wrapper">
                  <IconButton
                    sx={{ width: "100%", height: "100%" }}
                    onClick={
                      images.length === 0
                        ? onImageUpload
                        : () => onImageUpdate(0)
                    }
                    {...dragProps}
                  >
                    {images.length === 0 ? (
                      <IconButton sx={{ width: "100%", height: "100%" }}>
                        <PhotoCameraIcon
                          style={{ fontSize: "150px", color: "#ccc" }}
                        />
                      </IconButton>
                    ) : (
                      <img
                        src={images[0].data_url}
                        alt="Selected"
                        style={{
                          width: "80%",
                          height: "100%",
                          borderRadius: 8,
                        }}
                      />
                    )}
                  </IconButton>
                </div>
              )}
            </ImageUploading>
          </div>
        </Grid>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          className={classes.customStyle}
        >
          Suba la imagen de la factura
        </Typography>
      </div>
    );
  }
  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        overflow: "hidden",
        display: { xs: "block", sm: "none" }, // Show only on mobile (xs)
      }}
    >
      {!dataReceived ? (
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
      ) : isLoading ? (
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
        <>
          <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <CustomText
              text={`${receivedData.data.nombre}  ${receivedData.data.con}`}
              colores={"textSecondary"}
            />
            {receivedData.data.contexto === "Nacional" ? (
              <CustomText
                text={receivedData.data.dir}
                colores={"textSecondary"}
              />
            ) : (
              <RadioGroup value={dev} onChange={handleChangedeliv} row>
                {delivery.map((item) => (
                  <FormControlLabel
                    value={item.label}
                    control={<Radio />}
                    label={<CustomText text={item.label} />}
                  />
                ))}
              </RadioGroup>
            )}

            {dev === "A domicilio" ? (
              <div>
                <CustomText text={" Horas favorables para entrega"} />

                <RadioGroup value={horas} onChange={handleChangeHoras} row>
                  {intervalos.map((item) => (
                    <FormControlLabel
                      value={item.label}
                      control={<Radio />}
                      label={<CustomText text={item.label} />}
                    />
                  ))}
                </RadioGroup>
              </div>
            ) : null}
          </Paper>

          <Divider sx={{ marginY: 2 }} />
          <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <CustomText text={"Detalles"} bold={true} />

            <Grid container justifyContent="space-between">
              <CustomText
                text={`${receivedData.data.cantidad} Producto(s)`}
                colores={"textSecondary"}
              />

              <CustomText
                text={`${puntodecimal(receivedData.data.precio)} XFA`}
              />
            </Grid>

            <Grid container justifyContent="space-between">
              <CustomText
                text={"Coste de Envio(s)"}
                colores={"textSecondary"}
              />
              <CustomText
                text={
                  dev === "A domicilio"
                    ? puntodecimal(
                        +receivedData.data.Peso >= 5
                          ? receivedData.data.PrecioEnvio +
                              1500 * receivedData.data.Peso
                          : receivedData.data.PrecioEnvio +
                              2000 * receivedData.data.Peso
                      ) + " XFA"
                    : puntodecimal(receivedData.data.PrecioEnvio) + " XFA"
                }
              />
            </Grid>

            <Grid container justifyContent="space-between">
              <CustomText text={"TOTAL"} bold={true} />

              <CustomText
                text={`${puntodecimal(handleTotal())} XFA`}
                bold={true}
              />
            </Grid>
          </Paper>

          {receivedData.data.Lugar === "Bata" ? (
            <Paper sx={{ padding: 2, marginBottom: 12 }}>
              <CustomText text={"Realizar Pago"} bold={true} />
              <Typography
                sx={{ display: "flex", textAlign: "justify" }}
                className={classes.customStyle}
                variant="body1"
              >
                {valores.retirobata}
              </Typography>
              <Payment />
            </Paper>
          ) : receivedData.data.contexto === "Exterior" ? (
            <Paper sx={{ padding: 2, marginBottom: 12 }}>
              <CustomText text={"Realizar Pago"} bold={true} />

              <RadioGroup value={pag} onChange={handleChangePag} row>
                {pagos.map((item) => (
                  <FormControlLabel
                    value={item.label}
                    control={<Radio />}
                    label={<CustomText text={item.label} />}
                  />
                ))}
              </RadioGroup>
              <Grid container justifyContent="space-between">
                <CustomText
                  text={pag === "Efectivo" ? "Ciudad" : "Banco"}
                  colores={"textSecondary"}
                />
                <CustomText
                  text={
                    pag === "Efectivo"
                      ? valores.Malabo.Ciudad
                      : valores.Banco.Banco
                  }
                />
              </Grid>
              <Grid container justifyContent="space-between">
                <CustomText
                  text={pag === "Efectivo" ? "Direccion" : "Numero de cuenta"}
                  colores={"textSecondary"}
                />
                <CustomText
                  text={
                    pag === "Efectivo"
                      ? valores.Malabo.Direccion
                      : valores.Banco.Numero
                  }
                />
              </Grid>
              <Grid container justifyContent="space-between">
                <CustomText
                  text={pag === "Efectivo" ? "Titular" : "Contacto"}
                  colores={"textSecondary"}
                />
                <CustomText
                  text={
                    pag === "Efectivo"
                      ? valores.Malabo.Contacto
                      : valores.Banco.Titular
                  }
                />
              </Grid>
              <CustomText
                text={`Puede abonar un ${
                  handleTotal() < 250000 ? "50% " : "70% "
                }antes y el  ${
                  handleTotal() < 250000 ? "50%" : "30%"
                } restante al retirar su encargo`}
              />
              <Payment />
            </Paper>
          ) : (
            <CustomText
              text={"Los pagos en malabo se realizan a la entrega del producto"}
            />
          )}

          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              padding: 2,
              boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box>
              <CustomText
                text={`${puntodecimal(handleTotal())} XFA`}
                right={2}
                size={"h6"}
                bold={true}
              />
            </Box>
            <Button
              sx={{
                fontFamily: "CustomFont, Arial, sans-serif",
                fontWeight: "bold",
              }}
              variant="contained"
              color="warning"
              onClick={openModal}
            >
              CONFIRMAR
            </Button>
          </Box>
          <Passcode
            open={modalOpen}
            onClose={closeModal}
            codigo={receivedData.data.constra}
            enviardatos={enviardatos}
          />
        </>
      )}
    </Box>
  );
};

export default Pagos;
