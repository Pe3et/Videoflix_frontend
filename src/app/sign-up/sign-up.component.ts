import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

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

  
  togglePasswordVisibility(field: 'password' | 'repeatedPassword') {
    if (field === 'password') {
      this.isPasswordVisible = !this.isPasswordVisible;
    } else if (field === 'repeatedPassword') {
      this.isRepeatedPasswordVisible = !this.isRepeatedPasswordVisible;
    }
  }

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

  validateEmail(email: string) {
    const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    this.isEmailValid = emailPattern.test(email)
  }

  checkEmptyPassword(password: string) {
    this.isPasswordEmpty = password.length === 0
  }

  validateRepeatedPassword(repeatedPassword: string, firstEnteredPassword: string) {
    this.arePasswordsMatching = repeatedPassword === firstEnteredPassword
  }

  signUp(email: string, password: string, repeatedPassword: string){
    if(this.areAllInputFieldsValid(email, password, repeatedPassword)) {
      const postData = {
        email: email,
        password: password
      }
      //TODO: Post to API
    }
  }

  areAllInputFieldsValid(email: string, password: string, repeatedPassword: string) {
    this.validateEmail(email);
    this.checkEmptyPassword(password);
    this.validateRepeatedPassword(repeatedPassword, password);
    return this.isEmailValid && !this.isPasswordEmpty && this.arePasswordsMatching;
  }
}
