import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import TinyMCE from 'react-tinymce';
import FlatButton from 'material-ui/FlatButton';
import { createDocument } from '../../actions/documentActions';
import * as validator from '../../utils/validator';
import handleError from '../../utils/errorHandler';
import SelectInput from '../forms/SelectInput.jsx';
import TextInput from '../forms/TextInput.jsx';
import Sidebar from '../layouts/Sidebar.jsx';


class NewDocumentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: {
        title: '',
        access: '',
        content: ''
      },
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
    const document = this.state.document;
    document[event.target.name] = event.target.value.substr(0, 60);
    this.setState({ document });
  }

  handleEditorChange(event) {
    const document = this.state.document;
    document.content = event.target.getContent();
    this.setState({ document });
  }

  onSubmit(event) {
    event.preventDefault();
    const { valid, errors } = validator
      .documentValidator(this.state.document);
    if (valid) {
      this.setState({ saving: true });
      this.props.createDocument(this.state.document)
      .then(() => this.redirect())
      .catch((error) => {
        this.setState({ saving: false });
        handleError(error);
      });
    } else {
      this.setState({ errors });
    }
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Document added successfully');
    this.context.router.push('/home');
  }

  render() {
    return (
      <div className="new-document-page">
        <div className="row">
          <div className="col s12 m4 l3">
            <Sidebar />
          </div>
          <div className="col s12 m8 l9">
            <div className="create-document container center-align">
              <h3>Create New Document</h3>
              <form onSubmit={this.onSubmit}>
                <div>
                  <TextInput
                    name="title"
                    type="text"
                    errorText={this.state.errors.title}
                    floatText="Title"
                    handleChange={this.handleChange}
                    value={this.state.document.title}
                  />
                </div>
                <div className="select-input">
                  <SelectInput
                    id="select-box"
                    name="access"
                    error={this.state.errors.access}
                    handleChange={this.handleChange}
                    value={this.state.document.access}
                  />
                </div>
                <div className="tiny-mce">
                  <TinyMCE
                    content={this.state.document.content}
                    config={{
                      plugins: 'link image code',
                      toolbar: 'undo redo | bold italic |\
                      alignleft aligncenter alignright | code'
                    }}
                    onChange={this.handleEditorChange}
                  />
                </div>
                {this.state.errors.content
                && <div className="red-text">
                  {this.state.errors.content}
                </div>}
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

NewDocumentPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { createDocument })(NewDocumentPage);
