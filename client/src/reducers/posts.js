import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionTypes";

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload; // Returns all posts
    case LIKE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post)); // Updates the liked post
    case CREATE:
      return [...posts, action.payload]; // Adds a new post
    case UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post)); // Updates an existing post
    case DELETE:
      return posts.filter((post) => post._id !== action.payload); // Removes the deleted post
    default:
      return posts; // Returns the current state if no action matches
  }
};

export default postsReducer;
