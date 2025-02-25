import userReducer from './userReducer';
import { SET_USERS, SEARCH_USER, TOGGLE_FUZZY_SEARCH } from '../actionTypes';

const mockUsers = [
  { uid: '1', name: 'Alice', bananas: 100 },
  { uid: '2', name: 'Bob', bananas: 50 },
  { uid: '3', name: 'Charlie', bananas: 75 },
];

describe('userReducer', () => {
  it('should return initial state', () => {
    const newState = userReducer(undefined, { type: undefined });
    expect(newState.users).toEqual([]);
    expect(newState.allUsers).toEqual([]);
    expect(newState.top10Users).toEqual([]);
    expect(newState.searchedUser).toBeNull();
    expect(newState.isFuzzySearch).toBe(false);
  });

  it('should handle SET_USERS', () => {
    const action = { type: SET_USERS, payload: mockUsers };
    const newState = userReducer(undefined, action);

    expect(newState.users.length).toBe(3);
    expect(newState.users[0].name).toBe('Alice');
    expect(newState.allUsers.length).toBe(3);
    expect(newState.top10Users.length).toBe(3);
  });

  it('should handle SEARCH_USER (exact match)', () => {
    const initialState = { users: mockUsers, allUsers: mockUsers, searchedUser: null };
    const action = { type: SEARCH_USER, payload: 'Bob' };
    const newState = userReducer(initialState, action);

    expect(newState.searchedUser).not.toBeNull();
    expect(newState.searchedUser?.name).toBe('Bob');
    expect(newState.users.length).toBe(3);
  });

  it('should handle SEARCH_USER (not found)', () => {
    global.alert = jest.fn();
    const initialState = { users: mockUsers, allUsers: mockUsers, searchedUser: null };
    const action = { type: SEARCH_USER, payload: 'Unknown' };
    const newState = userReducer(initialState, action);

    expect(newState.searchedUser).toBeNull();
    expect(newState.users).toEqual(mockUsers);
  });

  it('should handle TOGGLE_FUZZY_SEARCH', () => {
    const initialState = { isFuzzySearch: false };
    const newState = userReducer(initialState, { type: TOGGLE_FUZZY_SEARCH });

    expect(newState.isFuzzySearch).toBe(true);
  });
});

