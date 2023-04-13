const {
  USER_INFO,
  USER_LOGOUT,
} = require('../Actions/Action-types/User-actions');
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      // console.log(action.payload);
      return {...state, ...action.payload};

    case USER_LOGOUT:
      AsyncStorage.removeItem('persist:root');
      return (state = {userInfo: {userInfo: {profileImage: ''}}});

    default:
      return state;
  }
};

export default userReducer;
