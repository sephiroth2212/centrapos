import decodeJwt from '@/util/decodeJwt';
export default class User {

  constructor({ id, username, jwt, expired, expiresAt, jti, idToken }) {
    this.id = id;
    this.username = username;
    this.jwt = jwt;
    this.jti = jti;
    this.idToken = idToken;
    this.expired = expired;
    this.expiresAt = expiresAt;
  }

  static fromOidcUser(oidcUser) {
    const decoded = decodeJwt(oidcUser.access_token);
    return new User({
      id: oidcUser.profile.sub,
      username: oidcUser.profile['cognito:username'],
      jti: decoded.jti,
      idToken: oidcUser.id_token,
      jwt: oidcUser.access_token,
      expired: oidcUser.expired,
      expiresAt: oidcUser.expires_at,
    });
  }
}
