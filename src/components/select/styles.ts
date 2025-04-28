import styled from "styled-components";

export const SelectBoxWrapper = styled.div``;

export const SelectBox = styled.div<{ open: boolean }>`
  outline: none;
  &[data-focus="true"] {
    outline: 2px solid #000;
  }
`;

export const SelectOptionWrapper = styled.div<{ open: boolean }>`
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: all 0.1s;
  position: absolute;
`;

export const SelectOption = styled.p``;

export const ErrorMessage = styled.p``;
