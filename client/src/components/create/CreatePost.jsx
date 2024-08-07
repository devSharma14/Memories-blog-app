import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, TextField, Button, Grid, CardHeader, CardMedia } from '@mui/material';
import { createPost, updatePost, getUserPosts,deletePost } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import './createPost.css';
import moment from 'moment';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
          if (response && Array.isArray(response)) {
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
      console.log("user ka data: ", postData);
    } else {
      dispatch(updatePost(currentId, postData));
    }
    clear();
  };

  return (
    <div className="pt-40">
      <Container maxWidth="sm">
        <Card className="form">
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {currentId ? `Editing "${post?.title}"` : 'Create Post'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Founder Name"
                name="creator"
                value={postData.creator}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Title"
                name="title"
                value={postData.title}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
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
                variant="outlined"
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

      {/* users ki posts mapping */}
      <Container className="posts-container" maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom className="posts-heading">
          My Posts:
        </Typography>
        <Grid container spacing={2}>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
                <Card className="card">
                  <CardHeader
                    title={post.title}
                    subheader={"Created " + moment(post.createdAt).fromNow()}
                  />
                  <CardMedia
                    component="img"
                    image={post.selectedFile}
                    className="images"
                  />
                  <div className="cardActions">
                    <FaEdit className='button left-button' />
                    <MdDelete className='button right-button' onClick={() => dispatch(deletePost(post._id))} />
                  </div>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body2">
                No posts available.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>

    </div>
  );
};

export default CreatePost;
