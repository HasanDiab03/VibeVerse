import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = await PostMessage.findById(_id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  try {
    const { searchQuery, tags } = req.query;
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }], // to match any value from the tags array of the document to any value of the provided tags array in the query.
    });
    return res.status(200).json({ data: posts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting of first post of every page
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    return res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { postData, name } = req.body;
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    const newPost = await PostMessage.create({
      ...postData,
      name,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    return res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  const { postData, name } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Post with that id");
  }
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...postData, name },
      {
        new: true,
      }
    );
    return res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Post with that id");
  }
  try {
    await PostMessage.findByIdAndDelete(_id);
    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Post with that id");
  }
  try {
    const post = await PostMessage.findById(_id);
    const userId = req.userId.toString();

    const index = post.likes.findIndex((id) => id === userId);
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== userId);
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post with that id");
  }
  const { finalComment } = req.body;
  try {
    const post = await PostMessage.findById(id);
    post.comments.push(finalComment);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    return res.json(updatedPost);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
