import { useEffect, useState } from "react";
import { Box, Button, Typography, Paper, Modal, Tooltip, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { API_URL } from "../links/constants";
import "../../App.css";
import { ISelectedPlanning } from "../../App";

interface EditPlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  planning: ISelectedPlanning | null;
}

export interface ISelectedProject {
  id: number;
  name: string;
}

export interface ISelectedEmployee {
  id: number;
  name: string;
  contractHours: string;
}

const EditPlanningModal: React.FC<EditPlanningModalProps> = ({ isOpen, onClose, planning }) => {
  const [employeeData, setEmployeeData] = useState<ISelectedEmployee[]>([]);
  const [projectData, setProjectData] = useState<ISelectedProject[]>([]);

  const [Week, setWeek] = useState("");
  const [Hours, setHours] = useState("");

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const [WeekError, setWeekError] = useState("");
  const [HoursError, setHoursError] = useState("");

  const [ProjectNameError, setProjectNameError] = useState("");
  const [EmployeeNameError, setEmployeeNameError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const fetchEmployee = () => {
    fetch(`${API_URL}Employee`, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEmployeeData(data);
      })
      .catch((error) => {
        console.log("Error fetching employee data:", error);
      });
  };

  const fetchProject = () => {
    fetch(`${API_URL}Projecten`, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProjectData(data);
      })
      .catch((error) => {
        console.log("Error fetching employee data:", error);
      });
  };

  const fetchEditPlanning = () => {
    setButtonDisabled(true);

    const id = planning?.Id;
    const weekValid = Week.length >= 1;
    const hoursValid = Hours.length >= 1;
    const employeeNameValid = selectedProject.length > 0;
    const projectNameValid = selectedEmployee.length > 0;

    if (!weekValid) setWeekError("Please enter more than 1 number");
    if (!hoursValid) setHoursError("Please enter more than 1 number");
    if (!projectNameValid) setProjectNameError("Please enter an project");
    if (!employeeNameValid) setEmployeeNameError("Please enter an employee");

    if (Week && Hours && selectedProject && selectedEmployee) {
      fetch(`${API_URL}Planning/EditPlanning/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          Week: Week,
          Hours: Hours,
          ProjectId: selectedProject,
          EmployeeId: selectedEmployee,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          setButtonDisabled(false);
          if (!res.ok) {
            return res.text().then((text) => {
              console.log(text);
            });
          }
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } else {
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
    fetchProject();
  }, []);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Paper
        sx={{
          width: { xs: "100%", md: 750 },
          height: { xs: "100%", md: 500 },
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          padding: 3,
          gap: 3,
        }}
        elevation={8}
      >
        <Box
          display={"flex"}
          width={"100%"}
          height={"15%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h3">Edit Planning</Typography>
          <Tooltip title="Close Modal">
            <Button onClick={onClose}>
              <img
                src="../src/assets/close.png"
                alt="close modal"
                className="img"
              />
            </Button>
          </Tooltip>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "85%",
          }}
        >
          <Box
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
              sx={{ width: "100%", height: "15%", marginTop: "7.5%" }}
            >
              <TextField
                label={"week: " + planning?.Week}
                helperText={
                  WeekError ? (
                    <Typography color="error">{WeekError}</Typography>
                  ) : null
                }
                sx={{ width: "35%" }}
                onChange={(e) => {
                  setWeek(e.target.value);
                }}
              ></TextField>

              <TextField
                label={"hours: " + planning?.Hours}
                helperText={
                  HoursError ? (
                    <Typography color="error">{HoursError}</Typography>
                  ) : null
                }
                sx={{ width: "35%" }}
                onChange={(e) => {
                  setHours(e.target.value);
                }}
              ></TextField>
            </Box>

          <Box
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"center"}
            sx={{ width: "100%", height: "15%", marginTop: "7.5%" }}
          >
            <FormControl sx={{ width: "35%", marginTop: "4%" }}>
              <InputLabel>{planning?.Project.Name}</InputLabel>
              <Select
                label="Select an option"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                {projectData.map((item: ISelectedProject) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ width: "35%", marginTop: "4%" }}>
              <InputLabel>{planning?.Employee.Name}</InputLabel>
              <Select
                label="Select an option"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                {employeeData.map((item: ISelectedEmployee) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Tooltip title="Edit Planning">
            <Button
              disabled={buttonDisabled}
              variant="outlined"
              color="primary"
              sx={{ marginTop: "10%" }}
              onClick={fetchEditPlanning}
            >
              Edit Planning
            </Button>
          </Tooltip>
        </Box>
      </Paper>
    </Modal>
  );
};

export default EditPlanningModal;
