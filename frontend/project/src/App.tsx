import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./App.css";
import { API_URL } from "./components/links/constants";
import Header from "./components/shared/Header";
import Page from "./components/shared/Page";
import { Button, Tooltip } from "@mui/material";
import EditPlanningModal from "./components/edit/EditPlanningModal";
import AddPlanning from "./components/add/AddPlanning";

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
  const [currentweek, setCurrentWeek] = useState(getWeekNumber(new Date()));
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanning, setSelectedPlanning] = useState<ISelectedPlanning | null>(null);
  
  function getWeekNumber(date: Date): number {
    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(
      currentDate.getDate() + 3 - ((currentDate.getDay() + 6) % 7)
    );
    const startDate = new Date(currentDate.getFullYear(), 0, 4);
    return (
      1 + Math.round((currentDate.getTime() - startDate.getTime()) / 604800000)
    );
  }

  const fetchPlanning = () => {
    fetch(`${API_URL}Planning`, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPlanningData(data.EmployeeWorkHours.$values);
        setCurrentWeek(data.CurrentWeek);
      })
      .catch((error) => {
        console.log("Error fetching planning data:", error);
      });
  };

  const DeletePlanning = (id: number) => {
    fetch(`${API_URL}Planning/DeletePlanning/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.log("Error deleting planning:", response.statusText);
      }
    })
    .catch((error) => {
      console.log("Error deleting planning:", error);
    });
  }

  const AddWeek = () => {
    fetch(`${API_URL}Planning/AddWeek`, {
      method: "PUT",
      body: JSON.stringify({ Week: currentweek }),
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
        setCurrentWeek(parsedData.CurrentWeek);
        setPlanningData(parsedData.EmployeeWorkHours.$values);
      })
      .catch((error) => {
        console.log("Error fetching week data:", error);
      });
  };

  const MinusWeek = () => {
    fetch(`${API_URL}Planning/MinusWeek`, {
      method: "PUT",
      body: JSON.stringify({ Week: currentweek }),
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
        setCurrentWeek(parsedData.CurrentWeek);
        setPlanningData(parsedData.EmployeeWorkHours.$values);
      })
      .catch((error) => {
        console.log("Error fetching week data:", error);
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
          <Tooltip title="week eerder">
            <Button onClick={MinusWeek}>
              <img
                src="./src/assets/left-arrow.png"
                alt="left arrow"
                className="img"
              />
            </Button>
          </Tooltip>

          <Typography
            sx={{
              marginLeft: "2%",
              marginRight: "2%",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
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

        <AddPlanning />

        <Box
          display={"grid"}
          gridTemplateColumns={"repeat(6, 1fr)"}
          sx={{ width: "100%", height: "60%", gap: "26px" }}
        >
          {planningData &&
          Array.isArray(planningData) &&
          planningData.length > 0 ? (
            planningData.map((item: ISelectedPlanning, index: number) => (
              <Box
                key={index}
                sx={{ width: "100%", height: "40%", backgroundColor: "grey" }}
              >
                {item.Project && (
                  <Typography
                    sx={{
                      width: "100%",
                      height: "22.5%",
                      fontSize: 25,
                      fontWeight: 600,
                      textAlign: "center",
                      paddingTop: "10px",
                    }}
                  >
                    {item.Project.Name}
                  </Typography>
                )}

                <Typography
                  sx={{
                    width: "100%",
                    height: "22.5%",
                    fontSize: 20,
                    textAlign: "center",
                    paddingTop: "10px",
                  }}
                >
                  Total hours: {item.Hours}
                </Typography>

                {item.Project && (
                  <Typography
                    sx={{
                      width: "100%",
                      height: "22.5%",
                      fontSize: 20,
                      textAlign: "center",
                      paddingTop: "10px",
                    }}
                  >
                    Werknemer: {item.Employee.Name}
                  </Typography>
                )}

                <Box
                  sx={{
                    width: "100%",
                    height: "32.5%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
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

                  <Tooltip title="delete project">
                    <Button onClick={() => DeletePlanning(item.Id)}>
                      <img
                        src="./src/assets/delete.png"
                        alt="delete-icon"
                        className="img"
                      />
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
            ))
          ) : (
            <Box
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              sx={{ width: "100%", textAlign: "center" }}
            >
              <Typography sx={{ textAlign: "center" }}>
                Geen planningsgegevens gevonden.
              </Typography>
            </Box>
          )}

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
