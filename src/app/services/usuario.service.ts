import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const serverUrl = environment.serverUrl;

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};

  constructor(private http: HttpClient, private navCtrl: NavController) { }

  update( usuario: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise( resolve => {
      this.http.post(`${ serverUrl }/user/update`, usuario, { headers })
        .subscribe( data => {
          if (data['ok']) {
            this.token = data['token'];
            this.guardarToken('token', data['token']);
            resolve(true);
          } else {
            
            resolve(false);
          }
        })
    })
    
  }

  login(email: string, password: string) {
    const data = { email, password };
    return new Promise( resolve => {
      this.http.post(`${ serverUrl }/user/login`, data)
        .subscribe( data => {  
          if (data['ok']) {
            this.token = data['token'];
            this.guardarToken('token', data['token']);
            resolve(true);
          }else{
            this.token = null;
            this.clearStorage();
            resolve(false);
          }
          console.log(data);
        });
    });
  }

  register(usuario: Usuario) {
    return new Promise( resolve => {
      this.http.post(`${ serverUrl }/user/create`, usuario)
        .subscribe( data => {
          console.log(data);
          if (data['ok']) {
            this.token = data['token'];
            this.guardarToken('token', data['token']);
            resolve(true);
          }else{
            this.token = null;
            this.clearStorage();
            resolve(false);
          }
        })
    });
  }

  getUsuario() {
    if (this.usuario._id) {
      this.validaToken();
    }
    return { ...this.usuario };
  }

  async clearStorage(){
    await Storage.clear();
  }

  async cargarToken(){
    const { value } = await Storage.get({ key: 'token' });
    this.token = value;
  }

  async guardarToken(key: string, value: any) {    
    await Storage.set({
      key,
      value
    })
    .then( data => {
      console.log('Item ' + key + ' guardado' );
    })
    .catch(err => {
      console.error('Error ', err);
      
    });
  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('login');
      return Promise.resolve(false);
    }


    return new Promise( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      })
      this.http.get(`${ serverUrl }/user/`, { headers })
        .subscribe( data => {
          if (data['ok']) {
            this.usuario = data['usuario'];
            resolve(true);
          }else{
            resolve(false);
          }
        })
    })
  }


}
