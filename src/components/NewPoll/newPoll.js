import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../../actions/questions";

const NewPoll = (props) => {

    const navigate = useNavigate();
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");

    const handleChangeOptionOne = (e) => {
        const question = e.target.value;

        setOptionOne(question);
    }

    const handleChangeOptionTwo = (e) => {
        const question = e.target.value;

        setOptionTwo(question);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        props.dispatch(handleAddQuestion(optionOne, optionTwo));

        setOptionOne("");
        setOptionTwo("");

        navigate("/dashboard");
    }

    return (
        <div className="center">
            <h2>Would You Rather</h2>
            <div className="column">
                <span className="subtitle">
                    Create Your Own Poll
                </span>
                <h5>First Option</h5>
                <input className="center-item input" placeholder="First Option" value={optionOne} onChange={handleChangeOptionOne}></input>
                <h5>Second Option</h5>
                <input className="center-item input" placeholder="Second Option" value={optionTwo} onChange={handleChangeOptionTwo}></input>
                <button className="btn" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
const mapStateToProps = ({authedUser, dispatch}) => {
    return {
        authedUser,
        dispatch
    };
}

export default connect(mapStateToProps)(NewPoll);