import {Injectable} from '@angular/core';
import {ParamMap} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActiveRouteService {
  params: ParamMap;

  paramsObject() {
    const result = {};
    this.params.keys.forEach(key => {
      const val = this.params.get(key);
      result[key] = key.includes('Id') ? +val : val;
    });
    return result;
  }
}
