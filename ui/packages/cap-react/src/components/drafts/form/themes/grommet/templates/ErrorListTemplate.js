import React from "react";
import PropTypes from "prop-types";

import Box from "grommet/components/Box";
import Notification from "grommet/components/Notification";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";

export default function ErrorListTemplate(props) {
  const { errors } = props;

  return (
    <Box flex={true}>
      <Notification
        state={null}
        message="Please correct the marked fields below."
        timestamp={null}
        status="critical"
        closer={true}
      />
      <Box colorIndex="light-2">
        <List flex="true">
          {errors.map((error, i) => {
            return error.stack && error.stack.slice(-9) !== "undefined" ? (
              <ListItem key={i}>
                <Box flex={true}>{error.stack}</Box>
              </ListItem>
            ) : null;
          })}
        </List>
      </Box>
    </Box>
  );
}

ErrorListTemplate.propTypes = {
  errors: PropTypes.array
};
