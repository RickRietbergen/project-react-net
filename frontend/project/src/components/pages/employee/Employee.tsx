import { useEffect, useState } from "react";
import { Box, Button, Typography, Tooltip } from "@mui/material";
import { API_URL } from "../../links/constants";
import "../../../App.css";
import Header from "../../shared/Header";
import AddEmployee from "../../add/AddEmployee";
import Page from "../../shared/Page";
import EditEmployeeModal from "../../edit/EditEmployeeModal";

export interface ISelectedEmployee {
  id: number;
  name: string;
  contractHours: number;
}

const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<ISelectedEmployee | null>(null);

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
    })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/employees";
      } else {
        console.log("Error deleting employee:", response.statusText);
      }
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
                      <Tooltip title="Edit Employee">
                        <Button
                          onClick={() => {
                            setModalOpen(true);
                            setSelectedEmployee(item);
                          }}
                        >
                          <img
                            src="../src/assets/edit.png"
                            alt="edit-icon"
                            className="img"
                          />
                        </Button>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip title="Delete Employee">
                        <Button onClick={() => deleteEmployee(item.id)}>
                          <img
                            src="../src/assets/delete.png"
                            alt="delete-icon"
                            className="img"
                          />
                        </Button>
                      </Tooltip>
                    </td>
                  </tr>
                ))}

                <EditEmployeeModal
                  isOpen={modalOpen}
                  onClose={() => {
                    setModalOpen(false);
                  }}
                  employee={selectedEmployee}
                />
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
