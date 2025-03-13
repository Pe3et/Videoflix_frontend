import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastMessagesService } from '../services/toast-messages.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FooterComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  isPasswordVisible = false;
  isPasswordEmpty = false;
  isEmailValid = true;
  sessionStorageMail = sessionStorage.getItem('email');
  apiService = inject(ApiService);
  messageService = inject(ToastMessagesService);
  router = inject(Router);

  /**Handles the login request.*/
  async login(email: string, password: string) {
    let username = email.split('@')[0];
    let result = await this.apiService.post({'username': username, 'password': password}, 'auth/login/');
    if(result.token) {
      sessionStorage.setItem('token', result.token);
      this.router.navigate(['video-offer']);
    } else if(result.details){
      this.messageService.showToast(result.details)
    } else {
      this.messageService.showToast(result.detail);
    }
  }

  /**Toggles the visibility of a password input.*/
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  /**Get's the correct svg depending on the visibility of the password.*/
  getVisibilityIcon() {
    return this.isPasswordVisible
      ? '/assets/img/visibility_off.svg'
      : '/assets/img/visibility.svg'
  }

  /**Checks if the password is given and handles the boolean for this validation.*/
  checkEmptyPassword(password: string) {
    this.isPasswordEmpty = password.length === 0
  }

  /**Checks if the email is valid and handles the boolean for this validation.*/
  validateEmail(email: string) {
    const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    this.isEmailValid = emailPattern.test(email)
  }
}
