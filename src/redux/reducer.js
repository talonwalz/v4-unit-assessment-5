const initialState = {
    username: ``,
    profile_pic: ``
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

export const updateUser = (newUser) => {
    return {
        type: UPDATE_USER,
        payload: newUser 
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER: 
            return {
                ...state, username: action.payload.username, profile_pic: action.payload.profile_pic
            }
        case LOGOUT: 
            return initialState
        default:
             return state
    }
}

export default reducer