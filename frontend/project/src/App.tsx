import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./App.css";

function App() {
  return (
    <>
      <Box
        display={"flex"}
        //justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        sx={{width: "100%", height: "100vh"}}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{width: "100%", height: "20%"}}
        >
          <Typography sx={{fontSize: 30, fontWeight: "bold"}}>Week</Typography>
        </Box>
      </Box>
    </>
  );
}

export default App;
