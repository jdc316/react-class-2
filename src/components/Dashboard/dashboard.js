import { connect } from "react-redux";
import QuestionsList from "../QuestionList/questionsList";

const Dashboard = () => {
    return (
        <div>
            <h2 className="center">Home</h2>
            <QuestionsList />
        </div>
    );
}

export default connect()(Dashboard);