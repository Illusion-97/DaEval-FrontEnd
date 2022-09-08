import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Select} from '../models/Select';

@Injectable({
  providedIn: 'root'
})
export class AntiAbuseService {

  private pending: Select[] = Array.of();

  constructor() {
  }

  engage(obj: Select) {
    this.pending.push(obj);
  }

  getPending(): BehaviorSubject<Select[]> {
    return new BehaviorSubject(this.pending);
  }

  setFree(obj: Select) {
    this.pending = this.pending.filter(n => n !== obj);
  }
}
