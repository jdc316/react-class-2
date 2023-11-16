import { Fragment, useEffect } from 'react';
import Login from './Login/login';
import { Routes, Route } from "react-router-dom";
import { handleInitialData } from '../actions/shared';
import { connect } from "react-redux";
import LoadingBar from 'react-redux-loading-bar';
import Dashboard from './Dashboard/dashboard';
import Leaderboard from './Leaderboard/leaderboard';
import Nav from "./Nav/nav";
import { useNavigate } from "react-router-dom";
import QuestionDetail from './QuestionList/Question/QuestionDetail/questionDetail';
import NewPoll from './NewPoll/newPoll';
import NotFound from './404/404';

const App = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.users) {
      props.dispatch(handleInitialData());
    }
    
    if (props.authedUser === null) {
      let path = window.location.pathname;
      path = path.replace("/login", "");

      navigate("/login?nav=" + path);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Fragment>
        <LoadingBar />
        <div className='container'>
          {
            props.loading === true ? <div className='center'>loading...</div> : (
              <div>
                <Nav />
                <Routes>
                  <Route path='/login' exact element={<Login />} />
                  <Route path='/login?nav=:id' element={<Login />} />
                  <Route path='/dashboard' exact element={<Dashboard />} />
                  <Route path='/leaderboard' exact element={<Leaderboard />} />
                  <Route path='/question/:question_id' element={<QuestionDetail />} />
                  <Route path='/add' exact element={<NewPoll />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </div> 
            )
          }
        </div>
      </Fragment>
    </div>
  );
}

const mapStateToProps = ({ users, authedUser }) => (
  { 
    loading: Object.keys(users).length === 0,
    authedUser
  }
);

export default connect(mapStateToProps)(App);
