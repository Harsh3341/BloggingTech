import axios from "axios";
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

// Get user blogs
export const getUserBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: USER_BLOGS_REQUEST });
    const { data } = await axios.get("/api/v1/blog");

    dispatch({
      type: USER_BLOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_BLOGS_FAIL,
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

// delete blog
export const deleteBlog = (id) => async (dispatch) => {
  dispatch({ type: DELETE_BLOGS_REQUEST });
  try {
    const { data } = await axios.delete(`/api/v1/blog/delete/${id}`);

    dispatch({
      type: DELETE_BLOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BLOGS_FAIL,
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
