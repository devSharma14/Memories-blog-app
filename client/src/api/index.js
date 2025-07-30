import axios from 'axios';

const API = axios.create({ 
  baseURL: 'blog-backend-production-062a.up.railway.app' 
});

// Add a request interceptor
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile');
  
  if(profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }

  return req;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

// Post requests
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const fetchUserPosts = (id) => API.get(`/posts/user/${id}`);

// Auth requests
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
