import { useEffect, useState } from "react";
import { Box, Button, Typography, Paper, Modal, Tooltip } from "@mui/material";
import { API_URL } from "../../links/constants";
import "../../../App.css";
import Header from "../../shared/Header";
import Page from "../../shared/Page";
import AddProject from "../../add/AddProject";
import EditProjectModal from "../../edit/EditProjectModal";

export interface ISelectedProject {
  id: number;
  name: string;
}

const Project = () => {
    const [projectData, setProjectData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ISelectedProject | null>(null);

    const fetchProject = () => {
      fetch(`${API_URL}Projecten`, { method: "GET" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setProjectData(data);
        })
        .catch((error) => {
          console.log("Error fetching employee data:", error);
        });
    };

    const deleteProject = (id: number) => {
      fetch(`${API_URL}Projecten/DeleteProject/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        console.log("Error deleting project:", error);
      });
    };

    useEffect(() => {
      fetchProject();
    }, []);

    return (
      <>
        <Page title="Projects" />

        <Header />

        <AddProject />

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          sx={{ width: "100%", height: "70vh" }}
        >
          {projectData &&
          Array.isArray(projectData) &&
          projectData.length > 0 ? (
            <Box className="table-container">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {projectData.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>
                        <Tooltip title="Edit Project">
                          <Button
                            onClick={() => {
                              setModalOpen(true);
                              setSelectedProject(item);
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
                        <Tooltip title="Delete Project">
                          <Button onClick={() => deleteProject(item.id)}>
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

                  <EditProjectModal
                    isOpen={modalOpen}
                    onClose={() => {
                      setModalOpen(false);
                    }}
                    project={selectedProject}
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
}

export default Project;