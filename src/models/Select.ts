import {DTO_TYPES} from '../environments/environment';
import {ParamMap} from '@angular/router';

export interface Select {
  filter?: any;
  params?: ParamMap;
  type: DTO_TYPES;
  selected: any;
}

