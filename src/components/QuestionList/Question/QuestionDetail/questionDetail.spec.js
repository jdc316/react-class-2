import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "../../../../reducers";
import middleware from "../../../../middleware";
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { setAuthedUser } from '../../../../actions/authedUser';
import { handleInitialData } from '../../../../actions/shared';
import QuestionDetail from './questionDetail';
import * as router from 'react-router';
import { handleAnswerQuestion } from '../../../../actions/questions';
import { act } from 'react-dom/test-utils';

describe('QuestionDetail', ()=> {
    const store = createStore(reducer, middleware);
    const navigate = jest.fn();

    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
        jest.spyOn(router, 'useParams').mockReturnValue({question_id: "xj352vofupe1dqz9emx13r"});
    });

    afterEach(() => {
        
    });

    test('renders QuestionDetail', async () => {
        await store.dispatch(handleInitialData());
        await store.dispatch(setAuthedUser({id: "sarahedo"}));
        
        render( 
            <MemoryRouter>
                <Provider store={store}>
                    <QuestionDetail />
                </Provider>
            </MemoryRouter> 
        );
  
        expect(screen.getByText(/Would You Rather/i)).toBeInTheDocument();
    });

    test('displays stats on click select', async () => {
        
        await store.dispatch(handleInitialData());
        await store.dispatch(setAuthedUser({id: "sarahedo"}));
        
        render( 
            <MemoryRouter>
                <Provider store={store}>
                    <QuestionDetail />
                </Provider>
            </MemoryRouter> 
        );
  
        let button = screen.getAllByText('Select')[0];
        fireEvent.click(button);
        
        await act(async () => await store.dispatch(handleAnswerQuestion(
            "xj352vofupe1dqz9emx13r",
            "optionOne"
        )));

        expect(screen.getByText("Your Answer")).toBeInTheDocument();
    });
})