import { TestBed } from '@angular/core/testing';

import { JokesService } from './jokes.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { Joke } from '../model/joke.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';


describe('JokesService', () => {
  let service: JokesService;
  let httpClient: HttpClient;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [JokesService]
      });
      service = TestBed.get(JokesService);
      httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should give one joke', () => {
    const jokes:Joke = 
      {
        joke: 'what time is it?',
        response: 'it'
      }
    ;

    const httpGetSpy = spyOn(httpClient, 'get')
      .and.returnValue(of(jokes)); 
    service.getRandomJoke();
    expect(httpGetSpy).toHaveBeenCalled();
    service.joke$().subscribe({
      next: response => expect(response).toEqual(jokes)
    });

  });

});
