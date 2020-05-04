import React from "react";
// import PropTypes from "prop-types";

import Box from "grommet/components/Box";

import SelectContentType from "../../containers/SelectContentType";
import CreateContentType from "../../containers/CreateContentType";

class CMSIndex extends React.Component {
  render() {
    return (
      <Box
        flex={true}
        colorIndex="grey-3-a"
        justify="around"
        align="center"
        direction="row"
      >
        <SelectContentType />
        <CreateContentType />
      </Box>
    );
  }
}

export default CMSIndex;
