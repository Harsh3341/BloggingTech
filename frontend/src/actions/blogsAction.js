import axios from "axios";
import {
  ALL_BLOGS_SUCCESS,
  ALL_BLOGS_FAIL,
  ALL_BLOGS_REQUEST,
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

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
