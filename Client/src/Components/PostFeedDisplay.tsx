import { Link } from "react-router-dom";
import { Post } from "../types";
// MUI Import
import Button from "@mui/material/Button";

interface PostProps {
  post: Post;
}

const PostFeedDisplay: React.FC<PostProps> = ({ post }) => {
  return (
    <div
      className="p-6 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg mb-6"
      style={{ direction: "rtl" }}
    >
      <p className="text-gray-600 text-s">אח שלי משתף:</p>
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        {post.title}
      </h1>
      <p className="text-gray-600 text-lg">{post.content}</p>
      <p className="text-gray-400 text-lg">
        {post.comments
          ? ` לפוסט זה יש ${post.comments.length} תגובות `
          : ` אין לפוסט זה תגובות עדיין`}
      </p>
      <Link to={`/post/${post._id}`}>
        <Button variant="contained">הכנס לפוסט זה</Button>
      </Link>
    </div>
  );
};

export default PostFeedDisplay;
