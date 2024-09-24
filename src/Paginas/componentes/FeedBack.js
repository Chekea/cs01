import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function Feedback() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    alert(`Input Value: ${inputValue}`);
    setInputValue("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <TextField
        label="Deje su Comentario..."
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        multiline
        rows={4}
        sx={{ width: "90%", mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        disabled={!inputValue}
      >
        Publicar
      </Button>
    </Box>
  );
}

export default Feedback;
