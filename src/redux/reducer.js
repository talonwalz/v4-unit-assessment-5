const initialState = {
    username: ``,
    profile_img: ``
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

export const updateUser = (username, profile_img) => {
    return {
        type: UPDATE_USER,
        payload: { username, profile_img }
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
                ...state, username: action.payload, profile_img: action.payload
            }
        case LOGOUT: 
            return initialState
        default:
             return state
    }
}

export default reducer