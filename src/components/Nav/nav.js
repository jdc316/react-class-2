import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAuthedUser } from "../../actions/authedUser";
import { useNavigate } from "react-router-dom";

const Nav = (props) => {
    const navigate = useNavigate();

    const logoutUser = () => {
        const { dispatch } = props;
        dispatch(setAuthedUser({
            id: null
        }));
        
        navigate("/login");
    }

    return (
        <nav className="nav">
            <ul data-tag="nav-list">
                {
                    props.authedUser && props.authedUser?.id !== null ?
                    <>
                        <li>
                            <Link to="/dashboard">Home</Link>
                        </li>
                        <li>
                            <Link to="/leaderboard">Leaderboard</Link> 
                        </li>
                        <li>
                            <Link to="/add">New Poll</Link> 
                        </li>
                        <li>
                            <Link to="/login">Login Page</Link> 
                        </li>
                        <li className="logged-in-user">
                            <span>Hello, {props.users[props.authedUser.id].name}!</span>
                            <button className="btn-small red" onClick={() => logoutUser()}>Logout</button>
                        </li>
                    </>
                    :
                    <>
                        <li className="disabled" title="Please login first">
                            Home
                        </li>
                        <li className="disabled" title="Please login first">
                            Leaderboard
                        </li>
                        <li className="disabled" title="Please login first">
                            New Poll
                        </li>
                        <li className="disabled" title="Please login first">
                            Login Page
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
}

const mapStateToProps = ({ authedUser, users }) => {
    return {
        authedUser,
        users
    };
}

export default connect(mapStateToProps)(Nav);