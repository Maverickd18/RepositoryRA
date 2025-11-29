// Archivo: src/app/pages/login/login.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,  // ← ASEGÚRATE QUE ESTÉ AQUÍ
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}