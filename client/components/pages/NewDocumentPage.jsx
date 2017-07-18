import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import TinyMCE from 'react-tinymce';
import FlatButton from 'material-ui/FlatButton';
import { createDocument } from '../../actions/documentActions';
import * as validate from '../../utils/validate';
import handleError from '../../utils/errorHandler';
import SelectInput from '../forms/SelectInput.jsx';
import TextInput from '../forms/TextInput.jsx';
import Sidebar from '../layouts/Sidebar.jsx';

/**
 * The Create New Document Page
 * @class NewDocumentPage
 * @extends {React.Component}
 */
export class NewDocumentPage extends React.Component {
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

  /**
   * Initializes the select box
   * @memberOf NewDocumentPage
   */
  componentDidMount() {
    $('select').material_select();
    $('#select-box').on('change', this.handleChange);
  }

  /**
   * Sets the text and select input fields to state
   * @param {object} event
   * @memberOf NewDocumentPage
   */
  handleChange(event) {
    const document = this.state.document;
    document[event.target.name] = event.target.value.substr(0, 60);
    this.setState({ document });
  }

  /**
   * Sets the TinyMCE editor input to state
   * @param {object} event
   * @memberOf NewDocumentPage
   */
  handleEditorChange(event) {
    const document = this.state.document;
    document.content = event.target.getContent();
    this.setState({ document });
  }

  /**
   * Submits the form to create a new document
   * @param {object} event
   * @memberOf NewDocumentPage
   */
  onSubmit(event) {
    event.preventDefault();
    const { valid, errors } = validate.document(this.state.document);
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

  /**
   * Called after a new document has been saved
   * @memberOf NewDocumentPage
   */
  redirect() {
    this.setState({ saving: false });
    toastr.success('Document added successfully');
    this.context.router.push('/home/');
  }

  /**
   * Renders the create new document form
   * @returns {object} jsx
   * @memberOf NewDocumentPage
   */
  render() {
    const { errors, document, saving } = this.state;
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
                    id="document-title"
                    name="title"
                    type="text"
                    errorText={errors.title}
                    floatText="Title"
                    handleChange={this.handleChange}
                    value={document.title}
                  />
                </div>
                <div className="select-input">
                  <SelectInput
                    id="select-box"
                    name="access"
                    error={errors.access}
                    handleChange={this.handleChange}
                    value={document.access}
                  />
                </div>
                <div className="tiny-mce">
                  <TinyMCE
                    content={document.content}
                    config={{
                      plugins: 'link image code',
                      toolbar: 'undo redo | bold italic |\
                      alignleft aligncenter alignright | code'
                    }}
                    onChange={this.handleEditorChange}
                  />
                </div>
                {errors.content
                && <div className="red-text small">
                  {errors.content}
                </div>}
                <div className="btn-create">
                  <FlatButton
                    backgroundColor="#26a69a"
                    hoverColor="#8AA62F"
                    id="create-document-button"
                    disable={saving}
                    label={saving
                    ? 'Creating' : 'Create New Document'}
                    onClick={this.onSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
NewDocumentPage.propTypes = {
  createDocument: PropTypes.func.isRequired
};

NewDocumentPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { createDocument })(NewDocumentPage);
