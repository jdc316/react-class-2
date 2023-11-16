import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "../../reducers";
import middleware from "../../middleware";
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { setAuthedUser } from '../../actions/authedUser';
import { handleInitialData } from '../../actions/shared';
import Leaderboard from './leaderboard';

describe('Leaderboard', ()=> {
    const store = createStore(reducer, middleware);
  
    test('renders Leaderboard', async () => {
        await store.dispatch(handleInitialData());
        await store.dispatch(setAuthedUser({id: "sarahedo"}));
        
        render( 
            <MemoryRouter>
                <Provider store={store}>
                    <Leaderboard />
                </Provider>
            </MemoryRouter> 
        );
  
        expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
    });
})