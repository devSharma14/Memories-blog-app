import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_USER_POSTS,
  FETCH_POST,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

const initialState = {
  posts: [],
  currentPost: null,
  isLoading: false,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL:
      return { ...state, posts: action.payload, isLoading: false };

    case FETCH_USER_POSTS:
      return { ...state, posts: action.payload, isLoading: false };

    case FETCH_POST:
      return { ...state, currentPost: action.payload, isLoading: false };

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };

    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    default:
      return state;
  }
};

export default postsReducer;
