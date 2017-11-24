import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (min-width: 600px) {
    width: 50%;
  }
  @media (min-width: 1200px) {
    width: 66.6%;
  }
`;

export default Wrapper;
