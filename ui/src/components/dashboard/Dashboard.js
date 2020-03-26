import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Box from "grommet/components/Box";
import Spinning from "grommet/components/icons/Spinning";

import { withRouter } from "react-router-dom";
import { fetchDashboard } from "../../actions/dashboard";

import DashboardList from "./DashboardList";
import DashboardListItem from "./DashboardListItem";
import DashboardWorkflowListItem from "./DashboardWorkflowListItem";
import DashboardMeter from "./components/DashboardMeter";
import DashboardQuickSearch from "./DashboardQuickSearch";
import Heading from "grommet/components/Heading";
import Label from "grommet/components/Label";
import ReactTooltip from "react-tooltip";

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchDashboard();
  }

  _getList = () => {
    return {
      drafts: {
        all: {
          list: this.props.results.drafts.data,
          more: this.props.results.drafts.more
        },
        mine: {
          list: this.props.results.user_drafts.data,
          more: this.props.results.user_drafts.more
        }
      },
      published: {
        all: {
          list: this.props.results.published.data,
          more: this.props.results.published.more
        },
        mine: {
          list: this.props.results.user_published.data,
          more: this.props.results.user_published.more
        }
      },
      workflows: {
        mine: {
          list: this.props.results.user_workflows.data,
          more: this.props.results.user_workflows.more
        }
      }
    };
  };

  render() {
    let lists = this._getList();
    return (
      <Box colorIndex="light-2" flex full>
        {this.props.loading ? (
          <Box flex align="center" justify="center">
            <Spinning size="large" />
          </Box>
        ) : (
          <Box colorIndex="light-2" flex>
            <Box direction="row" wrap justify="center">
              <DashboardList
                listType="draft"
                header="drafts"
                list={lists["drafts"]}
                ListItem={DashboardListItem}
                emptyMessage="Draft analyses that your collaborators have given you read/write access to."
              />
              <DashboardList
                listType="published"
                list={lists["published"]}
                header="published in collaboration"
                ListItem={DashboardListItem}
                emptyMessage="All analyses published on CAP by members of your collaboration."
              />
            </Box>
            <Box direction="row" wrap justify="center">
              <DashboardList
                listType="workflows"
                list={lists["workflows"]}
                header="workflows"
                ListItem={DashboardWorkflowListItem}
                emptyMessage="Recent workflows attached to your content"
              />
              <Box flex={false} pad="small">
                <Box>
                  <Box flex direction="row" pad="small" justify="center">
                    <Heading
                      tag="h5"
                      uppercase={true}
                      align="start"
                      justify="center"
                      margin="none"
                    >
                      Stats
                    </Heading>
                    <Box direction="row">
                      <Label margin="none" size="small" uppercase />
                    </Box>
                  </Box>
                </Box>
                <Box
                  flex={false}
                  direction="row"
                  size={{ height: "medium", width: "xlarge" }}
                  colorIndex="light-1"
                  justify="center"
                >
                  <DashboardMeter
                    total={this.props.results.user_count}
                    drafts={this.props.results.user_drafts_count}
                    published={this.props.results.user_published_count}
                  />
                  {/*<DashboardQuickSearch/>*/}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    );
  }
}

Dashboard.propTypes = {
  fetchDashboard: PropTypes.func,
  currentUser: PropTypes.object,
  results: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    loading: state.dashboard.get("loading"),
    results: state.dashboard.getIn(["results"])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDashboard: () => dispatch(fetchDashboard())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
