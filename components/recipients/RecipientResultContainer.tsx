import React, { FC } from 'react';
import {
  RecipientResultContainerStyle,
  RecipientResultItem,
  RecipientScrollableItemContainer,
} from './styles';
import { User } from '../../utils/types';
import { Text } from 'react-native';

type Props = {
  userResults: User[];
  handleUserSelect: (user: User) => void;
};

export const RecipientResultContainer: FC<Props> = ({
  userResults,
  handleUserSelect,
}) => {
  console.log(userResults)
  return (
    <RecipientResultContainerStyle>
      <RecipientScrollableItemContainer>
        {userResults.map((user) => (
          <RecipientResultItem
            key={user._id}
            onPress={() => handleUserSelect(user)}
          >
            <Text>{user.username}</Text>
          </RecipientResultItem>
        ))}
      </RecipientScrollableItemContainer>
    </RecipientResultContainerStyle>
  );
};
