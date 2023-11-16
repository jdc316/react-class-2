import { connect } from "react-redux";

const Leaderboard = (props) => {
    const { users, userIds } = props;
    return (
        <>
            <h2 className="center">Leaderboard</h2>
            <ul className="leaderboard">
                {
                    userIds.map((id, index) => (
                        <li key={id} className="leaderboard-user">
                            <span className="leaderboard-rank">{index + 1}.</span>
                            <div>
                                <img src={users[id].avatarURL} alt={`Avatar of ${users[id].name}`} className="avatar"></img>
                                <div className="leaderboard-user-info">
                                    <span>{users[id].name}</span>
                                    <span>Questions: {users[id].questions.length}</span>
                                    <span>Answers: {Object.keys(users[id].answers).length}</span>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </>
        
    )
}

const mapStateToProps = ({ users }) => {
    return {
        userIds: Object.keys(users).sort(
            (a,b) => {
                const answersB = Object.keys(users[b].answers).length;
                const questionsB = users[b].questions.length;
                const answersA = Object.keys(users[a].answers).length;
                const questionsA = users[a].questions.length;

                return (answersB + questionsB) - (answersA + questionsA);
            }
        ),
        users
    };
}

export default connect(mapStateToProps)(Leaderboard);