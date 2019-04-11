import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';

import MyPrayerCard from './MyPrayerCard';

const prayer1 = {
  id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4787',
  firstName: 'Aaron',
  lastName: 'Attendee',
  text: 'This is a test to see if I have a prayer request.',
  enteredDateTime: '2017-04-08T11:21:53.053',
};
const prayer2 = {
  id: 'PrayerRequest:a043b2710b8d9c0d2f659ff90d00cf9d',
  firstName: 'Aaron',
  lastName: 'Attendee',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a tellus sit amet mi consectetur pharetra lacinia eget arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus felis diam, sagittis ut.',
  enteredDateTime: '2017-04-10T13:50:22.753',
};
const prayer3 = {
  id: 'PrayerRequest:05c9c6351be882103edb1e350c77422b',
  firstName: 'Aaron',
  lastName: 'Attendee',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar, elit nec lobortis aliquam, urna.',
  enteredDateTime: '2017-04-10T13:53:24.623',
};
const prayer4 = {
  id: 'PrayerRequest:1c627c20911791321f819125a65c3c9d',
  firstName: 'Aaron',
  lastName: 'Attendee',
  text:
    'Lorem Lorem Lorem Lorem Ipsum Ipsum Ipsum Dolor Dolor sit sit sit amet amet.',
  enteredDateTime: '2017-04-10T14:55:14.01',
};
const prayer5 = {
  id: 'PrayerRequest:66a4d75b02b447556e4e3806430a9946',
  firstName: 'Aaron',
  lastName: 'Attendee',
  text:
    'Aaron is the man with the plan who owns a can and drives to Japan which has a lot of sand.',
  enteredDateTime: '2017-04-10T15:14:54.013',
};

describe('the MyPrayerCard component', () => {
  it('renders Prayer1', () => {
    const tree = renderer.create(
      <Providers>
        <MyPrayerCard
          id={prayer1.id}
          text={prayer1.text}
          duration={prayer1.enteredDateTime}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders Prayer2', () => {
    const tree = renderer.create(
      <Providers>
        <MyPrayerCard
          id={prayer2.id}
          text={prayer2.text}
          duration={prayer2.enteredDateTime}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders Prayer3', () => {
    const tree = renderer.create(
      <Providers>
        <MyPrayerCard
          id={prayer3.id}
          text={prayer3.text}
          duration={prayer3.enteredDateTime}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders Prayer4', () => {
    const tree = renderer.create(
      <Providers>
        <MyPrayerCard
          id={prayer4.id}
          text={prayer4.text}
          duration={prayer4.enteredDateTime}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders Prayer5', () => {
    const tree = renderer.create(
      <Providers>
        <MyPrayerCard
          id={prayer5.id}
          text={prayer5.text}
          duration={prayer5.enteredDateTime}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
