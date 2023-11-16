import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { updateUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const UPDATE_QUESTION = "UPDATE_QUESTION";

export function receiveQuestions(questions) { 
    return {
        type: RECEIVE_QUESTIONS,
        questions
    };
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    };
}

export function updateQuestion(question) {
    return {
        type: UPDATE_QUESTION,
        question,
    };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestion({
            author: authedUser.id,
            optionOneText,
            optionTwoText
        })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading())
        );
    }
}

export function handleAnswerQuestion(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser, users, questions } = getState();

        dispatch(showLoading());
        let user = users[authedUser.id];

        user = {
            ...user,
            answers: {
                ...user.answers,
                [qid]: answer
            }
        }

        let question = questions[qid];

        question = {
            ...question,
            [answer]: {
                ...question[answer],
                votes: question[answer].votes.concat(authedUser.id)
            }
        }

        return saveQuestionAnswer({
            authedUser: authedUser.id,
            qid,
            answer
        })
        .then(() => {
            dispatch(updateUser(user));
        })
        .then(() => dispatch(updateQuestion(question)))
        .then(() => dispatch(hideLoading()));
        
    }
}