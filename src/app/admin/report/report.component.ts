import { Component, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as L from 'leaflet';
import { NgxSpinnerService } from 'ngx-spinner';
import { PlacesService } from 'src/app/shared/services/places.service';
import { UserService } from 'src/app/shared/services/user.service';


interface GeocodingResult {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}



interface Reporte{
  reason: string;
  description: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  greenPoints: any[] = [];
  private map: any;
  userLocation: [number, number] = [-33.45694, -70.64827];
  mostrarForm = false;
  reportes: Reporte[] = [];
  userEmail: any;
  markerEnabled = false;
  private marker: L.Marker | null = null; // Variable para almacenar el marcador
  selectedLat: number = 0;
  selectedLong: number = 0;
  userMarker: any
  selectedLocation: any;


  modalRef?: BsModalRef;

  markerIcon = L.icon({
    iconUrl: 'assets/marcador-de-posicion.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  customIcon = L.icon({
    iconUrl: 'assets/alfiler.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  select = L.icon({
    iconUrl: 'assets/seleccion.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  userGreenPoint = L.icon({
    iconUrl: 'assets/usergreenpoint.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  constructor(private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private place: PlacesService,
              private userService: UserService) {
    this.userEmail = this.userService.userEmail;
    this.setGreenPoints();
  }

  ngOnInit(): void {
    if (this.greenPoints.length == 0) {
      this.spinner.show();
      setTimeout(() => {
        this.initMap();
        this.spinner.hide();
      }, 1500);
    } else {
      this.initMap();
    }
  }

  initMap(): void {
    this.map = L.map('map').setView(this.userLocation, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.userLocationMarker()

    this.place.greenPoints.forEach((greenPoint) => {
      if (greenPoint.userEmail == this.userEmail) {
        L.marker([greenPoint.latitude, greenPoint.longitude], { icon: this.userGreenPoint }).addTo(this.map).bindPopup(
          `<b>${greenPoint.name}</b><br>${greenPoint.desc}`)
      } else {
        L.marker([greenPoint.latitude, greenPoint.longitude], { icon: this.customIcon }).addTo(this.map).bindPopup(
          `<b>${greenPoint.name}</b><br>${greenPoint.desc}`)
      }
    });

    // Habilitar los botones cuando se hace clic en el mapa
    this.map.on('click', (e: any) => {
      this.markerEnabled = true;
      if (this.marker) {
        // Si ya hay un marcador, elimínalo antes de agregar uno nuevo
        this.map.removeLayer(this.marker);
      }

      const clickedLatLng: L.LatLng = e.latlng;
      this.marker = L.marker(clickedLatLng, { icon: this.select }).addTo(this.map);

      // Puedes guardar las coordenadas en variables como antes
      this.selectedLat = clickedLatLng.lat;
      this.selectedLong = clickedLatLng.lng;
      console.log("NO MODAL" + this.selectedLat, this.selectedLong);
    });
  }

  refreshGreenPoints() {
    this.removeMap();
    if (this.greenPoints.length == 0) {
      this.spinner.show();
      setTimeout(() => {
        this.initMap();
        this.map.setView(this.selectedLocation)
        this.spinner.hide();
      }, 1000);
    }
  }

  removeMap() {
    if (this.map) {
      this.map.remove();
    }
  }

  setGreenPoints() {
    this.greenPoints = this.place.greenPoints;
  }

  userLocationMarker() {
    this.userMarker = L.marker(this.userLocation, { icon: this.markerIcon }).addTo(this.map);
  }

  mostrarFormulario() {
    this.mostrarForm = true;
  }

  agregarReporte(reporte: Reporte) {
    this.reportes.push(reporte);
    this.mostrarForm = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
