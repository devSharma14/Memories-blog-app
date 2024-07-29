import mongoose from "mongoose";
import express from 'express';
import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();
        console.log("post create ho gayi");

        res.status(201).json(newPostMessage );
    } catch (error) {
        console.log("post create nahi ho paayi");
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    // Find the post by ID
    const post = await PostMessage.findById(id);

    // Check if the post exists
    if (!post) return res.status(404).send(`No post with id: ${id}`);

    // Verify if the current user is the creator of the post
    if (post.creator !== req.userId) return res.status(403).send('You are not authorized to update this post');

    // Update the post
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
};


export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }

    const post = await PostMessage.findById(id);

    if (post.creator !== String(req.userId)) {
        return res.status(403).json({ message: "You do not have permission to delete this post." });
    }

    await PostMessage.findByIdAndDelete(id);

    // res.json({ message: "Post deleted successfully." });

    // console.log("post succesfully delete ho chuki hai");
}


export const likePost = async (req, res) => {
  const { id } = req.params;

  // Check if the user is authenticated
  if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });

  // Validate the post ID
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No post with id: ${id}` });
  
  try {
    // Find the post by ID
    const post = await PostMessage.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if the user has already liked the post
    const index = post.likes.findIndex((userId) => userId === String(req.userId));

    if (index === -1) {
      // User has not liked the post, so add the user's ID to the likes array
      post.likes.push(req.userId);
    } else {
      // User has already liked the post, so remove the user's ID from the likes array
      post.likes = post.likes.filter((userId) => userId !== String(req.userId));
    }

    // Save the updated post
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    // Return the updated post
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error liking the post:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getUserPosts = async(req, res) => {
    const {id} = req.params;
    try {
        const userPosts = await PostMessage.find({creator: id});
        res.status(200).json(userPosts);
    }
    catch(error) {
        res.status(404).json({message: error.message});
    }
};

export default router;