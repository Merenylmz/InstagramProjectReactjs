
const initialState = {
    isAuth: false,
    isAdmin: false,
    user: null,
    token: null
};

const AuthReducers = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_INFO":
            return {...state,
                isAuth: action.payloads.isAuth, 
                isAdmin: action.payloads.isAdmin, 
                user: action.payloads.user, 
                token: action.payloads.token
            };
        case "LOGOUT": 
            state = initialState;
            return state
        default:
            return state;
    }
};

export default AuthReducers;
