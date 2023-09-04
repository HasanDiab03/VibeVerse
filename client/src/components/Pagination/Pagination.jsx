/* eslint-disable react/prop-types */
import { Pagination, PaginationItem } from "@mui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../api";

const Paginate = ({ page }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) {
      dispatch(fetchPosts(page));
    }
  }, [page]);
  return (
    <Pagination
      classes={{ ul: styles.ul }}
      count={numberOfPages}
      page={Number(page)}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
