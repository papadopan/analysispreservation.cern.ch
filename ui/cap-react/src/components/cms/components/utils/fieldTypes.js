const simple = {
  text: {
    title: "Text",
    description: "Titles, names, paragraphs, IDs, list of names",
    child: {},
    optionsSchema: {
      type: "object",
      title: "Text Widget Title",
      properties: {
        title: {
          type: "string",
          title: "Title",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        description: {
          title: "Description",
          type: "string",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        readOnly: {
          type: "boolean",
          title: "Do you want this field to be read only?",
          enum: [true, false],
          enumNames: ["ReadOnly", "Editable"]
        }
      }
    },
    optionsSchemaUiSchema: {
      readOnly: {
        "ui:widget": "select"
      }
    },
    default: {
      schema: {
        type: "string"
      },
      uiSchema: {
        "ui:widget": "text"
      }
    }
  },
  number: {
    title: "Number",
    description: "IDs, order number, rating, quantity",
    child: {},
    optionsSchema: {
      type: "object",
      title: "Number Widget Title",
      properties: {
        title: {
          type: "string",
          title: "Title",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        description: {
          title: "Description",
          type: "string",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        readOnly: {
          type: "boolean",
          title: "Do you want this field to be read only?",
          enum: [true, false],
          enumNames: ["ReadOnly", "Editable"]
        }
      }
    },
    optionsSchemaUiSchema: {
      readOnly: {
        "ui:widget": "select"
      }
    },
    default: {
      schema: {
        type: "number"
      }
    }
  },
  select: {
    title: "Select Widget",
    description: "IDs, order number, rating, quantity",
    child: {},
    optionsUiSchema: {
      type: "object",
      title: "Switch Widget UI Options",
      properties: {
        "ui:options": {
          type: "object",
          title: "UI Options",
          properties: {
            grid: {
              type: "object",
              title: "Grid Options",
              properties: {
                gridColumns: {
                  title: "Grid Columns",
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    optionsUiSchemaUiSchema: {
      "ui:options": {
        grid: {
          gridColumns: {
            "ui:widget": "selectColumns"
          }
        }
      }
    },

    optionsSchema: {
      type: "object",
      title: "Select Widget Title",
      properties: {
        title: {
          type: "string",
          title: "Title",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        description: {
          title: "Description",
          type: "string",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        type: {
          title: "Type",
          type: "string",
          enum: ["string", "array"],
          enumNames: ["Select one value", "Select multiple values"]
        },
        readOnly: {
          type: "boolean",
          title: "Do you want this field to be read only?",
          enum: [true, false],
          enumNames: ["ReadOnly", "Editable"]
        }
      },
      dependencies: {
        type: {
          oneOf: [
            {
              properties: {
                type: {
                  enum: ["string"]
                },
                enum: {
                  title: "Define your options",
                  type: "array",
                  description: "The options for the widget",
                  items: {
                    title: "Option",
                    type: "string"
                  }
                }
              }
            },
            {
              properties: {
                type: {
                  enum: ["array"]
                },
                items: {
                  type: "object",
                  title: "Define your options",
                  properties: {
                    enum: {
                      title: "Options List",
                      type: "array",
                      items: { type: "string", title: "Option" }
                    }
                  }
                }
              }
            }
          ]
        }
      }
    },
    optionsSchemaUiSchema: {
      readOnly: {
        "ui:widget": "select"
      }
    },
    default: {
      schema: {
        enum: ["Option A", "Option B", "Option C"],
        type: "string",
        uniqueItems: true,
        items: {
          type: "string",
          enum: ["Option A", "Option B", "Option C", "Option D"]
        }
      },
      uiSchema: {
        "ui:widget": "select",
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  },
  radio: {
    title: "Radio Widget",
    description: "IDs, order number, rating, quantity",
    child: {},
    optionsUiSchema: {
      type: "object",
      title: "Radio Widget UI Options",
      properties: {
        "ui:options": {
          type: "object",
          title: "UI Options",
          properties: {
            grid: {
              type: "object",
              title: "Grid Options",
              properties: {
                gridColumns: {
                  title: "Grid Columns",
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    optionsUiSchemaUiSchema: {
      "ui:options": {
        grid: {
          gridColumns: {
            "ui:widget": "selectColumns"
          }
        }
      }
    },
    optionsSchema: {
      type: "object",
      title: "Radio Widget Title",
      properties: {
        title: {
          type: "string",
          title: "Title",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        description: {
          title: "Description",
          type: "string",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        readOnly: {
          type: "boolean",
          title: "Do you want this field to be read only?",
          enum: [true, false],
          enumNames: ["ReadOnly", "Editable"]
        },
        enum: {
          title: "Define your options",
          type: "array",
          description: "The options for the radio widget",
          items: {
            title: "Radio Option",
            type: "string"
          }
        }
      }
    },
    optionsSchemaUiSchema: {
      readOnly: {
        "ui:widget": "select"
      }
    },
    default: {
      schema: {
        type: "string",
        enum: ["Option A", "Option B"]
      },
      uiSchema: {
        "ui:widget": "radio",
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  },
  switch: {
    title: "Switch Widget",
    description: "IDs, order number, rating, quantity",
    child: {},
    optionsUiSchema: {
      type: "object",
      title: "Switch Widget UI Options",
      properties: {
        "ui:options": {
          type: "object",
          title: "UI Options",
          properties: {
            grid: {
              type: "object",
              title: "Grid Options",
              properties: {
                gridColumns: {
                  title: "Grid Columns",
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    optionsUiSchemaUiSchema: {
      "ui:options": {
        grid: {
          gridColumns: {
            "ui:widget": "selectColumns"
          }
        }
      }
    },
    optionsSchema: {
      type: "object",
      title: "Radio Widget Title",
      properties: {
        title: {
          type: "string",
          title: "Title",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        description: {
          title: "Description",
          type: "string",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        readOnly: {
          type: "boolean",
          title: "Do you want this field to be read only?",
          enum: [true, false],
          enumNames: ["ReadOnly", "Editable"]
        }
      }
    },
    optionsSchemaUiSchema: {
      readOnly: {
        "ui:widget": "select"
      }
    },
    default: {
      schema: {
        type: "string"
      },
      uiSchema: {
        "ui:widget": "switch",
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  },
  checkboxes: {
    title: "Checkbox Widget",
    description: "IDs, order number, rating, quantity",
    child: {},
    optionsUiSchema: {
      type: "object",
      title: "Radio Widget UI Options",
      properties: {
        "ui:options": {
          type: "object",
          title: "UI Options",
          properties: {
            grid: {
              type: "object",
              title: "Grid Options",
              properties: {
                gridColumns: {
                  title: "Grid Columns",
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    optionsUiSchemaUiSchema: {
      "ui:options": {
        grid: {
          gridColumns: {
            "ui:widget": "selectColumns"
          }
        }
      }
    },
    optionsSchema: {
      type: "object",
      title: "Checkboxes Widget Title",
      properties: {
        title: {
          type: "string",
          title: "Title",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        description: {
          title: "Description",
          type: "string",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        readOnly: {
          type: "boolean",
          title: "Do you want this field to be read only?",
          enum: [true, false],
          enumNames: ["ReadOnly", "Editable"]
        },
        type: {
          title: "Type of the checkbox",
          enum: ["boolean", "string"],
          enumNames: ["One Option", "Multiple Options"],
          type: "string"
        }
      },
      dependencies: {
        type: {
          oneOf: [
            {
              properties: {
                type: {
                  enum: ["boolean"]
                }
              }
            },
            {
              properties: {
                type: {
                  enum: ["string"]
                },
                enum: {
                  title: "Define your options",
                  type: "array",
                  description: "The options for the widget",
                  items: {
                    title: "Option",
                    type: "string"
                  }
                }
              }
            }
          ]
        }
      }
    },
    optionsSchemaUiSchema: {
      readOnly: {
        "ui:widget": "select"
      }
    },
    default: {
      schema: {
        type: "boolean",
        enum: ["Option A", "Option B"]
      },
      uiSchema: {
        "ui:widget": "checkboxes",
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  },
  textarea: {
    title: "Text Area",
    description: "Text Area field",
    child: {},
    optionsUiSchema: {
      type: "object",
      title: "Text Area Options Schema",
      properties: {
        "ui:options": {
          type: "object",
          title: "UI Options",
          properties: {
            rows: {
              title: "Rows",
              description: "The number of the textarea rows",
              type: "number"
            },
            maxLength: {
              title: "Max Length",
              description:
                "Provide a number as the maximum limit of characters, infinity if not provided",
              type: "number"
            },
            minLength: {
              title: "Min Length",
              description:
                "Provide a number as the minimum limit of charactes, empty if not provded",
              type: "number"
            },
            placeholder: {
              title: "Placeholder",
              description: "Provide a placeholder for the field",
              type: "string"
            },
            grid: {
              type: "object",
              title: "Grid Options",
              properties: {
                gridColumns: {
                  title: "Grid Columns",
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    optionsUiSchemaUiSchema: {
      "ui:options": {
        grid: {
          gridColumns: {
            "ui:widget": "selectColumns"
          }
        }
      }
    },
    optionsSchema: {
      type: "object",
      title: "Checkboxes Widget Title",
      properties: {
        title: {
          type: "string",
          title: "Title",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        description: {
          title: "Description",
          type: "string",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        readOnly: {
          type: "boolean",
          title: "Do you want this field to be read only?",
          enum: [true, false],
          enumNames: ["ReadOnly", "Editable"]
        }
      }
    },
    optionsSchemaUiSchema: {
      readOnly: {
        "ui:widget": "select"
      }
    },
    default: {
      schema: {
        type: "string"
      },
      uiSchema: {
        "ui:widget": "textarea",
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  },
  object: {
    title: "JSON Object",
    description: "Data in JSON format, Grouped section",
    child: {},
    optionsSchema: {
      type: "object",
      title: "Object Widget Properties",
      properties: {
        title: {
          type: "string",
          title: "Title",
          description:
            "Provide the title you want to be displayed to your object"
        },
        description: {
          type: "string",
          title: "Description",
          description:
            "Provide the description you want to be displayed to your object"
        }
      }
    },
    optionsUiSchema: {
      type: "object",
      title: "Object UI Options",
      properties: {
        "ui:options": {
          type: "object",
          title: "UI Options",
          properties: {
            grid: {
              type: "object",
              title: "Grid Options",
              properties: {
                gridColumns: {
                  title: "Grid Columns",
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    optionsUiSchemaUiSchema: {
      "ui:options": {
        grid: {
          gridColumns: {
            "ui:widget": "selectColumns"
          }
        }
      }
    },
    optionsSchemaUiSchema: {},
    default: {
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  },
  // reference: {
  //   title: "Reference",
  //   description: "For example, an analysis can reference its author(s)",
  //   child: {},
  //   default: {
  //     schema: {
  //       type: "string"
  //     },
  //     uiSchema: {
  //       "ui:options": {
  //         grid: {
  //           gridColumns: "1/5"
  //         }
  //       }
  //     }
  //   }
  // },
  boolean: {
    title: "Boolean",
    description: "Yes or no, 1 or 0, true or false",
    child: {},
    optionsSchema: {
      type: "object",
      title: "Boolean Schema Options",
      properties: {
        title: {
          type: "string",
          title: "Provide a title for the element",
          description: "This title will be used for the form"
        },
        description: {
          type: "string",
          title: "Provide a desctiption for the element",
          description: "This description will be used for the form"
        },
        readOnly: {
          type: "boolean",
          title: "Do you want this field to be read only?",
          enum: [true, false],
          enumNames: ["ReadOnly", "Editable"]
        }
      }
    },
    optionsSchemaUiSchema: {
      readOnly: {
        "ui:widget": "select"
      }
    },
    optionsUiSchema: {
      type: "object",
      title: "Switch Widget UI Options",
      properties: {
        "ui:options": {
          type: "object",
          title: "UI Options",
          properties: {
            grid: {
              type: "object",
              title: "Grid Options",
              properties: {
                gridColumns: {
                  title: "Grid Columns",
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    optionsUiSchemaUiSchema: {
      "ui:options": {
        grid: {
          gridColumns: {
            "ui:widget": "selectColumns"
          }
        }
      }
    },
    default: {
      schema: {
        type: "boolean"
      },
      uiSchema: {
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  },
  array: {
    title: "Array",
    description:
      "A list of things. List of strings, numbers, objects, references",
    child: {},
    optionsSchema: {
      type: "object",
      title: "Array Schema Options",
      properties: {
        title: {
          type: "string",
          title: "Provide a title for your array",
          description: "This is the title that will be displayed for the array"
        },
        description: {
          title: "Provide a descritpion for the element",
          type: "string",
          description:
            "This description will be provided for this specific element"
        }
      }
    },
    optionsSchemaUiSchema: {},
    optionsUiSchema: {
      type: "object",
      title: "Array UI Options",
      properties: {
        "ui:options": {
          type: "object",
          title: "UI Options",
          properties: {
            grid: {
              type: "object",
              title: "Grid Options",
              properties: {
                gridColumns: {
                  title: "Grid Columns",
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    optionsUiSchemaUiSchema: {
      "ui:options": {
        grid: {
          gridColumns: {
            "ui:widget": "selectColumns"
          }
        }
      }
    },
    default: {
      schema: {
        type: "array",
        items: {}
      },
      uiSchema: {
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  }
};

const advanced = {
  accordion: {
    title: "Accordion Field",
    description: "Data in JSON format, Grouped section",
    child: {},
    default: {
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {
        "ui:object": "accordionObjectField",
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  },
  tabfield: {
    title: "Tab Field",
    description: "Data in JSON format, Grouped section",
    child: {},
    default: {
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {
        "ui:object": "tabView"
      }
    }
  },
  layer: {
    title: "Layer/Modal Field",
    description: "Data in JSON format, Grouped section",
    child: {},
    default: {
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {
        "ui:object": "layerObjectField",
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  },
  switch: {
    title: "Switch",
    description: "Yes or no, 1 or 0, true or false",
    child: {},
    default: {
      schema: {
        type: "boolean"
      },
      uiSchema: {
        "ui:widget": "switch"
      }
    }
  },
  zenodo: {
    title: "Zenodo Field",
    description: "Data in JSON format, Grouped section",
    child: {},
    default: {
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {
        "ui:servicesList": [
          {
            value: "zenodo",
            label: "ZENODO"
          }
        ],
        "ui:field": "idFetcher",
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  },
  orcid: {
    title: "ORCiD Field",
    description: "Data in JSON format, Grouped section",
    child: {},
    default: {
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {
        "ui:servicesList": [
          {
            value: "orcid",
            label: "ORCID"
          }
        ],
        "ui:field": "idFetcher",
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  },
  getterId: {
    title: "Id Getter Field",
    description: "Data in JSON format, Grouped section",
    child: {},
    default: {
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {
        "ui:servicesList": [
          {
            value: "orcid",
            label: "ORCID"
          },
          {
            value: "ror",
            label: "ROR"
          },
          {
            value: "zenodo",
            label: "ZENODO"
          }
        ],
        "ui:field": "idFetcher",
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  },
  ror: {
    title: "ROR Field",
    description: "Data in JSON format, Grouped section",
    child: {},
    default: {
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {
        "ui:servicesList": [
          {
            value: "ror",
            label: "ROR"
          }
        ],
        "ui:field": "idFetcher",
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  },
  tags: {
    title: "Tags Field",
    description: "Add keywords, tags, etc",
    child: {},
    optionsSchema: {
      title: "Tags Schema",
      type: "object",
      properties: {
        title: {
          type: "string",
          title: "Title",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        description: {
          title: "Description",
          type: "string",
          description:
            "The title of the form field. How it will be displayed on the rendered form."
        },
        pattern: {
          type: "string",
          title: "Pattern",
          description: "Provide a regex expression for your pattern"
        },
        delimeter: {
          type: "string",
          descritpion: "Provide a delimeter for your input",
          title: "Delimeter"
        }
      }
    },
    optionsUiSchema: {
      type: "object",
      properties: {}
    },
    default: {
      schema: {
        type: "string"
      },
      uiSchema: {
        "ui:widget": "tags",
        "ui:options": {
          grid: {
            gridColumns: "1/5"
          }
        }
      }
    }
  }
};

const fields = {
  advanced: {
    title: "Advanced Fields",
    description: "",
    fields: advanced
  },
  simple: {
    title: "Simple Fields",
    description: "",
    fields: simple
  }
};

export default fields;
