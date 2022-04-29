import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AntiAbuseService {

  private pending: number[] = Array.of();

  constructor() {
  }

  engage(id: number) {
    this.pending.push(id);
  }

  getPending(): BehaviorSubject<number[]> {
    return new BehaviorSubject(this.pending);
  }

  setFree(id: number) {
    this.pending = this.pending.filter(n => n !== id);
  }
}
