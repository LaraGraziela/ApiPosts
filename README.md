# ApiPosts

This project is an API for creating, viewing, editing, deleting and commenting on posts.

Each post can contain a title and a body, as it will not be allowed to create posts with the same title as an existing post.

# Installation

Clone the repository locally and access each folder in a terminal:

```cd apiPosts_back ```

```cd apiPosts_front ```

- In the apiPosts_back repository, run the following commands:

  ```yarn install```
  
  ```npx sequelize db:migrate```
  
  ```yarn start```

- In the apiPosts_front repository, run the following commands:

  ```yarn install```
  
  ```yarn start```

# Endpoints

### Posts

List posts: GET ```/posts```

Search post by ID: GET ```/posts/:id```

Get comments by post ID: GET ```/posts/:id/comments```

Create post: POST ```/posts```

Update post by ID: PUT ```/posts/:id```

Delete post by ID: DELETE ```/posts/:id```

### Comments

List comments: GET ```/comments```

Get comment by ID: GET ```/comments/:id```

Fetch comments by post ID: GET ```/comments/post/:id```

Create new comment: POST ```/comments```

Update comment by ID: ```PUT/comments/:id```

Delete comment by ID: DELETE ```/comments/:id```
