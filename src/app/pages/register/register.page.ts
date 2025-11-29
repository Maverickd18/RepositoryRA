// Archivo: src/app/pages/register/register.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  displayName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
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

  async onRegister() {
    this.errorMessage = '';

    // Validaciones
    if (!this.displayName || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Por favor ingresa un correo válido';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.loading = true;

    const result = await this.authService.register(
      this.email,
      this.password,
      this.displayName
    );

    this.loading = false;

    if (result.success) {
      await this.showSuccessAlert();
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = result.error || 'Error al crear la cuenta';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getPasswordStrength(): number {
    if (!this.password) return 0;
    
    let strength = 0;
    if (this.password.length >= 6) strength += 33;
    if (this.password.length >= 10) strength += 33;
    if (/[A-Z]/.test(this.password) && /[a-z]/.test(this.password)) strength += 17;
    if (/[0-9]/.test(this.password)) strength += 17;
    
    return Math.min(strength, 100);
  }

  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    if (strength < 40) return 'weak';
    if (strength < 70) return 'medium';
    return 'strong';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    if (strength < 40) return 'Contraseña débil';
    if (strength < 70) return 'Contraseña media';
    return 'Contraseña fuerte';
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: '¡Cuenta creada!',
      message: 'Tu cuenta ha sido creada exitosamente',
      buttons: ['OK']
    });
    await alert.present();
  }
}