import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";

const CommentsModal = ({ openComments, setOpenComments, getPosts, idPost }) => {
  const [newComment, setNewComment] = useState("");
  const [postComments, setPostComments] = useState(false);

  const getComments = async () => {
    const response = await fetch(
      `http://localhost:4000/comments/post/${idPost}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const comments = await response.json();
    setPostComments(comments);
  };

  const createComment = async () => {
    await fetch("http://localhost:4000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idPost: idPost,
        body: newComment,
      }),
    });
  };

  const handleChangeComment = (e) => {
    setNewComment(e.target.value);
  };

  const onSubmit = async () => {
    await createComment();
    await getComments();
    setNewComment("");
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Modal
      open={openComments}
      onClose={() => setOpenComments(false)}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...modalStyle, width: 700 }}>
        <div style={styles.header}>
          <Typography variant="h6" component="h4" gutterBottom>
            Comentários
          </Typography>
          <IconButton onClick={() => setOpenComments(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <PerfectScrollbar
          style={{
            maxHeight: "300px",
            marginBottom: "10px",
            paddingRight: "20px",
          }}
        >
          {postComments.length > 0
            ? postComments.map((comment) => (
                <div>
                  <div style={styles.comment}>
                    <Typography>
                      {" "}
                      {comment.body
                        ? comment.body
                        : "Esse post não possui comentários."}
                    </Typography>
                  </div>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    align="right"
                  >
                    {dayjs(comment.createdAt).format("DD/MM/YYYY")}
                  </Typography>
                </div>
              ))
            : "Esse post não possui comentários."}
        </PerfectScrollbar>
        <TextField
          id="comment-body"
          style={styles.textFieldAndButton}
          label="Comentar"
          variant="outlined"
          multiline
          rows={4}
          onChange={handleChangeComment}
          value={newComment}
        />
        <Button
          onClick={() => onSubmit()}
          variant="contained"
          style={styles.textFieldAndButton}
        >
          Salvar
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  comment: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#e3f2fd",
    padding: "10px",
    marginTop: "10px",
  },
  textFieldAndButton: {
    width: "100%",
    marginTop: "10px",
  },
};
export default CommentsModal;
