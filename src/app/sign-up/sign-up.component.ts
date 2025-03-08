import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ToastMessagesService } from '../services/toast-messages.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, FooterComponent, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.sass'
})
export class SignUpComponent {
  isPasswordVisible = false;
  isRepeatedPasswordVisible = false;
  sessionStorageMail = sessionStorage.getItem('email')
  isEmailValid = true
  isPasswordEmpty = false
  arePasswordsMatching = true
  toastService = inject(ToastMessagesService)
  apiService = inject(ApiService)
  router = inject(Router)

  /**Toggles the visibility of a password input.*/
  togglePasswordVisibility(field: 'password' | 'repeatedPassword') {
    if (field === 'password') {
      this.isPasswordVisible = !this.isPasswordVisible;
    } else if (field === 'repeatedPassword') {
      this.isRepeatedPasswordVisible = !this.isRepeatedPasswordVisible;
    }
  }

  /**Get's the correct svg depending on the visibility of the password.*/
  getVisibilityIcon(field: 'password' | 'repeatedPassword') {
    if (field === 'password') {
      return this.isPasswordVisible
        ? '/assets/img/visibility_off.svg'
        : '/assets/img/visibility.svg';
    } else {
      return this.isRepeatedPasswordVisible
        ? '/assets/img/visibility_off.svg'
        : '/assets/img/visibility.svg';
    }
  }

  /**Checks if the email is valid and handles the boolean for this validation.*/
  validateEmail(email: string) {
    const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    this.isEmailValid = emailPattern.test(email)
  }

  /**Checks if the password is given and handles the boolean for this validation.*/
  checkEmptyPassword(password: string) {
    this.isPasswordEmpty = password.length === 0
  }

  /**Checks if the passwords match handles the boolean for this validation.*/
  validateRepeatedPassword(repeatedPassword: string, firstEnteredPassword: string) {
    this.arePasswordsMatching = repeatedPassword === firstEnteredPassword
  }

  /**Registers the new user when everything is validated*/
  async signUp(email: string, password: string, repeatedPassword: string){
    if(this.areAllInputFieldsValid(email, password, repeatedPassword)) {
      const postData = {
        email: email,
        password: password
      }
      let post = await this.apiService.post(postData, 'auth/register/')
      if(post.detail) {
        this.toastService.showToast(post.detail)
      } else {
        this.router.navigate(['login'])
      }
    }
  }

  /**Validates everything to make sure everything is correct for registration.*/
  areAllInputFieldsValid(email: string, password: string, repeatedPassword: string) {
    this.validateEmail(email);
    this.checkEmptyPassword(password);
    this.validateRepeatedPassword(repeatedPassword, password);
    return this.isEmailValid && !this.isPasswordEmpty && this.arePasswordsMatching;
  }
}
