import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextInput from '../forms/TextInput.jsx';
import { searchUsers, searchDocuments } from '../../actions/searchActions';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.submitSearch = this.submitSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  submitSearch(event) {
    event.preventDefault();
    if (location.pathname === '/manageusers') {
      this.props.searchUsers(this.state.search);
    } else {
      this.props.searchDocuments(this.state.search);
    }
  }

  render() {
    return (
      <form onSubmit={this.submitSearch} className="searchbar">
        <TextInput
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

function mapStateToProps(state, ownProps) {
  return {
    documents: state.documents
  };
}

export default connect(mapStateToProps,
{ searchUsers, searchDocuments })(Searchbar);
