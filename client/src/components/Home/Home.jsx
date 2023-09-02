import { Container, Grid, Grow } from "@mui/material";
import Posts from "../posts/Posts";
import Form from "../Form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../api";
const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
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
  );
};

export default Home;
