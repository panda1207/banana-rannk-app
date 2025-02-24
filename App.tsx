import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import leaderboardData from "./assets/leaderboard.json";
import { setUsers } from "./redux/actions/userActions";
import HomeScreen from "./screens/HomeScreen";

const processData = (data: Record<string, any>) => {
  return Object.values(data)
    .filter((user) => user.name) // Ensure user has a name
    .map((user) => ({
      uid: user.uid,
      name: user.name,
      bananas: user.bananas,
    }))
    .sort((a, b) => b.bananas - a.bananas); // Sort by highest bananas first
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const users = processData(leaderboardData);
    dispatch(setUsers(users));
  }, [dispatch]);

  return <HomeScreen />;
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);

