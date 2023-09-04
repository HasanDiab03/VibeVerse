import {
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@mui/material";
import Posts from "../posts/Posts";
import Form from "../Form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts, fetchPostsBySearch } from "../../api";
import Pagination from "../Pagination/Pagination";
import useStyles from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import { MuiChipsInput } from "mui-chips-input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPosts = () => {
    if (search.trim() || tags) {
      // dispatch to fetch searched posts
      dispatch(fetchPostsBySearch({ search, tags: tags.join(",").trim() }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchPosts();
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          flexDirection={{ xs: "column-reverse", sm: "row" }}
          justifyContent={"space-between"}
          alignItems={"stretch"}
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Posts"
                onKeyDown={handleKeyDown}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <MuiChipsInput
                style={{ margin: "10px 0" }}
                value={tags}
                onDeleteChip={handleDelete}
                onAddChip={handleAdd}
                label={"Search Tags"}
                variant="outlined"
              />
              <Button
                onClick={searchPosts}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
