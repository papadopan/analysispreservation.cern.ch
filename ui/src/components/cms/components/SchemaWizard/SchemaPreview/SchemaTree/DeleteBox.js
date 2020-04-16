import React from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";

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

function DeleteBox({ index, onDelete, schema, uiSchema }) {
  const [{ isOverCurrent, canDrop, isOver }, drop] = useDrop({
    accept: [
      "RE-",
      "RE-basic_info",
      "RE-cadi_info",
      "RE-input_data",
      "RE-additional_resources"
    ],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      // if (!didDrop) {
      //   return { item, path, propKey };
      // }
      onDelete(item.name, schema, uiSchema);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <div ref={drop} style={getStyle(canDrop)} index={index}>
      delete
    </div>
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
