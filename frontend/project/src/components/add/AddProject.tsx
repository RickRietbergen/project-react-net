import { useState } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import AddProjectModal from "./AddProjectModal";

const AddProject = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ width: "100%", height: "20vh" }}
    >
      <Tooltip title="Add Project">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          Add Project
        </Button>
      </Tooltip>

      <AddProjectModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </Box>
  );
};

export default AddProject;
