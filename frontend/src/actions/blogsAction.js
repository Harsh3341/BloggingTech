import axios from "axios";
import {
  ALL_BLOGS_SUCCESS,
  ALL_BLOGS_FAIL,
  ALL_BLOGS_REQUEST,
  CREATE_BLOGS_REQUEST,
  CREATE_BLOGS_SUCCESS,
  CREATE_BLOGS_FAIL,
  CLEAR_ERRORS,
} from "../constants/blogsConstants";

export const getBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BLOGS_REQUEST });
    const { data } = await axios.get("/api/v1/");

    dispatch({
      type: ALL_BLOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_BLOGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create new blog
export const createBlog = (blogData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BLOGS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/blog/create", blogData, config);

    dispatch({
      type: CREATE_BLOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BLOGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
