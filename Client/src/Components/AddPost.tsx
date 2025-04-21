import { useState } from "react";
import axios from "axios";
import { Post } from "../types";

// MUI Import
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddPost = ({ onPostAdded }: { onPostAdded: (newPost: Post) => void }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
  };

  const handleAddPost = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/posts", {
        title,
        content,
      });

      console.log("Post added successfully:", response.data);
      setSuccess(true);

      onPostAdded(response.data);

      setTitle("");
      setContent("");

      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-5">
      <Button variant="contained" onClick={handleOpen}>
        הוספת פוסט
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {success ? (
            <h1
              style={{ direction: "rtl", textAlign: "center" }}
              className="text-2xl font-semibold text-green-600"
            >
              הפוסט נוסף בהצלחה! 🚀
            </h1>
          ) : (
            <>
              <h1
                style={{ direction: "rtl" }}
                className="text-3xl font-semibold text-gray-800 mb-4"
              >
                הוספת פוסט
              </h1>
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                  direction: "rtl",
                  paddingBottom: "10px",
                }}
              >
                <TextField
                  fullWidth
                  label="כותרת"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                  direction: "rtl",
                  paddingBottom: "10px",
                }}
              >
                <TextField
                  fullWidth
                  label="תוכן"
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Box>
              <Button
                onClick={handleAddPost}
                variant="contained"
                disableElevation
                disabled={loading}
              >
                {loading ? "מוסיף..." : "!הוסף"}
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AddPost;
