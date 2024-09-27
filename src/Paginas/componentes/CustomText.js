import React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

// Define custom styles using makeStyles
const useStyles = makeStyles({
  customStyle: {
    fontFamily: "CustomFont, Arial, sans-serif",
    fontWeight: "bold",
  },
});

// Create the CustomTypography component
function CustomText({ text, activo }) {
  const classes = useStyles();

  return (
    <Typography
      variant="h6"
      className={classes.customStyle}
      gutterBottom={activo}
    >
      {text}
    </Typography>
  );
}

export default CustomText;
