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
      <p>¡Ups! La página no existe</p>
      <p>Lo sentimos, pero la página que estás buscando no existe.</p>
    </Container>
  </div>
);

export default withRouter(NotFound);
