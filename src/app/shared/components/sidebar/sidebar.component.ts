import { Component, OnInit } from '@angular/core';
import { Menu, NavService } from '../../services/nav.service';
import { Firestore} from '@angular/fire/firestore';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  userLoggedIn: boolean = false;
  menuItems: Menu[];
  collapsed = true
  userEmail:any;
  currentUser:any;

  constructor(public navServices: NavService,
              private firestore: Firestore) {
    this.menuItems = this.navServices.MENUITEMS

  }

  ngOnInit(): void {
  }

}
