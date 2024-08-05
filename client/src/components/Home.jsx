import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getPosts } from '../actions/posts';
import Post from './post/Post';

const Container = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  margin: '10px',
  justifyContent: 'space-between',
}));

const Home = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts); // Access posts array from the state

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  if (!Array.isArray(posts)) return null; // Handle cases where posts might not be an array

  return (
    <div className="pt-20">
      <Container>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
