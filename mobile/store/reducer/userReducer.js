import { LOGIN } from '../action/user';

export default userReducer = (state="10655892646", action) => {
    switch (action.type) {
        case LOGIN:
            return action.tc;
        default:
            return state;
    }
}

