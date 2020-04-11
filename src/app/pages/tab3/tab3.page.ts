import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {}

  constructor( private usuarioService: UsuarioService, private UiService: UiServiceService) {}

  ngOnInit(){
    this.usuario = this.usuarioService.getUsuario();

    console.log(this.usuario.avatar);

  }

  async update(fActualizar: NgForm) {
    
    if (fActualizar.invalid) {
      return;      
    }

    const actualizado = await this.usuarioService.update(this.usuario);    
    if (actualizado) {
      // toast actualizado
      this.UiService.presentToast('Tus datos han sido actualizados', 'light');
    }else{
      // toast algo salio mal
      this.UiService.presentToast('Algo salió mal, por favor intenta más tarde', 'warning');

    }
  }

}
