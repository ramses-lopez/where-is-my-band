import styled from "styled-components";

const Form = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 15px;

  &:after {
    content: "";
    box-shadow: 0px 0px 25px #000;
    display: block;
    width: 300px;
    max-width: 90%;
    height: 5px;
    position: absolute;
    z-index: -1;
    bottom: 16px;
  }
`;

export default Form;
