import { Box, Button, Typography, Paper, Modal, Tooltip, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const NewHeader = () => {
    return (
      <>
        <Box
          display={"flex"}
          flexDirection={"column"}
          sx={{ width: "300px", height: "100%" }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            sx={{ width: "100%", height: "10%", backgroundColor: "blue" }}
          >
            <img src="./src/assets/react.svg" alt="logo" className="logo" />
            <Typography
              sx={{
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              Agenda
            </Typography>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{ width: "100%", height: "80%", backgroundColor: "grey" }}
          ></Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{ width: "100%", height: "10%", backgroundColor: "blue" }}
          >
            <img src="./src/assets/react.svg" alt="logo" className="nav_img" />
            <Typography
              sx={{
                fontSize: 22,
              }}
            >
              Logout
            </Typography>
          </Box>
        </Box>
      </>
    );
}

export default NewHeader;