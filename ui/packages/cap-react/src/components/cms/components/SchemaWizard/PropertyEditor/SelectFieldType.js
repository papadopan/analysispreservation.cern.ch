import React from "react";

import Box from "grommet/components/Box";
import Paragraph from "grommet/components/Paragraph";
import Heading from "grommet/components/Heading";

import DraggableBox from "./DraggableBox";

import { PropTypes } from "prop-types";

import fields from "../../utils/fieldTypes";
import { Anchor } from "grommet";
import Download from "grommet/components/icons/base/Download";

class SelectFieldType extends React.Component {
  _onClick = type => {
    let { path: schemaPath, uiPath: uiSchemaPath } = this.props.path.toJS();
    let schema = this.props.schema ? this.props.schema.toJS() : {};
    let uiSchema = this.props.uiSchema ? this.props.uiSchema.toJS() : {};
    let { ["properties"]: properties, ...rest } = schema;
    let { ...uiRest } = uiSchema;

    //TODO: handle type change between objects <-> array by keeping properties

    let newType = type.default.schema.type;
    if (newType == "object") {
      schema = { ...rest, ...type.default.schema };
      uiSchema = { ...uiRest, ...type.default.uiSchema };
    } else if (newType == "array")
      schema = {
        ...rest,
        ...type.default.schema,
        ...{ items: { type: "object", properties: properties } }
      };
    else schema = { ...rest, ...type.default.schema };

    this.props.selectFieldType(
      { schema: schemaPath, uiSchema: uiSchemaPath },
      { schema, uiSchema }
    );
  };

  _getSchema() {
    const fileData = JSON.stringify(
      {
        schema: this.props.schema.toJS(),
        uiSchema: this.props.uiSchema.toJS()
      },
      null,
      4
    );

    const blob = new Blob([fileData], { type: "text/json" });
    const url = URL.createObjectURL(blob);

    return url;
  }

  render() {
    return (
      <Box flex={false} size="medium" colorIndex="grey-2" pad="medium">
        <Paragraph>
          Select the field type you want to use and drag and drop it to the
          desired location in the form
        </Paragraph>
        <Box flex={true}>
          {Object.entries(fields).map(([key, type]) => (
            <Box key={key}>
              <Heading tag="h4">{type.title}</Heading>
              <Box
                direction="row"
                flex={false}
                wrap={true}
                justify="start"
                align="between"
                margin={{ bottom: "large" }}
              >
                {Object.entries(type.fields).map(([key, type], index) => (
                  <Box basis="1/2" key={key}>
                    <DraggableBox data={type} key={index}>
                      <Box
                        onClick={this._onClick.bind(this, type)}
                        flex={false}
                        pad={{ horizontal: "small" }}
                        direction="row"
                        justify="between"
                        align="center"
                      >
                        {type.title}
                      </Box>
                    </DraggableBox>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
        {this.props.selected &&
          this.props.selected.id && (
            <Box align="center">
              <Anchor
                label="Export Schema"
                download={`schema_${this.props.selected.id}.json`}
                href={this._getSchema()}
                icon={<Download size="small" />}
              />
            </Box>
          )}
      </Box>
    );
  }
}

SelectFieldType.propTypes = {
  selectFieldType: PropTypes.func,
  path: PropTypes.array,
  propKey: PropTypes.string,
  schema: PropTypes.object,
  uiSchema: PropTypes.object,
  selected: PropTypes.object
};

export default SelectFieldType;
