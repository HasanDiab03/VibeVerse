/* eslint-disable react/prop-types */
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { Delete, MoreHoriz } from "@mui/icons-material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../../api";
import Likes from "./Likes";
const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.profile?.googleId === post?.creator ||
        user?.profile?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHoriz fontSize="default" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color={"textSecondary"}>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body2"
          color={"textSecondary"}
          component={"p"}
          gutterBottom
        >
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
          disabled={!user?.profile}
        >
          <Likes post={post} user={user} />
        </Button>
        {(user?.profile?.googleId === post?.creator ||
          user?.profile?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <Delete fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
