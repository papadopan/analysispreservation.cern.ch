import { connect } from "react-redux";
import CustomizeField from "../components/SchemaWizard/PropertyEditor/customizeField";
import {
  updateSchemaByPath,
  uuup,
  updateUiSchemaByPath,
  deleteByPath
} from "../../../actions/schemaWizard";

function mapStateToProps(state) {
  const _path = state.schemaWizard.getIn(["field", "path"]);
  const _uiPath = state.schemaWizard.getIn(["field", "uiPath"]);
  if (_path)
    return {
      schema: state.schemaWizard.getIn(["current", "schema", ..._path]),
      uiSchema: state.schemaWizard.getIn(["current", "uiSchema", ..._uiPath]),
      __path: state.schemaWizard.getIn(["field", "path"])
    };
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onSchemaChange: (path, schema) => dispatch(uuup(path, schema)),
    onUiSchemaChange: (path, schema) =>
      dispatch(updateUiSchemaByPath(path, schema)),
    deleteByPath: item => dispatch(deleteByPath(item))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizeField);
