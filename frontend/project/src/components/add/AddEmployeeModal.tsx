import { useEffect, useState } from "react";
import { Box, Button, Typography, Paper, Modal } from "@mui/material";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose }) => {
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
            justifyContent={"space-between"}
            alignItems={"center"}
          >
          </Box>
        </Paper>
      </Modal>
    );
};

export default AddEmployeeModal;
