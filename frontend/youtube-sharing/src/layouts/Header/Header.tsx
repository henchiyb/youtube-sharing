import {
  AppBar,
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const InputField = styled(TextField)`
  margin: 10px 10px 10px 10px !important;
`;

const Header = () => {
  const auth = useAuth();
  useEffect(() => {
    auth.authenticated();
  }, []);
  const login = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    auth.login(email.value, password.value);
  };

  const logout = () => {
    auth.logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "white", color: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: "black" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Funny Movies
          </Typography>
          {!auth.loading && !auth.user ? (
            <>
              <InputField
                id="email"
                label="Email"
                color="info"
                margin="dense"
              />
              <InputField
                type="password"
                id="password"
                label="Password"
                margin="dense"
              />
              <Button color="inherit" onClick={login}>
                Login
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
