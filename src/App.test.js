import { render } from '@testing-library/react';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "./reducers";
import middleware from "./middleware";
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

describe('App', () => {
  const store = createStore(reducer, middleware);

  test('renders App', () => {
    render( 
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter> 
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    var app = render( 
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter> 
    );

    expect(app).toMatchSnapshot();
  })
})


