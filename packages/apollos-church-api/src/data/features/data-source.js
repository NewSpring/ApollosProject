import { Features as baseFeatures } from '@apollosproject/data-connector-rock';
import { createGlobalId } from '@apollosproject/server-core';

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
}
