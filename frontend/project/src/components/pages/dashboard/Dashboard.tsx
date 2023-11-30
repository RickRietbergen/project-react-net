import { Box, Button, Typography, Paper, Modal, Tooltip, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Page from "../../shared/Page";
import Header from "../../shared/Header";

const Dashboard = () => {
    return (
        <>
            <Page title="Dashboard" />

            <Box
                display={"flex"}
                sx={{ width: "100%", height: "100vh" }}
            >
                <Header />

            </Box>
        </>
    )
}

export default Dashboard;