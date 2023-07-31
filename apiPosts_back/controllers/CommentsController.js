const database = require("../models");

class CommentsController {
  static async find(req, res) {
    try {
      const comments = await database.Comments.findAll({
        order: [["createdAt", "DESC"]],
      });

      if (!comments) {
        return res.status(404).json({ error: "Comments not found" });
      }

      res.status(200).json(comments);
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

      const comment = await database.Comments.findOne({
        where: {
          id: Number(id),
        },
      });

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      res.status(200).json(comment);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findByPostId(req, res) {
    try {
      const { postId } = req.params;

      if (!postId) {
        return res.status(400).json({ message: "Missing PostId param" });
      }

      const result = await database.Comments.findAll({
        order: [["createdAt", "DESC"]],
        where: {
          idPost: Number(postId),
        },
      });

      if (!result) {
        return res.status(404).json({ message: "Comments not found" });
      }

      res.status(200).json(result);
    } catch (error) {}
  }

  static async create(req, res) {
    try {
      const { idPost, body } = req.body;

      if (!idPost || !body) {
        return res.status(400).json({ error: "Missing parameters" });
      }

      const comment = await database.Comments.create({
        idPost,
        body,
      });

      res.status(201).json({
        message: "Comment created successfully",
        comment: comment,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { idPost, body } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Missing ID param" });
      }

      await database.Comments.update(
        {
          idPost,
          body,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      res.status(200).json({
        message: "Comment updated successfully",
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

      const comment = await database.Comments.destroy({
        where: {
          id: Number(id),
        },
      });

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      res.status(200).json({
        message: "Comment deleted successfully",
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = CommentsController;
