import styled from "styled-components";

export const DropdownBoxWrapper = styled.div``;

export const DropdownBox = styled.div<{ open: boolean }>`
  outline: none;
  &[data-focus="true"] {
    outline: 2px solid #000;
  }
`;

export const DropdownItemWrapper = styled.div<{ open: boolean }>`
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: all 0.1s;
  position: absolute;
`;

export const DropdownItem = styled.p``;

export const ErrorMessage = styled.p``;
