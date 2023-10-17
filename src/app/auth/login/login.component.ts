import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit() {

  }

  ngOnInit() {}

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

  registrarse() {
    this.router.navigate(['/register']);
  }

}
