import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    
  }

  darkMode(){
    console.log('cambiar modo :v');
    document.body.classList.toggle('dark');
    
  }

}
