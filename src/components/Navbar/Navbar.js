import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PersonPinIcon from "@mui/icons-material/PersonPin";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PersonPinIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Contact Book
          </Typography>
          <PersonPinIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
