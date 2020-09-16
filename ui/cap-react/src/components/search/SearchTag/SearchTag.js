import React from "react";
import PropTypes from "prop-types";
import Box from "grommet/components/Box";

import Tag from "./Tag";

const SearchTag = ({
  onClick,
  params = undefined,
  anatype,
  removeAnatype,
  removeQuery
}) => {
  if (!params) return null;

  const query = params["q"];

  // if there are more than one types selected it will return an array
  const types = Array.isArray(params["type"])
    ? params["type"]
    : params["type"]
      ? [params["type"]]
      : undefined;

  delete params["q"];
  delete params["type"];

  return (
    <Box
      direction="row"
      responsive={false}
      align="center"
      style={{ background: "#f5f5f5" }}
      margin={{ bottom: "small" }}
      wrap
      className="search_result_box"
    >
      {query && (
        <Tag
          text={`Query: ${decodeURIComponent(query)}`}
          onClick={() => removeQuery("query", decodeURIComponent(query))}
        />
      )}
      {anatype &&
        removeAnatype && (
          <Tag
            text={`Type: ${decodeURIComponent(anatype)}`}
            onClick={removeAnatype}
          />
        )}
      {types &&
        types.map((type, index) => (
          <Tag
            key={type + index}
            text={`Type: ${decodeURIComponent(type)}`}
            onClick={() => removeQuery("type", decodeURIComponent(type))}
          />
        ))}
      {Object.entries(params) &&
        Object.entries(params).map(
          item =>
            Array.isArray(item[1]) ? (
              item[1].map((second, index) => (
                <Tag
                  background="#f1f1f1"
                  key={index + second + item[0]}
                  text={`${item[0]}:${decodeURIComponent(second)}`}
                  onClick={() => onClick(item[0], second)}
                />
              ))
            ) : (
              <Tag
                key={item[0] + item[1]}
                background="#f1f1f1"
                text={`${item[0]}:${decodeURIComponent(item[1])}`}
                onClick={() => onClick(item[0], item[1])}
              />
            )
        )}
    </Box>
  );
};

SearchTag.propTypes = {
  onClick: PropTypes.func,
  params: PropTypes.object,
  removeQuery: PropTypes.func,
  removeAnatype: PropTypes.func,
  anatype: PropTypes.string
};

export default SearchTag;
