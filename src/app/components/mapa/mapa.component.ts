import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var mapboxgl: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords : string;

  @ViewChild('mapa', { static: false }) mapa;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.cargarMapa();
    }, 1000);    
  }

  cargarMapa() {
    const position = this.coords.split(',');
    const latitud = Number(position[0]);
    const longitud = Number(position[1]);
        
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jvbm94OTgiLCJhIjoiY2s4d2x5eTE3MHkxczNncHJieGFrNWJ2MCJ9.w8H-zwnxhJ8e-QhHNrZaFg';
      const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ longitud, latitud ],
      zoom: 10
    });
  
    const marker = new mapboxgl.Marker()
      .setLngLat([ longitud, latitud ])
      .addTo( map );
  }

}
