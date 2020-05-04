import React from "react";
import PropTypes from "prop-types";

import Box from "grommet/components/Box";
import Button from "grommet/components/Button";

import FormTrashIcon from "grommet/components/icons/base/FormTrash";
import FormUpIcon from "grommet/components/icons/base/FormUp";
import FormDownIcon from "grommet/components/icons/base/FormDown";
import { formErrorsChange } from "../../../../../../actions/common";
import { connect } from "react-redux";

let ArrayUtils = function(props) {
  const {
    propId,
    hasRemove,
    hasMoveDown,
    hasMoveUp,
    onDropIndexClick,
    onReorderClick,
    index,
    reorder,
    formErrors,
    formErrorsChange
  } = props;

  let _deleteAndUpdate = event => {
    update(index);
    onDropIndexClick(index)(event);
  };

  let update = dropIndex => {
    let _formErrors = formErrors
      .toJS()
      .filter(errorPath => !errorPath.startsWith(`${propId}_${dropIndex}`))
      .map(errorPath => {
        if (errorPath.startsWith(propId)) {
          let strArr = errorPath.replace(propId, "").split("_");
          let i = parseInt(strArr[1]);

          if (i > dropIndex) {
            strArr[1] = `${i - 1}`;
            return propId + strArr.join("_");
          }
        }

        return errorPath;
      });

    // Use timeout to fire action on the next tick
    formErrorsChange(_formErrors);
  };

  return (
    <Box direction="row" justify="between">
      <Button
        margin="none"
        pad="none"
        onClick={hasRemove ? _deleteAndUpdate : null}
        icon={<FormTrashIcon margin="none" pad="none" />}
      />
      {reorder ? (
        <React.Fragment>
          <Button
            onClick={hasMoveDown ? onReorderClick(index, index + 1) : null}
            icon={<FormDownIcon margin="none" pad="none" />}
          />
          <Button
            onClick={hasMoveUp ? onReorderClick(index, index - 1) : null}
            icon={<FormUpIcon margin="none" pad="none" />}
          />
        </React.Fragment>
      ) : null}
    </Box>
  );
};

ArrayUtils.propTypes = {
  reorder: PropTypes.bool,
  hasRemove: PropTypes.bool,
  hasMoveDown: PropTypes.bool,
  hasMoveUp: PropTypes.bool,
  onDropIndexClick: PropTypes.func,
  onReorderClick: PropTypes.func,
  index: PropTypes.string,
  formErrors: PropTypes.array,
  formErrorsChange: PropTypes.func,
  propId: PropTypes.string
};

// export default ArrayUtils;

function mapStateToProps(state) {
  return {
    formErrors: state.draftItem.get("formErrors"),
    formData: state.draftItem.get("formData")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    formErrorsChange: errors => dispatch(formErrorsChange(errors))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArrayUtils);
