import { Button, Card, CardMedia, CardHeader, CardActions, Typography, Avatar, CardContent } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { likePost, updatePost } from '../../actions/posts.js';
import './postCard.css';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post?.likes.length > 0) {
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

    const handleCardClick = () => {
        navigate(`/posts/${post._id}`);
    };

    return (
        <Card className="card" onClick={handleCardClick}>
            <CardHeader
                title={post.title}
                subheader={"Created " + moment(post.createdAt).fromNow()}
            />
            <CardMedia
                component="img"
                image={post.selectedFile}
                className="MuiCardMedia-root" // Apply CSS class for media
            />
            <CardActions className="cardActions">
                <Button
                    size="small"
                    color="primary"
                    disabled={!user?.result}
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(likePost(post._id));
                    }}
                    className="likeButton"
                >
                    <Likes />
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;
