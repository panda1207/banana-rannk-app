import { setUsers, searchUser, toggleFuzzySearch } from '../actions/userActions';
import { SET_USERS, SEARCH_USER, TOGGLE_FUZZY_SEARCH } from '../actionTypes';

describe('userActions', () => {
  it('should create an action to set users', () => {
    const mockUsers = [
      { uid: '1', name: 'Alice', bananas: 100 },
      { uid: '2', name: 'Bob', bananas: 50 },
    ];

    const expectedAction = { type: SET_USERS, payload: mockUsers };
    expect(setUsers(mockUsers)).toEqual(expectedAction);
  });

  it('should create an action to search a user', () => {
    const query = 'Alice';
    const expectedAction = { type: SEARCH_USER, payload: query };
    expect(searchUser(query)).toEqual(expectedAction);
  });

  it('should create an action to toggle fuzzy search', () => {
    const expectedAction = { type: TOGGLE_FUZZY_SEARCH };
    expect(toggleFuzzySearch()).toEqual(expectedAction);
  });
});
