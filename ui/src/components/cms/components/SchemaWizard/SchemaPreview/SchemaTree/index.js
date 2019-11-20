import React, { useState, useEffect, useCallback } from "react";
import { PropTypes } from "prop-types";

import Box from "grommet/components/Box";

import { connect } from "react-redux";

import Form from "react-jsonschema-form";
import SchemaTreeItem from "./SchemaTreeItem";

import HoverBox from "./HoverBox";
import SortableBox from "./SortableBox";
import update from "immutability-helper";

import {
  addByPath,
  updateUiSchemaByPath
} from "../../../../../../actions/schemaWizard";

import ViewIcon from "grommet/components/icons/base/View";

import { transformSchema } from "../../../../../drafts/DraftEditor";

class SchemaTree extends React.Component {
  render() {
    return (
      <Box style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Form
          schema={transformSchema(this.props.schema.toJS())}
          uiSchema={this.props.uiSchema.toJS()}
          formData={{}}
          showErrorList={false}
          tagName="div"
          FieldTemplate={_FieldTemplate}
          ObjectFieldTemplate={_ObjectFieldTemplate}
          ArrayFieldTemplate={_ArrayFieldTemplate}
          liveValidate={true}
          widgets={widgets}
          validate={_validate}
          noHtml5Validate={true}
          formContext={{ schema: [], uiSchema: [] }}
        >
          <span />
        </Form>
      </Box>
    );
  }
}

let ObjectFieldTemplate = function(props) {
  const [myList, setmyList] = useState([]);
  props.properties.map(prop => {
    prop.name === null || prop.name === undefined
      ? null
      : myList.includes(prop.name)
        ? null
        : setmyList(myList.concat([prop.name]));
  });
  const moveBox = useCallback(
    (dragIndex, hoverIndex) => {
      let { "ui:order": uiOrder = [], ...rest } = props.uiSchema;
      const dragItem = myList[dragIndex];
      setmyList(
        update(myList, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
        })
      );
      // when the ui:order is updated, the asterisk is appended in the end,
      // in order to accept new added components and order them in the end of the list
      props.onUiSchemaChange(
        props.formContext.uiSchema.length > 0 ? props.formContext.uiSchema : [],
        {
          ...rest,
          "ui:order": myList
            .filter(item => item != undefined || item != null)
            .concat(["*"])
        }
      );
    },
    [myList]
  );
  if (props.idSchema.$id == "root") {
    return (
      <Box style={{ background: "red" }}>
        {props.properties.map((prop, index) =>
          renderContent(prop, index, moveBox, props.formContext.uiSchema)
        )}
      </Box>
    );
  }
};
const renderContent = (prop, index, moveBox, _id) => {
  return (
    <SortableBox
      key={prop.name}
      id={index}
      index={index}
      name={prop.name}
      moveBox={moveBox}
      _id={`${_id}-${index}`}
    >
      {prop.content}
    </SortableBox>
  );
};

let ArrayFieldTemplate = function(props) {
  const [display, setDisplay] = useState(true);
  let { schema: schemaPath, uiSchema: uiSchemaPath } = props.rawErrors[0];
  let _path = {
    schema: [...props.formContext.schema, ...schemaPath, "items"],
    uiSchema: [...props.formContext.uiSchema, ...uiSchemaPath, "items"]
  };

  let __path = {
    schema: [...props.formContext.schema, ...schemaPath, "items"],
    uiSchema: [...props.formContext.uiSchema, ...uiSchemaPath]
  };
  return (
    <Box flex={true} style={{ position: "relative", overflow: "visible" }}>
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "-15px",
          cursor: "pointer"
        }}
        onClick={() => setDisplay(!display)}
      >
        <ViewIcon size="xsmall" colorIndex={display ? "grey-1" : "grey-3-a"} />
      </div>
      <Box>
        <SchemaTreeItem type="array" {...props} path={__path} />
        {display ? (
          <Box flex={true} margin={{ left: "medium" }}>
            <HoverBox
              addProperty={props.addProperty}
              key={props.id}
              path={_path}
            >
              <div style={{ borderBottom: "5px solid #e6e6e6" }} />
              <Form
                schema={props.schema.items}
                uiSchema={props.uiSchema}
                formData={{}}
                tagName="div"
                widgets={widgets}
                showErrorList={false}
                FieldTemplate={_FieldTemplate}
                ObjectFieldTemplate={_ObjectFieldTemplate}
                ArrayFieldTemplate={_ArrayFieldTemplate}
                liveValidate={true}
                validate={_validate}
                noHtml5Validate={true}
                formContext={_path}
              >
                <span />
              </Form>
            </HoverBox>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

let FieldTemplate = function(props) {
  const { schema, uiSchema, rawErrors = [], children, formContext } = props;

  const [display, setDisplay] = useState(true);
  let path = {
    schema: [...formContext.schema, ...(rawErrors[0].schema || [])],
    uiSchema: [...formContext.uiSchema, ...(rawErrors[0].uiSchema || [])]
  };

  if (props.id == "root") {
    return (
      <HoverBox addProperty={props.addProperty} key={props.id} path={path}>
        <Box
          flex={true}
          pad={formContext.schema.length == 0 ? "medium" : "none"}
        >
          {children}
        </Box>
      </HoverBox>
    );
  }

  let _renderObjectArray = undefined;

  if (["array"].indexOf(schema.type) > -1) {
    _renderObjectArray = (
      <HoverBox addProperty={props.addProperty} key={props.id} path={path}>
        {children}
      </HoverBox>
    );
  } else if (["object"].indexOf(schema.type) > -1) {
    _renderObjectArray = (
      <Box flex={true} style={{ position: "relative", overflow: "visible" }}>
        <div
          style={{
            position: "absolute",
            top: "15px",
            left: "-15px",
            cursor: "pointer"
          }}
          onClick={() => setDisplay(!display)}
        >
          <ViewIcon
            size="xsmall"
            colorIndex={display ? "grey-1" : "grey-3-a"}
          />
        </div>

        <SchemaTreeItem type="object" {...props} path={path} />
        {display ? (
          <Box flex={true} margin={{ left: "medium" }}>
            <Form
              schema={schema}
              uiSchema={uiSchema}
              formData={{}}
              showErrorList={false}
              widgets={widgets}
              tagName="div"
              FieldTemplate={_FieldTemplate}
              ObjectFieldTemplate={_ObjectFieldTemplate}
              ArrayFieldTemplate={_ArrayFieldTemplate}
              liveValidate={true}
              validate={_validate}
              noHtml5Validate={true}
              formContext={path}
            >
              <span />
            </Form>
          </Box>
        ) : null}
      </Box>
    );
  }

  if (_renderObjectArray) {
    return (
      <HoverBox addProperty={props.addProperty} key={props.id} path={path}>
        {_renderObjectArray}
      </HoverBox>
    );
  }

  return <SchemaTreeItem type="other" {...props} path={path} />;
};

let TextWidget = props => {
  const { formContext, rawErrors } = props;

  let path = {
    schema: [...formContext.schema, ...(rawErrors[0].schema || [])],
    uiSchema: [...formContext.uiSchema, ...(rawErrors[0].uiSchema || [])]
  };

  return <SchemaTreeItem type="array" {...props} path={path} />;
};

const widgets = {
  TextWidget: TextWidget
};

function mapDispatchToProps(dispatch) {
  return {
    addProperty: (path, data) => dispatch(addByPath(path, data)),
    onUiSchemaChange: (path, schema) =>
      dispatch(updateUiSchemaByPath(path, schema))
  };
}

let _ObjectFieldTemplate = connect(
  state => state,
  mapDispatchToProps
)(ObjectFieldTemplate);

let _FieldTemplate = connect(
  state => state,
  mapDispatchToProps
)(FieldTemplate);

let _ArrayFieldTemplate = connect(
  state => state,
  mapDispatchToProps
)(ArrayFieldTemplate);

function _add(path, data) {
  this.props.add(path, data);
}

let _validate = function(formData, errors) {
  return _addErrors(errors, { schema: [], uiSchema: [] });
};

let _addErrors = (errors, path) => {
  errors.addError({ schema: path.schema, uiSchema: path.uiSchema });

  Object.keys(errors).map(error => {
    if (error != "__errors" && error != "addError") {
      _addErrors(errors[error], {
        schema: [...path, "properties", error],
        uiSchema: [...path, error]
      });
    }
  });
  return errors;
};

SchemaTree.propTypes = {
  schema: PropTypes.object,
  uiSchema: PropTypes.object
};

export default SchemaTree;
