import favReducer from "./fav";
import playlistReducer from "./playlist";
import searchReducer from "./search";
import resultReducer from "./results";
import { playerReducer } from "./player";
import listReducer from "./list";
import trackReducer from "./track";
import navReducer from './nav'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    fav: favReducer,
    playlist: playlistReducer,
    search: searchReducer,
    result: resultReducer,
    player: playerReducer,
    list: listReducer,
    track: trackReducer,
    nav: navReducer
})
export default rootReducer;