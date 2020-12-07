import {LoginInterface} from './login.interface';

export interface RegisterInterface extends LoginInterface {
  firstName: string;
  lastName: string;
  role: string;
}
