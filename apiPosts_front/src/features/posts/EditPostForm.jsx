import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const EditPostForm = ({
  editPostForm,
  setEditPostForm,
  postToEdit,
  posts,
  getPosts,
}) => {
  const [postTitle, setPostTitle] = useState(postToEdit.title);
  const [postBody, setPostBody] = useState(postToEdit.body);
  const [titleError, setTitleError] = useState(false);

  const postId = postToEdit.id;

  const updatePost = async () => {
    await fetch(`http://localhost:4000/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
      }),
    });

    setEditPostForm(false);
  };

  const onSubmit = async () => {
    await updatePost();
    await getPosts();
  };

  const handleChangePostTitle = (e) => {
    const verifyTitle = posts.some((post) => post.title === e.target.value);

    if (verifyTitle && e.target.value !== postToEdit.title) {
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
      open={editPostForm}
      onClose={() => setEditPostForm(false)}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...modalStyle, width: 700 }}>
        <div style={styles.editPostForm}>
          <Typography variant="h4" component="h4" gutterBottom>
            Editar postagem
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
              error={titleError}
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
              disabled={postTitle === "" || postBody === ""}
              onClick={() => onSubmit()}
            >
              Salvar
            </Button>
            <Button
              variant="contained"
              style={styles.button}
              onClick={() => setEditPostForm(false)}
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
  editPostForm: {
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

export default EditPostForm;
