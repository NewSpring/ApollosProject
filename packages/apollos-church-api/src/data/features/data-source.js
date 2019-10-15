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
    const { Auth } = this.context.dataSources;
    const person = await Auth.getCurrentPerson();
    const staff = await this.request('GroupMembers')
      .andFilter(`GroupId eq 3`)
      .get();
    const staffIds = staff.map(({ personId }) => personId);
    if (!staffIds.includes(person.id)) return null;

    return Promise.all(
      get(ApollosConfig, 'HOME_FEATURES', []).map((featureConfig) =>
        this.createActionListFeature(featureConfig)
      )
    );
  }
}
