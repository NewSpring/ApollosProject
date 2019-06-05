export class AuthMock {
  initialize = () => {};

  getCurrentPerson = () => ({
    id: 51,
    primaryAliasId: 123,
    firstName: 'Isaac',
    lastName: 'Hardy',
    nickName: 'Isaac',
    email: 'isaac.hardy@newspring.cc',
    photo: {
      url:
        'https://apollosrock.newspring.cc:443/GetImage.ashx?guid=60fd5f35-3167-4c26-9a30-d44937287b87',
    },
  });
}

export class CampusMock {
  getFromId = () => ({
    id: 16,
    name: 'Anderson',
  });
}

export class FollowingsMock {
  initialize = () => {};

  get = () => {};

  followNode = () => ({
    id: 'PrayerRequest:57c465ee3cd69524d729569b338607de',
    firstName: 'Rich',
    lastName: 'Dubee',
    text: 'Help me',
    requestedByPersonAliasId: 447217,
    campusId: 16,
    categoryId: 2,
    flagCount: 0,
    prayerCount: 4,
    attributeValues: {
      isAnonymous: {
        value: 'True',
      },
    },
  });

  unFollowNode = () => ({
    id: 'PrayerRequest:57c465ee3cd69524d729569b338607de',
    firstName: 'Rich',
    lastName: 'Dubee',
    text: 'Help me',
    requestedByPersonAliasId: 447217,
    campusId: 16,
    categoryId: 2,
    flagCount: 0,
    prayerCount: 4,
    attributeValues: {
      isAnonymous: {
        value: 'True',
      },
    },
  });
}

export class InteractionsMock {
  initialize = () => {};

  createPrayerRequestInteraction = () => {};
}
