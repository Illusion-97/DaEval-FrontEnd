import {Injectable} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveRouteService {
  params: ParamMap;
  data: BehaviorSubject<{ [p: string | symbol]: any }>;

  constructor(private route: ActivatedRoute) {
    this.data = new BehaviorSubject(this.route.snapshot.data);
  }

  paramsObject() {
    const result = {};
    this.params.keys.forEach(key => {
      const val = this.params.get(key);
      result[key] = key.includes('Id') ? +val : val;
    });
    return result;
  }
}
