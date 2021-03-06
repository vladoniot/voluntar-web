import {
  IActivityTypeTag,
  ISectorTag,
  IAgeTag,
  IAvailabilityTag,
  ITeamTag,
  IOfferTag,
} from '@models/tags';

export interface TagsState {
  activityTypes: IActivityTypeTag[];
  ages: IAgeTag[];
  availabilities: IAvailabilityTag[];
  teams: ITeamTag[];
  offers: IOfferTag[];
  // sectors: ISectorTag[];
  isLoading: boolean;
  error: string;
}

export const initialState: TagsState = {
  activityTypes: [],
  ages: [],
  availabilities: [],
  teams: [],
  offers: [],
  // sectors: [],
  isLoading: false,
  error: null,
};
