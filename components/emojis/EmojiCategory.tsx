import React, { memo } from "react";
import { FlatList, Dimensions } from "react-native";
import { emojisByCategory } from "../../utils/emojis/emojis";

import Emoji from "./Emoji";

type Props = {
  category: any;
};

const EmojiCategory = ({ category }: Props) => {
  return (
    <FlatList
      data={emojisByCategory[category as keyof typeof emojisByCategory]}
      renderItem={({ item }) => <Emoji item={item} />}
      keyExtractor={(item) => item}
      numColumns={8}
    />
  );
};

export default memo(EmojiCategory);
