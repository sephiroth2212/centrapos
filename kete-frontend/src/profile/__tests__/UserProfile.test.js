import UserProfile from '../UserProfile';

describe('UserProfile', () => {
  describe('fullName', () => {
    it('givenName and familyName', () => {
      const userProfile = new UserProfile({
        givenName: 'John',
        familyName: 'Doe'
      });
      expect(userProfile.fullName).toEqual('John Doe');
    });

    it('givenName but no familyName', () => {
      const userProfile = new UserProfile({
        givenName: 'John'
      });
      expect(userProfile.fullName).toEqual('John');
    });

    it('familyName but no givenName', () => {
      const userProfile = new UserProfile({
        familyName: 'Doe'
      });
      expect(userProfile.fullName).toEqual('Doe');
    });

    it('neither givenName nor familyName', () => {
      const userProfile = new UserProfile({});
      expect(userProfile.fullName).toBeUndefined();
    });
  });
});
