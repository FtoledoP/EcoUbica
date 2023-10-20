import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { Menu, NavService } from '../../services/nav.service';
import { UserService } from '../../services/user.service';
import { getAuth } from "firebase/auth";
import { Firestore, collection, addDoc, query, where, getDocs, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';



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
              private userService: UserService,
              private firestore: Firestore,
              private spinner: NgxSpinnerService) {
    this.menuItems = this.navServices.MENUITEMS

    this.userService.isLoggedIn.subscribe((loggedIn) => {
      this.userLoggedIn = loggedIn;
      this.userEmail = this.userService.userEmail;
      console.log('User Email: ' + this.userEmail)
      const usersRef = collection(this.firestore, 'users');
      const userQuery = query(usersRef, where('email', '==', this.userEmail));
      const querySnapshot = getDocs(userQuery).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          this.currentUser = doc.data();
        })
      });
      console.log('Current User: ' + this.currentUser);
    })

  }

  ngOnInit(): void {
    if(this.currentUser){
      this.spinner.hide();
    }
  }

  logout(){
    this.userService.logout();
    this.userEmail = null;
  }

}
