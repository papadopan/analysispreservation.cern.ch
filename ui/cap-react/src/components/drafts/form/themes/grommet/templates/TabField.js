import React from "react";
import PropTypes from "prop-types";

import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import { filter } from "lodash";
import AnalysisReuseMode from "../components/AnalysisReuseMode";
import ErrorFieldIndicator from "./ErrorFieldIndicator";

class TabField extends React.Component {
  constructor(props) {
    super(props);

    // fetch uiOptions
    this.options = { ...props.uiSchema["ui:options"] };

    // fetch tabs either from view object or from properties
    let fetched_tabs = this.options.tabs
      ? this.options.tabs
      : this.props.properties;

    // check if there is analysis_reuse_mode
    let analysis_mode = fetched_tabs.filter(
      item => item.name === "analysis_reuse_mode"
    );

    // remove components which are meant to be hidden
    // remove from the tab list the analysis_reuse_mode if exists
    let availableTabs = this._filterTabs(this.options.tabs, []);

    // fetch view options from schema or default values
    this.view = this.options.view || { vertical: true, sidebarColor: "grey-3" };

    // decide which tab will be active when mount
    let active;

    if (this.options.initTab) active = this.options.initTab;
    else active = availableTabs[0].name;

    this.state = {
      active,
      analysis_mode,
      optionTabs: this.options.tabs
    };

    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.setState({ layerActive: true });
  }

  _onTabClick = tab => {
    this.setState({ active: tab.name });
  };

  _checkIfHidden = name => {
    return (
      this.props.uiSchema &&
      this.props.uiSchema[name] &&
      this.props.uiSchema[name]["ui:options"] &&
      this.props.uiSchema[name]["ui:options"].hidden
    );
  };

  _filterTabs = (tabs, idsList) => {
    if (tabs) {
      this.options.tabs.map(tab => {
        tab.idsList = [];
        this.props.properties.map(item => {
          if (tab.content.includes(item.name)) {
            idsList.push(item.content.props.idSchema.$id);
            tab.idsList.push(item.content.props.idSchema.$id);
          }
        });
      });
      return this.options.tabs;
    }
    return this.props.properties.filter(
      item =>
        !this._checkIfHidden(item.name) && item.name !== "analysis_reuse_mode"
    );
  };

  render() {
    let idsList = [];
    let active_tabs_content = [];

    let tabs = this._filterTabs(this.options.tabs, idsList);
    let active_tab = tabs.filter(prop => prop.name == this.state.active);

    if (this.options.tabs) {
      active_tabs_content = filter(this.props.properties, prop => {
        return (
          active_tab[0].content && active_tab[0].content.indexOf(prop.name) > -1
        );
      });
    } else {
      active_tabs_content = active_tab;
    }

    return (
      <Box
        flex={true}
        style={{
          display: "grid",
          justifyContent: this.options && this.options.full ? " " : "center",
          overflow: "visible"
        }}
      >
        <Box>
          <Box className="md-column">
            <Box
              colorIndex={this.view.sidebarColor || "grey-4"}
              pad={{ between: this.view.vertical ? "none" : "small" }}
              direction={this.view.vertical ? "column" : "row"}
              wrap={true}
            >
              {this.state.analysis_mode.length > 0 ? (
                <AnalysisReuseMode
                  innerProps={this.state.analysis_mode[0].content.props}
                />
              ) : null}

              <Box
                flex={true}
                pad={{ vertical: "none" }}
                size={{ width: { max: "medium" } }}
              >
                {tabs.map((tab, index) => (
                  <ErrorFieldIndicator
                    errors={this.props.formContext.ref}
                    id={
                      this.state.optionTabs
                        ? tab.idsList
                        : tab.content.props.idSchema.$id
                    }
                    properties={this.props.properties}
                    tab={true}
                    key={index}
                  >
                    <Box
                      colorIndex={
                        tab.name == this.state.active ? "light-1" : null
                      }
                      key={index}
                      pad="small"
                      onClick={this._onTabClick.bind(this, tab)}
                    >
                      <Heading tag="h5" margin="none" size="medium" strong>
                        {tab.title ||
                          tab.content.props.schema.title ||
                          "Untitled"}
                      </Heading>
                    </Box>
                  </ErrorFieldIndicator>
                ))}
              </Box>
            </Box>

            <Box flex>
              <Box
                style={{
                  display: "grid",
                  overflow: "scroll",
                  padding: "10px",
                  width: "100%",
                  height: "100vh",
                  justifyContent: "center"
                }}
              >
                <Box
                  className="rjsf"
                  style={{
                    padding: "10px",
                    paddingBottom: "170px"
                  }}
                  size={{ width: this.view.innerTab || "xlarge" }}
                >
                  {active_tabs_content.map(item => item.content)}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

TabField.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  required: PropTypes.bool,
  idSchema: PropTypes.object,
  uiSchema: PropTypes.object,
  properties: PropTypes.array,
  formContext: PropTypes.object
};

export default TabField;
