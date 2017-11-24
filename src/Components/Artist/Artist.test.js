import React from 'react';
import Artist from './index';
import renderer from 'react-test-renderer';

test('renders an event completely', () => {
  const rockStar = {
    image_url: 'http://example.com/some-image.jpg',
    name: 'Rock Star!',
    excerpt: 'Rock Star band description',
    facebook_page_url: 'http://facebook.com/rockstar',
  }


  const component = renderer.create(
    <Artist artist={rockStar}/>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
