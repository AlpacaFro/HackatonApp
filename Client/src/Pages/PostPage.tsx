import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Post, PostResponse } from "../types";
import axios from "axios";

// MUI Import
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<PostResponse>(
          `http://localhost:3000/api/posts/${id}`
        );
        const { post } = response.data;
        console.log(post);
        setPost(post);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleAddComment = async (postId: string, content: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/posts/addComment",
        {
          postId,
          comment: {
            content,
          },
        }
      );
      setContent("");

      if (post) {
        const updatedComments = [...post.comments, { content }];
        setPost({ ...post, comments: updatedComments });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) return <div>Loading...</div>;
  console.log(post);

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

      {post.comments && post.comments.length > 0 ? (
        post.comments.map((comment, index) => {
          return (
            <div key={index}>
              <Divider />
              <p className="text-gray-600 text-lg">
                אח מגיב :{comment.content}
              </p>
            </div>
          );
        })
      ) : (
        <p className="text-gray-400 text-lg">אין תגובות כרגע</p>
      )}

      <Box
        sx={{
          maxWidth: "100%",
          direction: "rtl",
          paddingBottom: "10px",
        }}
      >
        <TextField
          fullWidth
          label="הכנס תגובה"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Box>
      <div className="flex justify-between">
        <Button
          onClick={() => handleAddComment(post._id, content)}
          variant="contained"
          disableElevation
          disabled={content.trim() === ""}
        >
          הוסף תגובה
        </Button>
        <Link to={"/forum"}>
          <Button variant="outlined">חזרה לכל הפוסטים</Button>
        </Link>
      </div>
    </div>
  );
};

export default PostPage;
