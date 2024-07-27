import { Button, Typography, CardContent, Card, CardMedia, CardHeader, CardActions } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost, likePost, updatePost } from '../actions/posts.js';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if(post?.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const handleUpdate = () => {
        dispatch(updatePost(post._id, { ...post, title: 'Updated Title' })) 
            .then(() => {
                navigate('/');
            });
    };

    return (
        <Card 
            style={{
                width: 400,
                height: 450,
            }}
        >
            <CardMedia
                image={post.selectedFile}
                title={post.title}
                style={{
                    height: 200,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backgroundBlendMode: 'darken',
                }}
            />
            
            {/* created at:  */}
            <CardHeader subheader={"Created " + moment(post.createdAt).fromNow()} />

            <CardActions>

                {/* likes */}
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>

                {/* <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" /> Delete
                </Button> */}

                {/* <Button size="small" onClick={() => { setCurrentId(post._id); }}>
                    <MoreHorizIcon fontSize="default" /> Update
                </Button> */}

            </CardActions>
            
            {/* Tags | Title | Message */}
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
                {/* <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                </Typography> */}
                <Typography variant="h5" gutterBottom>
                    {post.message}
                </Typography>
            </CardContent>

        </Card>
    );
};

export default Post;
