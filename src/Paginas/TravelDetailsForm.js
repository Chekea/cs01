import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import ListIcon from "@mui/icons-material/List";
import TravelerInput from "./componentes/Travellerinput";
import TravelerList from "./componentes/TravelerList";

function TravelDetailsForm() {
  const [value, setValue] = useState(0);
  const [travelers, setTravelers] = useState([
    {
      departure: "bielo",
      destination: "",
      date: "",
      availableSpace: "4",
      acceptsSmallDevices: false,
      price: 10000,
    },
    {
      departure: "MADRID",
      destination: "DUBAI",
      date: "",
      availableSpace: "",
      acceptsSmallDevices: true,
      price: 1500,
    },
    {
      departure: "bielo",
      destination: "",
      date: "",
      availableSpace: "4",
      acceptsSmallDevices: false,
      price: 10000,
    },
    {
      departure: "MADRID",
      destination: "DUBAI",
      date: "",
      availableSpace: "",
      acceptsSmallDevices: true,
      price: 1500,
    },
    {
      departure: "bielo",
      destination: "",
      date: "",
      availableSpace: "4",
      acceptsSmallDevices: false,
      price: 10000,
    },
    {
      departure: "MADRID",
      destination: "DUBAI",
      date: "",
      availableSpace: "",
      acceptsSmallDevices: true,
      price: 1500,
    },
    {
      departure: "bielo",
      destination: "",
      date: "",
      availableSpace: "4",
      acceptsSmallDevices: false,
      price: 10000,
    },
    {
      departure: "MADRID",
      destination: "DUBAI",
      date: "",
      availableSpace: "",
      acceptsSmallDevices: true,
      price: 1500,
    },
  ]);

  const addTraveler = (newTraveler) => {
    setTravelers([...travelers, newTraveler]);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", paddingBottom: "56px" }}>
      {value === 0 && (
        <Box sx={{ padding: "10px" }}>
          <TravelerList travelers={travelers} />
        </Box>
      )}
      {value === 1 && (
        <Box sx={{ padding: "10px" }}>
          <TravelerInput onAddTraveler={addTraveler} />
        </Box>
      )}

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <BottomNavigationAction label="Lista" icon={<ListIcon />} />
        <BottomNavigationAction label="Entrada" icon={<RestoreIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default TravelDetailsForm;
