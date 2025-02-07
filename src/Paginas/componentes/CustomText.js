import React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

// Define custom styles using makeStyles
const useStyles = makeStyles({
  customStyle: {
    fontFamily: "CustomFont, Arial, sans-serif",
    fontWeight: "regular",
    fontSize: "1.3rem",
  },
  customStyle2: {
    fontFamily: "CustomFont, Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "1.3rem",
  },
});
// Create the CustomTypography component
function CustomText({ text, size, bold, top, bot, right, colores }) {
  const classes = useStyles();

  return (
    <Typography
      className={bold ? classes.customStyle2 : classes.customStyle}
      gutterBottom
      color={colores ? colores : null}
      sx={{ mr: right ? right : null }}
    >
      {text}
    </Typography>
  );
}

export default CustomText;
