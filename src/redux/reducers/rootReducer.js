import favReducer from "./fav";
import playlistReducer from "./playlist";
// import { combineReducers } from "redux";


const rootReducer = {
    fav: favReducer,
    playlist: playlistReducer
}

export default rootReducer;