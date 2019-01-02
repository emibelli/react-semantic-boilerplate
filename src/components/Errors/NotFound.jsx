// NPM libraries
import React from 'react'
import withRouter from 'react-router-dom/withRouter';

// Semantic UI Components
import {
  Container,
  Header,
} from 'semantic-ui-react';

const NotFound = () => (
  <div>
    <Container text textAlign='center' style={{padding: '5em 0 0'}}>
      <Header as='h1'>404</Header>
      <p>¡Oops! Page not found</p>
      <p>Sorry, we couldn't find the page you're looking for.</p>
    </Container>
  </div>
);

export default withRouter(NotFound);
