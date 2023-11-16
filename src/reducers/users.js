import { RECEIVE_USERS, UPDATE_USER } from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case UPDATE_USER:
            return {
                ...state,
                [action.user.id]: {
                    ...state[action.user.id],
                    answers: action.user.answers
                }
            }
        default:
            return state
    }
}