import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Box from "grommet/components/Box";
import Button from "grommet/components/Button";
import Layer from "grommet/components/Layer";
import Paragraph from "grommet/components/Paragraph";

import {
  publishDraft,
  discardDraft,
  deleteDraft,
  toggleActionsLayer
  // togglePreviewer
} from "../../../actions/draftItem";

class DraftActionsLayer extends React.Component {
  renderAction(action) {
    switch (action) {
      // case "save":
      //   this.props.saveData();
      //   this.props.toggleActionsLayer();
      //   break;
      case "publish":
        this.props.publishDraft(this.props.draft_id);
        this.props.toggleActionsLayer();
        break;
      case "delete":
        this.props.deleteDraft(this.props.draft_id);
        this.props.toggleActionsLayer();
        break;
      case "discard":
        this.props.discardDraft(this.props.draft_id);
        this.props.toggleActionsLayer();
        break;
    }
  }

  renderMessage(action) {
    switch (action) {
      // case "save":
      //   return (
      //     <Paragraph>Are you sure you want to save your changes?</Paragraph>
      //   );
      case "publish":
        return (
          <Paragraph>
            Your analysis will now be visible to all members of collaboration.
            Proceed?
          </Paragraph>
        );
      case "delete":
        return (
          <Paragraph>
            This will <b>permanently</b> delete this analysis and all related
            data (<b>including files and workflows</b>).<br />
            <br />
            Already published versions of the analysis <b>will not</b> be
            affected.<br />
            <br />
            <b>Are you sure you want to delete this draft?</b>{" "}
          </Paragraph>
        );
      case "discard":
        return (
          <Paragraph>
            Discard changes to the previous published version?
          </Paragraph>
        );
    }
  }

  render() {
    return this.props.actionsLayer ? (
      <Layer
        closer={true}
        align="center"
        flush={true}
        overlayClose={true}
        onClose={this.props.toggleActionsLayer}
      >
        <Box
          justify="center"
          flex={true}
          wrap={false}
          pad="medium"
          size="medium"
        >
          <Box pad="small" alignContent="center">
            {this.renderMessage(this.props.type)}
          </Box>
          <Box direction="row" justify="center" align="center">
            <Box>
              <Button
                label="Yes"
                primary={true}
                onClick={() => this.renderAction(this.props.type)}
              />
            </Box>
            <Box colorIndex="grey-4-a" margin="small">
              <Button
                label="Cancel"
                onClick={() => this.props.toggleActionsLayer()}
              />
            </Box>
          </Box>
        </Box>
      </Layer>
    ) : null;
  }
}

DraftActionsLayer.propTypes = {
  actionsLayer: PropTypes.bool,
  schemaId: PropTypes.object,
  // saveData: PropTypes.func,
  publishData: PropTypes.func,
  deleteDraft: PropTypes.func,
  discardData: PropTypes.func,
  type: PropTypes.string,
  toggleActionsLayer: PropTypes.func,
  publishDraft: PropTypes.func,
  discardDraft: PropTypes.func,
  draft_id: PropTypes.string
};

function mapStateToProps(state) {
  return {
    actionsLayer: state.draftItem.get("actionsLayer"),
    type: state.draftItem.get("actionsLayerType"),
    draft_id: state.draftItem.get("id")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleActionsLayer: () => dispatch(toggleActionsLayer()),
    publishDraft: draft_id => dispatch(publishDraft(draft_id)),
    deleteDraft: draft_id => dispatch(deleteDraft(draft_id)),
    discardDraft: draft_id => dispatch(discardDraft(draft_id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftActionsLayer);
