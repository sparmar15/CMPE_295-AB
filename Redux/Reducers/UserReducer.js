const {
  USER_INFO,
  USER_LOGOUT,
} = require('../Actions/Action-types/User-actions');
import storage from 'redux-persist/lib/storage';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      console.log(action.payload);
      return {...state, ...action.payload};

    case USER_LOGOUT:
      storage.removeItem('persist:root');
      return (state = {});

    default:
      return state;
  }
};

export default userReducer;
