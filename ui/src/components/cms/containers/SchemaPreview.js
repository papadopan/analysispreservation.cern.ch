import { connect } from "react-redux";

import SchemaPreview from "../components/SchemaWizard/SchemaPreview";
import { selectProperty, deleteProperty } from "../../../actions/schemaWizard";

function mapStateToProps(state) {
  return {
    schema: state.schemaWizard.getIn(["current", "schema"]),
    uiSchema: state.schemaWizard.getIn(["current", "uiSchema"]),
    valuesToDelete: state.schemaWizard.get("valuesToDelete")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectProperty: path => dispatch(selectProperty(path)),
    deleteProperty: item => dispatch(deleteProperty(item))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchemaPreview);
