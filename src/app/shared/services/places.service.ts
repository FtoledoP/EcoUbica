import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, collection, addDoc, query, where, getDocs, setDoc, doc, getDoc } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation:[number, number] = [0,0]

  greenPoints = [
    {
      desc: 'Punto limpio',
      latitude: -33.418528185613035,
      longitude: -70.66840877239764,
      name: 'Punto Limpio Parque de Los Reyes',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.505454932009414,
      longitude: -70.71004165813474,
      name: 'Punto Limpio TriCiclos - Sodimac Cerrillos',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.44187879305814,
      longitude: -70.66609634605828,
      name: 'Punto limpio',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.45792041616848,
      longitude: -70.74780716070036,
      name: 'Punto limpio parque los reyes 2',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.46193035830975,
      longitude: -70.70523513962634,
      name: 'Punto Limpio REMBRE - Estación Central (Población Santiago)',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.39086964963734,
      longitude: -70.5878187589222,
      name: 'Punto verde',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.489422107326035,
      longitude: -70.6077314784568,
      name: 'Punto Limpio TriCiclos',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.44818121313342,
      longitude: -70.6633497640535,
      name: 'Punto Limpio ReBeauchef',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.45963898551117,
      longitude: -70.562412875378,
      name: 'Punto Limpio TriCiclos',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.542090236354674,
      longitude: -70.79381240928035,
      name: 'Punto Verde (Reciclaje)',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.427553408288034,
      longitude: -70.53494705533026,
      name: 'Punto Limpio TriCiclos - Walmart Príncipe de Gales',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.40061528397854,
      longitude: -70.6200910974783,
      name: 'Punto Limpio TriCiclos - ParqueMet',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.41781079597552,
      longitude: -70.60704483295562,
      name: 'Punto limpio reciclaje',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.57699381256636,
      longitude: -70.65854324554516,
      name: 'Punto Limpio TriCiclos',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.4206763836747,
      longitude: -70.64481033552127,
      name: 'Punto Limpio Bellavista',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.45276450375323,
      longitude: -70.54387344684578,
      name: 'Punto Limpio TriCiclos - Sodimac La Reina',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.37481563450742,
      longitude: -70.61734451547352,
      name: 'Punto Limpio - Administración Ciudad Empresarial',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.44187879305814,
      longitude: -70.8199049383257,
      name: 'Punto Verde Fundacion Reciclame!',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.48541343724662,
      longitude: -70.62695755249024,
      name: 'Punto de reciclaje',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.500874427940865,
      longitude: -70.58987869542577,
      name: 'Punto Limpio TriCiclos - Sodimac Nueva La Florida (Peñalolén)',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.43271081922926,
      longitude: -70.63176407099859,
      name: 'Punto de reciclaje Metro Santa Isabel',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.36793443499136,
      longitude: -70.63863052601054,
      name: 'Punto Limpio TriCiclos',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.587862536931084,
      longitude: -70.58644546791979,
      name: 'Punto Limpio Juan de Dios Malebrán',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.43041867442322,
      longitude: -70.65648330904158,
      name: 'Centro de reciclaje Rendering Chile',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.54666855812622,
      longitude: -70.7896925362732,
      name: 'Punto verde Reciclopet',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.38341636838185,
      longitude: -70.51091446278846,
      name: 'Punto limpio',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.56441726190111,
      longitude: -70.78314511078588,
      name: 'Punto verde RecicloPET',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.56326251144077,
      longitude: -70.77702447052212,
      name: 'Punto verde RecicloPET',
      userEmail: 'francotoledo1990@gmail.com'
    },
    {
      desc: 'Punto limpio',
      latitude: -33.55825841434991,
      longitude: -70.78083543521466,
      name: 'Punto verde RecicloPET',
      userEmail: 'francotoledo1990@gmail.com'
    }
  ]

  constructor(private httpClient: HttpClient,
              private firestore: Firestore) {
    this.getUserLocation();
  }

  public getUserLocation(){
    navigator.geolocation.getCurrentPosition((loc) => {
      this.userLocation = [loc.coords.latitude, loc.coords.longitude]
    })

  }

  createGreenPoint(name: string, desc: string, lat: number, long: number, userEmail: string){
    this.greenPoints.push({
      desc: desc,
      latitude: lat,
      longitude: long,
      name: name,
      userEmail: userEmail
    })
  }

  addGreenPont(greenpoint: any[]){
    const placesRef = collection(this.firestore, 'green-points');
    addDoc(doc(placesRef, greenpoint.userEmail), {})
  }

}
