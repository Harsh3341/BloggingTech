import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { blogsReducer } from "./reducers/blogsReducer";
import {
  userReducer,
  profileReducer,
  searchedUserReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  blogs: blogsReducer,
  user: userReducer,
  profile: profileReducer,
  searchedUser: searchedUserReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
