import React from 'react';
import { renderWithApolloData } from 'newspringchurchapp/src/utils/testUtils';

import Providers from 'newspringchurchapp/src/Providers';
import flagPrayerRequest from './flagPrayerRequest';
import PrayerCardConnected from './PrayerCardConnected';

const prayerId = [
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4789',
  },
];
const cardData = {
  imageSource: {
    uri: 'https://fillmurray.com/400/600',
  },
  name: 'Bill',
  text:
    'I want to go back to school for my PTA degree next year, but I’m afraid of not getting accepted. I have a great job right now but I’m not very happy. Pray my plans for school align with God’s plans for me.',
  source: 'Anderson',
};

describe('the PrayerCardConnected component', () => {
  it('renders prayer card connected to data', async () => {
    const mock = {
      request: {
        query: flagPrayerRequest,
      },
      response: {
        data: {
          prayerId,
        },
      },
    };
    const tree = await renderWithApolloData(
      <Providers mocks={[mock]} addTypename={false}>
        <PrayerCardConnected
          imageSource={cardData.imageSource}
          name={cardData.name}
          text={cardData.text}
          source={cardData.source}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
