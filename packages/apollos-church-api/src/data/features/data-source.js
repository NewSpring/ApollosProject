import { Features as baseFeatures } from '@apollosproject/data-connector-rock';
import { createGlobalId } from '@apollosproject/server-core';
import ApollosConfig from '@apollosproject/config';
import { get } from 'lodash';

export default class Features extends baseFeatures.dataSource {
  // eslint-disable-next-line class-methods-use-this
  createNoteFeature({ placeholder, id }) {
    return {
      placeholder,
      id: createGlobalId(id, 'NoteFeature'),
      __typename: 'NoteFeature',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  createHeaderFeature({ body, id }) {
    return {
      body,
      id: createGlobalId(id, 'HeaderFeature'),
      __typename: 'HeaderFeature',
    };
  }

  // TODO come up with a better way to hide features per block
  // currently this is only showing features if you're on staff
  async getHomeFeedFeatures() {
    const { Person } = this.context.dataSources;
    const isStaff = await Person.isCurrentPersonStaff();
    if (!isStaff) return [];

    return Promise.all(
      get(ApollosConfig, 'HOME_FEATURES', []).map((featureConfig) =>
        this.createActionListFeature(featureConfig)
      )
    );
  }
}
