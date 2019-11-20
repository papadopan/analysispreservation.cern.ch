import React, { useState, useRef } from "react";
import { useDrop, useDrag } from "react-dnd";

function getStyle(isOverCurrent) {
  return {
    color: "white",
    textAlign: "center",
    fontSize: "1rem",
    height: "100%",
    border: isOverCurrent ? "1px dashed black " : null
  };
}

function HoverBox({ path, propKey, addProperty, children, name, index, key }) {
  const [hasDropped, setHasDropped] = useState(false);
  const [results, setResults] = useState({});
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
  const ref = useRef(null);
  const [{ isOver, isOverCurrent, resultss }, drop] = useDrop({
    accept: "FIELD_TYPE",
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        addProperty(path, item.data.default);
        return { item, path, propKey };
      }
      setHasDropped(true);
      setHasDroppedOnChild(didDrop);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });
  return (
    <div ref={drop} style={getStyle(isOverCurrent)} index={index}>
      {children}
    </div>
  );
}

export default HoverBox;
