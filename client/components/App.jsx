import React, { PropTypes } from 'react';
// import PropTypes from 'prop-types';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, This is App.jsx </h1>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};
