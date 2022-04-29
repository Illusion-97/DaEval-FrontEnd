import {EventEmitter, Injectable} from '@angular/core';
import {Jeu} from '../models/jeu';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  update: EventEmitter<Jeu> = new EventEmitter<Jeu>();

  constructor(private http: HttpClient) {
  }

  all(): Observable<HttpEvent<Jeu[]>> {
    return this.http.get<Jeu[]>('http://localhost:3000/jeux', {
      observe: 'events',
      reportProgress: true
    });
  }

  save(jeu: Jeu): Observable<Jeu> {
    if (jeu.id === -1) {
      jeu.id = 0;
      return this.create(jeu);
    } else {
      return this.put(jeu);
    }
  }

  get(id: number): Observable<Jeu> {
    return this.http.get<Jeu>('http://localhost:3000/jeux/' + id);
  }

  create(jeu: Jeu): Observable<Jeu> {
    return this.http.post<Jeu>('http://localhost:3000/jeux', JSON.stringify(jeu), {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  put(jeu: Jeu): Observable<Jeu> {
    return this.http.put<Jeu>('http://localhost:3000/jeux/' + jeu.id, JSON.stringify(jeu), {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  remove(id: number) {
    return this.http.delete<Jeu>('http://localhost:3000/jeux/' + id);
  }
}
