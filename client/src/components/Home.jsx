import React from 'react';
import { useEffect } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import {Grid , CircularProgress} from '@mui/material';
import {styled} from '@mui/material';
import {getPosts} from '../actions/posts.js';
import Post from './Post.jsx';

const Container = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  margin: '10px',
  justifyContent: 'space-between'
}));

const Home = ({ setCurrentId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts());
  },[dispatch]);
  return (
    <div className="pt-20">
        <Container>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      </Container>
      
    </div>
  );
};

export default Home;
