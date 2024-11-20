import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent { 

  constructor( private gifsServive: GifsService) {}

  get tags(): string[] {
    return this.gifsServive.tagsHistory;
  }

  searchTag(tag: string){
    this.gifsServive.searchTag(tag)
    
  }
}
