import { atom } from 'recoil';
import { checkIfUserIsLoggedIn } from '../../utils/auth';

export const loggedInState = atom({
  key: 'loggedInState',
  default: null as null | boolean,
  // default: checkIfUserIsLoggedIn(),
});
