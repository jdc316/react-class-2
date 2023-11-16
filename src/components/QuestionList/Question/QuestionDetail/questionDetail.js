import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { handleAnswerQuestion } from "../../../../actions/questions";

const QuestionDetail = (props) => {
    const [question, setQuestion] = useState({});
    const [answered, setAnswered] = useState(false);
    const [optionAnswered, setOptionAnswered] = useState("");
    const [totalUsersAnswered, setTotalUsersAnswered] = useState(0);

    let params = useParams();
    const navigate = useNavigate();

    const { dispatch, users, questions, authedUser } = props;

    useEffect(() => {
        if (!params) {
            navigate("/login");
        }

        if (questions[params.question_id] === undefined) {
            navigate("/404");
        }
        
        setAnswered(Object.keys(users[authedUser.id].answers).includes(params.question_id));

        if (answered) {
            setOptionAnswered(users[authedUser.id].answers[params.question_id]);
        }

        setQuestion(questions[params.question_id]);
        setTotalUsersAnswered(question?.optionOne?.votes?.length + question?.optionTwo?.votes?.length);
    }, [answered, navigate, params, authedUser.id, questions, users, question?.optionOne?.votes?.length, question?.optionTwo?.votes?.length]);

    const handleSetAnswered = (option) => {
        if (option === 1) {
            dispatch(handleAnswerQuestion(
                question.id,
                "optionOne"
            ));
        }
        if (option === 2) {
            dispatch(handleAnswerQuestion(
                question.id,
                "optionTwo"
            ));
        }       
    }

    return (
        <div className="center">
            <h2>Poll by {users[question.author]?.name}</h2>
            <img src={users[question.author]?.avatarURL} alt={`Avatar of ${users[question.author]?.name}`} className="avatar-lg"></img>
            {
                !answered && <h3>Would You Rather</h3>
            }
            <div className="question-detail">
                <div className={optionAnswered === "optionOne" ? "question-option-answered" : "question-option"}>
                    { optionAnswered === "optionOne" && <h4 className="center-item green">Your Answer</h4> }
                    <h4 className="center-item">{question?.optionOne?.text}</h4>
                    {
                        !answered ? 
                            <button onClick={() => handleSetAnswered(1)} className="btn-fill">Select</button> 
                            : 
                            <div>
                                Number of people voted: {question?.optionOne?.votes?.length}
                                <br />
                                Percent of people voted: {questions && ((question?.optionOne?.votes?.length / totalUsersAnswered)*100)}%
                            </div>
                    }
                </div>
                <div className={optionAnswered === "optionTwo" ? "question-option-answered" : "question-option"}>
                    { optionAnswered === "optionTwo" && <h4 className="center-item green">Your Answer</h4> }
                    <h4 className="center-item">{question?.optionTwo?.text}</h4>
                    {
                        !answered ? 
                            <button onClick={() => handleSetAnswered(2)} className="btn-fill">Select</button> 
                            : 
                            <div>
                                Number of people voted: {question?.optionTwo?.votes?.length}
                                <br />
                                Percent of people voted: {questions && ((question?.optionTwo?.votes?.length / totalUsersAnswered)*100)}%
                            </div>
                    }
                </div>
            </div>
        </div>        
    )
}

const mapStateToProps = ({ dispatch, questions, users, authedUser }) => {
    return {
        dispatch,
        questions,
        users,
        authedUser
    };
}

export default connect(mapStateToProps)(QuestionDetail);