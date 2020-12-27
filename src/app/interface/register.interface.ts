import {Login} from './login.interface';

export interface Register extends Login {
  firstName: string;
  lastName: string;
  role: string;
}
