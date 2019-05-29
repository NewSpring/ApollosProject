import { Person as originalPerson } from '@apollosproject/data-connector-rock';

export default class Person extends originalPerson.dataSource {
  getImpersonationParameter = async ({ id }) => {
    try {
      const request = await this.post(
        'Lava/RenderTemplate',
        `{{ ${id} | PersonById | PersonTokenCreate:1440,null,512 }}`
      );
      return request;
    } catch (err) {
      throw new Error(err);
    }
  };
}
