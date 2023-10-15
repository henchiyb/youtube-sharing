import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NotificationIcon from "@mui/icons-material/NotificationsActive";

import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { useLocation, useNavigate } from "react-router-dom";
import consumer from "../../lib/noticeConsumer";
import { useSnackbar } from "notistack";
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
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
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
          received: (data: Notification) => {
            console.log(
              data.shareBy !== user?.email,
              auth.user?.email,
              user?.email
            );
            if (data.shareBy !== user?.email) {
              enqueueSnackbar(
                "User " +
                  data.shareBy +
                  " just shared " +
                  data.title +
                  " video. Click here to view!",
                {
                  variant: "info",
                  SnackbarProps: {
                    onClick: (e) => {
                      navigate("/videos/" + data.id);
                    },
                  },
                }
              );
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

  const signup = () => {
    navigate("/signup");
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
            location.pathname !== "/signup" && (
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
                <BaseButton color="inherit" onClick={signup}>
                  Signup
                </BaseButton>
              </>
            )
          ) : (
            <>
              {windowSize.width > 768 && <div>Hello {auth.user?.email}</div>}
              <NotificationIcon sx={{ marginLeft: 1, marginRight: 1 }} />
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
    </Box>
  );
};

export default Header;
