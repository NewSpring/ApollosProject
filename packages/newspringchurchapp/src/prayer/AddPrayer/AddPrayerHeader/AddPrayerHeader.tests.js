import React from 'react';
import renderer from 'react-test-renderer';

import AddPrayerHeader from '.';

describe('The AddPrayerHeader component', () => {
  it('should render', () => {
    /* we have to pass in a date via defaultDate or the DateInput component will create a current date
     * object and invalidate the snapshots every time. */
    const tree = renderer.create(<AddPrayerHeader navigation={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom avatar', () => {
    /* we have to pass in a date via defaultDate or the DateInput component will create a current date
     * object and invalidate the snapshots every time. */
    const tree = renderer.create(
      <AddPrayerHeader
        navigation={jest.fn()}
        imgSrc={{ uri: 'https://picsum.photos/55/55?random' }}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom title', () => {
    /* we have to pass in a date via defaultDate or the DateInput component will create a current date
     * object and invalidate the snapshots every time. */
    const tree = renderer.create(
      <AddPrayerHeader navigation={jest.fn()} title={'custom title'} />
    );
    expect(tree).toMatchSnapshot();
  });
});
