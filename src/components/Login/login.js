import { connect } from "react-redux";
import { setAuthedUser } from "../../actions/authedUser";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = (props) => {

    const navigate = useNavigate();
    let params = useParams();
    
    const [searchParams] = useSearchParams();
    const [route, setRoute] = useState("");

    useEffect(() => {
        if (!params) {
            navigate("/login");
        }

        const nav = searchParams.get("nav");

        if (nav) {
            setRoute(nav);
        }
        
    }, [navigate, params, route, searchParams]);

    function loginAsUser(id) {
        const { dispatch } = props;
        dispatch(setAuthedUser({
            id
        }));

        if (route === "/") {
            navigate("/dashboard");
        } else if (route !== "") {
            navigate(route)
        } else {
            navigate("/dashboard");
        }
    }

    return (
        <div className="center">
            <h2>User Login</h2>
            <ul className="user-list">
                {
                    props.userIds.map((id) => (
                        <li key={id}><button className="btn" onClick={() => loginAsUser(id)}>{id}</button></li>
                    ))
                }
            </ul>
        </div>
    )
}

const mapStateToProps = ({ users }) => ({
    userIds: Object.keys(users)
});

export default connect(mapStateToProps)(Login);