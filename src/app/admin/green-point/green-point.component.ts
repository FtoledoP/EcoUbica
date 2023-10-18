import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { PlacesService } from 'src/app/shared/services/places.service';

interface GeocodingResult {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

@Component({
  selector: 'app-green-point',
  templateUrl: './green-point.component.html',
  styleUrls: ['./green-point.component.scss']
})

export class GreenPointComponent implements OnInit {
  private map: any;
  private marker: L.Marker | null = null; // Variable para almacenar el marcador
  userLocation: [number, number] = [-33.45694, -70.64827];
  markerEnabled = false; // Variable para habilitar/deshabilitar los botones
  markerCoordinates: [number, number] = [0, 0]; // Variable para almacenar las coordenadas del marcador
  selectedLat: number = 0;
  selectedLong: number = 0;
  emptyLoc = [0, 0];
  greenPoints: any[] = [];

  constructor(private place: PlacesService) {
    navigator.geolocation.getCurrentPosition((loc) => {
      this.userLocation = [loc.coords.latitude, loc.coords.longitude];
    });
    this.greenPoints = this.place.greenPoints;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 50);
  }

  initMap(): void {
    this.map = L.map('map').setView(this.userLocation, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const markerIcon = L.icon({
      iconUrl: 'assets/marcador-de-posicion.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
    const customIcon = L.icon({
      iconUrl: 'assets/alfiler.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    L.marker(this.userLocation, { icon: markerIcon }).addTo (this.map);

    this.greenPoints.forEach((greenPoint: any) => {
      L.marker([greenPoint.latitude, greenPoint.longitude], { icon: customIcon }).addTo(this.map).bindPopup(
        `<b>${greenPoint.name}</b><br>${greenPoint.desc}`)
    });

    // Habilitar los botones cuando se hace clic en el mapa
    this.map.on('click', (e: any) => {
      this.markerEnabled = true;
      if (this.marker) {
        // Si ya hay un marcador, elimínalo antes de agregar uno nuevo
        this.map.removeLayer(this.marker);
      }

      const clickedLatLng: L.LatLng = e.latlng;
      this.marker = L.marker(clickedLatLng, { icon: customIcon }).addTo(this.map);

      // Puedes guardar las coordenadas en variables como antes
      this.selectedLat = clickedLatLng.lat;
      this.selectedLong = clickedLatLng.lng;
    });
  }

  addMarker(): void {
    this.markerCoordinates = [this.selectedLat, this.selectedLong];
    console.log(this.markerCoordinates);
  }

  removeMarker(): void {
    // Eliminar el marcador del mapa
    if (this.marker) {
      this.map.removeLayer(this.marker);
      this.marker = null;
      this.markerEnabled = false;
      // Restablecer las coordenadas cuando se elimina el marcador
      this.markerCoordinates = [0, 0];
    }
  }

  centerMapOnUser(): void {
    this.map.setView(this.userLocation);
  }

}
