import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "../../reducers";
import middleware from "../../middleware";
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import Dashboard from './dashboard';
import { setAuthedUser } from '../../actions/authedUser';
import { handleInitialData } from '../../actions/shared';
import * as router from 'react-router'

describe('Dashboard', () => {
  const store = createStore(reducer, middleware);
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  });
  
  test('renders Dashboard', async () => {
    await store.dispatch(handleInitialData());
    await store.dispatch(setAuthedUser({id: "sarahedo"}));
        
    render( 
      <MemoryRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </MemoryRouter> 
    );
  
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test('matches snapshot', async () => {
    await store.dispatch(handleInitialData());
    await store.dispatch(setAuthedUser({id: "sarahedo"}));

    // eslint-disable-next-line testing-library/render-result-naming-convention
    var app = render( 
      <MemoryRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </MemoryRouter> 
    );
    
    expect(app).toMatchSnapshot();
  });

  test('can open Question', async () => {
    await store.dispatch(handleInitialData());
    await store.dispatch(setAuthedUser({id: "sarahedo"}));
        
    render( 
      <MemoryRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </MemoryRouter> 
    );

    let button = screen.getAllByText('Show')[0];
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalled();
  })
})
  