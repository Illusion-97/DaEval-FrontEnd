import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectObservableWaiterService {

  observerBehavior: BehaviorSubject<number>;

  constructor() { }

  init() {
    this.observerBehavior = new BehaviorSubject<number>(0);
  }

  increment() {
    this.observerBehavior.next(this.observerBehavior.value + 1);
    if (this.observerBehavior.value === 1) {
      this.observerBehavior.subscribe(n => {
        if (n === 0) {
          this.complete();
        }
      });
    }
  }

  derement() {
    this.observerBehavior.next(this.observerBehavior.value - 1);
  }

  complete() {
    this.observerBehavior.complete();
  }
}
