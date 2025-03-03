import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  imports: [FooterComponent, RouterLink, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.sass'
})
export class LandingPageComponent {
  emailAddress: string = ''

  saveMailToSessionStorage() {
    sessionStorage.setItem('email', this.emailAddress)
  }
}
