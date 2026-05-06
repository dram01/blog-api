const Post = require("../models/Post");

exports.createPost = async (req, res) => {
    try {
        const post = new Post({
            ...req.body,
            user: req.user.id
        });


        await post.save();
        res.json(post);

    }   catch (err) {
        res.status(500).json({error: err.message});
    }    
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: "Post not found" });

        res.json(post);
    }   catch (err)  {
        res.status(500).json ({ message: err.message});
    }  
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
          

        if (!post) {
            return res.status(404).json ({ message: "Post not found"});
        } 

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized"});
        }

        Object.assign(post, req.body);
        await post.save();

        res.json(post);


    }   catch (err) {
        res.status(500).json ({ error: err.message});
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) return res.status(404).json ({message: "Post not found"});

        res.json({message: "Post deleted successfully" });
    }   catch (err) {
        res.status(500).json ({error: err.message});
    }
};