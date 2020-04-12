import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const serverUrl = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPost = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  getPosts( pull: boolean = false ){
    if (pull) {
      this.paginaPost = 0;
    }
    this.paginaPost++;
    return this.http.get<RespuestaPosts>(`${ serverUrl }/posts/?pagina=${ this.paginaPost }`);
  }

  crearPost(post:  any) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve => {
      this.http.post(`${ serverUrl }/posts/`, post, { headers })
        .subscribe( data => {
          console.log(data);
  
          this.nuevoPost.emit( data['post'] );
          resolve(true);
        });

    });

  }
}
