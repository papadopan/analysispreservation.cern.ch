import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { Layer, Box, Button, Paragraph, Label } from "grommet";

function getStyle(dropit) {
  return {
    padding: "20px",
    cursor: "move",
    textAlign: "center",
    color: "white",
    fontWeight: 700,
    letterSpacing: "3px",
    background: "#ff324d",
    position: "absolute",
    width: "100%",
    transform: dropit ? "translateY(0)" : "translateY(-100%)",
    transition: " transform 1s"
  };
}

function DeleteBox({ index, onDelete, values = [] }) {
  const [item, setItem] = useState(null);

  const [{ canDrop }, drop] = useDrop({
    accept: values,
    drop: item => {
      setItem(item);
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
    // construct the names array
    let names = item.path.schema
      .filter(item => item !== "properties")
      .filter(item => item != "items");

    return (
      <Paragraph>
        This action will <b>permantly</b> delete <code>{item.name}</code>
        <br />
        from <code>{names.join(" > ")}</code>
        <br />
      </Paragraph>
    );
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
            {console.log("--------", item)}
            <Box pad="small" align="center" justify="center">
              {_renderMessage(item)}
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
        <Label margin="none">delete</Label>
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
  uiSchema: PropTypes.object,
  values: PropTypes.array
};

export default DeleteBox;
