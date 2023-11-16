import { connect } from "react-redux";
import { useNavigate } from "react-router";

const Question = (props) => {

    const navigate = useNavigate();

    const navToQuestionDetail = (id) => {
        navigate(`/question/${id}`);
    }

    return (
        <div className="question">
            <span className="center"><b>{props.question.author}</b></span>
            <span className="center">{props.formattedDateTime}</span>
            <button className="btn-md green" onClick={() => navToQuestionDetail(props.id)}>Show</button>
        </div>
    )
}

const mapStateToProps = ({ questions }, { id }) => {
    const formattedDateTime = new Date(questions[id].timestamp).toLocaleString();
    return {
        question: questions[id],
        formattedDateTime,
        id
    };
}

export default connect(mapStateToProps)(Question);