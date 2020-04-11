import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertController: AlertController, private toastController: ToastController) { }


  async presentAlert(message: string, header: string) {
    const alert = await this.alertController.create({
      header,
      // subHeader: 'Subtitle',
      message,
      buttons: ['Aceptar'],
      mode: 'ios'
    });
  
    await alert.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
      animated: true
    });
    toast.present();
  }
}
