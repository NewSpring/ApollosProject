import { AuthenticationError } from 'apollo-server';
import { Auth as baseAuth } from '@apollosproject/data-connector-rock';

export default class Auth extends baseAuth.dataSource {
  getCurrentPerson = async ({ cookie = null } = { cookie: null }) => {
    const { rockCookie, currentPerson } = this.context;
    console.log('rockCookie from getCurrentPerson', rockCookie);
    const userCookie = cookie || rockCookie;

    if (currentPerson) {
      return currentPerson;
    }

    if (userCookie) {
      const request = await this.request('People/GetCurrentPerson').get({
        options: {
          headers: { cookie: userCookie, 'Authorization-Token': null },
        },
      });
      this.context.currentPerson = request;
      return request;
    }
    throw new AuthenticationError('Must be logged in');
  };

  authenticate = async ({ identity, password }) => {
    // strip off email part of staff logins for Active Directory
    const newspringUsername = identity.includes('@newspring.cc')
      ? identity.split('@')[0]
      : identity;
    try {
      const cookie = await this.fetchUserCookie(newspringUsername, password);
      const sessionId = await this.createSession({ cookie });
      const token = baseAuth.generateToken({ cookie, sessionId });
      const { userToken, rockCookie } = baseAuth.registerToken(token);
      console.log('rockCookie from authenticate', rockCookie);
      this.context.rockCookie = rockCookie;
      this.context.userToken = userToken;
      this.context.sessionId = sessionId;
      return { token, rockCookie };
    } catch (e) {
      throw e;
    }
  };
}
