const Post = require("../models/Post");

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { title: "", url: "", content: "", author: "" };

    // Validation errors
    if (err.message.includes('post validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

module.exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).json({ message: "Error al obtener los posts" });
    }
}

module.exports.getPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        console.error("Error al obtener el post:", error);
        res.status(500).json({ message: "Error al obtener el post" });
    }
}

module.exports.createPost = async (req, res) => {
    const { title, url, content, authorId, categoryId } = req.body;
    try {
        const newPost = new Post({ title, url, content, authorId, categoryId });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        const errors = handleErrors(error);
        res.status(500).json({ errors });
    }
}

module.exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, url, content, author } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, { title, url, content, author }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(updatedPost);
    } catch (error) {
        const errors = handleErrors(error);
        res.status(500).json({ errors });
    }
}

module.exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Error deleting post", error });
    }
}
