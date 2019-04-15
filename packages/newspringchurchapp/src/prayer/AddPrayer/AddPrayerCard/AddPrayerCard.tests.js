import React from 'react';
import renderer from 'react-test-renderer';

import AddPrayerCard from '.';

describe('The AddPrayerCard component', () => {
  it('should render', () => {
    /* we have to pass in a date via defaultDate or the DateInput component will create a current date
     * object and invalidate the snapshots every time. */
    const tree = renderer.create(<AddPrayerCard />);
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom avatar', () => {
    /* we have to pass in a date via defaultDate or the DateInput component will create a current date
     * object and invalidate the snapshots every time. */
    const tree = renderer.create(
      <AddPrayerCard imgSrc={{ uri: 'https://picsum.photos/55/55?random' }} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom title', () => {
    /* we have to pass in a date via defaultDate or the DateInput component will create a current date
     * object and invalidate the snapshots every time. */
    const tree = renderer.create(
      <AddPrayerCard
        description={'this is a custom description for the card.'}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
