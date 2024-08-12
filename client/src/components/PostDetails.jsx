import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, Paper, CircularProgress, Divider } from '@mui/material';
import { getPost } from '../actions/posts';
import './postDetails.css';

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPost: post, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!post) {
    return <Typography variant="h6">Post not found</Typography>;
  }

  return (
    <Paper className="paper mt-20" elevation={6}>
      <div className="post-details-container">
        <div className="left-section">
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">
  Created by: {post.name ? post.name : 'Unknown'}
</Typography>

          <Typography variant="body1">{new Date(post.createdAt).toLocaleString()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <img className="media" src={post.selectedFile} alt={post.title} />
        </div>
        <div className="right-section">
          <h2 className='text-4xl md:text-black-300 mb-10'>Description: </h2>
          <Typography gutterBottom variant="body1" component="p">{post.description}</Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PostDetails;
