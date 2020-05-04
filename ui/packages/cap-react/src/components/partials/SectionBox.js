import React from "react";
import PropTypes from "prop-types";

import MoreIcon from "grommet/components/icons/base/More";

import ReactTooltip from "react-tooltip";

import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";

function SectionBox(props) {
  let { headerActions, header = "", body, emptyMessage = null, more } = props;

  return (
    <Box flex={false} margin={{ bottom: "small" }}>
      <Box pad="none">
        <Box
          flex={false}
          direction="row"
          pad={{ vertical: "small" }}
          justify="between"
          responsive={false}
        >
          <Heading
            tag="h5"
            uppercase={true}
            align="start"
            justify="center"
            margin="none"
            truncate={true}
            data-tip={emptyMessage}
          >
            {header}
          </Heading>
          <Box direction="row">{headerActions}</Box>
        </Box>
        <ReactTooltip />
      </Box>

      <Box
        colorIndex="light-2"
        flex={false}
        size={{ height: { max: "large" } }}
      >
        {body}
      </Box>
      {more && (
        <Box flex={false} justify="center" align="center">
          <MoreIcon />
        </Box>
      )}
    </Box>
  );
}

SectionBox.propTypes = {
  header: PropTypes.string,
  more: PropTypes.string,
  body: PropTypes.node,
  headerActions: PropTypes.node,
  emptyMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object
};

export default SectionBox;
