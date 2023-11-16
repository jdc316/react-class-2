import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "../../reducers";
import middleware from "../../middleware";
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import Login from './login';

describe('Login', () => {
    const store = createStore(reducer, middleware);
  
    test('renders login page', () => {
      render( 
        <MemoryRouter>
          <Provider store={store}>
            <Login />
          </Provider>
        </MemoryRouter> 
      );
  
      expect(screen.getByText(/User Login/i)).toBeInTheDocument();
    });
  
  })