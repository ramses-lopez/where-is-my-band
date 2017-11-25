import styled from "styled-components";
import { transparentize } from "polished";

const Button = styled.button`
  padding: 10px 25px;
  background: transparent;
  border: 2px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  margin-left: ${props => (props.left ? "auto" : "15px")};
  margin-right: ${props => (props.right ? "auto" : "15px")};

  &:hover {
    cursor: pointer;
    background: ${props => transparentize(0.9, props.theme.primary)};
  }

  &:only-child {
    margin-left: 0;
  }
`;

export default Button;
