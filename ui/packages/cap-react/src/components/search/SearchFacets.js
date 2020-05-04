import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import queryString from "query-string";

import Heading from "grommet/components/Heading";
import Anchor from "grommet/components/Anchor";
import Sidebar from "grommet/components/Sidebar";
import Box from "grommet/components/Box";
import Menu from "grommet/components/Menu";
import CheckBox from "grommet/components/CheckBox";

import ShowMore from "./ShowMore";

// import FiltersPreview from './components/FiltersPreview';

class SearchFacets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ""
    };
  }

  constructFacets = aggs => {
    let facets = {};

    let keys = Object.keys(aggs).filter(key => {
      return typeof aggs[key] === "object";
    });
    for (let key of keys) {
      let obj = {};
      if (key.startsWith("facet_")) {
        obj[key.replace("facet_", "")] =
          "filtered" in aggs[key] ? aggs[key]["filtered"] : aggs[key];
      } else {
        obj = this.constructFacets(aggs[key]);
      }
      Object.assign(facets, obj);
    }

    return facets;
  };

  _onChange(category, event) {
    const name = event.target ? event.target.name : null;
    let currentParams = queryString.parse(this.props.location.search);

    this._toggleAggs(category, name, currentParams);
  }

  _toggleAggs(category, name, selectedAggregations) {
    let _selectedAggregations = Object.assign({}, selectedAggregations);

    if (!_selectedAggregations[category]) {
      _selectedAggregations[category] = [];
    }

    if (typeof _selectedAggregations[category] == "string")
      _selectedAggregations[category] = [_selectedAggregations[category]];

    let index = _selectedAggregations[category].indexOf(name);

    if (index == -1) _selectedAggregations[category].push(name);
    else _selectedAggregations[category].splice(index, 1);

    this.updateHistory(_selectedAggregations, category);
  }

  updateHistory(selectedAggs, category) {
    let facet = this.constructFacets(this.props.aggs);
    let catType;
    if (facet[category]) {
      let temp = Object.keys(facet[category].buckets[0]).filter(name =>
        name.startsWith("facet_")
      );
      temp.length ? (catType = temp[0].replace("facet_", "")) : null;
    }

    // remove nested filters if the parent is unchecked
    let eligibleItems = [];

    if (facet[category] && facet[category].buckets) {
      selectedAggs[category].map(item => {
        facet[category].buckets.map(bucket => {
          if (item === bucket.key) {
            let bucketListName = Object.keys(bucket).filter(b =>
              b.startsWith("facet_")
            );
            if (bucket[bucketListName[0]]) {
              bucket[bucketListName[0]].buckets.map(bucket_item =>
                eligibleItems.push(bucket_item.key)
              );
            }
          }
        });
      });

      let intersect = [];

      if (selectedAggs[catType]) {
        intersect = eligibleItems.filter(item =>
          selectedAggs[catType].includes(item)
        );
        selectedAggs[catType] = intersect;
      }
    }

    let currentParams = queryString.parse(this.props.location.search);
    "page" in selectedAggs ? delete selectedAggs["page"] : null;
    "page" in currentParams ? delete currentParams["page"] : null;

    const location = {
      search: `${queryString.stringify(
        Object.assign(currentParams, selectedAggs)
      )}`
    };

    this.props.history.replace(location);
  }

  isAggSelected(selected, value) {
    if (selected) {
      if (selected.constructor === Array) {
        return selected.indexOf(value) > -1;
      } else {
        return selected === value;
      }
    }

    return false;
  }

  _filter_by_mine() {
    let currentParams = queryString.parse(this.props.location.search);

    if ("by_me" in currentParams) delete currentParams["by_me"];
    else currentParams["by_me"] = "True";

    this.props.history.replace({
      search: `${queryString.stringify(currentParams)}`
    });
  }

  render() {
    if (this.props.aggs) {
      let facets = this.constructFacets(this.props.aggs);
      let categories = Object.keys(facets);

      return (
        <Sidebar full={false} colorIndex="light-2">
          <Box flex={true} justify="start">
            <Menu flex={true} primary={true}>
              <Box>
                <Box pad="small">
                  <Heading
                    pad="small"
                    tag="h5"
                    strong={false}
                    uppercase={true}
                    truncate={true}
                    href="#"
                  >
                    filter by
                  </Heading>
                  <Box
                    size="medium"
                    styles={{ maxHeight: "100px" }}
                    pad="none"
                    direction="column"
                  >
                    <Box
                      size="medium"
                      direction="row"
                      justify="between"
                      align="center"
                      style={{ fontSize: "0.8em" }}
                    >
                      <CheckBox
                        label="created by me"
                        checked={
                          this.isAggSelected(
                            this.props.selectedAggs["by_me"],
                            "True"
                          )
                            ? true
                            : false
                        }
                        onChange={this._filter_by_mine.bind(this)}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              {categories.map(category => {
                return (
                  <Box key={category}>
                    {facets[category].buckets.length > 0 && (
                      <Box pad="small" key={category}>
                        <Heading
                          pad="small"
                          tag="h5"
                          strong={false}
                          uppercase={true}
                          truncate={true}
                          href="#"
                          className="active"
                          label={category}
                          id={category}
                          value={category}
                        >
                          {category.replace("_", " ")}
                        </Heading>
                        <Box
                          size="medium"
                          styles={{ maxHeight: "100px" }}
                          pad="none"
                          direction="column"
                        >
                          <ShowMore limit={11} items={facets[category].buckets}>
                            {({
                              current,
                              showMore,
                              showLess,
                              filter,
                              expanded
                            }) => (
                              <Box>
                                {current.map(field => (
                                  <Box key={String(field.key)}>
                                    <Box
                                      size="medium"
                                      direction="row"
                                      justify="between"
                                      align="center"
                                      style={{ fontSize: "0.8em" }}
                                    >
                                      <CheckBox
                                        label={field.key}
                                        key={field.key}
                                        name={String(field.key)}
                                        checked={
                                          this.isAggSelected(
                                            this.props.selectedAggs[category],
                                            field.key
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={this._onChange.bind(
                                          this,
                                          category
                                        )}
                                      />
                                      <Box align="end">
                                        {typeof field.doc_count === "object"
                                          ? field.doc_count.doc_count
                                          : field.doc_count}
                                      </Box>
                                    </Box>
                                    <Box margin={{ left: "small" }}>
                                      {this.isAggSelected(
                                        this.props.selectedAggs[category],
                                        field.key
                                      ) &&
                                        Object.keys(field)
                                          .filter(key =>
                                            key.startsWith("facet_")
                                          )
                                          .map(key => {
                                            return field[key].buckets.map(
                                              nested_field => (
                                                <Box
                                                  size="medium"
                                                  key={String(nested_field.key)}
                                                  direction="row"
                                                  justify="between"
                                                  align="start"
                                                  style={{ fontSize: "0.8em" }}
                                                >
                                                  <CheckBox
                                                    label={nested_field.key}
                                                    key={nested_field.key}
                                                    name={String(
                                                      nested_field.key
                                                    )}
                                                    checked={
                                                      this.isAggSelected(
                                                        this.props.selectedAggs[
                                                          key.replace(
                                                            "facet_",
                                                            ""
                                                          )
                                                        ],
                                                        nested_field.key
                                                      )
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={this._onChange.bind(
                                                      this,
                                                      key.replace("facet_", "")
                                                    )}
                                                  />
                                                  <Box align="end">
                                                    {typeof nested_field.doc_count ===
                                                    "object"
                                                      ? nested_field.doc_count
                                                          .doc_count
                                                      : nested_field.doc_count}
                                                  </Box>
                                                </Box>
                                              )
                                            );
                                          })}
                                    </Box>
                                  </Box>
                                ))}
                                <Box align="center">
                                  {filter ? (
                                    <Anchor
                                      label={expanded ? "less" : "more"}
                                      onClick={() => {
                                        expanded ? showLess() : showMore();
                                      }}
                                    />
                                  ) : null}
                                </Box>
                              </Box>
                            )}
                          </ShowMore>
                        </Box>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Menu>
          </Box>
        </Sidebar>
      );
    }

    return <div>None</div>;
  }
}

SearchFacets.propTypes = {
  aggs: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  selectedAggs: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    selectedAggs: state.search.getIn(["selectedAggs"])
  };
}

export default withRouter(connect(mapStateToProps)(SearchFacets));
