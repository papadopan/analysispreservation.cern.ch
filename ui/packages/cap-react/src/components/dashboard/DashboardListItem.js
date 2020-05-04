import React from "react";
import { connect } from "react-redux";

import ReactTooltip from "react-tooltip";

import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Label from "grommet/components/Label";

import ListItem from "grommet/components/ListItem";

import TimeAgo from "react-timeago";

import { push } from "connected-react-router";

import PropTypes from "prop-types";

function DashboardListItem(props) {
  let {
    id,
    // is_owner,
    // can_admin,
    // can_update,
    metadata = {},
    updated
  } = props.item;
  let {
    general_title = "Untitled",
    basic_info: { abstract = "" } = {}
  } = metadata;

  let itemUrl =
    props.listType == "draft" ? `/drafts/${id}` : `/published/${id}`;
  return (
    <ListItem key={`${id}`} onClick={() => props.push(itemUrl)}>
      <Box
        justify="between"
        direction="row"
        style={{
          overflow: "visible"
        }}
        flex
      >
        <Box margin={{ right: "medium" }} style={{ overflow: "visible" }} flex>
          <Box direction="row">
            <Heading tag="h6" margin="none" truncate>
              {general_title}
            </Heading>
            <ReactTooltip />
          </Box>
          <Box flex={true} style={{ overflow: "visible" }}>
            <Label
              size="small"
              margin="none"
              truncate
              style={{ color: abstract ? "none" : "lightgrey" }}
            >
              {abstract || "No abstract provided"}
            </Label>
          </Box>
        </Box>

        <Box
          flex={false}
          justify="center"
          textAlign="right"
          style={{ color: "#ccc", fontWeight: "light" }}
        >
          <span>updated</span>
          <TimeAgo date={updated} minPeriod="60" />
        </Box>
      </Box>
    </ListItem>
  );
}

DashboardListItem.propTypes = {
  listType: PropTypes.string,
  item: PropTypes.object,
  push: PropTypes.func
};

function mapStateToProps(state) {
  return {
    currentUser: state.auth.getIn(["currentUser", "profile", "email"])
  };
}

export default connect(
  mapStateToProps,
  { push }
)(DashboardListItem);
