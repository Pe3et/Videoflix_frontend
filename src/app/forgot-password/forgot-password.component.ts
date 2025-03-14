import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FooterComponent, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.sass'
})
export class ForgotPasswordComponent {
  isEmailValid = true;
  sessionStorageMail = sessionStorage.getItem('email');
  apiService = inject(ApiService);

  /**Posts the entered email to the forgot-password endpoint,
   * so the user get's an email from the backend.*/
  sendResetPasswordEmail(email: string){
    this.apiService.post({'email': email}, 'auth/forgot-password/')
  }

  /**Checks if the email is valid and handles the boolean for this validation.*/
  validateEmail(email: string) {
    const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    this.isEmailValid = emailPattern.test(email)
  }

}
