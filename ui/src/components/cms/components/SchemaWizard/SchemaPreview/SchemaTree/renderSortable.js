import React from "react";
import SortableBox from "./SortableBox";

const RenderSortable = (parent, card, i, moveCard, formContext) => {
  if (card === undefined || card.prop === undefined) {
    return null;
  }

  return (
    <SortableBox
      parent={parent}
      key={card.id}
      index={i}
      id={card.id}
      text={card.text}
      moveCard={moveCard}
      name={card.prop.name}
      formContext={formContext}
    >
      {card.prop.content}
    </SortableBox>
  );
};

export default RenderSortable;
