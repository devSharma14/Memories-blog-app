import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { createPost, updatePost, getUserPosts } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import './createPost.css';

const CreatePost = ({ currentId, setCurrentId }) => {
  const initialState = {
    creator: '',
    title: '',
    description: '',
    selectedFile: null,
  };

  const [postData, setPostData] = useState(initialState);
  const [userPosts, setUserPosts] = useState([]);
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  useEffect(() => {
    if (user?.result?._id) {
      dispatch(getUserPosts(user.result._id))
        .then((response) => {
          // console.log('Received response:', response); 
          if(response && Array.isArray(response)) {
            setUserPosts(response);
          } else {
            console.error("Unexpected response format", response);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user posts", error);
        });
    }
  }, [user, dispatch]);

  const clear = () => {
    setPostData(initialState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = ({ base64 }) => {
    setPostData((prevData) => ({ ...prevData, selectedFile: base64 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePost(currentId, postData));
    }
    clear();
  };

  return (
    <div className="create-post pt-20">
      <Container>
        <Card className="card">
          <CardContent>
            <Typography variant="h5" component="h2">
              {currentId ? `Editing "${post?.title}"` : 'Create Post'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField label="Creator Name" name="creator" value={postData.creator} onChange={handleChange} margin="normal" fullWidth />
              <TextField label="Title" name="title" value={postData.title} onChange={handleChange} margin="normal" fullWidth />
              <TextField label="Description" name="description" value={postData.description} onChange={handleChange} margin="normal" fullWidth multiline rows={4} />
              <div style={{ margin: '20px 0' }}>
                <FileBase type="file" multiple={false} onDone={handleFileChange} />
              </div>
              <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                Submit
              </Button>
              <Button variant="contained" color="secondary" onClick={clear}>
                Clear
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>

      <h1 className='text-4xl mt-2 mb-4 md:text-purple-400'>My Posts:</h1>
      <Container className="posts-container">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <Card key={post._id} className="post-card">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {post.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.description}
                </Typography>
                {post.selectedFile && (
                  <img src={post.selectedFile} alt={post.title} className="post-image" />
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body2" component="p">
            No posts available.
          </Typography>
        )}
      </Container>


    </div>

  );
};

export default CreatePost;
