import React from "react";
import PropTypes from "prop-types";

import Box from "grommet/components/Box";

import AccordionFieldTemplate from "./AccordionObjectField";
import TabField from "./TabField";
import LayerObjectFieldTemplate from "./LayerObjectFieldTemplate";

import FieldHeader from "../components/FieldHeader";

let ObjectFieldTemplate = function(props) {
  //let { uiSchema: { uiOptions = {} } = {} } = props;

  let sizeProps = {};
  if (props.uiSchema["ui:options"] && props.uiSchema["ui:options"].size) {
    sizeProps.size = props.uiSchema["ui:options"].size;
  }
  if (
    props.idSchema.$id == "root" &&
    props.uiSchema["ui:object"] != "tabView"
  ) {
    return (
      <Box
        style={{
          display: "grid",
          justifyContent:
            props.uiSchema["ui:options"] && props.uiSchema["ui:options"].align
              ? props.uiSchema["ui:options"].align
              : "center"
        }}
        className="obj-fld-tml"
      >
        <Box {...sizeProps}>
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridColumnGap: "10px",
              maxWidth: "100%"
            }}
            id="overview-container-readonly"
          >
            {props.properties.map(prop => prop.content)}
          </Box>
        </Box>
      </Box>
    );  
  }

  if (!("ui:object" in props.uiSchema)) {
    return (
      <Box
        className={
          props.formContext.isPublished
            ? "published-array obj-fld-tml"
            : "obj-fld-tml"
        }
        style={{
          "padding": "3px!important"
        }}
      >


        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gridColumnGap: "1fr",
            maxWidth: "100%"
          }}
        >
          {props.properties.map(prop => prop.content)}
        </Box>
      </Box>
    );
  } else {
    if (props.uiSchema["ui:object"] == "layerObjectField") {
      return <LayerObjectFieldTemplate {...props} />;
    } else if (props.uiSchema["ui:object"] == "accordionObjectField") {
      return <AccordionFieldTemplate {...props} />;
    } else if (props.uiSchema["ui:object"] == "tabView") {
      return <TabField {...props} />;
    } else {
      return (
        <div {...props}>
          This object( <i>{props.title}</i>) can NOT be rendered.. Check
          implementaion
        </div>
      );
    }
  }
};

ObjectFieldTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  required: PropTypes.bool,
  idSchema: PropTypes.object,
  uiSchema: PropTypes.object,
  properties: PropTypes.array,
  schema: PropTypes.object
};

export default ObjectFieldTemplate;
