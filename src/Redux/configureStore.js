import {combineReducers} from "redux"
import AuthReducers from "./Reducers/AuthReducers";

const reducers = combineReducers({
    auth: AuthReducers
});

export default reducers;