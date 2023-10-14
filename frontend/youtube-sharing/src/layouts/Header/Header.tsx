import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

const Logo = styled(HomeIcon)`
  margin-right: 10px;
`;
const InputField = styled(TextField)`
  margin-left: 10px !important;
`;

const BaseButton = styled(Button)`
  margin-left: 10px !important;
  text-transform: none !important;
  border: 1px solid black !important;
`;

const Header = () => {
  const auth = useAuth();
  const windowSize = useWindowSize();
  const navigate = useNavigate();
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
          <Logo
            fontSize="large"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Funny Movies
          </Typography>
          {!auth.loading && !auth.user ? (
            <>
              <InputField
                id="email"
                name="email"
                label="Email"
                color="info"
                margin="dense"
              />
              <InputField
                type="password"
                id="password"
                name="password"
                label={windowSize.width > 768 ? "Password" : "Pass"}
                margin="dense"
              />
              <BaseButton color="inherit" onClick={login}>
                Login
              </BaseButton>
            </>
          ) : (
            <>
              {windowSize.width > 768 && <div>Hello {auth.user?.email}</div>}
              <BaseButton color="inherit" onClick={() => navigate("/share")}>
                Share movie
              </BaseButton>
              <BaseButton color="inherit" onClick={logout}>
                Logout
              </BaseButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
