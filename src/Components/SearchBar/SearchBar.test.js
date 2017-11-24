import React from 'react';
import SearchBar from './index';
import renderer from 'react-test-renderer';

test('renders the component according to snapshot', () => {

  const component = renderer.create(
    <SearchBar search={'Rock Star!'} />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
