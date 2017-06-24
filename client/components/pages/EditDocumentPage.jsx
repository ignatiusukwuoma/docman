import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import TinyMCE from 'react-tinymce';
import FlatButton from 'material-ui/FlatButton';
import { documentValidator } from '../../utils/validator';
import SelectInput from '../forms/SelectInput.jsx';
import TextInput from '../forms/TextInput.jsx';
import Sidebar from '../layouts/Sidebar.jsx';
import * as documentActions from '../../actions/documentActions';
import handleError from '../../utils/errorHandler';

/**
 * Control the edit document page
 * @class EditDocumentPage
 * @extends {React.Component}
 */
class EditDocumentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: Object.assign({}, props.document),
      errors: {},
      saving: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  /**
   * Initialises the select box
   * @memberOf EditDocumentPage
   */
  componentDidMount() {
    $('select').material_select();
    $('#select-box').on('change', this.handleChange);
  }

  /**
   * Add props to state
   * @param {object} nextProps
   * @memberOf EditDocumentPage
   */
  componentWillReceiveProps(nextProps) {
    if (this.state.document.id !== nextProps.document.id) {
      this.setState({ document: Object.assign({}, nextProps.document) });
    }
  }

  /**
   * Handle the change event for the title and access fields
   * @param {object} event
   * @memberOf EditDocumentPage
   */
  handleChange(event) {
    const document = this.state.document;
    document[event.target.name] = event.target.value.substr(0, 60);
    // debugger;
    this.setState({ document });
  }

  /**
   * Handles the change event for the content field
   * @param {object} event
   * @memberOf EditDocumentPage
   */
  handleEditorChange(event) {
    const document = this.state.document;
    document.content = event.target.getContent();
    // debugger;
    this.setState({ document });
  }

  /**
   * Submits the edited document
   * @param {object} event
   * @memberOf EditDocumentPage
   */
  onSubmit(event) {
    event.preventDefault();
    const { valid, errors } = documentValidator(this.state.document);
    if (valid) {
      this.setState({ saving: true });
      this.props.actions.updateDocument(this.state.document)
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
   * Called after form is submitted
   * @memberOf EditDocumentPage
   */
  redirect() {
    this.setState({ saving: false });
    toastr.success('Document updated successfully');
    this.context.router.push('/home');
  }

  /**
   * Renders the edit document form
   * @returns {object} jsx
   * @memberOf EditDocumentPage
   */
  render() {
    return (
      <div className="new-document-page">
        <div className="row">
          <div className="col s12 m4 l3">
            <Sidebar />
          </div>
          <div className="col s12 m8 l9">
            <div className="create-document container center-align">
              <h3>Edit Document</h3>
              <form onSubmit={this.onSubmit}>
                <div>
                  <TextInput
                    id="document-title"
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
                  disable={this.props.saving}
                  label={this.props.saving ? 'Updating' : 'Update Document'}
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

EditDocumentPage.propTypes = {
  documents: PropTypes.array,
  document: PropTypes.object.isRequired
};

EditDocumentPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function getDocumentById(allDocuments, id) {
  const documentToUpdate = allDocuments
    .filter(eachDocument => eachDocument.id === Number(id));
  if (documentToUpdate) {
    return documentToUpdate[0];
  }
  return null;
}

function mapStateToProps(state, ownProps) {
  const documentId = ownProps.params.id;
  const documentToEdit = {};
  let currentDocument;
  if (documentId && state.documents.length > 0) {
    currentDocument = getDocumentById(state.documents, documentId);
    documentToEdit.id = currentDocument.id;
    documentToEdit.title = currentDocument.title;
    documentToEdit.access = currentDocument.access;
    documentToEdit.content = currentDocument.content;
  }
  return {
    document: documentToEdit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDocumentPage);
