import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./App.css";
import { API_URL } from "./components/links/constants";
import Header from "./components/shared/Header";
import Page from "./components/shared/Page";
import { Button, Tooltip } from "@mui/material";
import EditPlanningModal from "./components/pages/planning/EditPlanningModal";

export interface ISelectedPlanning {
  Id: number;
  name: string;
  Week: number;
  Hours: number;
  Project: { Name: string };
  Employee: { Name: string };
}

const App = () => {
  const [planningData, setPlanningData] = useState([]);
  const [currentweek, setCurrentWeek] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanning, setSelectedPlanning] = useState<ISelectedPlanning | null>(null);

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
      <Page title="Planning" />

      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        sx={{ width: "100%", height: "100vh" }}
      >
        <Header />

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
            height: "70%",
            gap: "26px",
          }}
        >
          {planningData.map((item: any, index: number) => (
            <Box
              key={index}
              sx={{ width: "100%", height: "40%", backgroundColor: "grey" }}
            >
              <Typography
                sx={{ width: "100%", height: "20%",fontSize: 25, fontWeight: 600, textAlign: "center", paddingTop: "10px" }}
              >
                {item.Project.Name}
              </Typography>
              <Typography
                sx={{ width: "100%", height: "20%", fontSize: 20, textAlign: "center", paddingTop: "10px" }}
              >
                Total hours: {item.Hours}
              </Typography>
              <Typography
                sx={{ width: "100%", height: "20%", fontSize: 20, textAlign: "center", paddingTop: "10px" }}
              >
                Werknemer: {item.Employee.Name}
              </Typography>
              
              <Box
                sx={{ width: "100%", height: "40%", display: "flex", justifyContent: "center", alignItems: "center"}}
              >
                <Tooltip title="edit project">
                  <Button onClick={() => {
                    setModalOpen(true);
                    setSelectedPlanning(item);
                  }}>
                    <img
                      src="./src/assets/edit.png"
                      alt="edit-icon"
                      className="img"
                    />
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          ))}

          <EditPlanningModal
                  isOpen={modalOpen}
                  onClose={() => {
                    setModalOpen(false);
                  }}
                  planning={selectedPlanning}
                />
        </Box>
      </Box>
    </>
  );
};

export default App;
