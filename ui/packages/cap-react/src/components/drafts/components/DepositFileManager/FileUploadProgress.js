import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Box from "grommet/components/Box";
import FileUploadProgressItem from "./FileUploadProgressItem";

class FileManager extends React.Component {
  render() {
    return (
      <Box
        flex={false}
        style={{ maxHeight: "410px" }}
        margin={{ bottom: "small" }}
      >
        <Box flex={true}>
          {this.props.filesToUpload.toJS() &&
            Object.keys(this.props.filesToUpload.toJS()).map(file => (
              <FileUploadProgressItem key={file} file_key={file} />
            ))}
        </Box>
      </Box>
    );
  }
}

FileManager.propTypes = {
  filesToUpload: PropTypes.object
};

function mapStateToProps(state) {
  return {
    filesToUpload: state.draftItem.get("uploadFiles")
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
