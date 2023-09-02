/* eslint-disable react/prop-types */
import { ThumbUpAlt, ThumbUpAltOutlined } from "@mui/icons-material";
const Likes = ({ post, user }) => {
  if (post.likes.length > 0) {
    return post.likes.find(
      (like) =>
        like === (user?.profile?.sub?.toString() || user?.profile?._id?.toString())
    ) ? (
      <>
        <ThumbUpAlt fontSize="small" />
        &nbsp;
        {post.likes.length > 2
          ? `You and ${post.likes.length - 1} others`
          : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
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

export default Likes;
