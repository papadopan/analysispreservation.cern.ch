import React from "react";
import PropTypes from "prop-types";

import Box from "grommet/components/Box";
import Button from "grommet/components/Button";
import Title from "grommet/components/Title";
import Paragraph from "grommet/components/Paragraph";

import Edit from "grommet/components/icons/base/Edit";

import FormLayer from "../components/FormLayer";

class LayerObjectFieldTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layerActive: false
    };
  }

  _onClick() {
    this.setState({ layerActive: true });
  }

  render() {
    if (this.props.idSchema["$id"] == "root") {
      return <Box>{this.props.properties.map(prop => prop.content)}</Box>;
    } else {
      return (
        <Box className="grommetux-form-field" direction="row" wrap={false}>
          {
            <FormLayer
              layerActive={this.state.layerActive}
              onClose={(() => {
                this.setState({ layerActive: false });
              }).bind(this)}
              properties={this.props.properties.map(prop => prop.content)}
            />
          }
          <Box flex={true}>
            <Title>
              {this.props.title}
              {this.props.required ? "*" : null}
            </Title>

            {this.props.description ? (
              <Paragraph size="small">{this.props.description}</Paragraph>
            ) : null}
          </Box>
          <Box justify="center">
            <Button
              icon={<Edit />}
              label="Edit"
              onClick={this._onClick.bind(this)}
            />
          </Box>
        </Box>
      );
    }
  }
}

LayerObjectFieldTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  required: PropTypes.bool,
  idSchema: PropTypes.object,
  uiSchema: PropTypes.object,
  properties: PropTypes.object
};

export default LayerObjectFieldTemplate;
