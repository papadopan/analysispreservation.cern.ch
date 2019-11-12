import React from "react";
import PropTypes from "prop-types";

import Box from "grommet/components/Box";
import Label from "grommet/components/Label";

let FieldHeader = function(props) {
  return props.title ? (
    <Box flex={true} style={{ overflow: "hidden" }}>
      <Label
        size="small"
        uppercase={true}
        style={{ fontWeight: props.strong ? 700 : 400 }}
      >
        {props.title}
      </Label>
    </Box>
  ) : null;
};

FieldHeader.propTypes = {
  title: PropTypes.string,
  strong: PropTypes.bool
};

export default FieldHeader;
