import React from 'react';
import Event from './index';
import renderer from 'react-test-renderer';

test('renders an event completely', () => {
  const myEvent = {
    venue: {
      name: 'MyVenue',
      datetime: new Date(),
      on_sale_datetime: new Date()
    }
  }

  const component = renderer.create(
    <Event data={myEvent}/>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
