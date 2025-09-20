/**
 * Express router for handling comment-related API endpoints.
 * 
 * @module routes/api/comments
 */



const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

/**
   * GET /
   * Retrieves all comments from the database.
   *
   * @name GET/
   * @function
   * @memberof module:routes/api/comments
   * @async
   * @param {express.Request} req - Express request object
   * @param {express.Response} res - Express response object
   * @returns {Object[]} 200 - Array of comment objects
   * @returns {Object} 500 - Error message if fetching fails
   */
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

 /**
    * DELETE /:id
    * Deletes a comment by its ID.
    *
    * @name DELETE/:id
    * @function
    * @memberof module:routes/api/comments
    * @async
    * @param {express.Request} req - Express request object
    * @param {express.Response} res - Express response object
    * @param {express.NextFunction} next - Express next middleware function
    * @returns {Object} 200 - Success message if deleted
    * @returns {Object} 404 - Error message if comment not found
    */
router.delete("/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
});