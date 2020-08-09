'use strict';
import decodeJwt from '@/util/decodeJwt';

function stringToBool(str) {
  if(str == undefined){
    return undefined;
  }
  if(str == 'true') {
    return true;
  }
  return false;
}

class UserProfile {
  constructor(attributes){
    this.email = attributes.email;
    this.phone = attributes.phone;
    this.givenName = attributes.givenName;
    this.familyName = attributes.familyName;
    this.featureUpdates = attributes.featureUpdates;
    this.marketingUpdates = attributes.marketingUpdates;
  }

  get fullName() {
    const arr = [ this.givenName, this.familyName ];
    const name = arr.filter(n => n).join(' ');
    return name || undefined;
  }

  updateAttributes(userAttributes) {
    Object.entries(userAttributes).forEach(attribute => {
      this[attribute[0]] = attribute[1];
    });
  }

  static fromIdToken(idToken) {
    const decodedToken = decodeJwt(idToken);
    return new UserProfile({
      email: decodedToken.email,
      phone: decodedToken.phone_number,
      givenName: decodedToken.given_name,
      familyName: decodedToken.family_name,
      featureUpdates: stringToBool(decodedToken['custom:feature_updates']),
      marketingUpdates: stringToBool(decodedToken['custom:marketing_updates']),
    });
  }
}

export default UserProfile;
