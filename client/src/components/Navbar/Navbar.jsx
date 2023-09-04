import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import VibeVerse from "../../assets/vibeverse-Logo.png";
import useStyles from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/auth/authSlice";
import jwtDecode from "jwt-decode";
const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { authData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutNav = () => {
    dispatch(logout());
    navigate("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    //JWT
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < new Date().getTime()) logoutNav();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [authData]);
  return (
    <AppBar
      className={classes.appBar}
      position="static"
      color="inherit"
    >
      <Link
        to="/"
        className={classes.brandContainer}
      >
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
          fontSize={{ xs: "0rem", sm: "3rem" }}
        >
          VibeVerse
        </Typography>
        <img
          className={classes.image}
          src={VibeVerse}
          alt="VibeVerse"
          height={40}
          width={40}
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.profile.name}
              src={user.profile.picture}
            >
              {user.profile.name.charAt(0)}{" "}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.profile.name}
            </Typography>
            <Button variant="contained" color="secondary" onClick={logoutNav}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
