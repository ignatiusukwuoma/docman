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
import handleError from '../../utils/errorHandler';

class EditDocumentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: Object.assign({}, props.document),
      error: {},
      saving: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    $('#select-box').on('change', this.handleChange);
  }

  componentWillReceiveProps(nextProps) {
    // debugger;
    if (this.state.document.id !== nextProps.document.id) {
      this.setState({ document: Object.assign({}, nextProps.document) });
    }
  }

  handleChange(event) {
    const document = this.state.document;
    document[event.target.name] = event.target.value.substr(0, 60);
    // debugger;
    this.setState({ document });
  }

  handleEditorChange(event) {
    const document = this.state.document;
    document.content = event.target.getContent();
    // debugger;
    this.setState({ document });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.updateDocument(this.state.document)
    .then(() => this.redirect())
    .catch((error) => {
      this.setState({ saving: false });
      handleError(error);
    });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Document updated successfully');
    this.context.router.push('/home');
  }

  render() {
    return (
      <div class="edit-document-page">
        <div className="row">
          <div className="col s12 m4 l3">
            <Sidebar />
          </div>
          <div className="col s12 m8 l9">
            <div className="create-document container center-align">
              <h2>Edit Document</h2>
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
                    value={this.state.document.title}
                  />
                </div>
                <div className="select-input">
                  <SelectInput
                    id="select-box"
                    name="access"
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
  const documentToUpdate = allDocuments.filter(eachDocument => eachDocument.id === Number(id));
  // debugger;
  if (documentToUpdate) return documentToUpdate[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  console.log('state', state);
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
    document: documentToEdit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDocumentPage);
