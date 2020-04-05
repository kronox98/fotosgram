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

  constructor(private postsService: PostsService) {
    this.getPosts();
  }

  getPosts(){
    this.postsService.getPosts()
      .subscribe(
      data => {
        console.log(data);
        this.posts.push( ...data.post );      
        console.log(this.posts); 
      }, 
      err => {
        console.error('Error: ', err);          
      });  

  }
  ngOnInit(){
    
      
  }

}
