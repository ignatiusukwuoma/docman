import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import TinyMCE from 'react-tinymce';
import FlatButton from 'material-ui/FlatButton';
import SelectInput from '../forms/SelectInput.jsx';
import TextInput from '../forms/TextInput.jsx';
import Sidebar from '../layouts/Sidebar.jsx';
import * as documentActions from '../../actions/documentActions';
import * as validator from '../../utils/validator';
import handleError from '../../utils/errorHandler';

class DocumentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: '',
      access: '',
      content: '',
      saving: false,
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    $('#select-box').on('change', this.handleChange);
  }

  handleChange(event) {
    console.log('Value', event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleEditorChange(event) {
    this.setState({ content: event.target.getContent() });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.createDocument(this.state)
    .then(() => this.redirect())
    .catch((error) => {
      this.setState({ saving: false });
      handleError(error);
    });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Document added successfully');
    this.context.router.push('/home');
  }

  render() {
    return (
      <div class="documentPage">
        <div className="row">
          <Sidebar />
          <div className="col s12 m8 l9">
            <div className="create-document container center-align">
              <h2>Create New Document</h2>
              <form onSubmit={this.onSubmit}>
                <div>
                  <TextInput
                    fullWidth
                    name="title"
                    type="text"
                    errorText=""
                    floatText="Title"
                    hint="Title of the document"
                    handleChange={this.handleChange}
                    value={this.state.title}
                  />
                </div>
                <div className="select-input">
                  <SelectInput
                    id="select-box"
                    name="access"
                    handleChange={this.handleChange}
                    value={this.state.access}
                  />
                </div>
                <div className="tiny-mce">
                  <TinyMCE
                    content={this.state.content}
                    config={{
                      plugins: 'link image code',
                      toolbar: 'undo redo | bold italic |\
                      alignleft aligncenter alignright | code'
                    }}
                    onChange={this.handleEditorChange}
                  />
                </div>
                <FlatButton
                  backgroundColor="#a4c639"
                  hoverColor="#8AA62F"
                  disable={this.state.saving}
                  label={this.state.saving ? 'Creating' : 'Create New Document'}
                  onClick={this.onSubmit}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DocumentPage.propTypes = {
  actions: PropTypes.object.isRequired,
};

DocumentPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    documents: state.documents,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
