import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const AddEmployee = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ width: "100%", height: "20vh" }}
    >
      <Button variant="outlined" color="primary">
        Add Employee
      </Button>
    </Box>
  );
};

export default AddEmployee;
