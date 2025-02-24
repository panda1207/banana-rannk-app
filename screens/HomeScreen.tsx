import React, { useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchUser, setUsers, sortByName, showLowestRanked, toggleFuzzySearch } from "../redux/actions/userActions";
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import CheckBox from "react-native-checkbox";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const { users, allUsers, searchedUser, isFuzzySearch } = useSelector((state: any) => state.user);
  const isSearching = searchQuery.length > 0;
  const dataToRender = users;

  const handleClearSearch = () => {
    setSearchQuery("");
    dispatch(setUsers(allUsers));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        {/* Search Bar */}
        <SearchContainer>
          <Icon name="search-outline" size={20} color="#666" style={{ marginRight: 10 }} />
          <SearchInput
            placeholder="Enter username"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#888"
          />
          
          {searchQuery.length > 0 && (
            <ClearButton onPress={handleClearSearch}>
              <Icon name="close-circle" size={20} color="#666" />
            </ClearButton>
          )}

          <StyledButton onPress={() => dispatch(searchUser(searchQuery))}>
            <ButtonText>Search</ButtonText>
          </StyledButton>
        </SearchContainer>

        {/* Fuzzy Search Checkbox */}
        <CheckboxContainer>
          <CheckBox
            label="Enable Fuzzy Search"
            checked={isFuzzySearch}
            onChange={() => dispatch(toggleFuzzySearch())}
          />
        </CheckboxContainer>

        {/* Sorting Options */}
        <SortingContainer>
          <StyledButton onPress={() => dispatch(sortByName())}>
            <ButtonText>Sort by Name</ButtonText>
          </StyledButton>
          <StyledButton onPress={() => dispatch(showLowestRanked())}>
            <ButtonText>Lowest Ranked</ButtonText>
          </StyledButton>
        </SortingContainer>      

        {/* Table Header */}
        <TableHeader>
          <ColumnTitle style={{ flex: 3 }}>Name</ColumnTitle>
          <ColumnTitle style={{ flex: 1 }}>Rank</ColumnTitle>
          <ColumnTitle style={{ flex: 1 }}>Bananas 🍌</ColumnTitle>
        </TableHeader>

        {/* User List */}
        <FlatList
          data={users}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <RowContainer isHighlighted={searchedUser?.uid === item.uid}>
              <ColumnTextBold style={{ flex: 3 }}>{item.name}</ColumnTextBold>
              <ColumnText style={{ flex: 1 }}>{item.rank || users.findIndex((u) => u.uid === item.uid) + 1}</ColumnText>
              <ColumnText style={{ flex: 1 }}>{item.bananas}</ColumnText>
            </RowContainer>
          )}
        />
      </Container>
    </SafeAreaView>
  );
};

/* Styled Components */
const Container = styled.View`
  flex: 1;
  padding: 20px 20px 0 20px;
  background-color: #f5f5f5;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const SortingContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #333;
`;

const ClearButton = styled.TouchableOpacity`
  padding: 5px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #4CAF50;
  padding: 10px 15px;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const TableHeader = styled.View`
  flex-direction: row;
  padding: 10px;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin-bottom: 5px;
`;

const ColumnTitle = styled.Text`
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

const ColumnText = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
  text-align: center;
`;

const ColumnTextBold = styled(ColumnText)`
  font-weight: bold;
  color: #007bff;
`;

const RowContainer = styled.View`
  flex-direction: row;
  padding: 10px;
  background-color: ${(props) => (props.isHighlighted ? "#FFD700" : "white")};
  border-radius: 8px;
  margin-bottom: 5px;
`;

const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const CheckboxLabel = styled.Text`
  margin-left: 5px;
  font-size: 16px;
  color: #333;
`;

export default HomeScreen;
