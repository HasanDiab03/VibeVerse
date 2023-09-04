import { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { fetchPost, fetchPostsBySearch } from "../../api";
import CommentSection from "./CommentSection";
const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(fetchPostsBySearch({ tags: post?.tags.join(",") }));
    }
  }, [post]);
  // "Cast to ObjectId failed for value "search" (type string) at path "_id" for model "PostMessage""
  const openPost = (id) => navigate(`/posts/${id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size={"7em"} />
      </Paper>
    );
  }

  const recommendedPosts =
    posts.length > 0 ? posts?.filter((p) => p._id !== post?._id) : []; // to remove current post

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post?.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post?.tags?.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post?.message}
          </Typography>
          <Typography variant="h6">Created by: {post?.name}</Typography>
          <Typography variant="body1">
            {moment(post?.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post?.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post?.title}
          />
        </div>
      </div>
      {recommendedPosts?.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts?.map(
              ({ title, name, likes, selectedFile, _id }) => (
                <div
                  key={_id}
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width={"200px"} />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
