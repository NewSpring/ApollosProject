import React from 'react';
import renderer from 'react-test-renderer';
import Providers from 'newspringchurchapp/src/Providers';

import AddPrayerForm from '.';

describe('The AddPrayerForm component', () => {
  it('should render', () => {
    /* we have to pass in a date via defaultDate or the DateInput component will create a current date
     * object and invalidate the snapshots every time. */
    const tree = renderer.create(
      <Providers>
        <AddPrayerForm navigation={jest.fn()} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom avatar', () => {
    /* we have to pass in a date via defaultDate or the DateInput component will create a current date
     * object and invalidate the snapshots every time. */
    const tree = renderer.create(
      <Providers>
        <AddPrayerForm
          navigation={jest.fn()}
          imgSrc={{ uri: 'https://picsum.photos/55/55?random' }}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom title', () => {
    /* we have to pass in a date via defaultDate or the DateInput component will create a current date
     * object and invalidate the snapshots every time. */
    const tree = renderer.create(
      <Providers>
        <AddPrayerForm
          navigation={jest.fn()}
          btnLabel={'custom button label'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
