import React, { memo } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import shortnameToUnicode from "../../utils/emojis/shortnameToUnicode";

type EmojiProps = {
  item: any;
};

const Emoji = ({ item }: EmojiProps) => {
  return (
    <TouchableOpacity style={styles.emojiContainer}>
      <Text style={styles.emoji}>
        {shortnameToUnicode[`:${item}:` as keyof typeof shortnameToUnicode]}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emojiContainer: {
    marginHorizontal: 9,
  },
  emoji: {
    fontSize: 25,
  },
});

export default Emoji;
