import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./App.css";
import { API_URL } from "./components/links/constants";

const App = () => {
  const [planningData, setPlanningData] = useState([]);
  const [currentweek, setCurrentWeek] = useState("");

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
          display={"grid"}
          gridTemplateColumns={"repeat(4, 1fr)"}
          sx={{
            width: "100%",
            height: "80%",
            gap: "26px",
          }}
        >
          {planningData.map((item: any, index: number) => (
            <Box
              key={index}
              sx={{ width: "100%", height: "35%", backgroundColor: "grey" }}
            >
              <Typography
                sx={{
                  fontSize: 25,
                  fontWeight: 600,
                  textAlign: "center",
                  paddingTop: "10px",
                }}
              >
                {item.Project.Name}
              </Typography>
              <Typography sx={{ fontSize: 20, textAlign: "center", paddingTop: "10px" }}>
                Total hours: {item.Hours}
              </Typography>
              <Typography sx={{ fontSize: 20, textAlign: "center", paddingTop: "10px" }}>
                Werknemer: {item.Employee.Name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default App;
