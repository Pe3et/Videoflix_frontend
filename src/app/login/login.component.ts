import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';

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

  /**Handles the login request.*/
  login(email: string, password: string) {
    //TODO: login
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
