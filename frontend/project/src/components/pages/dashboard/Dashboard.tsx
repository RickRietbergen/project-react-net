import { Box, Button, Typography, Paper, Modal, Tooltip, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import NewHeader from "../../shared/NewHeader";
import Page from "../../shared/Page";

const Dashboard = () => {
    return (
        <>
            <Page title="Dashboard" />

            <Box
                display={"flex"}
                sx={{ width: "100%", height: "100vh" }}
            >
                <NewHeader />

            </Box>
        </>
    )
}

export default Dashboard;