import { TokenData } from '@plugins/security';

export default class AuthorizationService {
  public permissions;
  constructor(auth?: TokenData) {
    if (!auth) {
      throw new Error('Unauthorization');
    }
    this.permissions = auth.permissions.flatMap((permission) => permission.name.toLowerCase());
  }
}
