import React, { useState, useEffect } from "react";
import { animated, useTransition } from "react-spring";

const Descriptions = () => {
  const descriptions = [
    { id: 0, text: "preserve" },
    { id: 1, text: "collaborate" },
    { id: 2, text: "share" },
    { id: 3, text: "reuse" }
  ];

  const [index, setIndex] = useState(0);
  const descriptionTransition = useTransition(
    descriptions[index],
    span => span.id,
    {
      delay: 450,
      duration: 200,
      from: {
        opacity: 0,
        transform: "translateY(10px)",
        position: "absolute",
        top: 0,
        left: 0,
        margin: 0
      },
      enter: {
        opacity: 1,
        transform: "translateY(0px)"
      },
      leave: {
        opacity: 0,
        transform: "translateY(-10px)"
      }
    }
  );

  useEffect(
    () =>
      void setInterval(
        () => setIndex(current => (current + 1) % descriptions.length),
        2500
      ),
    []
  );
  return (
    <div
      style={{
        fontWeight: 400,
        width: "120px",
        position: "relative",
        display: "inline-block",
        textAlign: "center",
        fontStyle: "italic",
        height: "85%"
      }}
    >
      {descriptionTransition.map(({ item, props, key }) => (
        <animated.span key={key} style={props}>
          {item.text}
        </animated.span>
      ))}
    </div>
  );
};

export default Descriptions;
