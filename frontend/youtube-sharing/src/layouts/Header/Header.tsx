import {
  AppBar,
  Box,
  Button,
  IconButton,
  OutlinedInput,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";

const InputField = styled(TextField)`
  margin: 10px 10px;
`;

const Header = () => {
  const login = async () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    console.log(email.value, password.value);
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { email: email.value, password: password.value },
      }),
    });
    console.log(await response.json());
    console.log("login");
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
          <InputField id="email" label="Email" color="info" margin="dense" />
          <InputField id="password" label="Password" margin="dense" />
          <Button color="inherit" onClick={login}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
