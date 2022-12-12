import {
  legacy_createStore as createStore, // create redux store
  combineReducers, // combine all reducers
  applyMiddleware, // middleware for redux
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; // redux devtools extension
import thunk from "redux-thunk"; // middleware for async actions
import { blogsReducer } from "./reducers/blogsReducer"; // import blogs reducer
import {
  userReducer,
  profileReducer,
  searchedUserReducer,
} from "./reducers/userReducer";

// combine all reducers into one reducer and export it to store it in redux store and pass it to provider in index.js file to make it available to all components in the app using useSelector hook
const reducer = combineReducers({
  blogs: blogsReducer,
  user: userReducer,
  profile: profileReducer,
  searchedUser: searchedUserReducer,
});

let initialState = {}; // initial state of the app is empty object because we don't have any data in the app

const middleware = [thunk];

// create redux store and pass reducer, initial state and middleware to it
const store = createStore(
  reducer,
  initialState,
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware)
);

export default store;
