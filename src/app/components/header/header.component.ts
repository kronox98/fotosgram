import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo = '';

  usuario: Usuario = {}
  
  constructor(private menu: MenuController, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    console.log('usuario header', this.usuario);
  }

  openMenu() {
    this.menu.open();
  }

  logout() {
    
  }

}
