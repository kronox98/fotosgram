import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { Plugins, Geolocation, CameraResultType  } from "@capacitor/core";
import { UiServiceService } from 'src/app/services/ui-service.service';

const { GeoLocation, Camera } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = []; 

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  cargandoGeo: boolean = false;

  constructor(private postService: PostsService, private router: Router, private uiService: UiServiceService) {}

  async crearPost(){
    console.log(this.post);

    const creado = await this.postService.crearPost(this.post);

    this.post = { mensaje: '', coords: null, posicion: false };
    this.router.navigateByUrl('/main/tabs/tab1');
    
  }

  async getGeo() {

    if (!this.post.posicion) {
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;

    const coordenadas = await Geolocation.getCurrentPosition()
      .then(data => {
          const coords = `${data.coords.latitude},${data.coords.longitude}`;
          this.cargandoGeo = false;               
          this.post.coords = coords;
      })
      .catch(err => {
          this.uiService.presentAlert(JSON.stringify(err['message']), 'Mensaje');
          this.cargandoGeo = false;
        }
    );
    
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    console.log(image);
    
    // image.webPath will contain a path that can be set as an image src. 
    // You can access the original file using image.path, which can be 
    // passed to the Filesystem API to read the raw data of the image, 
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    // var imageElement.src = imageUrl;
  }

}
