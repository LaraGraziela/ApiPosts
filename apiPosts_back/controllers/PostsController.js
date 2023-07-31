const database = require("../models");

class PostsController {
  static async find(req, res) {
    try {
      const posts = await database.Posts.findAll({
        order: [["title", "ASC"]],
      });

      if (!posts) {
        return res.status(404).json({ error: "Posts not found" });
      }

      res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Missing ID param" });
      }

      const post = await database.Posts.findOne({
        where: {
          id: Number(id),
        },
      });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.status(200).json(post);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findCommentsByPostId(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Missing ID param" });
      }

      const comments = await database.Comments.findAll({
        where: {
          idPost: Number(id),
        },
      });

      if (comments === []) {
        return res.status(404).json({ error: "Comments not found" });
      }

      res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async create(req, res) {
    try {
      const { title, body } = req.body;

      const postExists = await database.Posts.findOne({
        where: {
          title: title,
        },
      });

      if (!title || !body) {
        return res.status(400).json({ error: "Missing parameters" });
      }

      if (postExists) {
        return res
          .status(400)
          .json({ error: "Post with this title already exists" });
      }

      const post = await database.Posts.create({
        title,
        body,
      });

      res.status(201).json({
        message: "Post created successfully",
        post: post.id,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { title, body } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Missing ID param" });
      }

      await database.Posts.update(
        {
          title,
          body,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      res.status(200).json({
        message: "Post updated successfully",
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Missing ID param" });
      }

      const post = await database.Posts.destroy({
        where: {
          id: Number(id),
        },
      });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.status(200).json({
        message: "Post deleted successfully",
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PostsController;
