import {DTO_TYPES} from '../environments/environment';

export interface ReturnObject {
  type: DTO_TYPES;
  url: string;
  name: string;
}
