import {
  ALL_BLOGS_SUCCESS,
  ALL_BLOGS_FAIL,
  ALL_BLOGS_REQUEST,
  CLEAR_ERRORS,
} from "../constants/blogsConstants";

export const blogsReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case ALL_BLOGS_REQUEST:
      return {
        loading: true,
        blogs: [],
      };
    case ALL_BLOGS_SUCCESS:
      return {
        loading: false,
        blogs: action.payload.blogs,
      };
    case ALL_BLOGS_FAIL:
      return {
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
