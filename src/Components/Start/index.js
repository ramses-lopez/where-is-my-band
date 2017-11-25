import React from "react";
import styled, { keyframes } from "styled-components";

const Title = styled.h1`
  text-align: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const jump = keyframes`
  0% {
    transform:translateY(0);
  }

  50% {
    transform:translateY(10px);
  }

  100% {
    transform:translateY(0);
  }
`;

const Icon = styled.span`
  color: ${props => (props.primary ? props.theme.primary : "white")};
  font-size: ${props => (props.big ? "80px" : "20px")};
  padding-right: ${props => (props.left ? "15px" : "0px")};
  padding-left: ${props => (props.right ? "15px" : "0px")};
  animation: ${jump} 2s ease-in-out infinite;
`;

const Start = () => (
  <Wrapper>
    <Icon className="fa fa-chevron-up" primary />
    <Title>Search for an Artist/Band to get started!</Title>
  </Wrapper>
);

export default Start;
