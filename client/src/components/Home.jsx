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
  const posts = useSelector((state) => state.posts.posts); 

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  if (!Array.isArray(posts)) return null; 

  return (
    <div className="pt-80">
      <h1 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '20px' , marginLeft: '20px' }}>
      Users' Posts:
    </h1>
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
