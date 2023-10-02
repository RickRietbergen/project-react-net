import { useState } from "react";
import { Box, Button, Typography, Paper, Modal, Tooltip, TextField } from "@mui/material";
import { API_URL } from "../links/constants";

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any[];
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ isOpen, onClose, employee }) => {
  const [Name, setName] = useState("");
  const [ContractHours, setContractHours] = useState("");

  const [NameError, setNameError] = useState("");
  const [ContractHoursError, setContractHoursError] = useState("");
  
  const [buttonDisabled, setButtonDisabled] = useState(false);

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
            label={employee.name}
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
            label={employee.contractHours}
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
            //   onClick={fetchEditEmployee}
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