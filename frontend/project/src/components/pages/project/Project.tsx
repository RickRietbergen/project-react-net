import { useEffect, useState } from "react";
import { Box, Button, Typography, Paper, Modal, Tooltip } from "@mui/material";
import { API_URL } from "../../links/constants";
import "../../../App.css";
import Header from "../../shared/Header";
import Page from "../../shared/Page";
import AddProject from "../../add/AddProject";

const Project = () => {
    const [projectData, setProjectData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

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

    useEffect(() => {
      fetchProject();
    }, []);

    return (
      <>
        <Page title="Projects" />

        <Header />

        <AddProject />
      </>
    );
}

export default Project;