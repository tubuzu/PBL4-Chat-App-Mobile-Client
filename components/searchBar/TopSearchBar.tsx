import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";

type Props = {
  query: string;
  setQuery: any;
}

export default function TopSearchBar({query, setQuery}: Props) {
  const handleClearQuery = () => {
    setQuery("");
  };

  return (
    <View style={styles.chatSearchBar}>
      <View style={styles.chatSearchBarLeft}>
        <Ionicons
          name="search"
          color="white"
          size={25}
          style={styles.chatSearchIcon}
        />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="white"
          value={query}
          onChangeText={(value: any) => setQuery(value)}
        />
      </View>
      <View style={styles.chatSearchBarRight}>
        {query && (
          <Pressable onPress={handleClearQuery}>
            <Ionicons
              name="close"
              color="white"
              size={25}
              style={styles.chatCloseIcon}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
