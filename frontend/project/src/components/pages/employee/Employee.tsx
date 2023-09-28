import { useEffect, useState } from "react";
import { API_URL } from "../../links/constants";
import "../../../App.css"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Employee = () => {
    const [employeeData, setEmployeeData] = useState([]);

    const fetchPlanning = () => {
      fetch(`${API_URL}Employee`, { method: "GET" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setEmployeeData(data.$values);
        })
        .catch((error) => {
          console.log("Error fetching planning data:", error);
        });
    };

    useEffect(() => {
      fetchPlanning();
    }, []);

    return (
      <>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          sx={{ width: "100%", height: "100vh" }}
        >
            
        </Box>
      </>
    );
};

export default Employee;
