import {
  AppBar,
  Box,
  Button,
  Popover,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NotificationIcon from "@mui/icons-material/NotificationsActive";
import ShareIcon from "@mui/icons-material/Reply";

import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";
import consumer from "../../lib/noticeConsumer";

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

type Notification = {
  id: number;
  description: string;
  url: string;
  title: string;
  shareBy: string;
};

const Header = () => {
  const auth = useAuth();
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const [receivedNotification, setReceivedNotification] =
    useState<Notification>();
  const [sub, setSub] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const open = Boolean(anchorEl);

  useEffect(() => {
    const authenticated = async () => {
      const user = await auth.authenticated();
      consumer.subscriptions.create(
        {
          channel: "NotificationChannel",
        },
        {
          connected: () => {
            console.log("connected");
          },
          disconnected: () => console.log("disconnected"),
          received: (data: any) => {
            console.log(
              data.shareBy !== user?.email,
              data.shareBy,
              user?.email,
              auth.user?.email
            );
            if (data.shareBy !== user?.email) {
              setReceivedNotification(data);
              setAnchorEl(document.getElementById("notification"));
              const timer = setTimeout(() => {
                setAnchorEl(null);
              }, 2000);
            }
          },
        }
      );
    };
    authenticated();
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
              <BaseButton id="notification" color="inherit" onClick={login}>
                Login
              </BaseButton>
            </>
          ) : (
            <>
              {windowSize.width > 768 && <div>Hello {auth.user?.email}</div>}
              <NotificationIcon
                id="notification"
                sx={{ marginLeft: 1, marginRight: 1 }}
              />
              <BaseButton color="inherit" onClick={() => navigate("/share")}>
                Share
              </BaseButton>
              <BaseButton color="inherit" onClick={logout}>
                Logout
              </BaseButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Popover
        open={open}
        anchorEl={anchorEl}
        // onClose={handleClose}
        closeAfterTransition
        color="secondary"
        anchorOrigin={{
          vertical: 50,
          horizontal: "right",
        }}
      >
        <Typography sx={{ p: 2, color: "white", background: "green" }}>
          <ShareIcon
            fontSize="medium"
            sx={{ color: "white", marginBottom: 1, marginRight: 1 }}
          />
          User {receivedNotification?.shareBy} just shared video:{" "}
          {receivedNotification?.title}
        </Typography>
      </Popover>
    </Box>
  );
};

export default Header;
