// NPM libraries
import React from 'react';
import {
  Route,
  Switch,
  Link,
} from 'react-router-dom';

// Semantic UI Components
import {
  Menu,
} from 'semantic-ui-react';

// Components
import Homepage from '../Homepage';
import Login from '../Login';
import NotFound from '../Errors/NotFound';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      auth: false,
      user: undefined,
    };

    this.authStateHandler = this.authStateHandler.bind(this);

  }

  authStateHandler({auth, user}) {
    this.setState({
      auth,
      user,
    });
  }

  content() {
    return (
      <div style={{padding: '5em 0 0', flex: 1, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
        <p>Edit <code>src/components/App/index.jsx</code> and save to reload.</p>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
      </div>
    );
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <Menu fixed='top' inverted borderless style={{zIndex: 103}}>
          <Menu.Item header>
            <Link to='/'>
              <p style={{display: 'inline', verticalAlign: 'middle'}}>React App</p>
            </Link>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Login authStateHandler={this.authStateHandler} auth={this.state.auth} user={this.state.user}/>
          </Menu.Menu>
        </Menu>
        <div id="app-content" style={{minHeight: '100vh', minWidth: '100vw'}}>
          {/*Add app static routes below*/}
          <Switch>
            <Route exact path="/" render={() => this.content()}/>
            {/*Uncomment next line to work with component routes*/}
            {/*<Route exact path="/" render={() => <Homepage auth={this.state.auth} user={this.state.user}/>}/>*/}
            {/*Default catch all route*/}
            <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
