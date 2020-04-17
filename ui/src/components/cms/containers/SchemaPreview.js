import { connect } from "react-redux";

import SchemaPreview from "../components/SchemaWizard/SchemaPreview";
import { selectProperty, deleteProperty } from "../../../actions/schemaWizard";

function mapStateToProps(state) {
  return {
    schema: state.schemaWizard.getIn(["current", "schema"]),
    uiSchema: state.schemaWizard.getIn(["current", "uiSchema"])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectProperty: path => dispatch(selectProperty(path)),
    deleteProperty: name => dispatch(deleteProperty(name))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchemaPreview);
