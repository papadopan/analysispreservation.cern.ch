import React from "react";
import PropTypes from "prop-types";

import Anchor from "grommet/components/Anchor";
import Box from "grommet/components/Box";

import AddIcon from "grommet/components/icons/base/Add";

import { Route } from "react-router-dom";

import TreeNode from "./TreeNode";

import { arrangeIntoTree } from "./utils";
import HorizontalWithText from "../../../partials/HorizontalWithText";
import { DRAFT_EDIT } from "../../../Routes/paths";

import { filter } from "lodash";
import RepoTree from "./RepoTree";
class FileTree extends React.Component {
  constructor(props) {
    super(props);
    let data = this.constructTree(props.files);
    this.state = { data };
  }

  componentWillReceiveProps(nextProps) {
    let data = this.constructTree(nextProps.files);
    this.setState({ data });
  }

  _renderAddFileIcon() {
    return (
      <Route
        path={DRAFT_EDIT}
        render={() => (
          <Anchor
            onClick={this.props.toggleFilemanagerLayer}
            size="xsmall"
            icon={<AddIcon />}
          />
        )}
      />
    );
  }

  onToggle = (node, toggled) => {
    const { cursor, data } = this.state;
    if (cursor) {
      this.setState(() => ({ cursor, active: false }));
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState(() => ({ cursor: node, data: Object.assign({}, data) }));
  };

  constructTree = data => {
    let paths = [];

    Object.keys(data).map(k => {
      paths.push([k.split("/"), data[k]]);
    });

    let children = arrangeIntoTree(paths);

    return { children };
  };

  render() {
    let repos = filter(this.state.data.children, { name: "repositories" });
    let allFiles = {
      children: filter(
        this.state.data.children,
        item => item.name != "repositories"
      )
    };

    return (
      <Box style={{ marginLeft: "5px" }}>
        <HorizontalWithText
          text="All Files"
          background={this.props.background}
          color={this.props.color}
        />
        {allFiles.children && allFiles.children.length > 0 ? (
          <TreeNode
            data={allFiles}
            onDirectoryClick={this.props.onDirectoryClick}
            onFileClick={this.props.onFileClick}
            root
          />
        ) : (
          <Box flex={true} pad="small" justify="center" align="center">
            No files added yet
          </Box>
        )}
        <HorizontalWithText
          text="All Repositories"
          background={this.props.background}
          color={this.props.color}
        />
        <RepoTree
          repos={repos}
          onDirectoryClick={this.props.onDirectoryClick}
          onFileClick={this.props.onFileClick}
        />
      </Box>
    );
  }
}

FileTree.propTypes = {
  showSidebar: PropTypes.bool,
  toggleFilemanagerLayer: PropTypes.func,
  id: PropTypes.string,
  match: PropTypes.object,
  files: PropTypes.object,
  background: PropTypes.string,
  color: PropTypes.string,
  onFileClick: PropTypes.func,
  onDirectoryClick: PropTypes.func
};

export default FileTree;
