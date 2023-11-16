import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe('Data', () => {
    test('saveQuestion should return correctly formatted data', async () => {
        var sampleQuestion = {
            optionOneText: "option one",
            optionTwoText: "option two",
            author: "sarahedo"
        };

        var response = await _saveQuestion(sampleQuestion);

        expect(response).toEqual({
            ...response,
            author: "sarahedo",
            optionOne: {
                text: "option one",
                votes: []
            },
            optionTwo: {
                text: "option two",
                votes: []
            }
        })
    });

    test('saveQuestion should fail if incorrect data is entered', async () => {
        var sampleQuestion = {
            optionOneText: "option one",
            optionTwoText: "option two",
            author: null
        };

        await expect(_saveQuestion(sampleQuestion)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
    });

    test('saveQuestionAnswer should return true on correctly formatted data entered', async () => {
        var sampleAnswer = {
            answer: "optionOne",
            authedUser: "sarahedo",
            qid: "xj352vofupe1dqz9emx13r"
        };

        var response = await _saveQuestionAnswer(sampleAnswer);

        expect(response).toEqual(true);
    });

    test('saveQuestionAnswer should fail if incorrectly formatted data entered', async () => {
        var sampleAnswer = {
            answer: "optionOne",
            authedUser: "sarahedo",
            qid: null
        };

        await expect(_saveQuestionAnswer(sampleAnswer)).rejects.toEqual("Please provide authedUser, qid, and answer");
    });
})