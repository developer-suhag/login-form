import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import PersonIcon from "@mui/icons-material/Person";
import TwitterIcon from "@mui/icons-material/Twitter";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import initializeAuthentication from "../../Firebase/firebase.init";
import authentication from "../../images/authentication.svg";
import LoggedUser from "../LoggedUser/LoggedUser";
import "./Login.css";

// initialize authenticatio
initializeAuthentication();
const Login = () => {
  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verification, setVerification] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState({});

  // get auth and providers
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // third party sign in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setError("");
        setSuccess("✔️ Login Successful!");
        // const { displayName, email, photoURL } = result.user;
        // const existingUser = {
        //   name: displayName,
        //   email: email,
        //   img: photoURL,
        // };
        // setUser(existingUser);
        // setSuccess("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        setError("");
        // setSuccess("✔️ Login Successful!");
        // const { displayName, email, photoURL } = result.user;
        // const existingUser = {
        //   name: displayName,
        //   email: email,
        //   img: photoURL,
        // };
        // setUser(existingUser);
        // setSuccess("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleTwitterSignIN = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        setError("");
        setSuccess("✔️ Login Successful!");
        // const { displayName, email, photoURL } = result.user;
        // const existingUser = {
        //   name: displayName,
        //   email: email,
        //   img: photoURL,
        // };
        // setUser(existingUser);
        // setSuccess("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        setError("");
        setSuccess("✔️ Login Successful!");
        // const { displayName, email, photoURL } = result.user;
        // const existingUser = {
        //   name: displayName,
        //   email: email,
        //   img: photoURL,
        // };
        // setUser(existingUser);
        // setSuccess("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // event handelars
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const toggleLogin = (e) => {
    setIsLogin(e.target.checked);
    setError("");
    setSuccess("");
    setVerification("");
  };
  // handle register
  const handleRegister = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password should have at least 8 characters.");
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Password should have 2 uppercase.");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setError("Password should have 1 special character.");
      return;
    }
    if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError("Password should have 2 numbers.");
      return;
    }
    if (!/(?=.*[a-z].*[a-z].*[a-z])/.test(password)) {
      setError("Password should have 3 lowercase.");
      return;
    }
    isLogin ? loggedUser(email, password) : registerNewUser(email, password);
  };
  // register new user
  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const emailVerified = result.user.emailVerified;
        updateName();

        setSuccess("✔️ Registration Successful!");
        handleVerification();
        setError("");
        setVerified(emailVerified);
      })
      .catch((error) => {
        setError(error.message);
        setSuccess("");
      });
  };
  // login user
  const loggedUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // const { displayName, email, photoURL } = result.user;
        // const existingUser = {
        //   name: displayName,
        //   email: email,
        //   img: photoURL,
        // };
        // setUser(existingUser);
        setSuccess("");
        setVerification("");
        setError("");
        setSuccess("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  // handle sign out
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser({});
    });
  };
  // update user name
  const updateName = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then(() => {})
      .catch((error) => {
        setError(error.message);
      });
  };
  // email verification
  const handleVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setVerification(
          "Email verification sent. Check your email to confirm. Without verification, you can't log in."
        );
        setError("");
        setSuccess("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  // password reset
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess("Password reset link sent, check your email.");
        setError("");
        setVerification("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  // show logged user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        const existingUser = {
          name: displayName,
          email: email,
          img: photoURL,
        };
        setUser(existingUser);
        setSuccess("");
      } else {
      }
    });
  }, [auth]);

  return (
    <Container
      sx={{
        my: 4,
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 1,
        overflow: "hidden",
        py: 2,
      }}
    >
      {user.name ? (
        <Box sx={{ textAlign: "right" }}>
          <Button
            className="regiter-btn"
            sx={{ bgcolor: "#048195" }}
            onClick={handleSignOut}
            variant="contained"
          >
            Log Out
          </Button>
        </Box>
      ) : (
        <Grid
          sx={{ alignItems: "center" }}
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 2, sm: 4, md: 12 }}
        >
          {
            <Grid className="img-box" item xs={2} sm={4} md={6}>
              <img className="form-img" src={authentication} alt="" />
            </Grid>
          }
          {
            <Grid sx={{}} item xs={2} sm={4} md={6}>
              <Box sx={{ p: 4 }}>
                <Typography variant="p" color="#2D3748">
                  {isLogin && "Welcome back"}
                </Typography>
                <Typography
                  sx={{ fontWeight: 700 }}
                  variant="h4"
                  color="#1A202C"
                >
                  {isLogin ? "Login to your account" : "Register a new Account"}
                </Typography>
                <form onSubmit={handleRegister}>
                  {!isLogin && (
                    <Box
                      sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}
                    >
                      <PersonIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      <TextField
                        onBlur={handleName}
                        type="text"
                        required
                        id="input-with-sx"
                        label="Name"
                        variant="standard"
                        color="info"
                      />
                    </Box>
                  )}
                  <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}>
                    <AlternateEmailIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      onBlur={handleEmail}
                      type="email"
                      required
                      id="input-with-sx"
                      label="Email"
                      variant="standard"
                      color="info"
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}>
                    <VpnKeyIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      onBlur={handlePassword}
                      type="password"
                      required
                      id="input-with-sx"
                      label="Password"
                      variant="standard"
                      color="info"
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
                        onChange={toggleLogin}
                        value="already registerd"
                        control={<Checkbox />}
                        label="Alreday Registerd?"
                        labelPlacement="end"
                      />
                    </Box>
                    <Box>
                      <Button
                        onClick={handlePasswordReset}
                        sx={{ color: "#2D3748" }}
                        variant="text"
                      >
                        Forget Password?
                      </Button>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="p" sx={{ color: "error.main" }}>
                      {error}
                    </Typography>
                    <Typography variant="p" sx={{ color: "success.main" }}>
                      {success}
                    </Typography>
                    <Typography sx={{ my: 2 }}>{verification}</Typography>
                  </Box>
                  <Box sx={{ my: 3 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ bgcolor: "#048195" }}
                      className="regiter-btn"
                    >
                      {isLogin ? "Login" : "Register"}
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
                      <Button onClick={handleGoogleSignIn}>
                        <GoogleIcon />
                      </Button>
                      <Button onClick={handleFacebookSignIn}>
                        <FacebookIcon />
                      </Button>
                      <Button onClick={handleTwitterSignIN}>
                        <TwitterIcon />
                      </Button>
                      <Button onClick={handleGithubSignIn}>
                        <GitHubIcon />
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Box>
            </Grid>
          }
        </Grid>
      )}
      {user.name && <LoggedUser user={user}></LoggedUser>}
    </Container>
  );
};

export default Login;
