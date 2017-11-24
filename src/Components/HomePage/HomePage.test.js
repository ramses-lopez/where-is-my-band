import React from 'react';
import HomePage from './index';
import renderer from 'react-test-renderer';

test('renders the component according to snapshot', () => {
  const myEvents = [{
    id: '13',
    venue: {
      name: 'MyVenue',
      datetime: new Date(),
      on_sale_datetime: new Date()
    }
  }]

  const rockStar = {
    image_url: 'http://example.com/some-image.jpg',
    name: 'Rock Star!',
    excerpt: 'Rock Star band description',
    facebook_page_url: 'http://facebook.com/rockstar',
  }

  const component = renderer.create(
    <HomePage
      search={'Rock Star!'}
      artist={rockStar}
      events={myEvents}
      setActiveEvent={myEvents[0]} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
