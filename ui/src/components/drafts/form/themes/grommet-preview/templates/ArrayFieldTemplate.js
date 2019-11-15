import React from "react";
import PropTypes from "prop-types";

import Box from "grommet/components/Box";

import DefaultArrayField from "./DefaultArrayField";
import StringArrayField from "./StringArrayField";
import FieldHeader from "../components/FieldHeader";

let ArrayFieldTemplate = function(props) {
  const { items, uiSchema, title } = props;

  if (items.length === 0) return null;

  if (uiSchema["ui:array"] === "StringArrayField") {
    return (
      <Box flex={true} direction="row" align="center">
        <Box flex size={{ width: "medium" }}>
          <FieldHeader title={title} />
        </Box>
        <Box flex>
          <StringArrayField {...props} />
        </Box>
      </Box>
    );
  } else
    return (
      <Box flex={true} pad="small">
        <Box flex margin={{ vertical: "small" }}>
          <FieldHeader title={title} strong />
        </Box>
        <Box flex>
          <DefaultArrayField {...props} />
        </Box>
      </Box>
    );
};

ArrayFieldTemplate.propTypes = {
  uiSchema: PropTypes.object,
  schema: PropTypes.object,
  onAddClick: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  required: PropTypes.bool
};

export default ArrayFieldTemplate;
