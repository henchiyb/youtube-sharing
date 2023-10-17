import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { useLocation, useNavigate } from "react-router-dom";
import consumer from "../../lib/noticeConsumer";
import { closeSnackbar, useSnackbar } from "notistack";
const Logo = styled(HomeIcon)`
  margin-right: 10px;
`;
const InputField = styled(TextField)`
  margin-left: 10px !important;
  @media (max-width: 768px) {
    margin-left: 0 !important;
  }
`;

const BaseButton = styled(Button)`
  margin-left: 10px !important;
  text-transform: none !important;
  border: 1px solid black !important;
  @media (max-width: 768px) {
    margin-left: 0 !important;
  }
`;

const Menu = styled.div`
  margin-top: 10px;
  background: white;
  padding: 10px;
  width: 100%;
  height: 100%;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
  const [showMenu, setShowMenu] = useState(false);

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
            if (data.shareBy !== user?.email) {
              const notiKey = enqueueSnackbar(
                "User " +
                  data.shareBy +
                  " just shared " +
                  data.title +
                  " video. Click here to view!",
                {
                  variant: "info",
                  SnackbarProps: {
                    onClick: () => {
                      navigate("/videos/" + data.id);
                      closeSnackbar(notiKey);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const login = (event: any) => {
    event.stopPropagation();
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    auth.login(email.value, password.value);
    setShowMenu(false);
  };

  const signup = (event: any) => {
    event.stopPropagation();
    navigate("/signup");
    setShowMenu(false);
  };

  const logout = (event: any) => {
    event.stopPropagation();
    auth.logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "white", color: "black" }}>
        <Toolbar>
          <Logo
            fontSize="large"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowMenu(false);
              navigate("/");
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowMenu(false);
              navigate("/");
            }}
          >
            Funny Videos
          </Typography>
          {windowSize.width < 768 ? (
            <BaseButton color="inherit" onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? <CloseIcon /> : <MenuIcon />}
            </BaseButton>
          ) : !auth.loading && !auth.user ? (
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
              {location.pathname !== "/share" && (
                <BaseButton color="inherit" onClick={() => navigate("/share")}>
                  Share
                </BaseButton>
              )}
              <BaseButton color="inherit" onClick={logout}>
                Logout
              </BaseButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      {showMenu && windowSize.width < 768 && (
        <Menu>
          <MenuContainer>
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
                    label="Password"
                    margin="dense"
                  />
                  <BaseButton color="inherit" onClick={login}>
                    Login
                  </BaseButton>
                  <BaseButton
                    color="inherit"
                    onClick={signup}
                    sx={{ marginTop: 1 }}
                  >
                    Signup
                  </BaseButton>
                </>
              )
            ) : (
              <>
                <div>Hello {auth.user?.email}</div>
                <BaseButton
                  color="inherit"
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/share");
                  }}
                >
                  Share
                </BaseButton>
                <BaseButton
                  color="inherit"
                  onClick={logout}
                  sx={{ marginTop: 1 }}
                >
                  Logout
                </BaseButton>
              </>
            )}
          </MenuContainer>
        </Menu>
      )}
    </Box>
  );
};

export default Header;
