import { Component, HostListener, ElementRef } from '@angular/core';
import { GiphyAPIService } from '../services/giphy-api.service';
import { GiphyAnimation } from '../model/GiphyAnimation';

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

  public Search(query: string, rating: string, language: string): void {
    if (!this.IsQueryValid(query)) {
      return;
    }

    this.ResetSearch();

    const offset = this.chunkSize * this.loadedChunks;

    this.animationsAPI
      .get(query, this.chunkSize, offset, rating, language)
      .subscribe(next => this.HandleSearchResult(next));

    this.loadedChunks++;
  }

  private ResetSearch(): void {
    this.loadedChunks = 0;
    this.animations = [];
  }

  private HandleSearchResult(animations: GiphyAnimation[]): void {
    this.animations = animations;
  }

  public LoadMore(query: string, rating: string, language: string): void {
    if (!this.IsQueryValid(query)) {
      return;
    }

    const offset = this.chunkSize * this.loadedChunks;

    this.animationsAPI
      .get(query, this.chunkSize, offset, rating, language)
      .subscribe(next => this.HandleLoadMoreResult(next));

    this.loadedChunks++;
  }

  private HandleLoadMoreResult(animations: GiphyAnimation[]): void {
    this.animations = this.animations.concat(animations);
  }

  public IsQueryValid(query: string): boolean {
    return !(!query || query === undefined || query === '' || query.length === 0 || query === ' ');
  }
  //Scroll Up
  isShow: boolean;
  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    //console.log('[scroll]', scrollPosition);

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
