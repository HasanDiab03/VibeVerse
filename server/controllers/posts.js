import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    return res.status(200).json(postMessages);
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
