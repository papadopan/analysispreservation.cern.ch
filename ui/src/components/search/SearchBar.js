import React from "react";

import { Search, Box, Tip } from "grommet";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import queryString from "query-string";

import {fetchSearch} from "../../actions/search";

class SearchBar extends React.Component {
    constructor() {
        super();
    }

    _onSearchSubmit(event) {
        let query = event.target.value;
        let q = queryString.parse(this.props.history.location.search);
        q["q"] = query;

        const search_location = {
            pathname: `/search`,
            search: `${queryString.stringify(q)}`,
            from: this.props.match.path
        };

        this.props.history.push(search_location);
    }

    onSearchInput = (event) => {
        let query = event.target.value;
        let q = queryString.parse(this.props.location.search);
        q["q"] = query;
    };

    onTipClick = () => {
        localStorage.setItem("alreadySeenIt", true);
        this.props.history.push("/howto");
    }

    render() {
        return (
            <Box>
                <Search
                    id="searchbar"
                    inline={true}
                    flex="true"
                    placeHolder="Search"
                    dropAlign={{"right": "right"}}
                    onDOMChange={this.onSearchInput}
                    onSelect={this._onSearchSubmit.bind(this)}
                />
                {
                    !localStorage.getItem("alreadySeenIt") &&
                    <Tip 
                        target="searchbar"
                        onClose={this.onTipClick}
                        colorIndex="accent-1-a"
                    >
                        Show me how to search!
                    </Tip>
                }
            </Box>
        );
    }
}

SearchBar.propTypes = {
    fetchSearch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSearch: query => dispatch(fetchSearch(query)),
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SearchBar));
