const simple = {
  string: {
    title: "Text",
    description: "Titles, names, paragraphs, IDs, list of names",
    child: {},
    default: {
      schema: {
        type: "string"
      },
      uiSchema: {}
    }
  },
  number: {
    title: "Number",
    description: "IDs, order number, rating, quantity",
    child: {},
    default: {
      schema: {
        type: "number"
      },
      uiSchema: {}
    }
  },
  boolean: {
    title: "Boolean",
    description: "Yes or no, 1 or 0, true or false",
    child: {},
    default: {
      schema: {
        type: "boolean"
      },
      uiSchema: {}
    }
  },
  array: {
    title: "Array",
    description:
      "A list of things. List of strings, numbers, objects, references",
    child: {},
    default: {
      schema: {
        type: "array",
        items: {}
      },
      uiSchema: {}
    }
  }
};

const advanced = {
  zenodo: {
    title: "Zenodo",
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
        "ui:field": "idFetcher"
      }
    }
  },
  orcid: {
    title: "ORCiD",
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
        "ui:field": "idFetcher"
      }
    }
  },
  getterId: {
    title: "Id Getter",
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
        "ui:field": "idFetcher"
      }
    }
  },
  ror: {
    title: "ROR",
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
        "ui:field": "idFetcher"
      }
    }
  },
  tags: {
    title: "Tags",
    description: "Add keywords, tags, etc",
    child: {},
    default: {
      schema: {
        type: "string"
      },
      uiSchema: {
        "ui:widget": "tags"
      }
    }
  }
};

const Structure = {
  tabfield: {
    title: "Tab",
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
  }
};

const objects = {
  accordion: {
    title: "Accordion",
    description: "Data in JSON format, Grouped section",
    child: {},
    default: {
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {
        "ui:object": "accordionObjectField"
      }
    }
  },
  object: {
    title: "JSON",
    description: "Data in JSON format, Grouped section",
    child: {},
    default: {
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {}
    }
  },
  layer: {
    title: "Layer/Modal",
    description: "Data in JSON format, Grouped section",
    child: {},
    default: {
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {
        "ui:object": "layerObjectField"
      }
    }
  }
};

const fields = {
  structure: {
    title: "Structure Block",
    description: "",
    fields: Structure
  },
  objects: {
    title: "Objects",
    description: "",
    fields: objects
  },

  advanced: {
    title: "Fields",
    description: "",
    fields: advanced
  },
  simple: {
    title: "Widgets",
    description: "",
    fields: simple
  }
};

export default fields;
