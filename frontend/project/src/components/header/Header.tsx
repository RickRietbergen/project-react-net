import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header = () => {
    return (
        <>
            <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            sx={{ width: "100%", height: "10vh" }}
            >
                <Typography
                    variant="h5"
                    component="a"
                    href="/"
                    sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    color: "white",
                    textDecoration: "none",
                    }}
                >
                    Home
                </Typography>
                
                <Typography
                    variant="h5"
                    component="a"
                    href="/employees"
                    sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    color: "white",
                    textDecoration: "none",
                    }}
                >
                    Employees
                </Typography>

                <Typography
                    variant="h5"
                    component="a"
                    href="/projects"
                    sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    color: "white",
                    textDecoration: "none",
                    }}
                >
                    Projects
                </Typography>
            </Box>
        </>
    )
};

export default Header;
