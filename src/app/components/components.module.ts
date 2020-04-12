import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MapaComponent } from './mapa/mapa.component';

@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    AvatarSelectorComponent,
    HeaderComponent,
    MenuComponent,
    MapaComponent
  ],
  exports: [
    PostsComponent,
    AvatarSelectorComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    PipesModule,
    IonicModule,
    CommonModule
  ]
})
export class ComponentsModule { }
