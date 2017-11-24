import React from 'react';
import EventList from './index';
import renderer from 'react-test-renderer';

test('renders an event completely', () => {
  const myEvents = [{
    id: 132678,
    venue: {
      name: 'MyVenue',
      datetime: new Date(),
      on_sale_datetime: new Date()
    }
  }]

  const component = renderer.create(
    <EventList events={myEvents}/>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
