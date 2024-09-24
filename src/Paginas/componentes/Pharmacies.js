import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// Define custom styles
const useStyles = makeStyles({
  card: {
    backgroundColor: "#e8f5e9", // Light green background
    border: "1px solid #c8e6c9", // Green border
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "20px",
  },
  title: {
    color: "#388e3c", // Dark green color for the title
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#c8e6c9", // Light green on hover
    },
  },
});

const PharmacyList = () => {
  const classes = useStyles();
  const pharmacies = [
    { name: "Pharmacy One", location: "123 Main St, City A" },
    { name: "Pharmacy Two", location: "456 Elm St, City B" },
    { name: "Pharmacy Three", location: "789 Oak St, City C" },
  ];

  // Get the current date and format it as dd-mm-yy
  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(
    currentDate.getFullYear()
  ).slice(-2)}`;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          className={classes.title}
        >
          Farmacias de guardia hoy {formattedDate}
        </Typography>

        <List>
          {pharmacies.map((pharmacy, index) => (
            <ListItem key={index} className={classes.listItem}>
              <ListItemText
                primary={pharmacy.name}
                secondary={pharmacy.location}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PharmacyList;
