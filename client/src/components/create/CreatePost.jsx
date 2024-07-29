import  { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { createPost, updatePost } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import './createPost.css';
// import { LOGOUT } from '../../constants/actionTypes.jsx';

const CreatePost = ({ currentId, setCurrentId }) => {
  const initialState = {
    creator: '',
    title: '',
    description: '',
    selectedFile: null,
  };

  const [postData, setPostData] = useState(initialState);
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const clear = () => {
    // setCurrentId(0);
    setPostData({
      creator: '',
      title: '',
      description: '',
      selectedFile: null,
    });
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
    console.log("post ka data: ", postData);
    if (currentId === 0) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePost(currentId, postData));
    }

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
              <TextField
                label="Creator Name"
                name="creator"
                value={postData.creator}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Title"
                name="title"
                value={postData.title}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Description"
                name="description"
                value={postData.description}
                onChange={handleChange}
                margin="normal"
                fullWidth
                multiline
                rows={4}
              />
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
    </div>
  );
};

export default CreatePost;
