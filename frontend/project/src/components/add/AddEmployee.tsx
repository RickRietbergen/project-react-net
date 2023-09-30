import { useState } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import AddEmployeeModal from "./AddEmployeeModal";

const AddEmployee = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ width: "100%", height: "20vh" }}
    >
        <Tooltip title="Add Employee">
            <Button variant="outlined" color="primary" onClick={() => setModalOpen(true)}>
                Add Employee
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

export default AddEmployee;
