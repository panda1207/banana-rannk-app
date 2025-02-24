import { SET_USERS, SEARCH_USER, SORT_BY_NAME, SHOW_LOWEST_RANKED, TOGGLE_FUZZY_SEARCH } from "../actionTypes";

interface User {
  uid: string;
  name: string;
  bananas: number;
  rank?: number;
}

interface State {
  users: User[];
  top10Users: User[];
  searchedUser: User | null;
}

const initialState: State = {
  users: [],
  allUsers: [],
  top10Users: [],
  searchedUser: null,
  isFuzzySearch: false
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USERS:
      const sortedUsers = [...action.payload].sort((a, b) => b.bananas - a.bananas);
      return { 
        ...state, 
        users: sortedUsers, 
        allUsers: sortedUsers,
        top10Users: sortedUsers.slice(0, 10) 
      };

    case SEARCH_USER:
      const query = action.payload.toLowerCase();
    
      let filteredUsers;
      let searchedUser = null;
    
      if (state.isFuzzySearch) {
        filteredUsers = state.users
          .filter((user) => user.name.toLowerCase().includes(query))
          .map((user) => ({
            ...user,
            rank: state.users.findIndex((u) => u.uid === user.uid) + 1,
          }));
      } else {
        searchedUser = state.users.find((u) => u.name.toLowerCase() === query);
    
        if (!searchedUser) {
          alert("This user name does not exist! Please specify an existing user name!");
          return { ...state, searchedUser: null, users: state.allUsers };
        }
    
        const top10 = state.users.slice(0, 10);
        const isInTop10 = top10.some((u) => u.uid === searchedUser.uid);
    
        if (isInTop10) {
          filteredUsers = [...top10];
        } else {
          const searchedUserRank = state.users.findIndex((u) => u.uid === searchedUser.uid) + 1;
          filteredUsers = [...top10];
          filteredUsers[9] = { ...searchedUser, rank: searchedUserRank };
        }
      }
    
      filteredUsers.sort((a, b) => b.bananas - a.bananas);
    
      return { ...state, searchedUser, users: filteredUsers };

    case TOGGLE_FUZZY_SEARCH:
      return { ...state, isFuzzySearch: !state.isFuzzySearch };

    case SORT_BY_NAME:
      return {
        ...state,
        users: [...state.users].sort((a, b) => a.name.localeCompare(b.name)),
      };

    case SHOW_LOWEST_RANKED:
      return {
        ...state,
        users: [...state.allUsers]
          .sort((a, b) => a.bananas - b.bananas || a.name.localeCompare(b.name))
          .slice(0, 10),
      };

    default:
      return state;
  }
};

export default userReducer;
