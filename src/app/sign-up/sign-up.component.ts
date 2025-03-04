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

  validateEmail(event: FocusEvent) {
    const email = (event.target as HTMLInputElement)?.value || '';
    const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    this.isEmailValid = emailPattern.test(email)
  }
}
