import { useState } from "react";
import { Box, Button, Typography, Paper, Modal, Tooltip, TextField } from "@mui/material";
import { API_URL } from "../links/constants";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose }) => {
    const [Name, setName] = useState("");

    const [NameError, setNameError] = useState("");

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const fetchCreateProject = () => {
      setButtonDisabled(true);

      const nameValid = Name.length >= 3;

      if (!nameValid) setNameError("Please enter more than 3 characters");

      if (Name) {
        fetch(`${API_URL}Projecten/ProjectCreate`, {
          method: "POST",
          body: JSON.stringify({
            Name,
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
            window.location.href = "/projects";
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
            <Typography variant="h3">Add Project</Typography>
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
              label="Name"
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

            <Tooltip title="Add Project">
              <Button
                disabled={buttonDisabled}
                variant="outlined"
                color="primary"
                sx={{ marginTop: "4%" }}
                onClick={fetchCreateProject}
              >
                Add Project
              </Button>
            </Tooltip>
          </Box>
        </Paper>
      </Modal>
    );
}

export default AddProjectModal;