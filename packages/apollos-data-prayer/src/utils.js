import ApollosConfig from '@apollosproject/config';
import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

export const secret = process.env.SECRET || 'ASea$2gadj#asd0';

export const parseToken = (token) => jwt.verify(token, secret);

export const registerToken = (token) => {
  try {
    const { cookie, sessionId } = parseToken(token);

    return {
      userToken: token,
      rockCookie: cookie,
      sessionId,
    };
  } catch (e) {
    throw new AuthenticationError('Invalid token');
  }
};

export const generateToken = (params) =>
  jwt.sign({ ...params }, secret, { expiresIn: '60d' });

export const enforceProtocol = (uri) =>
  uri.startsWith('//') ? `https:${uri}` : uri;

export const createImageUrlFromGuid = (uri) =>
  uri.split('-').length === 5
    ? `${ApollosConfig.ROCK.IMAGE_URL}?guid=${uri}`
    : enforceProtocol(uri);

export const latLonDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
};
