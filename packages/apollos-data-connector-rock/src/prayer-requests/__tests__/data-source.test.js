import ApollosConfig from '@apollosproject/config';
import PrayerRequest from '../data-source';
import { buildGetMock } from '../../test-utils';

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://beta-rock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://beta-rock.newspring.cc/GetImage.ashx',
  },
});

describe('PrayerRequest', () => {
  it('constructs', () => {
    expect(new PrayerRequest()).toBeTruthy();
  });

  it('gets all prayer requests', () => {
    const dataSource = new PrayerRequest();
    dataSource.get = buildGetMock({ Id: 51 }, dataSource);
    const result = dataSource.getPrayerRequests();
    expect(result).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });
});
