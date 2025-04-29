import styled from "styled-components";

export const ComboWrapper = styled.div``;

export const ComboInput = styled.input<{ open: boolean }>`
  width: 100%;
  height: 100%;
  outline: none;
  &[data-focus="true"] {
    outline: 2px solid #000;
  }
`;

export const ComboOptionWrapper = styled.div<{ open: boolean }>`
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: all 0.1s;
  position: absolute;
`;

export const ComboOption = styled.p``;

export const ErrorMessage = styled.p``;