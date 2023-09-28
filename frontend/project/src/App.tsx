import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./App.css";
import { API_URL } from "./components/constants";

function App() {
  const [planningData, setPlanningData] = useState(null);
  const [currentweek, setCurrentWeek] = useState(null);

  const fetchPlanning = () => {
    fetch(`${API_URL}Planning`, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCurrentWeek(data.$values[0].Week);
        setPlanningData(data.$values);
      })
      .catch((error) => {
        console.log("Error fetching planning data:", error);
      });
  };

  useEffect(() => {
    fetchPlanning();
  }, []);

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        sx={{ width: "100%", height: "100vh" }}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ width: "100%", height: "20%" }}
        >
          <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
            Week {currentweek}
          </Typography>
        </Box>

        <Box
          display={"flex"}
          sx={{ width: "100%", height: "80%", backgroundColor: "lightgrey" }}
        >
          <Box
            sx={{width: "15%", height: ""}}
          >

          </Box>

        </Box>
      </Box>
    </>
  );
}

export default App;
