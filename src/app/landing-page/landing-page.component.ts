import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [FooterComponent, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.sass'
})
export class LandingPageComponent {

}
