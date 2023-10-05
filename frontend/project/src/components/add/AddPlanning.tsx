import { useState } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import AddEmployeeModal from "./AddPlanningModal";

const AddPlanning = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ width: "100%", height: "10%" }}
    >
        <Tooltip title="Add Planning">
            <Button variant="outlined" color="primary" onClick={() => setModalOpen(true)}>
                Add Planning
            </Button>
        </Tooltip>

      <AddEmployeeModal 
        isOpen={modalOpen}
        onClose={() => {
            setModalOpen(false);
        }}
      />
    </Box>
  );
};

export default AddPlanning;
