import React from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";

const style = (index, isDragging) => ({
  border: "1px dotted #f6f6f6",
  padding: "5px",
  cursor: "move",
  marginBottom: "6px",
  color: "#fff",
  marginRight: index % 2 == 0 ? "0" : "10px",
  marginLeft: index % 2 == 0 ? "10px" : "0",
  background: isDragging ? "rgb(204,204,204)" : "rgb(103,103,103)"
});

const DraggableBox = ({ data, children, key }) => {
  const type = "FIELD_TYPE";

  const [{ isDragging }, drag] = useDrag({
    item: { type: type, data },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div ref={drag} style={style(key, isDragging)}>
      {children}
    </div>
  );
};

DraggableBox.propTypes = {
  children: PropTypes.element,
  data: PropTypes.object,
  key: PropTypes.number
};

export default DraggableBox;
