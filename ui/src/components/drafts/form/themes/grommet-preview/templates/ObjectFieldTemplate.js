import React from "react";
import PropTypes from "prop-types";

import Box from "grommet/components/Box";
import FieldHeader from "../components/FieldHeader";
import Heading from "grommet/components/Heading";

let ObjectFieldTemplate = function(props) {
  const { properties, title, uiSchema, idSchema, formData } = props;

  function allPropsEmpty(obj) {
    for (var key in obj) if (obj[key] !== undefined) return false;
    return true;
  }

  if (allPropsEmpty(formData)) return null;

  if (idSchema.$id == "root") {
    return <Box flex={true}>{properties.map(prop => prop.content)}</Box>;
  }

  if (!("ui:object" in uiSchema)) {
    return (
      <Box flex={true}>
        <Box>
          <FieldHeader title={title} strong />
        </Box>
        <Box>{properties.map(prop => prop.content)}</Box>
      </Box>
    );
  } else {
    return (
      <Box flex={true} colorIndex="neutral-1" pad="small">
        <Box margin={{ vertical: "small" }} separator="bottom">
          <Heading uppercase={true} tag="h3" strong={false}>
            {title}
          </Heading>
        </Box>
        {properties.map(prop => prop.content)}
      </Box>
    );
  }
};

ObjectFieldTemplate.propTypes = {
  title: PropTypes.string,
  idSchema: PropTypes.object,
  uiSchema: PropTypes.object,
  properties: PropTypes.array
};

export default ObjectFieldTemplate;
