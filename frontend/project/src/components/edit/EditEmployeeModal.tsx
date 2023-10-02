import { useState } from "react";
import { Box, Button, Typography, Paper, Modal, Tooltip, TextField } from "@mui/material";
import { API_URL } from "../links/constants";
import { ISelectedEmployee } from "../pages/employee/Employee";

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: ISelectedEmployee | null;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ isOpen, onClose, employee }) => {
  const [Name, setName] = useState("");
  const [ContractHours, setContractHours] = useState("");

  const [NameError, setNameError] = useState("");
  const [ContractHoursError, setContractHoursError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const fetchEditEmployee = () => {
    setButtonDisabled(true);

    const id = employee?.id;
    const nameValid = Name.length >= 3;
    const contractHoursValid = ContractHours.length >= 1;

    if (!nameValid) setNameError("Please enter more than 3 characters");

    if (!contractHoursValid)
      setContractHoursError("Please enter more then 1 number");

    if (Name && ContractHours) {
      fetch(`${API_URL}Employee/UpdateEmployee/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          Name,
          ContractHours,
          UpdatePlannings: [],
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
          window.location.href = "/employees";
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
          <Typography variant="h3">Edit Employee</Typography>
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
            label={employee?.name}
            helperText={
              NameError ? (
                <Typography color="error">{NameError}</Typography>
              ) : null
            }
            sx={{ marginTop: "7.5%" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></TextField>

          <TextField
            label={employee?.contractHours}
            helperText={
              ContractHoursError ? (
                <Typography color="error">{ContractHoursError}</Typography>
              ) : null
            }
            sx={{ marginTop: "4%" }}
            onChange={(e) => {
              setContractHours(e.target.value);
            }}
          ></TextField>

          <Tooltip title="Edit Employee">
            <Button
              disabled={buttonDisabled}
              variant="outlined"
              color="primary"
              sx={{ marginTop: "4%" }}
              onClick={fetchEditEmployee}
            >
              Edit Employee
            </Button>
          </Tooltip>
        </Box>
      </Paper>
    </Modal>
  );
};

export default EditEmployeeModal;
