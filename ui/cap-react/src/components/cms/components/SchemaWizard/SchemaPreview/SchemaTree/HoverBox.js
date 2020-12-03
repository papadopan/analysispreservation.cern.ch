import React from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";

function getStyle(isOverCurrent) {
  return {
    color: "white",
    textAlign: "center",
    fontSize: "1rem",
    height: "100%",
    border: isOverCurrent ? "1px dotted black " : null
  };
}

function HoverBox({ path, propKey, addProperty, children, index }) {
  // const [hasDropped, setHasDropped] = useState(false);
  // const [results, setResults] = useState({});
  // const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
  // const ref = useRef(null);
  const [{ isOverCurrent, canDrop }, drop] = useDrop({
    accept: "FIELD_TYPE",
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        if (!item.data) {
          let names = [...item.parent.uiSchema, item.card.name];
          let shouldWeAdd = names.filter(i => !path.uiSchema.includes(i));

          let diff = item.parent.schema.filter(i => i !== "items");
          let isSamePath = diff.filter(item=> !path.schema.includes(item));
          
          if (diff.length === path.schema.length && isSamePath.length===0) return;

          shouldWeAdd.length > 0 &&
            addProperty(
              path,
              {
                schema: item.card.prop.content.props.schema,
                uiSchema: item.card.prop.content.props.uiSchema
              },
              item.card.name,
              {
                schema: item.parent.schema,
                uiSchema: item.parent.uiSchema
              }
            );
        } else {
          addProperty(path, item.data.default);
        }
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
    <div ref={drop} style={getStyle(isOverCurrent)} index={index}>
      {children}
      {canDrop &&
        isOverCurrent && (
          <div
            style={{
              padding: "5px",
              color: "#000",
              background: "rgba(0,0,0,0.1)"
            }}
          >
            Drop here
          </div>
        )}
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
