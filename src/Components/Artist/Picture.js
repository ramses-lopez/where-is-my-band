import styled from "styled-components";

const Picture = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border: 0px;
  margin: auto;
  display: block;
`;

export default Picture;
