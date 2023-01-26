import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  SEARCHED_USER_REQUEST,
  SEARCHED_USER_SUCCESS,
  SEARCHED_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PROFILE_IMAGE_REQUEST,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_PROFILE_IMAGE_RESET,
  UPDATE_PROFILE_IMAGE_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_RESET,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_RESET,
  RESET_PASSWORD_FAIL,
  // ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: action.payload.message,
        user: action.payload.user,
      };

    case ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case ALL_USER_FAIL:
      return {
        ...state,
        loading: false,
        users: null,
        error: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
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

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
        isUpdated: false,
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        loading: true,
        status: false,
      };

    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
        status: false,
        user: [],
      };

    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        message: action.payload.message,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        message: action.payload.message,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        user: action.payload.user,
      };

    case UPDATE_PASSWORD_RESET:
    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case FORGOT_PASSWORD_RESET:
      return {
        ...state,
        status: false,
      };

    case UPDATE_PASSWORD_FAIL:
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        isUpdated: false,
        error: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        status: false,
        error: action.payload,
      };

    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        status: false,
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

export const searchedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCHED_USER_REQUEST:
      return {
        loading: true,
        data: {},
      };

    case SEARCHED_USER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };

    case SEARCHED_USER_FAIL:
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

export const uploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_IMAGE_REQUEST:
      return {
        loader: true,
      };

    case UPDATE_PROFILE_IMAGE_SUCCESS:
      return {
        loader: false,
        message: action.payload.message,
        image: action.payload,
        isUploaded: true,
      };

    case UPDATE_PROFILE_IMAGE_FAIL:
      return {
        loader: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_IMAGE_RESET:
      return {
        ...state,
        isUploaded: false,
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
