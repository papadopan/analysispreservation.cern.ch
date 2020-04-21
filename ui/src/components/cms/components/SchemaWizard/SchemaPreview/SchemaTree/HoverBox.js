import React from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";

function getStyle(isOverCurrent, dropit) {
  return {
    textAlign: "center",
    fontSize: "1rem",
    height: "100%",
    background: dropit & isOverCurrent ? "#000001" : "rgb(206,206,206)"
  };
}

function HoverBox({ path, propKey, addProperty, children, index }) {
  // const [hasDropped, setHasDropped] = useState(false);
  // const [results, setResults] = useState({});
  // const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
  // const ref = useRef(null);
  const [{ isOverCurrent, canDrop, isOver }, drop] = useDrop({
    accept: "FIELD_TYPE",
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        addProperty(path, item.data.default);
        return { item, path, propKey };
      }
      // setHasDropped(true);
      // setHasDroppedOnChild(didDrop);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <div
      ref={drop}
      style={getStyle(isOverCurrent, canDrop & isOver)}
      index={index}
    >
      {children}
    </div>
  );
}

HoverBox.propTypes = {
  children: PropTypes.element,
  path: PropTypes.array,
  addProperty: PropTypes.func,
  propKey: PropTypes.string,
  index: PropTypes.number
};

export default HoverBox;
