import styled from "styled-components";

const Card = styled.div`
  list-style-type: none;
  background: #7b1fa2;
  color: white;
  padding: 15px;
  border-radius: 0px 3px 3px 0px;
  width: 100%;
  margin: 15px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.04);
    cursor: pointer;
  }

  @media (min-width: 1200px) {
    flex-basis: 40%;
    flex-grow: 1;
  }
`;

export default Card;
