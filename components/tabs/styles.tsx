import styled, { css } from "styled-components/native";
import { ConversationSelectedProps } from "../../utils/styles/StyleTypes";

export const ConversationTabItemStyle = styled.View<ConversationSelectedProps>`
  color: #cccccc;
  flex: 1;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 900;
  border-bottom: 1px solid black;
  ${({ selected }) =>
    selected &&
    css`
      color: #000000;
      border-bottom: 1px solid black;
    `};
`;

//   color: ${({ selected }) => selected ? "black" : "#cccccc"};
// ${({ selected }) =>
// selected &&
// css`
//   background-color: #424242 !important;
// `};
