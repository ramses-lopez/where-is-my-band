import React from "react";

import Wrapper from "./Wrapper";
import Excerpt from "./Excerpt";
import Picture from "./Picture";
import Name from "./Name";
import Follow from "./Follow";

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
