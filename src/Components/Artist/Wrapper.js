import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 15px;
  flex-direction: column;

  @media (min-width: 600px) {
    width: 50%;
  }
  @media (min-width: 1200px) {
    width: 33.3%;
  }
`;

export default Wrapper;
