import React from "react";
import PropTypes from "prop-types";
import Box from "grommet/components/Box";

const HorizontalWithText = ({
  text = "",
  background = "#fff",
  color = "#ccc",
  lineColor = "#ccc"
}) => {
  const styles = {
    lineContainer: {
      width: "100%",
      textAlign: "center",
      margin: "10px 0px",
      borderBottom: `1px solid ${lineColor}`,
      lineHeight: "1px"
    },
    text: {
      backgroundColor: background,
      color: color,
      marginBottom: "-10px",
      padding: "10px"
    }
  };

  return (
    <Box align="center" style={styles.lineContainer} size="medium">
      <span style={styles.text}>{text}</span>
    </Box>
  );
};

HorizontalWithText.propTypes = {
  text: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  lineColor: PropTypes.string
};

export default HorizontalWithText;
