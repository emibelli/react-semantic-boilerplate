// NPM libraries
import React from 'react';

// Semantic UI Components
import {
  Container,
} from 'semantic-ui-react';

class Homepage extends React.Component {

  constructor() {
    super();

    this.state = {};

  }

  render() {

    const {auth, user} = this.props;

    return (
      <Container style={{padding: '5em 0 0', flex: 1, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
        <h1>Homepage content</h1>
      </Container>
    );
  }

}

export default Homepage;
