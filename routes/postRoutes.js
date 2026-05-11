const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, postController.createPost);
router.get("/", postController.getPosts); 
router.get("/:id", postController.getPostById);
router.put("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);

module.exports = router;