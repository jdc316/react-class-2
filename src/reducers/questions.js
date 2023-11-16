import { ADD_QUESTION, RECEIVE_QUESTIONS, UPDATE_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        case UPDATE_QUESTION: 
            return  {
                ...state,
                [action.question.id]: {
                    ...state[action.question.id],
                    optionOne: action.question.optionOne,
                    optionTwo: action.question.optionTwo
                }
            }
        default:
            return state
    }
}