/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../api";
const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const commentsRef = useRef();

  const handleClick = () => {
    const finalComment = `${user?.profile?.name}: ${comment}`;

    dispatch(commentPost({ finalComment, id: post._id }));
    setComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((comment, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{comment.split(': ')[0]}:</strong>
              {comment.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.profile?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={6}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
