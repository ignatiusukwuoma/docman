import React, { PropTypes } from 'react';
import Nav from '../components/layouts/Nav.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};
