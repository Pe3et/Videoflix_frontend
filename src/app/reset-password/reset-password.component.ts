import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { ToastMessagesService } from '../services/toast-messages.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FooterComponent, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.sass'
})
export class ResetPasswordComponent implements OnInit {
  token: string | null = null;
  isPasswordVisible = false;
  isRepeatedPasswordVisible = false;
  isPasswordEmpty = false;
  arePasswordsMatching = true;
  toastService = inject(ToastMessagesService)
  apiService = inject(ApiService)
  router = inject(Router)

  constructor(private route: ActivatedRoute) { }

  /**
   * Stores the token from URL parameter in a variable.
   * Redirects to login page if no token was given.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
      if (!this.token) {
        this.router.navigate(['login'])
      }
    });
  }

  /**
   * Handles the reset password request to the backend.
   */
  resetPassword(password: string, repeatedPassword: string) {
    this.areAllInputFieldsValid(password, repeatedPassword)
    //TODO: post request mit Token im Header für die auth
  }

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

  /**Checks if the password is given and handles the boolean for this validation.*/
  checkEmptyPassword(password: string) {
    this.isPasswordEmpty = password.length === 0
  }

  /**Checks if the passwords match handles the boolean for this validation.*/
  validateRepeatedPassword(repeatedPassword: string, firstEnteredPassword: string) {
    this.arePasswordsMatching = repeatedPassword === firstEnteredPassword
  }

  /**Validates both inputs to make sure everything is correct for password reset.*/
  areAllInputFieldsValid(password: string, repeatedPassword: string) {
    this.checkEmptyPassword(password);
    this.validateRepeatedPassword(repeatedPassword, password);
    return !this.isPasswordEmpty && this.arePasswordsMatching;
  }
}
