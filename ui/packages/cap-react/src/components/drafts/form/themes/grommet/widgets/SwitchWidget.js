import React, { useState } from "react";
import PropTypes from "prop-types";

import CheckBox from "grommet/components/CheckBox";

const SwitchWidget = function(props) {
  const [checked, setchecked] = useState(
    props.formData === "true" ? true : false
  );
  // TOFIX onBlur, onFocus
  let _onChange = event => {
    if (event.target.checked) {
      props.onChange(props.schema.type == "string" ? "true" : true);
    } else {
      props.onChange(undefined);
    }
    setchecked(!checked);
  };
  // let _errors = null;
  // if (props.rawErrors && props.rawErrors.length > 0)
  //   _errors = props.rawErrors.map((error, index) => <span key={index}>{error}</span>);
  return (
    <CheckBox
      disabled={props.readonly}
      key={props.id}
      toggle={true}
      name={props.id}
      onChange={_onChange}
      checked={checked}
    />
  );
};

SwitchWidget.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.object,
  rawErrors: PropTypes.object,
  schema: PropTypes.object,
  readonly: PropTypes.bool,
  formData: PropTypes.string
};

export default SwitchWidget;
