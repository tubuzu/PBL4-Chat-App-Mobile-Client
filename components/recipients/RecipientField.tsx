import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { User } from "../../utils/types";
import SelectedRecipientChip from "./SelectedRecipientChip";

type Props = {
  selectedUser: User | undefined;
  setQuery: Dispatch<SetStateAction<string>>;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
};

function RecipientField({ selectedUser, setQuery, setSelectedUser }: Props) {
  return (
    <View style={{ width: "100%" }}>
      <Text style={{ marginBottom: 10 }}>Recipient:</Text>
      {selectedUser ? (
        <SelectedRecipientChip
          user={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      ) : (
        <TextInput
          onChangeText={(value: any) => setQuery(value)}
          placeholder="search"
          autoCapitalize="none"
          style={styles.input}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#1b1b33",
    height: 35,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
  },
});

export default RecipientField;
