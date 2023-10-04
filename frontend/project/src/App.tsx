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
  const [planningData, setPlanningData] = useState<ISelectedPlanning[]>([]);
  const [currentweek, setCurrentWeek] = useState(0);

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
        if (data && data.$values && data.$values.length > 0) {
          setCurrentWeek(data.$values[0].Week);
        }
        setPlanningData(data.$values);
      })
      .catch((error) => {
        console.log("Error fetching planning data:", error);
      });
  };

  const AddWeek = () => {
    fetch(`${API_URL}Planning/AddWeek`, {
      method: "PUT",
      body: JSON.stringify({ week: currentweek }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const parsedData = JSON.parse(data.value);
        const dataArray = parsedData["$values"];
        setCurrentWeek(dataArray[0].Week)
        setPlanningData(dataArray);
      })
      .catch((error) => {
        console.log("Error fetching week data:", error);
      });
  }

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
          <Tooltip title="week eerder">
            <Button>
              <img
                src="./src/assets/left-arrow.png"
                alt="left arrow"
                className="img"
              />
            </Button>
          </Tooltip>

          <Typography sx={{ marginLeft: "2%", marginRight: "2%", fontSize: 30, fontWeight: "bold" }}>
            Week {currentweek}
          </Typography>

          <Tooltip title="week later">
            <Button onClick={AddWeek}>
              <img
                src="./src/assets/right-arrow.png"
                alt="right arrow"
                className="img"
              />
            </Button>
          </Tooltip>
        </Box>

        <Box
          display={"grid"}
          gridTemplateColumns={"repeat(4, 1fr)"}
          sx={{ width: "100%", height: "70%", gap: "26px" }}
        >
          {planningData.map((item: ISelectedPlanning, index: number) => (
            <Box
              key={index}
              sx={{ width: "100%", height: "40%", backgroundColor: "grey" }}
            >
              <Typography
                sx={{ width: "100%", height: "20%", fontSize: 25, fontWeight: 600, textAlign: "center", paddingTop: "10px" }}
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
                  <Button
                    onClick={() => {
                      setModalOpen(true);
                      setSelectedPlanning(item);
                    }}
                  >
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
