import { connect } from "react-redux";
import Question from "./Question/question";

const QuestionsList = (props) => {
    const { unansweredQuestions, answeredQuesions } = props;
    return (
        <div>
            <div>
                <h3 className="center">New Questions</h3>
                <div className="question-container">
                    {
                        unansweredQuestions?.map((question) => (
                            <Question key={question} id={question} />
                        ))
                    }
                </div>
            </div>
            <div>
                <h3 className="center">Done</h3>
                <div className="question-container">
                    {
                        answeredQuesions?.map((question) => (
                            <Question key={question} id={question} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ authedUser, users, questions }) => {   
    const unfiltedQuestions = Object.keys(questions);
    const answeredQuesions = Object.keys(users[authedUser.id].answers);
    return {
        unansweredQuestions: unfiltedQuestions
                                .filter((question) => !answeredQuesions.includes(question))
                                .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        answeredQuesions: answeredQuesions.sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    };
}

export default connect(mapStateToProps)(QuestionsList);