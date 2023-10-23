import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  dismissible = true;
  mostrarAlert: boolean = false;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private spinner: NgxSpinnerService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit() {
    // Aquí puedes manejar la lógica de envío del formulario
    this.spinner.show();
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
      setTimeout(() => {
        this.spinner.hide();
        this.mostrarMiAlert();
        setTimeout(() => {
          this.mostrarAlert = false;
        }, 3000);
      }, 2000);
    } else {
      console.log('Formulario inválido');
      this.spinner.hide();
    }
  }

  ngOnInit() {
    console.log(this.userService.userEmail)
    this.userService.userEmail = undefined;
  }

  mostrarMiAlert() {
    this.mostrarAlert = true;
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

  registrarse() {
    this.router.navigate(['/register']);
  }

}
