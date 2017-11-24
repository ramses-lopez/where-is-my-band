import React from "react";
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

const Picture = styled.img`
  width: 100%;
  height: auto;
  margin: auto;
  display: block;
`;

const Name = styled.h1`
  color: ${props => props.theme.primary};
  font-size: 40px;
  font-weight: bold;
  width: 100%;
  margin: auto;
  margin-top: 15px;
`;

const Excerpt = styled.div`
  margin-top: 15px;
  font-size: 16px;
  width: 100%;
  margin: auto;
`;

const Follow = styled.a`
  text-align: center;
  color: #4a90e2;
  display: block;
  font-size: 16px;
  width: 100%;
  margin: auto;
  margin-top: 15px;
`;

const Artist = ({ artist }) => (
  <Wrapper>
    <Picture src={artist.image_url} />
    <Name>{artist.name}</Name>
    <Excerpt>{artist.excerpt}</Excerpt>
    <Follow href={artist.facebook_page_url} target="_blank">
      Follow on Facebook
    </Follow>
  </Wrapper>
);

export default Artist;
