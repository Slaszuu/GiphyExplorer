import { Component } from '@angular/core';
import {GiphyAPIService} from '../services/giphy-api.service';
import {GiphyAnimation} from '../Model/GiphyAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private chunkSize = 10;
  private loadedChunks = 0;

  title = 'giphy-explorer';
  animations: GiphyAnimation[];

  constructor(private animationsAPI: GiphyAPIService) {
  }

  public Search(query: string): void
  {
    this.ResetSearch();

    const offset = this.chunkSize * this.loadedChunks;

    this.animationsAPI
      .get(query, this.chunkSize, offset, 'G', 'en')
      .subscribe(next => this.HandleSearchResult(next));

    this.loadedChunks++;
  }

  private ResetSearch(): void
  {
    this.loadedChunks = 0;
    this.animations = [];
  }

  private HandleSearchResult(animations: GiphyAnimation[]): void
  {
    this.animations = animations;
  }

  public LoadMore(query: string): void
  {
    const offset = this.chunkSize * this.loadedChunks;

    this.animationsAPI
      .get(query, this.chunkSize, offset, 'G', 'en')
      .subscribe(next => this.HandleLoadMoreResult(next));

    this.loadedChunks++;
  }

  private HandleLoadMoreResult(animations: GiphyAnimation[]): void
  {
    this.animations = this.animations.concat(animations);
  }
}
