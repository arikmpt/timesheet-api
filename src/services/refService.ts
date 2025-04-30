import { COUNTRIES } from '@/constant';

abstract class RoleService {
  static countryCodes() {
    return {
      countries: COUNTRIES
    };
  }
}

export default RoleService;
