// Archivo: src/app/pages/login/login.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    this.errorMessage = '';

    // Validaciones
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Por favor ingresa un correo válido';
      return;
    }

    this.loading = true;

    const result = await this.authService.login(this.email, this.password);

    this.loading = false;

    if (result.success) {
      await this.showSuccessAlert();
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = result.error || 'Error al iniciar sesión';
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: '¡Bienvenido!',
      message: 'Has iniciado sesión correctamente',
      buttons: ['OK']
    });
    await alert.present();
  }
}