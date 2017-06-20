import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
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
    if (location.pathname === '/users/manage') {
      this.props.searchUsers(this.state.search);
    } else {
      this.props.searchDocuments(this.state.search);
    }
  }

  render() {
    console.log('this.state.search', this.state.search);
    return (
      <form onSubmit={this.submitSearch} className="searchbar">
        <div class="input-field">
          <input
            name="search"
            type="text"
            placeholder="placeholder"
            id="search"
            onChange={this.handleChange}
            value={this.state.search}
          />
        </div>
        <input type="submit" value="Search"/>
      </form>
    );
  }
}

Searchbar.propTypes = {
  documents: PropTypes.array,
};

function mapStateToProps(state, ownProps) {
  return {
    documents: state.documents
  };
}

export default connect(mapStateToProps, { searchUsers, searchDocuments })(Searchbar);
