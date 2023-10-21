import { Component, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


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

  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) { }

  mostrarForm = false;
  reportes: Reporte[] = [];

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
