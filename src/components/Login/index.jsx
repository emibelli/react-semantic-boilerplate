// NPM libraries
import React from 'react'
import PropTypes from 'prop-types';
import {auth} from '../../auth/firebase';

// Semantic UI Components
import {
  Divider,
  Dropdown,
  Form,
  Icon,
} from 'semantic-ui-react'

// Custom libraries
import serialize from '../../utils';

class Login extends React.Component {

  constructor() {
    super();

    this.state = {
      loginHidden: false,
      signupHidden: true,
      resetHidden: true,
      email: '',
      password: '',
    };

    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleSignup = this.toggleSignup.bind(this);
    this.toggleReset = this.toggleReset.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleEmailSignup = this.handleEmailSignup.bind(this);
    this.handleEmailLogin = this.handleEmailLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);

  }

  toggleLogin(e) {
    e.stopPropagation();
    this.setState({
      loginHidden: false,
      signupHidden: true,
      resetHidden: true,
    });
  }

  toggleSignup(e) {
    e.stopPropagation();
    this.setState({
      loginHidden: true,
      signupHidden: false,
      resetHidden: true,
    });
  }

  toggleReset(e) {
    e.stopPropagation();
    this.setState({
      loginHidden: true,
      signupHidden: true,
      resetHidden: false,
    });
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value,
    });
  }

  handleEmailSignup() {
    const { email, password } = this.state;

    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.createUser({
          uid: authUser.uid,
          authProvider: 'password',
          email: authUser.email,
          emailVerified: authUser.emailVerified,
        });
      })
      .catch(err => Promise.reject(err));
  }

  handleEmailLogin() {
    const { email, password } = this.state;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.getUser({uid: authUser.uid});
      })
      .catch(err => Promise.reject(err));
  }

  handleFacebookLogin() {
    auth.doSignInWithFacebook()
      .then(authUser => {
        if (authUser.additionalUserInfo.isNewUser) {
          this.createUser({
            uid: authUser.user.uid,
            authProvider: 'facebook',
            email: authUser.user.email,
            emailVerified: authUser.user.emailVerified,
          })
        } else {
          this.getUser({uid: authUser.user.uid});
        }
      })
      .catch(err => Promise.reject(err));
  }

  handleGoogleLogin() {
    auth.doSignInWithGoogle()
      .then(authUser => {
        if (authUser.additionalUserInfo.isNewUser) {
          this.createUser({
            uid: authUser.user.uid,
            authProvider: 'google',
            email: authUser.user.email,
            emailVerified: authUser.user.emailVerified,
          })
        } else {
          this.getUser({uid: authUser.user.uid});
        }
      })
      .catch(err => Promise.reject(err));
  }

  handleResetPassword() {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.props.authStateHandler({
          auth: false,
          user: undefined,
        });
        this.setState({
          loginHidden: false,
          signupHidden: true,
          resetHidden: true,
          email: '',
          password: '',
        });
      })
      .catch(err => Promise.reject(err));
  }

  handleLogout() {
    auth.doSignOut()
      .then(() => {
        this.props.authStateHandler({
          auth: false,
          user: undefined,
        });
        this.setState({
          loginHidden: false,
          signupHidden: true,
          resetHidden: true,
          email: '',
          password: '',
        });
      })
      .catch(err => Promise.reject(err));
  }

  handleAuthStateChanged() {
    auth.checkAuthStateChanged(authUser => {
      if (authUser) {
        this.handleVerifyIdToken();
      } else {
        this.props.authStateHandler({
          auth: false,
          user: undefined,
        });
        this.setState({
          loginHidden: false,
          signupHidden: true,
          resetHidden: true,
          email: '',
          password: '',
        });
      }
    });
  }

  handleVerifyIdToken() {
    auth.doGetIdToken()
      .then(idToken => {
        if (idToken) {
          this.verifyIdToken({idToken});
        } else {
          this.props.authStateHandler({
            auth: false,
            user: undefined,
          });
          this.setState({
            loginHidden: false,
            signupHidden: true,
            resetHidden: true,
            email: '',
            password: '',
          });
        }
      })
      .catch(err => Promise.reject(err));
  }

  getUser(params) {
    return fetch('/api/users' + serialize(params), {method: 'GET'})
      .then(response => {
        const json = response.json();
        if (response.status >= 200 && response.status < 300) {
          return json;
        }
        return json.then(Promise.reject.bind(Promise));
      })
      .then(json => {
        this.props.authStateHandler({
          auth: true,
          user: json[0],
        });
        this.setState({
          loginHidden: false,
          signupHidden: true,
          resetHidden: true,
          email: '',
          password: '',
        });
      })
      .catch(err => Promise.reject(err));
  }

  createUser(user) {
    return fetch('/api/users', {method: 'POST', body: JSON.stringify(user)})
      .then(response => {
        const json = response.json();
        if (response.status >= 200 && response.status < 300) {
          return json;
        }
        return json.then(Promise.reject.bind(Promise));
      })
      .then(json => {
        this.props.authStateHandler({
          auth: true,
          user: json,
        });
        this.setState({
          loginHidden: false,
          signupHidden: true,
          resetHidden: true,
          email: '',
          password: '',
        });
      })
      .catch(err => Promise.reject(err));
  }

  verifyIdToken(body) {
    return fetch('/api/auth/verify', {method: 'POST', body: JSON.stringify(body)})
      .then(response => {
        const json = response.json();
        if (response.status >= 200 && response.status < 300) {
          return json;
        }
        return json.then(Promise.reject.bind(Promise));
      })
      .then(json => {
        this.props.authStateHandler({
          auth: true,
          user: json,
        });
        this.setState({
          loginHidden: false,
          signupHidden: true,
          resetHidden: true,
          email: '',
          password: '',
        });
      })
      .catch(err => Promise.reject(err));
  }

  componentDidMount() {
    this.handleAuthStateChanged();
  }

  render() {

    const { auth, user } = this.props;
    const { email, password } = this.state;
    const trigger = (auth &&
      <span>
        <Icon name='user' />{user.username || user.email}
      </span>
    );

    if (auth) {
      return (
        <Dropdown item trigger={trigger} closeOnChange={false}>
          <Dropdown.Menu>
            <Dropdown.Item icon='setting' text='Mi cuenta'/>
            <Dropdown.Item icon='sign out' text='Cerrar sesión' onClick={this.handleLogout}/>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      return (
        <Dropdown item text='Ingresar' closeOnChange={false}>
          <Dropdown.Menu>
            <Form onSubmit={this.handleEmailLogin} style={{minWidth: '15rem', margin: '11px 11px 0px'}} hidden={this.state.loginHidden}>
              <Form.Input
                icon='mail'
                iconPosition='left'
                type='text'
                name='email'
                placeholder='Email'
                value={email}
                onClick={e => e.stopPropagation()}
                onBlur={e => e.stopPropagation()}
                onChange={this.handleChange}
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                type='password'
                name='password'
                placeholder='Contraseña'
                value={password}
                onClick={e => e.stopPropagation()}
                onBlur={e => e.stopPropagation()}
                onChange={this.handleChange}
              />
              <Form.Button fluid onBlur={e => e.stopPropagation()}>
                <Icon name='sign in'/> Ingresar
              </Form.Button>
            </Form>
            <div className='message' style={{textAlign: 'center', paddingBottom: 0}} hidden={this.state.loginHidden}>
              <a href='javascript:' onBlur={e => e.stopPropagation()} onClick={this.toggleReset}>¿Olvidaste tu contraseña?</a>
            </div>
            <div hidden={this.state.loginHidden}>
              <Divider horizontal style={{border: 'none'}}>O</Divider>
            </div>
            <Form onSubmit={this.handleFacebookLogin} style={{minWidth: '15rem', margin: '0px 11px 11px'}} hidden={this.state.loginHidden}>
              <Form.Button fluid color='facebook' onBlur={e => e.stopPropagation()}>
                <Icon name='facebook' /> Ingresa con Facebook
              </Form.Button>
            </Form>
            <Form onSubmit={this.handleGoogleLogin} style={{minWidth: '15rem', margin: '0px 11px'}} hidden={this.state.loginHidden}>
              <Form.Button fluid color='google plus' onBlur={e => e.stopPropagation()}>
                <Icon name='google' /> Ingresa con Google
              </Form.Button>
            </Form>
            <div className='message' style={{textAlign: 'center'}} hidden={this.state.loginHidden}>
              ¿No tienes cuenta? <a href='javascript:' onBlur={e => e.stopPropagation()} onClick={this.toggleSignup}>¡Regístrate!</a>
            </div>
            <Form onSubmit={this.handleEmailSignup} style={{minWidth: '15rem', margin: '11px 11px 0px'}} hidden={this.state.signupHidden}>
              <Form.Input
                icon='mail'
                iconPosition='left'
                type='text'
                name='email'
                placeholder='Email'
                value={email}
                onClick={e => e.stopPropagation()}
                onBlur={e => e.stopPropagation()}
                onChange={this.handleChange}
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                type='password'
                name='password'
                placeholder='Contraseña'
                value={password}
                onClick={e => e.stopPropagation()}
                onBlur={e => e.stopPropagation()}
                onChange={this.handleChange}
              />
              <Form.Button fluid onBlur={e => e.stopPropagation()}>
                <Icon name='sign in'/> Regístrate
              </Form.Button>
            </Form>
            <div className='message' style={{textAlign: 'center'}} hidden={this.state.signupHidden}>
              <a href='javascript:' onBlur={e => e.stopPropagation()} onClick={this.toggleLogin}>Regresar</a>
            </div>
            <Form onSubmit={this.handleResetPassword} style={{minWidth: '15rem', margin: '11px 11px 0px'}} hidden={this.state.resetHidden}>
              <Form.Input
                icon='mail'
                iconPosition='left'
                type='text'
                name='email'
                placeholder='Email'
                value={email}
                onClick={e => e.stopPropagation()}
                onBlur={e => e.stopPropagation()}
                onChange={this.handleChange}
              />
              <Form.Button fluid onBlur={e => e.stopPropagation()}>
                <Icon name='send'/> Enviar
              </Form.Button>
            </Form>
            <div className='message' style={{textAlign: 'center'}} hidden={this.state.resetHidden}>
              <a href='javascript:' onBlur={e => e.stopPropagation()} onClick={this.toggleLogin}>Regresar</a>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  }
}

Login.propTypes = {
  authStateHandler: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

export default Login;
