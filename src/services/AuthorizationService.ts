import UnauthorizedError from '@exceptions/UnauthorizedError';
import { TokenData } from '@plugins/security';

export default class AuthorizationService {
  public permissions;
  public roleName;
  public authId;

  constructor(auth?: TokenData) {
    if (!auth) {
      throw new UnauthorizedError('Unauthorized');
    }
    this.authId = auth.id;
    this.permissions = auth.permissions.flatMap((permission) => permission.name.toLowerCase());
    this.roleName = auth.role.toLocaleLowerCase();
  }

  public checkPermission(name: string) {
    if (!this.permissions.includes(name)) {
      throw new UnauthorizedError(`Your don't have permission to see this page`);
    }
  }
}
