import { Map, fromJS } from "immutable";

import {
  QUERY_CHANGED,
  ADD_AGGS,
  REMOVE_AGGS,
  CLEAR_SEARCH,
  PAGE_CHANGE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  UPDATE_EXPANDED_STATE
} from "../actions/search";

const initialState = Map({
  query: "",
  aggs: Map({}),
  selectedAggs: Map({}),
  results: Map({
    hits: [],
    total: 0
  }),
  error: Map({}),
  loading: false,
  expanded: false
});

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case QUERY_CHANGED:
      return state.set("query", action.query);
    case ADD_AGGS:
      return state.set("selectedAggs", action.selectedAggs);
    case REMOVE_AGGS:
      return state;
    case CLEAR_SEARCH:
      return state;
    case PAGE_CHANGE:
      return state;
    case SEARCH_REQUEST:
      return state.set("loading", true);
    case SEARCH_SUCCESS:
      return state.set("results", fromJS(action.results)).set("loading", false);
    // .set('aggs', fromJS(action.results.aggregations))
    case SEARCH_ERROR:
      return state;
    case UPDATE_EXPANDED_STATE:
      return state.set("expanded", action.value);
    default:
      return state;
  }
}
