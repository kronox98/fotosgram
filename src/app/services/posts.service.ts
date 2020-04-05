import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaPosts } from '../interfaces/interfaces';

const serverUrl = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPost = 0;

  constructor(private http: HttpClient) { }

  getPosts(){
    this.paginaPost++;
    return this.http.get<RespuestaPosts>(`${ serverUrl }/posts/?pagina=${ this.paginaPost }`);
  }
}
