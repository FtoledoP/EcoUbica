import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { PlacesService } from 'src/app/shared/services/places.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { getDocs, query, where, collection, Firestore } from '@angular/fire/firestore';




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

  userMarker: any
  userEmail: any;
  modalOpen: boolean = false;
  greenPointForm: FormGroup;
  private map: any;
  private marker: L.Marker | null = null; // Variable para almacenar el marcador
  userLocation: [number, number] = [-33.45694, -70.64827];
  markerEnabled = false;
  markerCoordinates: [number, number] = [0, 0]; // Variable para almacenar las coordenadas del marcador
  selectedLat: number = 0;
  selectedLong: number = 0;
  emptyLoc = [0, 0];
  greenPoints: any[] = [];
    selectedLocation: any;
  legendModalOpen: boolean = false;
  reportModalOpen: boolean = false;
  reportForm: FormGroup;
  selectedPoint: any = null;
  markerReport = false;
  reportName:any = null;
  currentUser:any;



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

  constructor(private place: PlacesService,
    private fb: FormBuilder,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private firestore: Firestore) {
      this.userEmail = this.userService.userEmail;
      const usersRef = collection(this.firestore, 'users');
      const userQuery = query(usersRef, where('email', '==', this.userEmail));
      const querySnapshot = getDocs(userQuery).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          this.currentUser = doc.data();
        })
      });
    navigator.geolocation.getCurrentPosition((loc) => {
      this.userLocation = [loc.coords.latitude, loc.coords.longitude];
    });
    this.setGreenPoints();
    console.log(this.greenPoints);
    this.greenPointForm = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required]
    });
    this.reportForm = this.fb.group({
      reason: ['', Validators.required],
      description: ['', Validators.required],
    });
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

  setGreenPoints() {
    this.greenPoints = this.place.greenPoints;
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
          `<b>${greenPoint.name}</b><br>${greenPoint.desc}`).on('popupopen', (event) => {
            this.selectedPoint = greenPoint.name;
            this.markerReport = true;
            this.reportName = greenPoint.name;
            console.log('Datos del punto verde seleccionado:', greenPoint);
          }).on('popupclose', (event) => {
            this.selectedPoint = null; 
            this.markerReport = false;
            this.reportName = null;
          });
      } else {
        L.marker([greenPoint.latitude, greenPoint.longitude], { icon: this.customIcon }).addTo(this.map).bindPopup(
          `<b>${greenPoint.name}</b><br>${greenPoint.desc}`).on('popupopen', (event) => {
            this.selectedPoint = greenPoint.name;
            this.markerReport = true;
            this.reportName = greenPoint.name;
            console.log('Datos del punto verde seleccionado:', greenPoint);
          }).on('popupclose', (event) => {
            this.selectedPoint = null; 
            this.markerReport = false;
            this.reportName = null;
          });
      }
    });

    // Habilitar los botones cuando se hace clic en el mapa
    this.map.on('click', (e: any) => {
      this.reportName = null;
      this.markerReport = false;
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

  userLocationMarker() {
    this.userMarker = L.marker(this.userLocation, { icon: this.markerIcon }).addTo(this.map);
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
    this.map.removeLayer(this.userMarker)
    this.userLocationMarker()
    this.map.setView(this.userLocation);
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  addGreenPoint() {
    if (this.greenPointForm.valid) {
      this.selectedLocation = [this.selectedLat, this.selectedLong];
      const data = this.greenPointForm.value;
      data.latitude = this.selectedLat;
      data.longitude = this.selectedLong;
      data.userEmail = this.userEmail;
      console.log("MODAL" + data.latitude, data.longitude);
      this.place.addGreenPoint(data);
      this.place.getGreenPoints();
      this.setGreenPoints();
      this.refreshGreenPoints();
      this.closeModal();
    }
  }

  openLegendModal() {
    this.legendModalOpen = true;
  }

  closeLegendModal() {
    this.legendModalOpen = false;
  }

  openReportModal() {
    this.reportModalOpen = true;
  }

  closeReportModal() {
    this.reportModalOpen = false;
  }

  createReport() {
    if (this.reportForm.valid) {
      const data = {
        desc: this.reportForm.value.description,
        reason: this.reportForm.value.reason,
        userEmail: this.userEmail,
        greenPointName: this.reportName,
        username: this.currentUser.username
      }
      this.userService.createReport(data);
      this.reportForm.reset();
      this.closeReportModal();
      this.reportName = null;
    }
  }

}
