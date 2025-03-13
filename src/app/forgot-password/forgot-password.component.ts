import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FooterComponent, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.sass'
})
export class ForgotPasswordComponent {
  isEmailValid = true;
  sessionStorageMail = sessionStorage.getItem('email');

  resetPassword(email: string){
    
  }

  /**Checks if the email is valid and handles the boolean for this validation.*/
  validateEmail(email: string) {
    const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    this.isEmailValid = emailPattern.test(email)
  }

}
