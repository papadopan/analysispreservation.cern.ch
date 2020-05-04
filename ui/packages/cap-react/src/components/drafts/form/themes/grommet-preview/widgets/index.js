import TextWidget from "./TextWidget";
import SelectWidget from "./SelectWidget";
import UpDownWidget from "./UpDownWidget";
import RadioWidget from "./RadioWidget";
import CheckboxWidget from "./CheckboxWidget";
import TextAreaWidget from "./TextAreaWidget";
import SwitchWidget from "./SwitchWidget";

const widgets = {
  text: TextWidget,
  select: SelectWidget,
  updown: UpDownWidget,
  radio: RadioWidget,
  checkboxes: CheckboxWidget,
  textarea: TextAreaWidget,
  switch: SwitchWidget
};

export default widgets;
