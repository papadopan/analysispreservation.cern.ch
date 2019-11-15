import React from "react";
import PropTypes from "prop-types";

import Box from "grommet/components/Box";
import Label from "grommet/components/Label";

let FieldHeader = function(props) {
  return props.title ? (
    <Box flex={true} style={{ overflow: "hidden" }}>
      <Label
        size={props.size ? props.size : "small"}
        uppercase={true}
        style={{
          fontWeight: props.strong ? 700 : 400,
          textDecoration: props.strong ? "underline" : null
        }}
      >
        {props.title}
      </Label>
    </Box>
  ) : null;
};

FieldHeader.propTypes = {
  title: PropTypes.string,
  strong: PropTypes.bool,
  size: PropTypes.bool
};

export default FieldHeader;
