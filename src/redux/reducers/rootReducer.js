import favReducer from "./fav";
import playlistReducer from "./playlist";
import searchReducer from "./search";
import resultReducer from "./results";
import { combineReducers } from "redux";


// const rootReducer = {
//     fav: favReducer,
//     playlist: playlistReducer
// }

const rootReducer = combineReducers({
    fav: favReducer,
    playlist: playlistReducer,
    search: searchReducer,
    result: resultReducer
})
export default rootReducer;