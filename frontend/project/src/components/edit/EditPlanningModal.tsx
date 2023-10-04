import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Modal,
  Tooltip,
  TextField,
} from "@mui/material";
import { API_URL } from "../links/constants";
import "../../App.css";
import { ISelectedPlanning } from "../../App";

interface EditPlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  planning: ISelectedPlanning | null;
}

const EditPlanningModal: React.FC<EditPlanningModalProps> = ({
  isOpen,
  onClose,
  planning,
}) => {
  const [Week, setWeek] = useState("");
  const [Hours, setHours] = useState("");
  const [ProjectName, setProjectName] = useState("");
  const [EmployeeName, setEmployeeName] = useState("");

  const [WeekError, setWeekError] = useState("");
  const [HoursError, setHoursError] = useState("");
  const [ProjectNameError, setProjectNameError] = useState("");
  const [EmployeeNameError, setEmployeeNameError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const fetchEditPlanning = () => {
    setButtonDisabled(true);

    const id = planning?.Id;
    const weekValid = Week.length >= 1;
    const hoursValid = Hours.length >= 1;
    const projectNameValid = ProjectName.length >= 3;
    const employeeNameValid = EmployeeName.length >= 3;

    if (!weekValid) setWeekError("Please enter more than 1 number");
    if (!hoursValid) setHoursError("Please enter more than 1 number");
    if (!projectNameValid)
      setProjectNameError("Please enter more than 3 characters");
    if (!employeeNameValid)
      setEmployeeNameError("Please enter more than 3 characters");

    if (Week && Hours && ProjectName && EmployeeName) {
      fetch(`${API_URL}Planning/EditPlanning/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          Week,
          Hours,
          ProjectName,
          EmployeeName,
          Projects: planning?.Project,
          Employees: planning?.Employee,
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
          <TextField
            label={"week: " + planning?.Week}
            helperText={
              WeekError ? (
                <Typography color="error">{WeekError}</Typography>
              ) : null
            }
            sx={{ marginTop: "3%" }}
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
            sx={{ marginTop: "3%" }}
            onChange={(e) => {
              setHours(e.target.value);
            }}
          ></TextField>

          <TextField
            label={"project name: " + planning?.Project?.Name}
            helperText={
              ProjectNameError ? (
                <Typography color="error">{ProjectNameError}</Typography>
              ) : null
            }
            sx={{ marginTop: "3%" }}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          ></TextField>

          <TextField
            label={"employee name: " + planning?.Employee.Name}
            helperText={
              EmployeeNameError ? (
                <Typography color="error">{EmployeeNameError}</Typography>
              ) : null
            }
            sx={{ marginTop: "3%" }}
            onChange={(e) => {
              setEmployeeName(e.target.value);
            }}
          ></TextField>

          <Tooltip title="Edit Planning">
            <Button
              disabled={buttonDisabled}
              variant="outlined"
              color="primary"
              sx={{ marginTop: "3%" }}
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
