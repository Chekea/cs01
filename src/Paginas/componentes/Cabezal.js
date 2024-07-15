import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { IconButton, useMediaQuery } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Cabezal = ({ texto }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const headerHeight = 60; // Adjust this value based on your design

  return (
    <>
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: headerHeight,
            padding: theme.spacing(1),
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
            display: "flex",
            alignItems: "center",
            zIndex: 1000,
            boxSizing: "border-box",
          }}
        >
          <IconButton onClick={() => navigate(-1)} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <h2 style={{ marginLeft: theme.spacing(2) }}>{texto}</h2>
        </div>
      )}
    </>
  );
};

export default React.memo(Cabezal);
