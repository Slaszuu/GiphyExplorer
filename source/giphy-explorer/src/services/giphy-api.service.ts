import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GiphyAnimation } from '../model/GiphyAnimation';
import { environment } from './../environments/environment';
import { TestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class GiphyAPIService {

  constructor(private httpClient: HttpClient) {
  }

  public get(query: string, limit: number, offset: number, rating: string, language: string): Observable<GiphyAnimation[]> {
    const link = this.generateLink(query, limit, offset, rating, language);

    return this.httpClient
      .get(link)
      .pipe(map((response: Response) => this.mapResponseToAnimation(response)));
  }

  private mapResponseToAnimation(response: any): GiphyAnimation[] {
    const animations: GiphyAnimation[] = [];

    for (const data of response.data) {
      const animation = new GiphyAnimation(data.images.original.url, data.title);
      animations.push(animation);
    }
    return animations;
  }

  private generateLink(query: string, limit: number, offset: number, rating: string, language: string): string {
    return environment.apiUrl + '/search' +
      '?api_key=' + environment.apiKey +
      '&q=' + query +
      '&limit=' + limit +
      '&offset=' + offset +
      '&rating=' + rating +
      '&lang=' + language;
  }
}
