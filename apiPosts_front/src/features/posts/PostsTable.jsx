import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import NewPostForm from "./NewPostForm";
import EditPostForm from "./EditPostForm";
import ConfirmationModal from "../shared/ConfirmationModal";
import CommentsModal from "../comments/CommentsModal";

const PostsTable = () => {
  const [posts, setPosts] = useState([]);
  const [newPostForm, setNewPostForm] = useState(false);
  const [editPostForm, setEditPostForm] = useState(false);
  const [postToEdit, setPostToEdit] = useState({});
  const [postToDelete, setPostToDelete] = useState({});
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [idPost, setPostId] = useState(0);

  const getPosts = async () => {
    const response = await fetch("http://localhost:4000/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const posts = await response.json();
    setPosts(posts);
  };

  const updatePost = (post) => {
    setEditPostForm(true);
    setPostToEdit(post);
  };

  const deletePost = async (idPost) => {
    await fetch(`http://localhost:4000/posts/${idPost}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await getPosts();
    setDeletePostModal(false);
  };

  const handleDeletePost = async (post) => {
    setPostToDelete(post.id);
    setDeletePostModal(!deletePostModal);
  };

  const handleOpenComments = (idPost) => {
    setOpenComments(!openComments);
    setPostId(idPost);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={"posts-dashboard"}>
      {newPostForm && (
        <NewPostForm
          newPostForm={newPostForm}
          setNewPostForm={setNewPostForm}
          posts={posts}
          getPosts={getPosts}
        />
      )}
      {editPostForm && (
        <EditPostForm
          editPostForm={editPostForm}
          setEditPostForm={setEditPostForm}
          postToEdit={postToEdit}
          posts={posts}
          getPosts={getPosts}
        />
      )}
      {deletePostModal && (
        <ConfirmationModal
          title="Deletar postagem"
          dialog="Tem certeza que deseja deletar essa postagem?"
          buttonText="Deletar"
          buttonTextColor="red"
          handleOpen={deletePostModal}
          handleClose={handleDeletePost}
          handleConfirm={() => deletePost(postToDelete)}
        />
      )}
      {openComments && (
        <CommentsModal
          openComments={openComments}
          idPost={idPost}
          getPosts={getPosts}
          setOpenComments={setOpenComments}
        />
      )}
      <div style={styles.postsBox}>
        <Typography variant="h4" component="h4" gutterBottom>
          Minhas postagens
          <Button
            variant="contained"
            style={{ marginLeft: "30px" }}
            onClick={() => setNewPostForm(!newPostForm)}
          >
            Criar nova postagem
          </Button>
        </Typography>
        <div style={styles.posts}>
          {posts.length > 0
            ? posts.map((post, index) => (
                <Card variant="outlined" style={styles.cards}>
                  <div style={styles.card}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {post.title}
                      </Typography>

                      <Typography variant="body2">{post.body}</Typography>
                    </CardContent>
                    <div style={styles.icons}>
                      <IconButton
                        onClick={() => updatePost(post)}
                        aria-label="edit"
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeletePost(post)}
                        aria-label="delete"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                  <CardContent>
                    <Button
                      onClick={() => handleOpenComments(post.id)}
                      size="small"
                    >
                      Visualizar comentários
                    </Button>
                  </CardContent>
                </Card>
              ))
            : "Nenhuma postagem encontrada, crie uma nova postagem!"}
        </div>
      </div>
    </div>
  );
};

const styles = {
  postsBox: {
    display: "flex",
    flexDirection: "column",
    padding: "50px",
  },
  posts: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  cards: {
    marginTop: "10px",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "baseline",
    padding: "10px",
  },
};

export default PostsTable;
