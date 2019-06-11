import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import loader from '../img/loader.gif';
import Nav from '../components/layouts/Nav';
import Footer from '../components/layouts/Footer';

/**
 * Top level component
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
        {this.props.loading && <img className="mainLoader" src={loader} />}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

/**
 * Checks if an ajax call is ongoing to generate locading boolean
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} loading boolean
 */
function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
