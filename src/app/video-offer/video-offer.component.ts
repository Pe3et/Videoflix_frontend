import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-video-offer',
  imports: [FooterComponent, CommonModule, RouterLink],
  templateUrl: './video-offer.component.html',
  styleUrl: './video-offer.component.sass'
})
export class VideoOfferComponent {
  
}
