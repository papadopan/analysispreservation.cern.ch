import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Switch, Route, withRouter } from "react-router-dom";

import { Box } from "grommet";

import DraftHeader from "./components/DraftHeader";

// Draft containers
import DraftIntegrations from "./components/DraftIntegrations";
import DraftWorkflows from "../workflows";
import DraftSettings from "./components/DepositSettings";
import DraftPreview from "./DraftPreview";
import DraftEditor from "./DraftEditor";

import Sidebar from "./components/DepositSidebar";

import PermissionDenied from "../errors/403";

// Actions
import { getDraftByIdAndInitForm } from "../../actions/draftItem";

import DraftsItemNav from "./DraftsItemNav";

class DraftsItemIndex extends React.Component {
  constructor(props) {
    super(props);

    // Create the ref for the form
    this.formRef = React.createRef();
  }

  componentDidMount() {
    let { draft_id } = this.props.match.params;

    if (draft_id == this.props.id) return;
    if (draft_id) {
      this.props.getDraftById(draft_id);
    }
  }

  render() {
    if (this.props.errors && [403, 404].indexOf(this.props.errors.status) > -1)
      return (
        <PermissionDenied
          status={this.props.errors.status}
          message={this.props.errors.message}
        />
      );

    let { draft_id } = this.props.match.params;

    return (
      <Box flex={true} wrap={false} colorIndex="grey-3">
        <DraftHeader formRef={this.formRef} />
        <Box flex={true} direction="row">
          <DraftsItemNav />

          <Box flex={true} direction="row" className="lg-column">
            <Box flex={true} colorIndex="light-1" style={{ margin: "5px" }}>
              <Switch>
                <Route
                  exact
                  path={`/drafts/:draft_id`}
                  component={DraftPreview}
                />
                <Route
                  path={`/drafts/:draft_id/edit`}
                  render={props => (
                    <DraftEditor {...props} formRef={this.formRef} />
                  )}
                />} />
                <Route
                  path={`/drafts/:draft_id/settings`}
                  component={DraftSettings}
                />
                <Route
                  path={`/drafts/:draft_id/integrations`}
                  component={DraftIntegrations}
                />
                <Route
                  path={`/drafts/:draft_id/workflows`}
                  render={props => (
                    <DraftWorkflows draft_id={draft_id} {...props} />
                  )}
                />
              </Switch>
            </Box>
            <Sidebar />
          </Box>
        </Box>
      </Box>
    );
  }
}

DraftsItemIndex.propTypes = {
  getDraftById: PropTypes.func,
  match: PropTypes.object.isRequired,
  status: PropTypes.string,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  message: PropTypes.string,
  draft_id: PropTypes.string,
  id: PropTypes.string,
  recid: PropTypes.string
};

function mapStateToProps(state) {
  return {
    id: state.draftItem.get("id"),
    status: state.draftItem.get("status"),
    errors: state.draftItem.get("errors"),
    recid: state.draftItem.get("recid")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDraftById: id => dispatch(getDraftByIdAndInitForm(id))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DraftsItemIndex)
);
