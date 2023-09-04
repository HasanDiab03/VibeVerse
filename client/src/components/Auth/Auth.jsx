import {
  Avatar,
  Button,
  Paper,
  Grid,
  Container,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import useStyles from "./styles";
import Input from "./Input";
import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { authUser } from "../../slices/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Auth = () => {
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFromData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      navigate("/posts");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && formData.confirmPassword !== formData.password) {
      toast.error("Password and Confirm Password Must Match", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (isSignUp) {
      dispatch(signUp({ formData, navigate }));
    } else {
      dispatch(signIn({ formData, navigate }));
    }
    // console.log(formData);
  };

  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShow(!show);

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setShow(false);
  };

  const googleSuccess = async (res) => {
    const token = res.credential;
    const profile = await decodeJWT(res.credential);
    // console.log(profile.email, token);
    try {
      dispatch(authUser({ profile, token }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful");
  };

  const decodeJWT = async (token) => {
    return jwtDecode(token);
  };

  return (
    <>
      <Container component={"main"} maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label={"Email Address"}
                handleChange={handleChange}
                type={"email"}
              />
              <Input
                name="password"
                label={"password"}
                handleChange={handleChange}
                type={show ? `text` : `password`}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label={"Repeat Password"}
                  handleChange={handleChange}
                  type={"password"}
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: "24px 0 16px" }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
};

export default Auth;
