import React from "react";

import PropTypes from "prop-types";

import Box from "grommet/components/Box";
import Label from "grommet/components/Label";

import DepositAccess from "./DepositAccess";
import { Paragraph, Heading, Anchor } from "grommet";
import { connect } from "react-redux";
// Actions
import { toggleActionsLayer } from "../../../actions/draftItem";

import { AiOutlineNotification } from "react-icons/ai";

import ReactTooltip from "react-tooltip";

import Button from "../../partials/Button";

class DepositSettings extends React.Component {
  render() {
    let isDraft = this.props.status === "draft" ? true : false;
    let isPublishedOnce = this.props.recid ? true : false;

    return (
      <Box
        flex={true}
        size={{ width: "xxlarge" }}
        alignSelf="center"
        pad="small"
      >
        <Box
          flex={false}
          direction="row"
          wrap={false}
          margin={{ vertical: "small", bottom: "large" }}
        >
          <Box flex>
            <Heading tag="h3">Publish your analysis</Heading>
            <Paragraph margin="none">
              <strong>Publishing</strong> is the way to preserve your work
              within CAP (and CAP only). <br /> It makes a snapshot of
              everything that your analysis contains - metadata, files, plots,
              repositories - assigning to it an unique versioned identifier.{" "}
              <br /> All members of your collaboration can search and reference
              published content. <br />Once published analysis cannot be
              deleted, but can be modified and published again with a new
              version tag.
            </Paragraph>{" "}
          </Box>
          <Box flex align="center" justify="center">
            <React.Fragment>
              <Box align="center" pad={{ horizontal: "small" }} margin="small">
                <Box>
                  <Button
                    data-tip={
                      this.props.canUpdate
                        ? null
                        : "your account has no permissions to publish"
                    }
                    text={isPublishedOnce ? "Publish New Version" : "Publish"}
                    icon={<AiOutlineNotification size={18} />}
                    disabled={!this.props.canUpdate}
                    onClick={isDraft ? this.props.publishDraft : null}
                    primary
                  />
                </Box>
                <Box margin="small">
                  <Paragraph margin="none">
                    {isPublishedOnce ? (
                      <Box margin={{ top: "small" }}>
                        Latest Published Version
                        <Anchor
                          label={
                            <Label size="small" uppercase>
                              {this.props.recid}
                            </Label>
                          }
                          path={`/published/${this.props.recid}`}
                        />
                      </Box>
                    ) : (
                      <Anchor
                        label={
                          <Label size="medium" uppercase>
                            not published yet
                          </Label>
                        }
                        disabled
                      />
                    )}
                  </Paragraph>
                </Box>
                <ReactTooltip />
              </Box>
            </React.Fragment>
          </Box>
        </Box>
        <Box flex={true}>
          <DepositAccess />
        </Box>
      </Box>
    );
  }
}

DepositSettings.propTypes = {
  match: PropTypes.object,
  error: PropTypes.object,
  getDraftById: PropTypes.func,
  loading: PropTypes.bool,
  draft_id: PropTypes.string,
  draft: PropTypes.object,
  getUsers: PropTypes.func,
  permissions: PropTypes.array,
  publishDraft: PropTypes.func,
  status: PropTypes.string,
  recid: PropTypes.string,
  canUpdate: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    recid: state.draftItem.get("recid"),
    status: state.draftItem.get("status"),
    canUpdate: state.draftItem.get("can_update")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    publishDraft: () => dispatch(toggleActionsLayer("publish"))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositSettings);
