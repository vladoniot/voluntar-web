import { UserState } from './user-store/state';
import { VolunteersState } from './volunteers-store/state';

export interface RootState {
  user: UserState;
  volunteers: VolunteersState;
}