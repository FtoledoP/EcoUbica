import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, collection, addDoc, query, where, getDocs, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { user } from 'rxfire/auth';

interface GreenPoint {
  desc:string,
  latitude: number,
  longitude:number,
  name:string,
  userEmail:string
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation:[number, number] = [0,0]

  greenPoints: GreenPoint[] = []

  constructor(private httpClient: HttpClient,
              private firestore: Firestore) {
    this.getUserLocation();
    this.getGreenPoints()
  }

  public getUserLocation(){
    navigator.geolocation.getCurrentPosition((loc) => {
      this.userLocation = [loc.coords.latitude, loc.coords.longitude]
    })
  }

  addGreenPoint(greenpoint: any[]){
    const placesRef = collection(this.firestore, 'green-points');
    addDoc(placesRef, greenpoint);
  }

  async getGreenPoints(){
    this.greenPoints = [];
    const placesRef = collection(this.firestore, 'green-points');
    const docSnap = getDocs(placesRef);
    if((await docSnap).empty){
      return console.log('No hay documentos');
    }else{
      (await docSnap).forEach((doc: any) => {
        this.greenPoints.push(doc.data());
      });      
    }
  }

  async getGreenPointsUser(user:string){
    const placesRef = collection(this.firestore, 'green-points');
    const q = query(placesRef, where("user", "==", user));
    return q;
  }
}
