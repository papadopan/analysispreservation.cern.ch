import React, { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";

function getStyle(opacity) {
  return {
    color: "white",
    textAlign: "center",
    fontSize: "1rem",
    height: "100%",
    opacity: opacity
  };
}

function SortableBox({ children, name, index, moveBox, _id }) {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: _id.length > 0 ? `REARANGE-${_id[0]}` : "REARANGE",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveBox(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: _id.length > 0 ? `REARANGE-${_id[0]}` : "REARANGE",
      index,
      name
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={getStyle(opacity)} index={index}>
      {children}
    </div>
  );
}

export default SortableBox;
