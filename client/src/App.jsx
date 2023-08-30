import useStyles from "./styles";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import VibeVerse from "./assets/VibeVerse.png";
import Posts from "./components/posts/Posts";
import Form from "./components/Form/Form";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "./api/index";
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <Container maxWidth="lg">
      <AppBar
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 15,
          margin: "30px 0",
        }}
        position="static"
        color="inherit"
      >
        <Typography
          className={classes.heading}
          variant="h2"
          align="center"
          fontSize={{ xs: "1.75rem", sm: "3.75rem" }}
        >
          VibeVerse
        </Typography>
        <img
          className={classes.image}
          src={VibeVerse}
          alt="VibeVerse"
          height={60}
          width={60}
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            flexDirection={{ xs: "column-reverse", sm: "row" }}
            justifyContent={"space-between"}
            alignItems={"stretch"}
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
