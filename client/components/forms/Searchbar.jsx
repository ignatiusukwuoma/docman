import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextInput from '../forms/TextInput.jsx';
import { searchUsers, searchDocuments } from '../../actions/searchActions';

/**
 * The search form
 * @class Searchbar
 * @extends {React.Component}
 */
export class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.submitSearch = this.submitSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Handles the character change to the search box
   * @param {object} event
   * @memberOf Searchbar
   */
  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  /**
   * Called when the search form submits
   * @param {object} event
   * @memberOf Searchbar
   */
  submitSearch(event) {
    event.preventDefault();
    if (location.pathname === '/manageusers') {
      this.props.searchUsers(this.state.search);
    } else {
      this.props.searchDocuments(this.state.search);
    }
  }

  /**
   * The searchbar
   * @returns {object} jsx to display the search form
   * @memberOf Searchbar
   */
  render() {
    return (
      <form onSubmit={this.submitSearch} className="searchbar">
        <TextInput
          id="search-bar"
          name="search"
          type="text"
          floatText={location.pathname === '/manageusers'
            ? 'Search Users' : 'Search Documents'}
          handleChange={this.handleChange}
          value={this.state.search}
        />
        <a onClick={this.submitSearch}>
          <i className="material-icons">search</i>
        </a>
      </form>
    );
  }
}
Searchbar.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  searchDocuments: PropTypes.func.isRequired
};

export default connect(null, { searchUsers, searchDocuments })(Searchbar);
