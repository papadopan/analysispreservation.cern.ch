import React from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";

function getStyle(isOverCurrent) {
  return {
    color: "white",
    textAlign: "center",
    fontSize: "1rem",
    height: "100px",
    background: "red",
    border: isOverCurrent ? "1px dashed black " : null
  };
}

function DeleteBox({ children, index, del }) {
  // const [hasDropped, setHasDropped] = useState(false);
  // const [results, setResults] = useState({});
  // const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
  // const ref = useRef(null);
  const [{ isOverCurrent }, drop] = useDrop({
    accept: ["RE-basic_info", "RE-"],
    drop: (item, monitor) => {
      console.log("====================================");
      console.log(item);
      console.log("====================================");

      del(item);
      // setHasDropped(true);
      // setHasDroppedOnChild(didDrop);
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

DeleteBox.propTypes = {
  children: PropTypes.element,
  path: PropTypes.array,
  addProperty: PropTypes.func,
  propKey: PropTypes.string,
  index: PropTypes.number
};

export default DeleteBox;
