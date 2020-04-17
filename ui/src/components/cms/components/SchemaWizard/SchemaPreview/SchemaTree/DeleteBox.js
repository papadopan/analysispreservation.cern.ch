import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { Layer, Box, Button, Paragraph } from "grommet";

function getStyle(dropit) {
  return {
    padding: "10px",
    cursor: "move",
    background: "rgb(103,103,103)",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    color: "white"
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
    onDelete(item.name);
    setItem(null);
  };
  return (
    <React.Fragment>
      {item ? (
        <Layer
          closer={true}
          align="center"
          flush={true}
          overlayClose={true}
          // onClose={this.props.toggleActionsLayer}
        >
          <Box
            justify="center"
            flex={true}
            wrap={false}
            pad="small"
            size="medium"
          >
            <Box pad="small" alignContent="center">
              <Paragraph>
                This action will <b>permantly</b> delete{" "}
                <code>{item.name}</code> from your schema
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
