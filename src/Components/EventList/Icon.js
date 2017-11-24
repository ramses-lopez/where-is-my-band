import styled from "styled-components";

const Icon = styled.span`
  color: ${props => (props.primary ? props.theme.primary : "white")};
  font-size: ${props => (props.big ? "80px" : "20px")};
  padding-right: ${props => (props.left ? "15px" : "0px")};
  padding-left: ${props => (props.right ? "15px" : "0px")};
`;

export default Icon;
