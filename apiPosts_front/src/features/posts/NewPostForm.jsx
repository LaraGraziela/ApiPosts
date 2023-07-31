import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const NewPostForm = ({ newPostForm, setNewPostForm, posts, getPosts }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [titleError, setTitleError] = useState(false);

  const createPost = async () => {
    await fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
      }),
    });

    setNewPostForm(false);
  };

  const onSubmit = async () => {
    await createPost();
    await getPosts();
  };

  const handleChangePostTitle = (e) => {
    const verifyTitle = posts.some((post) => post.title === e.target.value);

    if (verifyTitle) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    setPostTitle(e.target.value);
  };

  const handleChangePostBody = (e) => {
    setPostBody(e.target.value);
  };

  return (
    <Modal
      open={newPostForm}
      onClose={() => setNewPostForm(false)}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...modalStyle, width: 700 }}>
        <div style={styles.boxForm}>
          <Typography variant="h4" component="h4" gutterBottom>
            Nova postagem
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="post-title"
              style={styles.textField}
              label="Título"
              variant="outlined"
              onChange={handleChangePostTitle}
              value={postTitle}
              error={titleError ? true : false}
              helperText={titleError ? "Título já existente" : ""}
              required
            />
            <TextField
              id="post-body"
              style={styles.textField}
              label="Conteúdo"
              variant="outlined"
              multiline
              rows={4}
              onChange={handleChangePostBody}
              value={postBody}
              required
            />

            <Button
              variant="contained"
              style={styles.button}
              onClick={() => onSubmit()}
              disabled={postTitle === "" || postBody === ""}
            >
              Criar
            </Button>
            <Button
              variant="contained"
              style={styles.button}
              onClick={() => setNewPostForm(false)}
            >
              Cancelar
            </Button>
          </Box>
        </div>
      </Box>
    </Modal>
  );
};

const styles = {
  newPostForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "30px",
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "100%",
  },
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

export default NewPostForm;
