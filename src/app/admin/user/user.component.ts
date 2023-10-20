import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Firestore, collection, addDoc, query, where, getDocs, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';




export interface User {
  correo: string;
  nombreUsuario: string;
  contrasena: string;
}


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  showPass: boolean = false;
  modalRef?: BsModalRef;
  userForm: FormGroup;
  userInfo: FormGroup;
  currentUser: any
  userEmail:any;


  usuario: User = {
    correo: '',
    nombreUsuario: '',
    contrasena: ''
  };

  constructor(private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private usersService: UserService,
              private firestore: Firestore,
              private spinner: NgxSpinnerService) {
    this.userEmail = this.usersService.userEmail;
    this.currentUser = this.usersService.currentUser;
    this.usuario.correo = this.currentUser.email;
    this.usuario.nombreUsuario = this.currentUser.username;
    this.usuario.contrasena = this.currentUser.password;
    this.userInfo = this.formBuilder.group({
      correo: [this.usuario.correo, Validators.required],
    nombreUsuario: [this.usuario.nombreUsuario, Validators.required],
    contrasena: [this.usuario.contrasena, Validators.required],
    });
    this.userForm = this.formBuilder.group({
      correo: [this.usuario.correo, Validators.required],
    nombreUsuario: [this.usuario.nombreUsuario, Validators.required],
    contrasena: [this.usuario.contrasena, Validators.required],
    });
    console.log('Current email: ' + this.userEmail)
    console.log('Current User: ' + this.currentUser);
    this.userForm.get('correo')?.disable();
  }

  ngOnInit(): void {
    if(this.currentUser = undefined){
      this.spinner.show();
      setTimeout(() => {
        this.currentUser = this.usersService.currentUser;
        this.usuario.correo = this.currentUser.email;
        this.usuario.nombreUsuario = this.currentUser.username;
        this.usuario.contrasena = this.currentUser.password;
        this.spinner.hide();
      } ,2000);
      console.log('Current User after ngOnInit: ' + this.currentUser);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  guardarCambios() {
    // Lógica para guardar los cambios en los datos del usuario
    console.log('Datos del usuario guardados:', this.usuario);
  }
// La función para alternar la visibilidad de la contraseña
toggleShowPass() {
  this.showPass = !this.showPass;
  }


}


