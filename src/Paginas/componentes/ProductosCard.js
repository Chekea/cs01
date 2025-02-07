import { Box, Button, Grid, Dialog } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function ProductosCard({ data, enviado, isBuscar }) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const passToParent = (item) => {
    if (item.Estado === "Enviado") {
      enviado(item, "Retirado");
    } else {
      enviado(item, "Enviado");
    }
  };

  const navigate = useNavigate();

  const handleClickProd = (item) => {
    if (isBuscar) {
      let contexto =
        item.Pais !== "Guinea Ecuatorial" ? "Exterior" : "Nacional";
      navigate(`/Buscar/Editar/${item.Codigo}/${contexto}`);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  console.log(data);
  return (
    <>
      {data.map((item, index) => (
        <Grid container justifyContent="center" key={index}>
          <Grid item xs={12} sm={10}>
            {item.contexto === "Exterior" ? (
              <Box
                display="flex"
                alignItems="center"
                p={1}
                borderRadius={8}
                boxShadow={3}
                width="100%" // Set width to 100%
              >
                <img
                  src={item.Imagen}
                  alt="Sample"
                  style={{
                    borderRadius: "30%",
                    width: "100%",
                    maxWidth: "80px",
                    marginRight: "16px",
                  }}
                  onClick={() => handleImageClick(item.Imagen)}
                />
                <div>
                  <h3>{item.Titulo}</h3>
                  <p>{item.Detalles}</p>
                </div>
              </Box>
            ) : (
              <div style={{ marginTop: 15 }}>
                <Box
                  display="flex"
                  alignItems="center"
                  p={1}
                  borderRadius={8}
                  onClick={() => handleClickProd(item)}
                  boxShadow={3}
                  width="100%" // Set width to 100%
                >
                  <img
                    src={item.Imagen}
                    alt="Sample"
                    style={{
                      borderRadius: "30%",
                      width: "100%",
                      maxWidth: "80px",
                      marginRight: "16px",
                    }}
                    onClick={() => handleImageClick(item.Imagen)}
                  />
                  <div>
                    <h3>{item.Titulo}</h3>
                    {isBuscar ? (
                      <p>{`Cantidad:${item.Cantidad}     Stock:${item.Stock}\n`}</p>
                    ) : (
                      <p>{item.Detalles}</p>
                    )}
                  </div>

                  {!isBuscar
                    ? item.Estado !== "Retirado" && (
                        <div style={{ paddingLeft: "10px" }}>
                          <Button
                            onClick={() => passToParent(item)}
                            variant="contained"
                            color="primary"
                            style={{
                              borderRadius: "20px",
                              marginRight: "14px",
                            }}
                          >
                            {item.Estado === "Comprado"
                              ? "Enviado"
                              : item.Estado === "Enviado"
                              ? "Retirado"
                              : null}
                          </Button>
                        </div>
                      )
                    : null}
                </Box>
              </div>
            )}
          </Grid>
        </Grid>
      ))}
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
          <img
            src={selectedImage}
            alt="Enlarged Sample"
            style={{ width: "100%" }}
          />
        </div>
      </Dialog>
    </>
  );
}

export default ProductosCard;
