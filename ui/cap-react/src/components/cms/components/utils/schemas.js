export const commonSchema = {
  type: "object",
  title: "General Info",
  properties: {
    name: {
      title: "Field/property name",
      description: "Should be a string without spaces or other special chars",
      type: "string"
    },
    path: {
      title: "Path",
      description:
        "The title of the form field. How it will be displayed on the rendered form.",
      type: "string"
    }
  }
};

export const propKeySchema = {
  title: "Property Key",
  description: "Should be a string without spaces or other special chars",
  type: "string"
};

export const schemaSchema = {
  type: "object",
  title: "JSON Schema attributes",
  properties: {
    type: {
      title: "Property Type",
      type: "string",
      enum: ["string", "object", "array", "number", "boolean"]
    },
    title: {
      title: "Title",
      type: "string"
    },
    description: {
      title: "Description",
      type: "string"
    },
    placeholder: {
      title: "Placeholder",
      type: "string"
    },
    format: {
      title: "Format/Widget",
      type: "string"
    }
  }
};

export const uiSchema = {
  type: {
    "ui:options": {
      hidden: true
    }
  }
};

export const configSchema = {
    "schema": {
        "title": "Schema Configuration",
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "title": "Name",
                "description": "Schema name"
            },
            "version": {
                "type": "string",
                "title": "Version",
              "pattern": "^[\\d]{1,}\\.[\\d]{1,}\\.[\\d]{1,}$"
            },
            "fullname": {
                "type": "string",
                "title": "Fullname"
            },
            "experiment": {
                "type": "string",
                "title": "Experiment",
                "enum": ["CMS", "LHCb", "ATLAS", "ALICE"]
            },
            "is_indexed": {
                "type": "boolean",
                "title": "Is Indexed?"
            },
            "use_deposit_as_record": {
                "type": "boolean",
                "title": "Use deposit as record?"
            }
        }
    },
    "uiSchema": {
        "use_deposit_as_record": {
            "ui:widget": "switch",
            "ui:options": {
                "grid": {
                    "gridColumns": "3/5"
                }
            }
        },
        "ui:order": [
            "name",
            "version",
            "fullname",
            "experiment",
            "is_indexed",
            "use_deposit_as_record",
            "*"
        ],
        "name": {
            "ui:options": {
                "grid": {
                    "gridColumns": "1/3"
                }
            }
        },
        "version": {
            "ui:options": {
                "grid": {
                    "gridColumns": "3/5"
                }
            }
        },
        "ui:options": {
            "size": "large",
            "align": "center"
        },
        "fullname": {},
        "is_indexed": {
            "ui:widget": "switch",
            "ui:options": {
                "grid": {
                    "gridColumns": "1/3"
                }
            }
        },
        "experiment": {}
    }
}