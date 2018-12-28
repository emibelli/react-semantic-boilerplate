// NPM libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

// Components
import App from './components/App';

// Utils
import * as serviceWorker from './utils/serviceWorker';

class Root extends React.Component {
  render() {
    return (
      <Router>
        <App/>
      </Router>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
