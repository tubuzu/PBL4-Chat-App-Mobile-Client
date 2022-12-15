import styled from "styled-components/native";

export const SelectedRecipientPillStyle = styled.View`
  & .icon {
    margin-left: 10px;
    color: #656565;
    cursor: pointer;
    transition: 300ms color ease;
    :hover {
      color: #c62d2d;
    }
  }
`;

export const RecipientResultContainerStyle = styled.View`
  width: 100%;
  border-radius: 3px;
  background-color: #ccc;
  `;
  //   margin: 4px 24px;
// position: absolute;
//   right: 0;
//   left: 0;

export const RecipientResultItem = styled.Pressable`
  padding: 20px 28px;
`;

export const RecipientScrollableItemContainer = styled.View`
  max-height: 200px;
  overflow: scroll;
`;
