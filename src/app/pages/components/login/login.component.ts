import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }
        const { email, password } = this.loginForm.value;
        this.authService.login(email, password).subscribe(
            success => {
                if (success) {
                    this.router.navigate(['/']);
                } else {
                    this.errorMessage = 'Usuario o contraseña incorrectos';
                }
            },
            error => {
                this.errorMessage = 'Error al conectar con el servidor';
            }
        );
    }
}