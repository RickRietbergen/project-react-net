import { useEffect, useState } from "react";
import { API_URL } from "../../links/constants";
import "../../../App.css"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "../../../assets/delete.png"

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
          setEmployeeData(data);
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
          justifyContent={"center"}
          flexDirection={"column"}
          sx={{ width: "100%", height: "100vh" }}
        >
          {employeeData &&
          Array.isArray(employeeData) &&
          employeeData.length > 0 ? (
            employeeData.map((item: any, index: number) => (
              <Box key={index} className="table-container">
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>ContractHours</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.contractHours}</td>
                      <td>Edit Button</td>
                      <td>
                        <Button>
                          {DeleteIcon}
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            ))
          ) : (
            <Typography>No employee data available.</Typography>
          )}
        </Box>
      </>
    );
};

export default Employee;
