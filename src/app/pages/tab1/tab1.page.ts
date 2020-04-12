import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];

  habilitado = true;

  constructor(private postsService: PostsService) {
    this.getPosts();
  }

  ngOnInit(){
    this.siguientes();

    this.postsService.nuevoPost
      .subscribe( data => {
        this.posts.unshift( data );
      })
  }

  getPosts(){
  }

  refrescar(event){
    this.siguientes( event, true);
    this.habilitado = true;
    this.posts = [];
  }
  

  siguientes(event?: any, pull: boolean = false) {
    setTimeout(() => {
      this.postsService.getPosts( pull )
        .subscribe(
        data => {          
          this.posts.push( ...data.post );   
          if (event) {
            event.target.complete();
            if (data.post.length === 0) {
              // event.target.disabled = true;
              this.habilitado = false;
            }
          }
        }, 
        err => {
          console.error('Error: ', err);          
        });  
      
    }, 500);
  }

}
