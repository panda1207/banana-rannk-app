import { SET_USERS, SEARCH_USER, SORT_BY_NAME, SHOW_LOWEST_RANKED, TOGGLE_FUZZY_SEARCH } from "../actionTypes";

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const searchUser = (username) => ({
  type: SEARCH_USER,
  payload: username,
});

export const sortByName = () => ({
  type: SORT_BY_NAME,
});

export const showLowestRanked = () => ({
  type: SHOW_LOWEST_RANKED,
});

export const toggleFuzzySearch = () => ({
  type: TOGGLE_FUZZY_SEARCH,
});
