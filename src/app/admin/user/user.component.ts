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
              private spinner: NgxSpinnerService,
              private userService: UserService) {
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
    contrasena: [this.usuario.contrasena, [Validators.required, Validators.minLength(6)]],
    });
    console.log('Current email: ' + this.userEmail)
    console.log('Current User: ' + this.currentUser);
    this.userForm.get('correo')?.disable();
    this.userInfo.get('correo')?.disable();
    this.userInfo.get('nombreUsuario')?.disable();
    this.userInfo.get('contrasena')?.disable();
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
    const user = {
      username: this.userForm.value.nombreUsuario,
      password: this.userForm.value.contrasena,
      email: this.userInfo.value.correo,
      role: 'user'
    }
    console.log('Datos del usuario guardados:', user);
    this.userService.updateUser(user);
    this.modalRef?.hide();
  }
// La función para alternar la visibilidad de la contraseña
toggleShowPass() {
  this.showPass = !this.showPass;
  }

  validationMessages = {
    username: {
      required: 'Debe ingresar un nombre de usuario.'
    },
    email: {
      required: 'Debe ingresar un correo electronico.',
      email: 'El formato del correo electrónico no es válido.'
    },
    password: {
      required: 'Debe ingresar una contraseña.',
      minlength: 'La contraseña debe tener al menos 6 caracteres.'
    },
    confirmPassword: {
      required: 'La confirmación de contraseña es obligatoria.',
      passwordMismatch: 'Las contraseñas no coinciden.'
    }
  };

}


