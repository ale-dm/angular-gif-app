import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

    public gifList: Gif[] = [];

    private _tagsHistory:   string[] = [];
    private apikey:         string = '26NwO6KlyHhd5J1JY2Iq7DpC4tHzGlmj'
    private serviceUrl:     string = 'https://api.giphy.com/v1/gifs'

    constructor(private http: HttpClient ) {
        console.log('Gif Service Ready')

        this.loadLocalStorage();
    }

    get tagsHistory() {
        return [...this._tagsHistory];
    }

    private organizeHistory(tag: string){
        tag = tag.toLowerCase();

        if( this._tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
        }

        this._tagsHistory.unshift(tag)
        this._tagsHistory = this._tagsHistory.splice(0,10)
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory))
    }

    private loadLocalStorage(): void {
        if(!localStorage.getItem('history')) return;

        this._tagsHistory = JSON.parse(localStorage.getItem('history')! ) ;

        if(this._tagsHistory.length === 0) return;

        this.searchTag(this._tagsHistory[0])


    }

    searchTag( tag:string ):void {
        if(tag.length === 0) return;
        this.organizeHistory(tag);

        const params = new HttpParams()
            .set('api_key', this.apikey)
            .set('limit', '10')
            .set('q', tag)

        this.http.get<SearchGifsResponse>(`${ this.serviceUrl }/search`, { params })
        .subscribe( resp => {
            this.gifList = resp.data;
        } )
    }
    
}