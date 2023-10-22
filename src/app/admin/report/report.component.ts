import { Component, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { PlacesService } from 'src/app/shared/services/places.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  mostrarForm = false;
  reportes: Reporte[] = [];
  userEmail: any;


  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private place: PlacesService,
              private userService: UserService) {
    this.userEmail = this.userService.userEmail;
  }

  ngOnInit(): void {
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
