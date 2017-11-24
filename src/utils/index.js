const baseUrl = "https://rest.bandsintown.com";
const appId = "?app_id=wimb";

export const getArtistURL = query => {
  return `${baseUrl}/artists/${encodeURI(query)}${appId}`;
};

export const getEventsURL = query => {
  return `${baseUrl}/artists/${encodeURI(query)}/events${appId}`;
};

export const getExcerptURL = query => {
  return `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&redirects=1&exintro=&explaintext=&titles=${encodeURI(
    query
  )}`;
};

export const builtExcerpt = data => {
  return !data.query.pages[-1]
    ? data.query.pages[Object.keys(data.query.pages)[0]].extract.substring(
        0,
        150
      ) + "..."
    : null;
};

export const builtArtist = data => {
  return data.id !== "" ? data : null;
};
