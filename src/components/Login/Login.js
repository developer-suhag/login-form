import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import initializeAuthentication from "../../Firebase/firebase.init";
import "./Login.css";
import mountain from "../../images/mountain.svg";
import { Box } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

initializeAuthentication();
const Login = () => {
  return (
    <Container
      sx={{
        my: 8,
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 1,
        overflow: "hidden",
      }}
    >
      <Grid
        sx
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {
          <Grid className="img-box" item xs={2} sm={4} md={6}>
            <img className="mountain-img" src={mountain} alt="" />
          </Grid>
        }
        {
          <Grid sx={{ mt: 16 }} item xs={2} sm={4} md={6}>
            <Typography variant="p" color="#2D3748">
              Welcome back
            </Typography>
            <Typography sx={{ fontWeight: 700 }} variant="h4" color="#1A202C">
              Login to your account
            </Typography>
            <form>
              <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}>
                <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  type="text"
                  required
                  id="input-with-sx"
                  label="Name"
                  variant="standard"
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}>
                <AlternateEmailIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  type="email"
                  required
                  id="input-with-sx"
                  label="Email"
                  variant="standard"
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}>
                <VpnKeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  type="password"
                  required
                  id="input-with-sx"
                  label="Password"
                  variant="standard"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Box>
                  <FormControlLabel
                    value="already registerd"
                    control={<Checkbox />}
                    label="Alreday Registerd?"
                    labelPlacement="end"
                  />
                </Box>
                <Box>
                  <Button sx={{ color: "#2D3748" }} variant="text">
                    Forget Password?
                  </Button>
                </Box>
              </Box>
              <Box sx={{ my: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: "#04C35C" }}
                >
                  Register
                </Button>
              </Box>
              <Box sx={{ my: 4 }}>
                <Box>
                  <Typography
                    sx={{
                      display: "block",
                      textAlign: "center",
                      paddingBottom: 1,
                      borderBottom: "1px solid #ddd",
                    }}
                    variant="span"
                  >
                    or use one of these options
                  </Typography>
                </Box>
                <Box
                  className="social-login"
                  sx={{
                    my: 3,
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gridGap: 8,
                  }}
                >
                  <Button>
                    <GoogleIcon />
                  </Button>
                  <Button>
                    <FacebookIcon />
                  </Button>
                  <Button>
                    <TwitterIcon />
                  </Button>
                  <Button>
                    <GitHubIcon />
                  </Button>
                </Box>
              </Box>
            </form>
          </Grid>
        }
      </Grid>
    </Container>
  );
};

export default Login;
