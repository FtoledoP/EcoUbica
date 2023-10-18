import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password !== null && confirmPassword !== null && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }



  onSubmit() {
    // Aquí puedes manejar la lógica de envío del formulario
    if (this.registerForm.valid) {
      console.log('Formulario válido:', this.registerForm.value);
      this.userService.register(this.registerForm.value.email, this.registerForm.value.password).then((res) => {
        console.log(res);
        const data = this.registerForm.value;
        this.userService.createUser(data).then((res) => {
          console.log(res);
          console.log('Usuario creado exitosamente');
        }).catch((err) => {console.log(err)});
        this.registerForm.reset()
      }).catch((err) => {console.log(err)});
    } else {
      console.log('Formulario inválido');
    }
  }

  ngOnInit() {
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

  login(){
    this.router.navigate(['/login']);
  }

}
