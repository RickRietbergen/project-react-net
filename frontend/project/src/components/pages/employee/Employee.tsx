import { useEffect, useState } from "react";
import { API_URL } from "../../links/constants";
import "../../../App.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Header from "../../shared/header";
import AddEmployee from "../../add/AddEmployee";
import Page from "../../shared/Page";

const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);

  const fetchEmployee = () => {
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
        console.log("Error fetching employee data:", error);
      });
  };

  const deleteEmployee = (id: number) => {
    fetch(`${API_URL}Employee/DeleteEmployee/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log("Error deleting employee:", error);
    });
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <>
      <Page title="Employees" />
      
      <Header />

      <AddEmployee />

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        sx={{ width: "100%", height: "70vh" }}
      >
        {employeeData &&
        Array.isArray(employeeData) &&
        employeeData.length > 0 ? (
          <Box className="table-container">
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
                {employeeData.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.contractHours}</td>
                    <td>
                      <Button>
                        <img
                          src="../src/assets/edit.png"
                          alt="edit-icon"
                          className="img"
                        />
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => deleteEmployee(item.id)}>
                        <img
                          src="../src/assets/delete.png"
                          alt="delete-icon"
                          className="img"
                        />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        ) : (
          <Typography>Geen werknemersgegevens beschikbaar.</Typography>
        )}
      </Box>
    </>
  );
};

export default Employee;
