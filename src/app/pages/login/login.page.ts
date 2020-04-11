import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // @ViewChild(IonSlides, { static: false}) slides: IonSlides;
  @ViewChild('slidePrincipal', { static: false }) slides: IonSlides;

  

  loginUser = {
    email: 'otro@correo.com',
    password: '123456'
  }

  registerUser: Usuario = {
    email: 'otro@correo.com',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  }

  

  constructor(private usuarioService: UsuarioService, private navCtrl: NavController, private uiService: UiServiceService) { }

  ngOnInit() {
    // this.slides.lockSwipes( true ); 
  }

  async login( fLogin: NgForm) {
    console.log( fLogin.valid );
    if (fLogin.invalid) {
      return;
    }

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    if (valido) {
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
      // Se nabega al home
    }else{
      // Mostrar alerta
      this.uiService.presentAlert('Usuario o contraseña no son correctas', 'Mensaje');
    }
    
  }

  async register( fRegister: NgForm) {
    console.log( fRegister.valid);
    if (fRegister.invalid) {
      return;
    }

    const valido = await this.usuarioService.register(this.registerUser);

    if (valido) {
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
      // Se nabega al home
    }else{
      // Mostrar alerta
      this.uiService.presentAlert('Ya existe una cuenta con este correo electrónico', 'Mensaje');
    }
    

  }

  ionViewWillEnter() {
    this.slides.lockSwipes( true ); 
  }

  

  irRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
  irLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  

}
