import { Component, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { PlacesService } from 'src/app/shared/services/places.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getDocs, query, where, collection, Firestore } from '@angular/fire/firestore';

interface Report{
  username: string;
  userEmail: string;
  greenPointName: string;
  reason: string;
  description: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  mostrarForm = false;
  userReports:Report[] = [];
  userEmail:any;
  reports:Report[] = [];


  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private place: PlacesService,
              private userService: UserService,
              private firestore: Firestore,) {
    this.userEmail = this.userService.userEmail;
    const usersRef = collection(this.firestore, 'reports');
    const userQuery = query(usersRef, where('userEmail', '==', this.userEmail));
    getDocs(usersRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.reports.push({
          username: doc.data()['username'],
          userEmail: doc.data()['userEmail'],
          greenPointName: doc.data()['greenPointName'],
          reason: doc.data()['reason'],
          description: doc.data()['desc'],
        })
      })
      this.spinner.hide();
    })
    getDocs(userQuery).then((querySnapshotUser) => {
      querySnapshotUser.forEach((doc) => {
        this.userReports.push({
          username: doc.data()['username'],
          userEmail: doc.data()['userEmail'],
          greenPointName: doc.data()['greenPointName'],
          reason: doc.data()['reason'],
          description: doc.data()['desc'],
        })
      })
      this.spinner.hide();
    });
  }

  ngOnInit(): void {
    if(this.userReports.length == 0 || this.reports.length == 0) {
      this.spinner.show();
    }
    console.log(this.userReports);
    console.log(this.reports);
  }

  mostrarFormulario() {
    this.mostrarForm = true;
  }

}
