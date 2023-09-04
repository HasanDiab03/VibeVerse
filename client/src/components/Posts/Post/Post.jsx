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
import {
  Delete,
  MoreHoriz,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const openPost = () => navigate(`/posts/${post._id}`);

  const userId =
    user?.profile?.sub.toString() || user?.profile?._id?.toString();
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
        onClick={openPost}
        style={{ cursor: "pointer" }}
      />

      <div
        className={classes.overlay}
        onClick={openPost}
        style={{ cursor: "pointer" }}
      >
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
      <div
        className={classes.details}
        onClick={openPost}
        style={{ cursor: "pointer" }}
      >
        <Typography variant="body2" color={"textSecondary"}>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        style={{ cursor: "pointer" }}
        variant="h5"
        gutterBottom
        onClick={openPost}
      >
        {post.title}
      </Typography>
      <CardContent onClick={openPost} style={{ cursor: "pointer" }}>
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
          onClick={handleLike}
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
