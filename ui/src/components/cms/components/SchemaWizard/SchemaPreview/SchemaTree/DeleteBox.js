import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { Layer, Box, Button, Paragraph } from "grommet";

function getStyle(dropit) {
  return {
    padding: "20px",
    cursor: "move",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    border: "1px dotted black",
    color: "white",
    fontWeight: 700,
    letterSpacing: "3px",
    background: "red",
    opacity: dropit ? 1 : 0
  };
}

function DeleteBox({ index, onDelete }) {
  const [showLayer, setShowLayer] = useState(false);
  const [item, setItem] = useState(null);
  const [{ canDrop }, drop] = useDrop({
    accept: [
      "RE-",
      "RE-basic_info",
      "RE-cadi_info",
      "RE-input_data",
      "RE-additional_resources"
    ],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      setItem(item);
      // if (!didDrop) {
      //   return { item, path, propKey };
      // }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  });

  const deleteAndUpdate = () => {
    onDelete(item);
    setItem(null);
  };

  const _renderMessage = item => {
    let names = item.path.schema.filter(item => item != "properties");
    names.push(item.name);
    return names.join(" > ");
  };
  return (
    <React.Fragment>
      {item ? (
        <Layer closer={true} align="center" flush={true} overlayClose={true}>
          <Box
            justify="center"
            flex={true}
            wrap={false}
            pad="small"
            size="medium"
          >
            <Box pad="small" align="center" justify="center">
              <Paragraph>
                This action will <b>permantly</b> delete <br />
                <code>{_renderMessage(item)}</code> <br />from your schema
                <br />
              </Paragraph>
            </Box>
            <Box direction="row" justify="between" align="center">
              <Box colorIndex="grey-4-a" margin="small">
                <Button label="Cancel" primary onClick={() => setItem(null)} />
              </Box>
              <Box>
                <Button label="Delete" critical onClick={deleteAndUpdate} />
              </Box>
            </Box>
          </Box>
        </Layer>
      ) : null}
      <div ref={drop} style={getStyle(canDrop)} index={index}>
        delete
      </div>
    </React.Fragment>
  );
}

DeleteBox.propTypes = {
  children: PropTypes.element,
  path: PropTypes.array,
  addProperty: PropTypes.func,
  propKey: PropTypes.string,
  index: PropTypes.number,
  onDelete: PropTypes.func,
  schema: PropTypes.object,
  uiSchema: PropTypes.object
};

export default DeleteBox;
