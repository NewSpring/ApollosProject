import { fetch } from 'apollo-server-env';

import ContentItemsDataSource from '../data-source';

describe('ContentItems', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it('fetches a Content Item from a slug', async () => {
    const dataSource = new ContentItemsDataSource();
    dataSource.get = jest.fn(() => ({
      id: 'DevotionalContentItem:2e4144092c34feca80e27de85ad238e7',
    }));
    const result = {
      id: 'DevotionalContentItem:2e4144092c34feca80e27de85ad238e7',
    };
    expect(dataSource.getBySlug({ slug: 'fakeSlug' }).resolves.toEqual(result));
  });
});
