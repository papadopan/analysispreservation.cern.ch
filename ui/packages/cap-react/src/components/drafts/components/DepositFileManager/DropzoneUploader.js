import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Paragraph from "grommet/components/Paragraph";
import FormUploadIcon from "grommet/components/icons/base/FormUpload";

import prettyBytes from "pretty-bytes";

import HorizontalWithText from "../../../partials/HorizontalWithText";
import { uploadFile } from "../../../../actions/files";

import CleanForm from "../../form/CleanForm";

import Dropzone from "react-dropzone";

import { Label } from "grommet";
import FileUploadProgress from "./FileUploadProgress";

const schema = {
  type: "object",
  properties: {
    directory: {
      title: "Upload Directory",
      type: "string"
    },
    filename: {
      title: "Filename",
      type: "string"
    },
    file_tags: {
      title: "File tags",
      description:
        "Tag additional information. Format `label=value` ( label: letters, digits, undescores). ex my_label=Proof that 1+1=11",
      type: "string"
    }
  }
};

const uiSchema = {
  file_tags: {
    "ui:widget": "tags",
    "ui:options": { pattern: "^\\w{1,255}=(.{1,100})$", delimiter: ";" }
  }
};

class FileManager extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      formData: {}
    };
  }

  _transformErrors(errors) {
    return errors.map(error => {
      if (error.name === "pattern") {
        error.message = "Add a valid filename";
      }
      return error;
    });
  }

  _onSave = data => {
    if (data.errors.length > 0) this.setState({ errors: data.formData });
    else {
      this.setState({ formData: data.formData });
      let _uploadDir;
      if (data.formData && data.formData.directory) {
        _uploadDir =
          data.formData.directory.slice(-1) == "/"
            ? data.formData.directory
            : `${data.formData.directory}/`;
      }
      let filename = `${_uploadDir || ""}${data.formData.filename}`;

      let bucket_url = this.props.links.bucket;
      bucket_url = bucket_url.replace(".cern.ch/", ".cern.ch/api/");
      this.props.uploadFile(
        bucket_url,
        this.state.acceptedFiles[0],
        filename,
        data.formData.file_tags
      );
      this.setState({ acceptedFiles: null, formData: {} });
    }
  };

  clearFormData = () => {
    this.setState({ formData: {} });
  };

  _renderUploadDetails() {
    let { name, size } = this.state.acceptedFiles[0];
    return (
      <Box flex={true} pad="small" colorIndex="light-1">
        <CleanForm
          formRef={f => (this.formRef = f)}
          formData={{
            ...this.state.formData,
            filename: this.state.acceptedFiles[0].name
          }}
          schema={schema}
          uiSchema={uiSchema}
          transformErrors={this._transformErrors}
          onSubmit={this._onSave}
        >
          <Box
            direction="row"
            flex={true}
            pad={{ between: "small", vertical: "small" }}
            justify="end"
            align="center"
          >
            <Box flex={true}>
              <Box
                align="start"
                pad={{ horizontal: "small", vertical: "none" }}
                flex={false}
                justify="between"
                colorIndex="light-2"
                separator="all"
              >
                <Label size="small" margin="none">
                  <strong>File: </strong>
                  {name}
                </Label>
                <Label size="small" margin="none">
                  <strong>Size: </strong>
                  {prettyBytes(size)}
                </Label>
              </Box>
            </Box>
            <Box
              direction="row"
              flex={false}
              pad={{ between: "small" }}
              justify="end"
              align="center"
            >
              <Box
                align="center"
                pad="small"
                colorIndex="critical"
                onClick={() =>
                  this.setState({ acceptedFiles: null, formData: {} })
                }
              >
                Cancel
              </Box>
              <Box
                align="center"
                pad="small"
                colorIndex="brand"
                onClick={() => this.formRef.submit()}
              >
                Upload
              </Box>
            </Box>
          </Box>
        </CleanForm>
      </Box>
    );
  }

  _renderDropzone = () => (
    <Box>
      <Box flex={true}>
        <Dropzone
          style={styles.dropzone}
          multiple={false}
          onDrop={acceptedFiles => {
            this.setState({
              acceptedFiles,
              formData: {
                ...this.state.formData,
                filename: acceptedFiles[0].name
              }
            });
          }}
        >
          <Heading tag="h3" justify="center" align="center">
            <Box direction="row" justify="center" align="center">
              <FormUploadIcon size="medium" />
            </Box>
          </Heading>
          <Box justify="center" align="center" pad={{ between: "small" }}>
            <Paragraph margin="none">
              <strong>Drag and Drop your files here</strong>
            </Paragraph>
            <HorizontalWithText text="OR" color="#666" />
            <Box margin={{ top: "medium" }}>
              <Box colorIndex="brand" pad="small" margin="none">
                Browse Files
              </Box>
            </Box>
          </Box>
        </Dropzone>
      </Box>
    </Box>
  );

  render() {
    let _render = null;
    if (this.state.acceptedFiles) _render = this._renderUploadDetails();
    else _render = this._renderDropzone();

    return (
      <Box pad="large" colorIndex="light-1">
        <FileUploadProgress key="upload-progress" />
        {_render}
      </Box>
    );
  }
}

const styles = {
  dropzone: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    height: "100px",
    padding: "20px 0",
    backgroundColor: "#fff",
    borderRadius: "4px",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    cursor: "pointer"
  }
};

FileManager.propTypes = {
  links: PropTypes.object,
  uploadFile: PropTypes.func
};

function mapStateToProps(state) {
  return {
    links: state.draftItem.get("links")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uploadFile: (bucket_url, file, filename, tags) =>
      dispatch(uploadFile(bucket_url, file, filename, tags))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
