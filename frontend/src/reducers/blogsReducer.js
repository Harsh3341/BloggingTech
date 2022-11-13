import {
  ALL_BLOGS_SUCCESS,
  ALL_BLOGS_FAIL,
  ALL_BLOGS_REQUEST,
  CREATE_BLOGS_REQUEST,
  CREATE_BLOGS_SUCCESS,
  CREATE_BLOGS_FAIL,
  DELETE_BLOGS_REQUEST,
  DELETE_BLOGS_SUCCESS,
  DELETE_BLOGS_FAIL,
  USER_BLOGS_REQUEST,
  USER_BLOGS_SUCCESS,
  USER_BLOGS_FAIL,
  CLEAR_ERRORS,
} from "../constants/blogsConstants";

export const blogsReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case ALL_BLOGS_REQUEST:
    case CREATE_BLOGS_REQUEST:
    case USER_BLOGS_REQUEST:
      return {
        loading: true,
        blogs: [],
      };

    case DELETE_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_BLOGS_SUCCESS:
    case USER_BLOGS_SUCCESS:
      return {
        loading: false,
        blogs: action.payload.blogs,
      };

    case DELETE_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };

    case CREATE_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        blogs: [...state.blogs, action.payload.data],
      };

    case ALL_BLOGS_FAIL:
    case USER_BLOGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CREATE_BLOGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_BLOGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
