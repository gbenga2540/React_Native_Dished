import { combineReducers } from '@reduxjs/toolkit';
import { user_info_reducer } from './User_Info/User_Info_Reducer';

const rootReducer = combineReducers({
    UserInfo: user_info_reducer,
});

export default rootReducer;
