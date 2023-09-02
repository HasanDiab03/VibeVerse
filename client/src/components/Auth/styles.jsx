/* eslint-disable react-refresh/only-export-components */
import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  paper: {
    marginTop: "64px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
  },
  root: {
    "& .MuiTextField-root": {
      margin: "8px",
    },
  },
  avatar: {
    margin: "8px",
    backgroundColor: "rgb(51, 0, 51)",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "24px",
  },
  googleButton: {
    marginBottom: "16px",
  },
}));
